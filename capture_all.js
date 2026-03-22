const { chromium } = require('playwright');

const pages = [
  { url: 'http://localhost:3000/', name: 'overview', wait: 8000 },
  { url: 'http://localhost:3000/business-model', name: 'business-model', wait: 2000 },
  { url: 'http://localhost:3000/customers', name: 'customers', wait: 2000 },
  { url: 'http://localhost:3000/financials', name: 'financials', wait: 2000 },
  { url: 'http://localhost:3000/tax-credits', name: 'tax-credits', wait: 2000 },
  { url: 'http://localhost:3000/technology', name: 'technology', wait: 2000 },
  { url: 'http://localhost:3000/technology/cell', name: 'technology-cell', wait: 2000 },
  { url: 'http://localhost:3000/technology/power-converter', name: 'technology-power-converter', wait: 2000 },
  { url: 'http://localhost:3000/technology/controls', name: 'technology-controls', wait: 2000 },
  { url: 'http://localhost:3000/technology/efficiency', name: 'technology-efficiency', wait: 2000 },
  { url: 'http://localhost:3000/team', name: 'team', wait: 2000 },
  { url: 'http://localhost:3000/backed-by', name: 'backed-by', wait: 2000 },
  { url: 'http://localhost:3000/validation', name: 'validation', wait: 2000 },
  { url: 'http://localhost:3000/projects/zeeco', name: 'projects-zeeco', wait: 2000 },
  { url: 'http://localhost:3000/projects/node-01', name: 'projects-node-01', wait: 2000 },
  { url: 'http://localhost:3000/documents', name: 'documents', wait: 2000 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  for (const pageInfo of pages) {
    console.log(`Capturing: ${pageInfo.name}`);
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    
    try {
      await page.goto(pageInfo.url, { timeout: 10000, waitUntil: 'networkidle' });
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
  console.log('\n✓ All screenshots captured');
})();
