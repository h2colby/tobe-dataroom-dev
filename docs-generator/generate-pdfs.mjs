import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, 'output');

const documents = [
  {
    html: 'tobe-hydrogen-pricing-report.html',
    pdf: 'tobe-hydrogen-pricing-report.pdf',
    title: 'Hydrogen Pricing Report'
  },
  {
    html: 'tobe-competitive-landscape-report.html',
    pdf: 'tobe-competitive-landscape-report.pdf',
    title: 'Competitive Landscape Report'
  }
];

const footerTemplate = `
<div style="width:100%;font-family:'Courier New',monospace;font-size:7pt;color:#444;display:flex;justify-content:space-between;padding:0 0.75in;">
  <span>TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024 — CONFIDENTIAL</span>
  <span><span class="pageNumber"></span></span>
</div>`;

async function generatePDFs() {
  const browser = await chromium.launch();

  for (const doc of documents) {
    const htmlPath = path.join(outputDir, doc.html);
    const pdfPath = path.join(outputDir, doc.pdf);

    console.log(`Generating: ${doc.title}...`);
    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

    await page.pdf({
      path: pdfPath,
      format: 'Letter',
      margin: {
        top: '0.75in',
        bottom: '0.85in',
        left: '0.75in',
        right: '0.75in'
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: footerTemplate
    });

    console.log(`  -> ${pdfPath}`);
    await page.close();
  }

  await browser.close();
  console.log('Done.');
}

generatePDFs().catch(err => {
  console.error(err);
  process.exit(1);
});
