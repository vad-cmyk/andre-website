import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const width = parseInt(process.argv[4] || '1440', 10);
const height = parseInt(process.argv[5] || '900', 10);

const existing = fs.readdirSync(screenshotsDir)
  .map(f => { const m = f.match(/^screenshot-(\d+)/); return m ? parseInt(m[1]) : 0; });
const n = (existing.length ? Math.max(...existing) : 0) + 1;

const filename = label
  ? `screenshot-${n}-${label}.png`
  : `screenshot-${n}.png`;
const outPath = path.join(screenshotsDir, filename);

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 400));

  // Scroll through the full page first so IntersectionObserver-driven
  // reveals/counters/brush effects have already fired before we capture —
  // a fullPage screenshot resizes the viewport just before capturing, which
  // is too late for scroll-triggered animations to run naturally.
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = Math.max(500, Math.floor(height * 0.8));
  for (let y = 0; y < scrollHeight; y += step) {
    await page.evaluate((sy) => window.scrollTo(0, sy), y);
    await new Promise(r => setTimeout(r, 250));
  }
  await page.evaluate((h) => window.scrollTo(0, h), scrollHeight);
  await new Promise(r => setTimeout(r, 300));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));

  // Resize the viewport to the full document height and capture that single
  // frame instead of using fullPage (which tiles+stitches internally and
  // duplicates position:sticky/fixed elements at each tile boundary).
  const finalHeight = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewport({ width, height: finalHeight, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: outPath, fullPage: false });
  await browser.close();
  console.log(`Screenshot saved: temporary screenshots/${filename}`);
})();
