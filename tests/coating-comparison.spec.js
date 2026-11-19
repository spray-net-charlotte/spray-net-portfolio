import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { comparisonDocuments } from '../src/data/comparisonDocuments.js';

test('comparison source copies match their recorded identities and complete page sets', async () => {
  for (const doc of comparisonDocuments) {
    const base = new URL(`../public/${doc.base}/`, import.meta.url);
    const original = await readFile(new URL('original.pdf', base));
    expect(original.subarray(0, 4).toString()).toBe('%PDF');
    expect(createHash('sha256').update(original).digest('hex')).toBe(doc.sha256);
    const text = JSON.parse(await readFile(new URL('text.json', base), 'utf8'));
    expect(text).toHaveLength(doc.pages);
    for (let i = 1; i <= doc.pages; i++) {
      const image = await readFile(new URL(`${i}.webp`, base));
      expect(image.subarray(8, 12).toString()).toBe('WEBP');
    }
  }
});

test('comparison navigation preserves product, source pages and Back behavior', async ({ page }) => {
  await page.goto('./'); await page.locator('.comparison-nav').click();
  await page.getByRole('button',{name:'Exterior',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Exterior Comparison Coming Next'})).toBeVisible();
  await page.goBack(); await page.getByRole('button',{name:'Interior',exact:true}).click();
  await page.getByRole('button',{name:'Primer',exact:true}).click();
  const sheet=page.getByRole('table',{name:'Primer specifications and safety across all brands'});
  await expect(sheet.locator('thead th')).toHaveCount(8);
  await expect(sheet).toContainText('KILZ 2 All-Purpose'); await expect(sheet).toContainText('Extreme Bond');
  await expect(sheet.getByRole('row',{name:/Solids by Volume/})).toContainText('55%');
  await expect(sheet).toContainText('Signal Word'); await expect(sheet).toContainText('Skin Sensitization');
  await sheet.getByRole('link',{name:'Read SDS',exact:true}).nth(4).click();
  await expect(page.locator('main h1')).toHaveText('Zinsser B-I-N Shellac Primer');
  await page.getByRole('button',{name:'Next Page',exact:true}).click();
  await page.getByRole('button',{name:'Read Page Text',exact:true}).click();
  await expect(page.locator('.comparison-page-text pre')).toContainText('Ethanol');
  await page.getByRole('button',{name:'Fullscreen',exact:true}).click();
  await expect(page.getByRole('dialog')).toBeVisible(); await page.goBack();
  await expect(page.getByRole('dialog')).not.toBeVisible(); await page.goBack();
  await expect(page.getByRole('heading',{name:'Cabinet Primers — All Brands'})).toBeVisible();
  await page.getByRole('button',{name:'Paint',exact:true}).click();
  await expect(page.getByRole('table',{name:'In-house cabinet coating benchmarks across all brands'})).toBeVisible();
  await page.goBack(); await expect(page.getByRole('button',{name:'Primer',exact:true})).toHaveAttribute('aria-pressed','true');
});

test('comparison and document reader fit tablets and retain accessible controls', async ({ page }) => {
  test.setTimeout(90_000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const size of [{ width:1180,height:820 }, { width:834,height:1194 }, { width:1024,height:768 }, { width:768,height:1024 }, { width:390,height:844 }]) {
    await page.setViewportSize(size);
    for (const path of ['/comparison','/comparison?area=interior&coat=primer','/comparison?area=interior&coat=paint','/comparison?area=exterior','/comparison/stix-sds']) {
      await page.goto(`./#${path}`);
      await expect(page.locator('main h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${size.width}`).toBe(true);
      expect(await page.locator('a[target="_blank"],a[download],a[href^="http"]').count()).toBe(0);
    }
  }
  await page.setViewportSize({ width:834,height:1194 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['/comparison','/comparison?area=interior&coat=primer','/comparison?area=interior&coat=paint','/comparison?area=exterior','/comparison/sn-coating-tds']) {
    await page.goto(`./#${path}`);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
  await page.goto('./#/comparison?area=interior&coat=primer');
  await page.screenshot({ path:`test-results/coating-comparison-${test.info().project.name}.png`, fullPage:true });
  await page.goto('./#/comparison/sn-coating-tds');
  await expect.poll(() => page.locator('.comparison-page-image img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path:`test-results/coating-document-${test.info().project.name}.png`, fullPage:true });
  expect(errors).toEqual([]);
});

test('all comparison originals, images and text are available offline under GitHub Pages base', async ({ page, context, browserName }) => {
  test.skip(browserName === 'webkit', 'Windows WebKit service-worker emulation is unreliable; reader navigation and source integrity are tested above.');
  test.setTimeout(90_000);
  await page.goto('./#/comparison?view=sources');
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller)), {timeout:60_000}).toBe(true);
  const checks = await page.evaluate(async docs => {
    const results = [];
    for (const doc of docs) {
      for (const suffix of ['original.pdf', 'text.json', ...Array.from({length:doc.pages},(_,i)=>`${i+1}.webp`)]) {
        const url=new URL(`${doc.base}/${suffix}`,location.href);
        const response=await fetch(url);
        results.push({ path:url.pathname, ok:response.ok });
      }
    }
    return results;
  }, comparisonDocuments);
  expect(checks.every(item => item.ok && item.path.startsWith('/spray-net-portfolio/'))).toBe(true);
  await context.setOffline(true);
  await page.goto('./#/comparison/emerald-sds?view=sources');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Sherwin-Williams Emerald Urethane Satin', exact:true })).toBeVisible();
  await page.getByLabel('Document page').selectOption('13');
  await expect.poll(() => page.locator('.comparison-page-image img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.getByRole('button', {name:'Read Page Text',exact:true}).click();
  await expect(page.locator('.comparison-page-text pre')).toContainText('14/14');
  const originals = await page.evaluate(async docs => Promise.all(docs.map(async doc => {
    const response=await fetch(new URL(`${doc.base}/original.pdf`,location.href));
    return response.ok && (await response.text()).startsWith('%PDF');
  })),comparisonDocuments);
  expect(originals.every(Boolean)).toBe(true);
  await context.setOffline(false);
});
