import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { comparisonDocuments } from '../src/data/comparisonDocuments.js';
import { coatingProducts, comparisonGroups, coatingHardeners } from '../src/data/comparisons.js';
import { getComparisonSummary } from '../src/data/comparisonSummary.js';
import { getKcmaEvidence, kcmaFinishStatus } from '../src/data/kcmaEvidence.js';
import { regulatoryVoc, estimateRegulatoryVoc, estimateMixedRegulatoryVoc, professionalMixEstimates } from '../src/data/regulatoryVoc.js';
import { getCatalystComparison } from '../src/data/catalystComparison.js';

test('product evidence points to captured SDS and preserves component and test scopes', () => {
  const ids = new Set(comparisonDocuments.map(doc => doc.id));
  for (const group of Object.values(comparisonGroups)) {
    for (const id of [group.ours, ...group.peers]) {
      const p = coatingProducts[id];
      expect(getComparisonSummary(p).type, `${id} compact coating type`).toBeTruthy();
      expect(getComparisonSummary(p).catalyst, `${id} compact catalyst`).toBeTruthy();
      expect(ids.has(regulatoryVoc[id]?.source), `${id} regulatory VOC source`).toBe(true);
      for (const source of regulatoryVoc[id]?.extraSources || []) expect(ids.has(source)).toBe(true);
      for (const source of getCatalystComparison(p,getComparisonSummary(p)).sources || []) expect(ids.has(source), `${id} catalyst source`).toBe(true);
      expect(ids.has(p.tds), `${id} TDS`).toBe(true);
      expect(ids.has(p.sds), `${id} SDS`).toBe(true);
      for (const h of p.hardeners || []) expect(ids.has(coatingHardeners[h].sds), `${id} hardener`).toBe(true);
      if (p.tests) expect(ids.has(p.tests.source), `${id} test source`).toBe(true);
      for (const source of Object.values(p.specSources || {})) expect(ids.has(source)).toBe(true);
      const evidence = getKcmaEvidence(id, group.ours === 'sn-primer' ? 'primer' : 'paint');
      if (evidence.source) expect(ids.has(evidence.source)).toBe(true);
    }
  }
  expect(getComparisonSummary(coatingProducts['sn-primer']).solids).toBe('55% vol / 57% wt');
  expect(getComparisonSummary(coatingProducts['sn-primer']).recoat).toBe('45 min');
  expect(getComparisonSummary(coatingProducts['sn-coating']).catalyst).toBe('SWC010');
  expect(getComparisonSummary(coatingProducts.milesi).solids).toContain('Basis unspecified');
  expect(coatingProducts.renner083.safety.ingredientNote).toContain('No Section 3 concentrations');
  expect(coatingProducts.gallery.specs.pencil).toContain('7-day dry');
  expect(coatingProducts.krystal.tests.values).toContainEqual(['77% Sulfuric Acid','1 · Poor']);
  expect(coatingProducts.magnamax.tests.values).toContainEqual(['Nail Polish Remover','4 · Very Good']);
  expect(coatingProducts.milesi.specs.voc).toContain('45.9 g/L');
  expect(coatingProducts.milesi.safety.signal).toBe('No Signal Word Assigned');
  expect(coatingProducts.centurion.safety.summary).toContain('inconsistency');
  expect(coatingHardeners.hnb40.edition).toContain('Bulgarian / EU');
  expect(getKcmaEvidence('milesi', 'paint').status).toBe('Distributor Finish Compliance Claim');
  expect(kcmaFinishStatus['sn-coating']).toBe('Yes');
  expect(kcmaFinishStatus.gallery).toBe('Yes');
  for (const id of ['renner688','renner785']) expect(coatingProducts[id].twoKOnly).toBe(true);
  expect(coatingProducts.milesi.hardeners).toEqual(['hnb1']);
  expect(getComparisonSummary(coatingProducts.milesi).type).toBe('2K Water-Based');
  expect(professionalMixEstimates.milesiUnthinned).toBeCloseTo(85.62,1);
  expect(estimateMixedRegulatoryVoc([{volumeLitres:1,actualVocGL:100},{volumeLitres:1,actualVocGL:200}])).toBe(150);
  expect(() => estimateMixedRegulatoryVoc([{volumeLitres:1,actualVocGL:100,waterFraction:1}])).toThrow();
  expect(getComparisonSummary(coatingProducts['sn-coating']).recoat).toBe('25 min');
  expect(regulatoryVoc.command.display).toBe('<50');
  expect(regulatoryVoc.milesi.display).toBe('≈90*');
  expect(estimateRegulatoryVoc({densityKgL:1,actualVocGL:50,waterWeightPercent:50})).toBe(100);
  expect(() => estimateRegulatoryVoc({densityKgL:1.5,actualVocGL:50,waterWeightPercent:80})).toThrow();
});

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
  const sheet=page.getByRole('table',{name:'Primer specifications across all brands'});
  await expect(sheet.locator('thead th')).toHaveCount(11);
  await page.getByRole('button',{name:'Renner',exact:true}).click();
  await expect(sheet.locator('thead th')).toHaveCount(3);
  await expect(sheet).not.toContainText('KILZ 2 All-Purpose');
  await expect(page.getByRole('button',{name:'Renner',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Sherwin-Williams',exact:true}).click();
  await expect(sheet.locator('thead th')).toHaveCount(6);
  await page.getByRole('button',{name:'All Brands',exact:true}).click();
  await expect(sheet.locator('thead th')).toHaveCount(11);
  await expect(sheet).toContainText('KILZ 2 All-Purpose'); await expect(sheet).toContainText('Extreme Bond');
  await expect(sheet).not.toContainText('Renner 643');
  await expect(sheet.getByRole('row',{name:/^Catalyst /})).toHaveCount(0);
  await expect(sheet.getByRole('row',{name:/^Isocyanate-Free Catalyst /})).toHaveCount(0);
  await expect(sheet.getByRole('row',{name:/^Recoat /}).locator('[data-product="sn-primer"]')).toHaveText('45 min');
  const primerPrices=sheet.getByRole('row',{name:/^Contractor Cost /});
  await expect(primerPrices).toContainText('USD / U.S. Gal.');
  await expect(primerPrices.locator('[data-product="sn-primer"]')).toHaveText('≈$95.74');
  await expect(primerPrices.locator('[data-product="sw-shellac"]')).toHaveText('≈$61.94');
  await expect(sheet.getByRole('row',{name:/^Solids /})).toContainText('55%');
  for (const label of ['Signal Word','SDS Classification','Handling / Exposure Notes','Selected Disclosed Ingredients','Published Test Results','Indoor Emissions Testing','About This Value']) await expect(sheet).not.toContainText(label);
  await expect(sheet.getByRole('row',{name:/^Coating Type /})).toContainText('1K Water-Based');
  await page.getByText('Source Documents & Product Notes', {exact:true}).click();
  await page.locator('.comparison-document-card').filter({hasText:'Zinsser B-I-N Shellac Primer'}).filter({hasText:'SDS'}).click();
  await expect(page.locator('main h1')).toHaveText('Zinsser B-I-N Shellac Primer');
  await page.getByRole('button',{name:'Next Page',exact:true}).click();
  await page.getByRole('button',{name:'Read Page Text',exact:true}).click();
  await expect(page.locator('.comparison-page-text pre')).toContainText('Ethanol');
  await page.getByRole('button',{name:'Fullscreen',exact:true}).click();
  await expect(page.getByRole('dialog')).toBeVisible(); await page.goBack();
  await expect(page.getByRole('dialog')).not.toBeVisible(); await page.goBack();
  await expect(page.getByRole('heading',{name:'Cabinet Primers — All Brands'})).toBeVisible();
  await page.getByRole('button',{name:'Paint',exact:true}).click();
  const paint=page.getByRole('table',{name:'Paint specifications across all brands'});
  await expect(paint.locator('thead th')).toHaveCount(11);
  for(const name of ['Gallery Series','COMMAND','Renner 688','Centurion 1800','Milesi HKR114','Krystal','MagnaMax']) await expect(paint).toContainText(name);
  await expect(paint).not.toContainText('Renner 785');
  const prices = paint.getByRole('row', {name:/^Contractor Cost/});
  await expect(paint.locator('tbody tr').first()).toHaveClass('comparison-cost-row');
  for (const [id,price] of Object.entries({'sn-coating':'≈$189.44',renner688:'≈$152.34',centurion:'≈$134.71',milesi:'≈$121.71',gallery:'≈$112.13',emerald:'≈$91.34',command:'≈$80.70',advance:'≈$71.19',krystal:'≈$73.05',magnamax:'≈$60.71'})) await expect(prices.locator(`[data-product="${id}"]`)).toHaveText(price);
  await page.getByText('Price Comparison Notes', {exact:true}).click();
  await expect(page.getByText('Estimated discounts are planning assumptions, not dealer quotes.', {exact:false})).toBeVisible();
  const kcma = paint.getByRole('row', {name:/^Meets KCMA /});
  await expect(kcma.locator('[data-product="sn-coating"]')).toHaveText('Yes');
  await expect(kcma.locator('[data-product="gallery"]')).toHaveText('Yes');
  await expect(kcma.locator('[data-product="centurion"]')).toHaveText('Yes');
  await expect(kcma.locator('[data-product="milesi"]')).toHaveText('Yes');
  const voc = paint.getByRole('row', {name:/^Regulatory VOC/});
  await expect(voc.locator('[data-product="command"]')).toHaveText('<50');
  await expect(voc.locator('[data-product="sn-coating"]')).toHaveText('<150');
  await expect(voc.locator('[data-product="milesi"]')).toHaveText('≈90*');
  await expect(paint.getByRole('row',{name:/^Recoat /}).locator('[data-product="sn-coating"]')).toHaveText('25 min');
  const catalyst = paint.getByRole('row',{name:/^Isocyanate-Free Catalyst /});
  await expect(catalyst.locator('[data-product="sn-coating"]')).toHaveText('Yes');
  await expect(catalyst.locator('[data-product="gallery"]')).toHaveText('No added catalyst');
  await expect(catalyst.locator('[data-product="renner688"]')).toHaveText('No');
  await expect(catalyst.locator('[data-product="centurion"]')).toHaveText('No');
  await expect(catalyst.locator('[data-product="milesi"]')).toHaveText('No');
  await expect(catalyst.locator('[data-product="krystal"]')).toHaveText('No isocyanates listed');
  await page.getByRole('button', {name:'Milesi',exact:true}).click();
  await expect(page.getByRole('button', {name:'Milesi',exact:true})).toHaveAttribute('aria-pressed','true');
  await paint.getByRole('row',{name:/^Documents /}).locator('[data-product="milesi"]').getByRole('link',{name:'SDS',exact:true}).click();
  await expect(page.locator('main h1')).toHaveText('Milesi HKR114 White Waterborne Coating');
  await page.getByRole('button',{name:'Read Page Text',exact:true}).click();
  await expect(page.locator('.comparison-page-text pre')).toContainText('Not applicable');
  await page.goBack();
  await page.getByRole('button',{name:'M.L. Campbell',exact:true}).click();
  await expect(paint.locator('thead th')).toHaveCount(5);
  await expect(page.getByRole('table',{name:'In-house cabinet coating benchmarks across all brands'})).toBeVisible();
  await page.goBack(); await expect(page.getByRole('button',{name:'Milesi',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.goBack(); await expect(page.getByRole('button',{name:'All Brands',exact:true})).toHaveAttribute('aria-pressed','true');
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

test('expanded results and component SDS open from the comparison sheet', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'reduce' });
  await page.goto('./#/comparison?area=interior&coat=paint');
  await page.getByText('Additional Published Test Results',{exact:true}).click();
  const results=page.getByRole('table',{name:'Additional published coating tests'}).getByRole('row',{name:/M.L. Campbell Krystal/});
  await results.getByText('34 Reported Results',{exact:true}).click();
  await expect(results).toContainText('77% Sulfuric Acid');
  await expect(results).toContainText('1 · Poor');
  await results.getByRole('link',{name:'Read Test Source',exact:true}).click();
  await expect(page.locator('main h1')).toHaveText('Krystal Laboratory Test Results');
  await page.getByRole('button',{name:'Next Page',exact:true}).click();
  await page.getByRole('button',{name:'Read Page Text',exact:true}).click();
  await expect(page.locator('.comparison-page-text pre')).toContainText('77% Sulfuric Acid');
  await page.goBack();
  await page.getByRole('button',{name:'Renner',exact:true}).click();
  const sds=page.getByRole('row',{name:/^Documents /}).locator('td[data-product="renner688"]');
  await sds.getByRole('link',{name:'SDS',exact:true}).click();
  await expect(page.locator('main h1')).toHaveText('Renner U688 Kitchen Topcoat');
  await page.getByRole('button',{name:'Read Page Text',exact:true}).click();
  await expect(page.locator('.comparison-page-text pre')).toContainText('2/25/2025');
  await page.goBack();
  await page.getByRole('button',{name:'Renner',exact:true}).click();
  await page.getByText('Source Documents & Product Notes',{exact:true}).click();
  await page.locator('.comparison-document-card').filter({hasText:'Renner YC-M404 Hardener'}).click();
  await expect(page.locator('main h1')).toHaveText('Renner YC-M404 Hardener');
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


test('brand filters combine selections and benchmarks fit tablets with accessible score colors', async ({page}) => {
  await page.goto('./#/comparison?area=interior&coat=paint');
  const paint=page.getByRole('table',{name:'Paint specifications across all brands'});
  expect(await paint.locator('thead th[data-product]').evaluateAll(cells => cells.map(cell=>cell.dataset.product))).toEqual(['sn-coating','advance','emerald','command','gallery','milesi','centurion','renner688','magnamax','krystal']);
  const prices=paint.getByRole('row',{name:/^Contractor Cost/});
  await expect(prices).not.toContainText('Catalyst Included');
  for(const cell of await prices.locator('td').all()) await expect(cell).toHaveText(/^≈\$/);
  await page.getByRole('button',{name:'Benjamin Moore',exact:true}).click();
  await page.getByRole('button',{name:'Sherwin-Williams',exact:true}).click();
  await expect(paint.locator('thead th')).toHaveCount(6);
  await expect(paint).not.toContainText('Renner 688');
  await expect(paint).not.toContainText('Milesi HKR114');
  await expect(paint).toContainText('ADVANCE');
  await expect(paint).toContainText('Gallery Series');
  await page.reload();
  await expect(paint.locator('thead th')).toHaveCount(6);
  await page.getByRole('button',{name:'All Brands',exact:true}).click();
  await expect(paint.locator('thead th')).toHaveCount(11);
  const benchmark=page.getByRole('table',{name:'In-house cabinet coating benchmarks across all brands'});
  const dry=paint.getByRole('row',{name:/^Dry to Touch /});
  await expect(dry.locator('[data-product="command"]')).toHaveText('15 min');
  await expect(dry.locator('[data-product="renner688"]')).toHaveText('—');
  await expect(dry.locator('[data-product="centurion"]')).toHaveText('—');
  await expect(dry).not.toContainText('Dust-free');
  const recoat=paint.getByRole('row',{name:/^Recoat /});
  await expect(recoat.locator('[data-product="centurion"]')).toHaveText('≈45–60 min + sand');
  await expect(recoat.locator('[data-product="krystal"]')).toHaveText('≈30–45 min + sand');
  await expect(recoat.locator('[data-product="magnamax"]')).toHaveText('≈30–45 min + sand');
  const coffee=benchmark.getByRole('row',{name:/^Coffee /});
  await expect(coffee.locator('[data-product="sn-coating"]')).toHaveClass(/score-strong/);
  await expect(benchmark.getByRole('row',{name:/^MEK Rub Test /}).locator('[data-product="bm-advance"]')).toHaveClass(/score-weak/);
  await expect(benchmark.getByRole('row',{name:/^Film Hardness /}).locator('[data-product="sw-emerald"]')).toHaveClass(/score-unknown/);
  for(const width of [768,834,1024,1180]) {
    await page.setViewportSize({width,height:1024});
    const overflow=await page.getByRole('region',{name:'All-brand benchmark sheet'}).evaluate(el=>el.scrollWidth>el.clientWidth+1);
    expect(overflow,`benchmark horizontal overflow at ${width}`).toBe(false);
  }
  await benchmark.screenshot({path:`test-results/benchmark-compact-${test.info().project.name}.png`});
});
