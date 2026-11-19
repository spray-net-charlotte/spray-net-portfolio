import { comparisonDocuments } from './comparisonDocuments';
import { expandedPrimers } from './expandedPrimers.js';

export { comparisonDocuments };
export const comparisonChecked = 'November 19, 2026';

// Values are transcribed from the named edition, not inferred from marketing copy.
// A missing result means not reported in this source, never zero or a failed test.
export const specificationRows = [
  ['resin', 'Resin / Vehicle'],
  ['volume', 'Solids by Volume', 'Volume and weight percentages measure different things. More solids alone does not establish better performance.'],
  ['weight', 'Solids by Weight'],
  ['voc', 'VOC Content', 'Keep the reporting basis with the number. These sheets use different bases; VOC content alone does not measure indoor emissions or overall safety.'],
  ['wet', 'Wet Film per Coat'],
  ['dry', 'Dry Film per Coat', '1 mil = 0.001 inch. Compare coverage only alongside the specified film thickness.'],
  ['coverage', 'Coverage per U.S. Gallon'],
  ['touch', 'Dry to Touch', 'Drying depends on temperature, humidity and film thickness. Touch-dry is different from fully cured.'],
  ['recoat', 'Recoat Time'],
  ['cure', 'Cure / Full Properties'],
  ['persoz', 'Persoz Hardness', 'ASTM D4366 · seconds; different from pencil-hardness grades.'],
  ['adhesion', 'Cross-Hatch Adhesion', 'ASTM D3359 · the stated test classification, not a service-life prediction.'],
  ['mek', 'MEK Rub Test', 'ASTM D4752 · reported count. A missing TDS result is not a failed test.'],
];
const missing = 'Not reported in this TDS';
export const coatingProducts = {
  'sn-primer': {
    id: 'sn-primer', name: 'Spray-Net Interior Primer', detail: 'Stain Blocking High-Build Primer',
    tds: 'sn-primer-tds', sds: 'sn-primer-sds',
    note: '2023 TDS. The G-002K SDS is dated 2022; the TDS does not print that product code.',
    specs: {
      resin: 'Epoxy; water-based primer', volume: '55%', weight: '57%',
      voc: '<100 g/L · minus water and exempt compounds', wet: '4–6 mil', dry: '2.5–3.5 mil',
      coverage: '240–300 sq ft · theoretical, at 3 mil dry', touch: 'Up to 1 hour · 25°C / 77°F, 50% RH',
      recoat: missing, cure: missing,
    },
    safety: {
      signal: 'Warning', edition: 'January 11, 2022 · SWP 1420 / G-002K · SDS 1393',
      classes: ['Skin Irritation · Category 2', 'Eye Irritation · Category 2B', 'Carcinogenicity · Category 2'],
      summary: 'The sheet identifies ingestion / inhalation harm, skin and eye irritation, and a suspected cancer hazard.',
      ingredients: [['Titanium Dioxide', '13463-67-7', '10–15%'], ['Dipropylene Glycol Monomethyl Ether', '34590-94-8', '1–2%']],
      pages: 'Sections 2–3 · pages 1–2',
    },
  },
  'sn-coating': {
    id: 'sn-coating', name: 'Spray-Net Cabinet Coating', detail: 'Waterborne Polyurethane · SUW IR Series',
    tds: 'sn-coating-tds', sds: 'sn-coating-sds',
    note: '2023 TDS; 2022 coating SDS. The TDS names SWC010 catalyst. The separate 2026 A-003 SDS does not establish an updated mixing specification.',
    specs: {
      resin: 'Aliphatic Polyurethane Dispersion', volume: missing, weight: '38–45%',
      voc: '<150 g/L · minus water and exempt compounds; <65 g/L · applied',
      wet: '3–4 mil', dry: '1.3–1.6 mil', coverage: '440 sq ft · at 1.3 mil dry',
      touch: '30 minutes · 21–25°C / 70–77°F, 50% RH', recoat: 'Tack coat, then two wet-on-wet coats (application schedule)',
      cure: '7 days to full properties; thoroughly dry after 8 hours under stated air-dry conditions',
      persoz: '80 seconds · ASTM D4366', adhesion: '5B · ASTM D3359', mek: '>100 · ASTM D4752',
    },
    safety: {
      signal: 'Warning', edition: 'January 12, 2022 · Water-Based Polyurethane · SDS 1203',
      classes: ['Acute Oral Toxicity · Category 5', 'Skin Irritation · Category 3', 'Eye Irritation · Category 2B', 'Skin Sensitization · Category 1B', 'Carcinogenicity · Category 2'],
      summary: 'The sheet identifies ingestion / inhalation harm, irritation, possible skin allergy and a suspected cancer hazard.',
      ingredients: [['Titanium Dioxide', '13463-67-7', '0–10%'], ['Dipropylene Glycol Monomethyl Ether', '34590-94-8', '1–5%'], ['2-Propanol, 1-(2-Butoxy-1-Methylethoxy)-', '29911-28-2', '1–5%'], ['Ethylene Glycol', '107-21-1', '1–2%'], ['Decanedioic Acid, Bis(Pentamethyl-Piperidinyl) Ester', '41556-26-7', '0.1–0.5%'], ['Decanedioic Acid, Methyl Pentamethyl-Piperidinyl Ester', '82919-37-7', '0.1–0.5%']],
      pages: 'Sections 2–3 · pages 1–2',
    },
  },
  stix: {
    id: 'stix', name: 'INSL-X Stix', detail: 'Waterborne Bonding Primer · White SXA-110 / SXA-1100',
    tds: 'stix-tds', sds: 'stix-sds', note: 'TDS footer: October 27, 2026. Bonding primer; different stain-blocking purpose from shellac or our high-build primer.',
    specs: {
      resin: 'Urethane Modified Acrylic', volume: '40 ± 2%', weight: missing,
      voc: '<100 g/L · TDS does not specify the subtraction basis', wet: '4.0–5.3 mil', dry: '1.6–2.1 mil',
      coverage: '300–400 sq ft · at stated film thickness', touch: '30 minutes · 25°C / 77°F, 50% RH',
      recoat: '3–4 hours', cure: 'Approximately 3–4 days for maximum scrape-off resistance',
    },
    safety: {
      signal: 'Danger', edition: 'December 30, 2024 · White SXA-1100',
      classes: ['Carcinogenicity · Category 1A', 'Reproductive Toxicity · Category 2'],
      summary: 'The sheet identifies a cancer hazard and a suspected reproductive hazard. Exposure route and application controls matter.',
      ingredients: [['Talc', '14807-96-6', '15–20%'], ['Titanium Dioxide', '13463-67-7', '10–15%'], ['Dipropylene Glycol Monomethyl Ether', '34590-94-8', '1–5%'], ['2,2,4-Trimethyl-1,3-Pentanediol Diisobutyrate', '6846-50-0', '1–5%'], ['Ammonium Hydroxide', '1336-21-6', '0.1–0.5%'], ['Crystalline Silica', '14808-60-7', '0.1–0.5%']],
      pages: 'Sections 2–3 · pages 1–2',
    },
  },
  bin: {
    id: 'bin', name: 'Zinsser B-I-N', detail: 'Original Shellac-Base Primer · Liquid, White',
    tds: 'bin-tds', sds: 'bin-sds', note: 'BIN-03 TDS: September 12, 2019. SDS: 2026, quart SKU 904. This is the liquid shellac primer, not the aerosol or water-based variant.',
    specs: {
      resin: 'Shellac', volume: '29%', weight: '51%', voc: 'Maximum 550 g/L · TDS does not specify the subtraction basis',
      wet: '2.5–3 mil', dry: '0.75–0.9 mil', coverage: 'Approximately 500 sq ft · practical, assumes 15% loss',
      touch: '20 minutes · 21°C / 70°F, 50% RH', recoat: '45 minutes', cure: '1–3 days',
    },
    safety: {
      signal: 'Danger', edition: 'September 15, 2026 · Original Shellac Primer · SKU 904',
      classes: ['Flammable Liquid · Category 2'],
      summary: 'The liquid and its vapor are highly flammable. The SDS also reports unknown acute toxicity for 35% of the mixture.',
      ingredients: [['Ethanol', '64-17-5', '30–60%'], ['Titanium Dioxide', '13463-67-7', '10–30%'], ['Shellac', '9000-59-3', '7–13%'], ['Kaolin Clay', '1332-58-7', '7–13%'], ['Hydrous Magnesium Silicate', '14807-96-6', '5–10%'], ['Rosin Adduct Ester', 'Proprietary', '1–5%'], ['Propan-2-ol', '67-63-0', '1–5%'], ['Amorphous Silica', '7631-86-9', '0.1–1%']],
      pages: 'Sections 2–3 · pages 1–2',
    },
  },
  advance: {
    id: 'advance', name: 'Benjamin Moore ADVANCE', detail: 'Waterborne Interior Alkyd · Satin 792 · Base 1',
    tds: 'advance-tds', sds: 'advance-sds', note: 'TDS footer: July 1, 2022; SDS: January 4, 2024. Figures are for Base 1, not every color base.',
    specs: {
      resin: 'Waterborne Alkyd', volume: '38.4 ± 2%', weight: missing,
      voc: '48.5 g/L · TDS does not specify the subtraction basis', wet: '3.2–4.0 mil', dry: '1.2–1.5 mil',
      coverage: '400–500 sq ft · at stated film thickness', touch: '4–6 hours · 25°C / 77°F, 50% RH', recoat: '16 hours',
      cure: 'Up to 30 days to optimum hardness / final sheen; avoid heavy abrasion for at least 5–7 days',
    },
    safety: {
      signal: 'Warning', edition: 'January 4, 2024 · Satin Base 1 · 792-1X',
      classes: ['Eye Irritation · Category 2A', 'Skin Sensitization · Category 1', 'Reproductive Toxicity · Category 2'],
      summary: 'The sheet identifies serious eye irritation, possible skin allergy and a suspected reproductive hazard.',
      ingredients: [['Titanium Dioxide', '13463-67-7', '20–25%'], ['2,4,7,9-Tetramethyl-5-Decyne-4,7-Diol', '126-86-3', '0.1–0.5%'], ['Trimethylolpropane', '77-99-6', '0.1–0.5%']],
      pages: 'Sections 2–3 · pages 1–3',
    },
  },
  emerald: {
    id: 'emerald', name: 'Sherwin-Williams Emerald', detail: 'Urethane Trim Enamel · Satin K37 Series',
    tds: 'emerald-tds', sds: 'emerald-sds', note: 'March 2026 PDS numerical figures are for Ultrawhite K37W01750. The October 2026 SDS is High Hide White K37W2751; bases differ.',
    specs: {
      resin: 'Urethane Modified Alkyd', volume: '30 ± 2% · Ultrawhite', weight: '47 ± 2% · Ultrawhite',
      voc: '<50 g/L · less exempt solvents, 40 CFR 59.406 · Ultrawhite', wet: '4 mil', dry: '1.2 mil',
      coverage: '350–400 sq ft · at 1.2 mil dry', touch: '1 hour · PDS prints 77°F (20°C), 50% RH; temperature pair is inconsistent',
      recoat: '4 hours', cure: missing,
    },
    safety: {
      signal: 'Warning', edition: 'October 23, 2026 · Satin High Hide White K37W2751 (different base from PDS numerical data)',
      classes: ['Carcinogenicity · Category 2', 'Reproductive Toxicity · Category 2'],
      summary: 'The sheet identifies suspected cancer and reproductive hazards.',
      ingredients: [['Titanium Dioxide', '13463-67-7', '≥10–≤30%'], ['Amorphous Silica', '7631-86-9', '≥0.5–≤1.5%'], ['Attapulgite Clay', '12174-11-7', '≥0.1–≤1%'], ['2-Ethyl-2-(Hydroxymethyl)-1,3-Propanediol', '77-99-6', '≥0.1–≤1%']],
      pages: 'Sections 2–3 · pages 1–2',
    },
  },
};

export const comparisonGroups = {
  primer: { label: 'Primer', ours: 'sn-primer', peers: ['kilz2', 'bullseye', 'cover', 'bin', 'stix', 'extreme'] },
  paint: { label: 'Interior Paint', ours: 'sn-coating', peers: ['advance', 'emerald'] },
};

Object.assign(coatingProducts, expandedPrimers);

// Historical in-house report. Do not merge these test identities with today's SKUs.
export const benchmarkProducts = [
  { id: 'bm-advance', name: 'Benjamin Moore ADVANCE', hardness: '7B', mek: '16', chemical: [5,5,4,5], wash: ['No blisters', 'Softer than original paint', 'Slight color change'] },
  { id: 'inslx-cabinet', name: 'INSL-X Cabinet Coat', hardness: '3B', mek: '10', chemical: [4,5,5,5], wash: ['No blisters', 'Soft; scratched easily by nail', 'No color change'] },
  { id: 'sw-alkyd', name: 'Sherwin-Williams Alkyd Urethane', hardness: '8B', mek: '21', chemical: [5,3,5,5], wash: ['Paint completely gone / dissolved', 'Paint completely gone / dissolved', 'Paint completely gone / dissolved'] },
  { id: 'sw-emerald', name: 'Sherwin-Williams Emerald', hardness: '5B', mek: '70', chemical: [4,5,5,5], wash: ['Many blisters', 'Not separately reported', 'Color changed'] },
  { id: 'sw-precat', name: 'Sherwin-Williams Pre-Catalyzed Urethane', hardness: '2B', mek: '30', chemical: [4,5,5,5], wash: ['No blisters', 'Soft; scratched easily by nail', 'Color changed'] },
  { id: 'behr-cabinet', name: 'BEHR Premium Cabinet & Trim', hardness: '5B', mek: '20', chemical: [3,3,5,5], wash: ['No blisters', 'Soft; scratched easily by nail', 'No color change'] },
];
export const benchmarkRows = [
  ['Pencil Hardness', 'ASTM D3363 · ordinal scale, softer B grades to harder H grades', 'HB', 'hardness'],
  ['MEK Rub Test', 'ASTM D4752 · reported rub count; higher count indicates greater resistance in this test', '>100', 'mek'],
  ...['Ketchup','Olive Oil','Coffee','Wine'].map((name,i)=>[name, 'KCMA 9.4 · 24-hour exposure · report rating, 5 highest', '5', 'chemical', i]),
  ...['Blistering','Film Hardness','Color Change'].map((name,i)=>[name, 'KCMA 9.5 · detergent / water · 24-hour exposure', ['No blisters','Paint film hard','No color changes'][i], 'wash', i]),
];

export const catalystSafety = {
  name: 'A-003 Waterborne Catalyst', edition: 'April 2, 2026 · SDS 1112', signal: 'No Signal Word',
  classes: ['Not Classified in This SDS'],
  summary: 'Water 80%; proprietary multifunctional polycarbodiimide 20%. The sheet calls for gloves and eye protection and notes possible irritation after prolonged or repeated contact. This classification applies to the catalyst alone.',
};
