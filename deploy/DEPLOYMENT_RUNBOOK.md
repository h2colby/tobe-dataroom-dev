# Dataroom Deployment Runbook

Deploy `dataroom.tobe.energy` on the Digital Ocean droplet alongside `tobe.energy`.

---

## Pre-requisites

1. **DNS A Record** — Point `dataroom.tobe.energy` to the droplet's public IP
   ```
   Type: A
   Host: dataroom
   Value: <DROPLET_IP>
   TTL: 3600
   ```
   Verify: `dig dataroom.tobe.energy` — should resolve to `<DROPLET_IP>`

2. **Droplet sizing** — Ensure the droplet has enough RAM for two Next.js containers
   - Minimum: 2GB RAM (4GB recommended)
   - Check: `ssh root@<DROPLET_IP> free -h`
   - Resize via DO console if needed (requires power-off for CPU/RAM resize)

3. **Docker installed** on the droplet
   ```bash
   docker --version  # Should exist from website deployment
   ```

4. **Nginx installed** on the droplet
   ```bash
   nginx -v
   ```

5. **Certbot installed**
   ```bash
   certbot --version
   ```

---

## Step 1: SSH In & Set Up Directory

```bash
ssh root@<DROPLET_IP>
mkdir -p /opt/dataroom
cd /opt/dataroom
```

## Step 2: Get the Code

**Option A: Git clone (preferred)**
```bash
git clone https://github.com/tobe-energy/tobe-dataroom.git .
```

**Option B: SCP from Mac Studio**
```bash
# From Mac Studio:
rsync -avz --exclude node_modules --exclude .next --exclude .git \
  ~/clawd/tobe-dataroom-dev/ root@<DROPLET_IP>:/opt/dataroom/
```

## Step 3: Set Up Environment

Create `.env.local` with required secrets:

```bash
cat > /opt/dataroom/.env.local << 'EOF'
# Required — powers the AI chat assistant (Ren)
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Optional — override if needed
# PORT=3001  (already set in Dockerfile)
EOF
```

### Required Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | **Yes** | Powers the AI chat assistant on every page |

> **Note:** No auth middleware or database. The dataroom is currently open-access (password-protected at the DNS/sharing level, not app level).

## Step 4: Docker Build

```bash
cd /opt/dataroom

# Build the image
docker build -t tobe-dataroom:latest .

# Verify the build
docker images | grep tobe-dataroom
```

**Build takes ~2-4 minutes** depending on droplet specs.

## Step 5: Docker Run

```bash
# Stop existing container if redeploying
docker stop tobe-dataroom 2>/dev/null
docker rm tobe-dataroom 2>/dev/null

# Run on port 3001
docker run -d \
  --name tobe-dataroom \
  --restart unless-stopped \
  -p 3001:3001 \
  --env-file /opt/dataroom/.env.local \
  tobe-dataroom:latest

# Verify it's running
docker ps | grep tobe-dataroom
docker logs tobe-dataroom --tail 20
```

**Health check:**
```bash
curl -s http://localhost:3001 | head -20
```

## Step 6: Nginx Configuration

```bash
# Copy nginx config
cp /opt/dataroom/deploy/nginx-dataroom.conf /etc/nginx/sites-available/dataroom

# Enable it
ln -sf /etc/nginx/sites-available/dataroom /etc/nginx/sites-enabled/dataroom

# Test config
nginx -t

# Reload
systemctl reload nginx
```

## Step 7: SSL with Certbot

```bash
# Get SSL certificate
certbot --nginx -d dataroom.tobe.energy

# Verify auto-renewal
certbot renew --dry-run
```

> **Note:** Certbot will modify the nginx config to add SSL directives. The template already has SSL blocks — certbot may adjust them or create its own. Either way works.

**Alternative (if certbot --nginx plugin isn't available):**
```bash
certbot certonly --webroot -w /var/www/html -d dataroom.tobe.energy
# Then the existing nginx config SSL paths will work
```

## Step 8: Verify

1. **HTTP → HTTPS redirect:**
   ```bash
   curl -I http://dataroom.tobe.energy
   # Should return 301 → https://dataroom.tobe.energy
   ```

2. **HTTPS loads:**
   ```bash
   curl -I https://dataroom.tobe.energy
   # Should return 200
   ```

3. **SSL valid:**
   ```bash
   echo | openssl s_client -connect dataroom.tobe.energy:443 2>/dev/null | openssl x509 -noout -dates
   ```

4. **AI chat works:**
   ```bash
   curl -X POST https://dataroom.tobe.energy/api/chat \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"What is Tobe Energy?"}]}' \
     --max-time 30
   ```

5. **Open in browser:** `https://dataroom.tobe.energy`

---

## Update / Redeploy

```bash
ssh root@<DROPLET_IP>
cd /opt/dataroom

# Pull latest code
git pull origin main

# Rebuild and restart
docker build -t tobe-dataroom:latest .
docker stop tobe-dataroom
docker rm tobe-dataroom
docker run -d \
  --name tobe-dataroom \
  --restart unless-stopped \
  -p 3001:3001 \
  --env-file /opt/dataroom/.env.local \
  tobe-dataroom:latest

# Verify
docker logs tobe-dataroom --tail 20
curl -s http://localhost:3001 | head -5
```

### Quick redeploy script

Save as `/opt/dataroom/redeploy.sh`:
```bash
#!/bin/bash
set -e
cd /opt/dataroom
git pull origin main
docker build -t tobe-dataroom:latest .
docker stop tobe-dataroom && docker rm tobe-dataroom
docker run -d \
  --name tobe-dataroom \
  --restart unless-stopped \
  -p 3001:3001 \
  --env-file /opt/dataroom/.env.local \
  tobe-dataroom:latest
echo "✅ Dataroom redeployed"
docker logs tobe-dataroom --tail 5
```

```bash
chmod +x /opt/dataroom/redeploy.sh
```

---

## Rollback

### To previous Docker image

```bash
# List recent images (look for previous build)
docker images tobe-dataroom --format "table {{.ID}}\t{{.CreatedAt}}\t{{.Size}}"

# Tag current as backup before new deploy
docker tag tobe-dataroom:latest tobe-dataroom:previous

# If you need to rollback:
docker stop tobe-dataroom && docker rm tobe-dataroom
docker run -d \
  --name tobe-dataroom \
  --restart unless-stopped \
  -p 3001:3001 \
  --env-file /opt/dataroom/.env.local \
  tobe-dataroom:previous
```

### To previous git commit

```bash
cd /opt/dataroom
git log --oneline -5  # Find the commit to rollback to
git checkout <COMMIT_HASH>

# Rebuild
docker build -t tobe-dataroom:latest .
docker stop tobe-dataroom && docker rm tobe-dataroom
docker run -d \
  --name tobe-dataroom \
  --restart unless-stopped \
  -p 3001:3001 \
  --env-file /opt/dataroom/.env.local \
  tobe-dataroom:latest
```

### Nuclear option (full teardown)

```bash
docker stop tobe-dataroom && docker rm tobe-dataroom
docker rmi tobe-dataroom:latest
rm /etc/nginx/sites-enabled/dataroom
systemctl reload nginx
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Container exits immediately | `docker logs tobe-dataroom` — likely missing env var or build issue |
| 502 Bad Gateway | Container not running or wrong port. Check `docker ps` and `curl localhost:3001` |
| SSL errors | Run `certbot renew` or re-run `certbot --nginx -d dataroom.tobe.energy` |
| AI chat returns 500 | Check `ANTHROPIC_API_KEY` in `.env.local` — must be valid |
| Build fails at `npm run build` | Check `next.config.ts` has `output: 'standalone'` |
| Port conflict | Make sure nothing else is on 3001: `ss -tlnp | grep 3001` |

---

## Architecture

```
Internet → Nginx (443/SSL) → localhost:3001 → Docker (tobe-dataroom)
                                              └── Node.js standalone server
                                              └── Next.js app
                                              └── /api/chat → Anthropic API

Website:  Nginx → localhost:3000 → Docker (tobe-website)
Dataroom: Nginx → localhost:3001 → Docker (tobe-dataroom)
```
