const http = require('http');
const fs = require('fs');
const path = require('path');

// Load .env.local into process.env
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

// Override SITE_URL for local dev
const PORT = parseInt(process.env.PORT, 10) || 3334;
process.env.SITE_URL = 'http://localhost:' + PORT;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
};

// API route mapping — maps URL paths to handler files
const API_ROUTES = {
  '/api/login':                  './api/login.js',
  '/api/logout':                 './api/logout.js',
  '/api/verify':                 './api/verify.js',
  '/api/join':                   './api/join.js',
  '/api/data':                   './api/data.js',
  '/api/data/files':             './api/data/files.js',
  '/api/data/download':          './api/data/download.js',
  '/api/admin':                  './api/admin.js',
  '/api/admin/invite-links':     './api/admin/invite-links.js',
  '/api/admin/data-room-access': './api/admin/data-room-access.js',
  '/api/admin/data-room-files':  './api/admin/data-room-files.js',
  '/api/admin/data-room-upload': './api/admin/data-room-upload.js',
};

// Rewrites (same as vercel.json)
const REWRITES = {
  '/admin': '/api/admin',
  '/data':  '/api/data',
};

// Read full request body
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, 'http://localhost');
  let urlPath = parsedUrl.pathname;

  // Apply rewrites
  if (REWRITES[urlPath]) {
    urlPath = REWRITES[urlPath];
  }

  // Check if this is an API route
  const handlerFile = API_ROUTES[urlPath];
  if (handlerFile) {
    try {
      // Buffer the body so handlers can read it
      const bodyBuf = await readBody(req);
      // Parse JSON body if content-type is json, otherwise keep as string
      const ct = req.headers['content-type'] || '';
      if (ct.includes('application/json') && bodyBuf.length > 0) {
        try { req.body = JSON.parse(bodyBuf.toString()); } catch { req.body = bodyBuf.toString(); }
      } else {
        req.body = bodyBuf.toString();
      }

      // Patch req.url to include query string
      req.url = urlPath + parsedUrl.search;

      // Add a json() helper if the handler needs it (some read req.body as JSON)
      const originalOn = req.on.bind(req);
      req.on = function(event, cb) {
        if (event === 'data') { cb(body); return req; }
        if (event === 'end') { cb(); return req; }
        return originalOn(event, cb);
      };

      // Patch res.json if not present
      if (!res.json) {
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };
      }

      // Patch res.status if not present
      if (!res.status) {
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
      }

      const handler = require(path.resolve(__dirname, handlerFile));
      await handler(req, res);
    } catch (err) {
      console.error('API error on', urlPath, err);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    }
    return;
  }

  // Static file serving
  let filePath;
  if (urlPath === '/' || urlPath === '/index.html') {
    // Root rewrites to login per vercel.json
    filePath = path.join(__dirname, 'public', 'login.html');
  } else if (urlPath === '/platform-strategy-deck' || urlPath === '/platform-strategy-deck.html') {
    filePath = path.join(__dirname, 'content', 'platform-strategy-deck.html');
  } else {
    filePath = path.join(__dirname, 'public', urlPath);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('Dev server running at http://localhost:' + PORT);
  console.log('Routes: /login.html, /data, /admin, /join.html');
});
