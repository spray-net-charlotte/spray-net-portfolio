// Short display labels. Full figures, conditions and editions remain in the source data / documents.
export const summaryRows = [
  ['type', 'Coating Type'],
  ['catalyst', 'Catalyst'],
  ['solids', 'Solids'],
  ['voc', 'Regulatory VOC (g/L)'],
  ['film', 'Film Thickness (mil)'],
  ['touch', 'Drying Time'],
  ['recoat', 'Recoat'],
];

// VOC display values and estimates live in regulatoryVoc.js; solids retain their reported bases.
export const comparisonSummary = {
  'sn-primer': { type:'1K Water-Based', catalyst:'None', film:'Wet 4–6 / Dry 2.5–3.5', touch:'Touch: ≤1 hr', recoat:'—' },
  extreme: { type:'1K Water-Based', catalyst:'None', film:'Wet 3.1 / Dry 1', touch:'Touch: 30 min', recoat:'1 hr primer / 4 hr stain seal / 24 hr high-performance finish' },
  'sw-shellac': { type:'1K Shellac / Solvent-Based', catalyst:'None', film:'Wet 4 / Dry 1.4', touch:'Touch: 15 min', recoat:'45 min' },
  'sw-problock': { type:'1K Oil-Based', catalyst:'None', film:'Wet 4 / Dry 2.2', touch:'Touch: 30 min', recoat:'60–90 min' },
  renner643: { type:'1K / Optional 2K Water-Based', catalyst:'YC-M401 / M402 / M404', film:'Wet ≤7.9 / Dry —', touch:'Dust-free: 30 min', recoat:'2 hr intercoat / 4 hr overcoat' },
  renner083: { type:'1K Water-Based', catalyst:'None', film:'Wet ≤5.5 / Dry —', touch:'Dust-free: 60 min', recoat:'8–24 hr' },
  stix: { type:'1K Water-Based', catalyst:'None', film:'Wet 4–5.3 / Dry 1.6–2.1', touch:'Touch: 30 min', recoat:'3–4 hr' },
  bin: { type:'1K Shellac / Solvent-Based', catalyst:'None', film:'Wet 2.5–3 / Dry 0.75–0.9', touch:'Touch: 20 min', recoat:'45 min' },
  cover: { type:'1K Oil-Based', catalyst:'None', film:'Wet 3.5–4 / Dry 2–2.5', touch:'Touch: 35 min', recoat:'2 hr' },
  bullseye: { type:'1K Water-Based', catalyst:'None', film:'Wet 3–6 / Dry 1–2', touch:'Touch: 35 min', recoat:'1 hr / 2 hr stain seal / 24 hr cedar' },
  kilz2: { type:'1K Water-Based', catalyst:'None', film:'Wet 4–5.3 / Dry 1.3–1.7', touch:'Touch: 30 min', recoat:'1 hr' },
  'sn-coating': { type:'2K Water-Based', catalyst:'SWC010', film:'Wet 3–4 / Dry 1.3–1.6', touch:'Touch: 30 min', recoat:'25 min' },
  gallery: { type:'1K Water-Based', catalyst:'None', film:'Wet 3–4 / Dry 0.9–1.2', touch:'Touch: 30 min', recoat:'45 min' },
  command: { type:'1K Water-Based', catalyst:'None', film:'Wet 3.6–4.6 / Dry 1.5–1.9', touch:'Touch: 15 min', recoat:'1 hr' },
  renner688: { type:'2K Water-Based', catalyst:'YC-M403 / M404', film:'Wet ≤5.9 / Dry —', touch:'Dust-free: 45 min', recoat:'—' },
  renner785: { type:'2K Water-Based', catalyst:'YC-M403', film:'Wet ≤5.9 / Dry —', touch:'Dust-free: 30 min', recoat:'—' },
  centurion: { type:'2K Water-Based', catalyst:'CW-4002', film:'—', touch:'Dust-free: 10–15 min', recoat:'—' },
  milesi: { type:'2K Water-Based', catalyst:'HNB40', film:'Wet 4–5 airmix / 3.6–4.3 hand spray; Dry —', touch:'Touch: 2 hr', recoat:'—' },
  krystal: { type:'2K Solvent-Based Varnish', catalyst:'C1491 Care Catalyst', film:'Wet 4–5 / Dry 4–5 max, total system', touch:'Touch: 15–25 min', recoat:'After drying + sanding' },
  magnamax: { type:'1K Pre-Catalyzed Solvent-Based Lacquer', catalyst:'Factory Pre-Catalyzed', film:'Wet 3–6 / Dry 2.5–5 total system', touch:'Touch: 15–25 min', recoat:'After drying + sanding' },
  emerald: { type:'1K Water-Based', catalyst:'None', film:'Wet 4 / Dry 1.2', touch:'Touch: 1 hr', recoat:'4 hr' },
  advance: { type:'1K Water-Based', catalyst:'None', film:'Wet 3.2–4 / Dry 1.2–1.5', touch:'Touch: 4–6 hr', recoat:'16 hr' },
};

const reported = value => value && /^\d/.test(value);
const percent = value => value.split(' · ')[0];
export function summarySolids(product) {
  const specs = product.specs;
  const parts = [];
  if (reported(specs.volume)) parts.push(`${percent(specs.volume)} vol`);
  if (reported(specs.weight)) parts.push(`${percent(specs.weight)} wt`);
  if (!parts.length && specs.unqualifiedSolids) {
    // Keep a single reference variant / base, without assigning an unreported weight or volume basis.
    const value = specs.unqualifiedSolids.match(/\d+(?:\.\d+)?(?:\s*±\s*\d+(?:\.\d+)?)?%/);
    if (value) parts.push(`${value[0]} · Basis unspecified`);
  }
  return parts.join(' / ') || '—';
}

export function getComparisonSummary(product) {
  return { ...comparisonSummary[product.id], solids:summarySolids(product) };
}
