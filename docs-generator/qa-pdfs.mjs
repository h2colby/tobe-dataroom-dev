import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, 'output');
const qaDir = path.join(outputDir, 'qa-screenshots');

if (!fs.existsSync(qaDir)) fs.mkdirSync(qaDir, { recursive: true });

const htmlFiles = [
  { html: 'tobe-hydrogen-pricing-report.html', name: 'tobe-hydrogen-pricing-report' },
  { html: 'tobe-competitive-landscape-report.html', name: 'tobe-competitive-landscape-report' }
];

async function screenshotPages() {
  const browser = await chromium.launch();

  for (const doc of htmlFiles) {
    const htmlPath = path.join(outputDir, doc.html);
    console.log(`Screenshotting: ${doc.html}`);

    // Use print media emulation to match PDF rendering
    const page = await browser.newPage();
    await page.emulateMedia({ media: 'print' });
    await page.setViewportSize({ width: 816, height: 1056 });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    // Full-page screenshot
    await page.screenshot({
      path: path.join(qaDir, `${doc.name}-full.png`),
      fullPage: true
    });
    console.log(`  -> ${doc.name}-full.png`);
    await page.close();
  }

  await browser.close();
  console.log('QA screenshots done.');
}

screenshotPages().catch(err => {
  console.error(err);
  process.exit(1);
});
