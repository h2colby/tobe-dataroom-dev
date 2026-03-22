const { chromium } = require('playwright');

const pages = [
  { url: 'http://localhost:3000/technology', name: 'technology', wait: 3000 },
  { url: 'http://localhost:3000/technology/cell', name: 'technology-cell', wait: 3000 },
  { url: 'http://localhost:3000/technology/power-converter', name: 'technology-power-converter', wait: 3000 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  for (const pageInfo of pages) {
    console.log(`Capturing: ${pageInfo.name}`);
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    
    try {
      await page.goto(pageInfo.url, { timeout: 20000, waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(pageInfo.wait);
      await page.screenshot({ 
        path: `/tmp/visual_audit/${pageInfo.name}.png`, 
        fullPage: true 
      });
      console.log(`✓ ${pageInfo.name}`);
    } catch (error) {
      console.error(`✗ ${pageInfo.name}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
  
  await browser.close();
  console.log('\n✓ Retry complete');
})();
