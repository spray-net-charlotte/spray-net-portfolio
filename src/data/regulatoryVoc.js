// Comparison estimates, not compliance determinations. Original source values remain unchanged.
// Regulatory VOC = actual VOC g/L / (1 - water volume fraction - exempt volume fraction).
export function estimateRegulatoryVoc({ densityKgL, vocWeightPercent, solidsWeightPercent, waterWeightPercent, actualVocGL, exemptVolumeFraction = 0 }) {
  const water = waterWeightPercent ?? (100 - solidsWeightPercent - vocWeightPercent);
  const actual = actualVocGL ?? densityKgL * 1000 * vocWeightPercent / 100;
  const denominator = 1 - densityKgL * water / 100 - exemptVolumeFraction;
  if (![water, actual, denominator].every(Number.isFinite) || water < 0 || actual < 0 || denominator <= 0 || denominator > 1) throw new Error('Insufficient or invalid VOC estimate inputs');
  return actual / denominator;
}

const rennerAssumption = 'Rough base-component mass balance: assumes reported percentages are by weight, the balance after reported solids and VOC is water, water density 1 kg/L, and no exempt solvents. SDS solids are measured at 250°C; this is an approximate comparison, not Method 24 testing.';
const estimated = (inputs, source, note, round = 10) => ({
  display:`≈${Math.round(estimateRegulatoryVoc(inputs) / round) * round}*`,
  source,
  note,
  inputs,
});
const reported = (display, source, note = 'Published regulatory / less-water-and-exempt value for the captured reference.') => ({display, source, note});
const assumed = (display, source, note) => ({display:`${display}*`,source,note:`Basis assumption only; no numeric conversion. ${note} The source does not identify the reporting basis, so this is a provisional comparison proxy, not a verified regulatory value.`});

export const regulatoryVoc = {
  'sn-primer':reported('<100','sn-primer-tds'),
  extreme:reported('<50','extreme-tds'),
  'sw-shellac':reported('515','sw-shellac-tds'),
  'sw-problock':reported('347','sw-problock-tds'),
  renner643:estimated({densityKgL:1.25,vocWeightPercent:4.30,solidsWeightPercent:53.80},'renner643-us-sds',`${rennerAssumption} Inputs: density 1.25 kg/L, VOC 4.30 wt%, solids 53.80 wt%. Calculated 112.9 g/L; source separately prints 113 g/L without a basis.`,10),
  renner083:estimated({densityKgL:1.30,vocWeightPercent:0.56,solidsWeightPercent:58.22},'renner083-us-sds',`${rennerAssumption} Inputs: density 1.30 kg/L, VOC 0.56 wt%, solids 58.22 wt%. Calculated 15.7 g/L; source separately prints 16 g/L without a basis.`,1),
  stix:reported('<100','stix-sds','SDS §9 explicitly labels <100 g/L as the VOC Regulatory Limit. It is a reported upper limit, not an exact batch result.'),
  bin:assumed('≤550','bin-tds','Uses the U.S. TDS maximum of 550 g/L as an assumed regulatory upper limit. Water / exempt fractions are unavailable.'),
  cover:assumed('≈350','cover-tds','Uses the U.S. TDS 350 g/L as an assumed regulatory figure. Water / exempt fractions are unavailable.'),
  bullseye:assumed('<100','bullseye-tds','Uses the U.S. TDS <100 g/L as an assumed regulatory upper limit. Water / exempt fractions are unavailable.'),
  kilz2:reported('32','kilz2-sds','March 2024 No. 2000 SDS §9 distinguishes 32 g/L Coating from 10 g/L Material. The Coating value is used here; the TDS separately states <50 g/L.'),
  'sn-coating':reported('<150','sn-coating-tds','TDS reports <150 g/L minus water / exempt compounds. The separate <65 g/L applied value is not substituted for regulatory VOC.'),
  gallery:reported('176','gallery-tds'),
  command:reported('<50','command-emissions','The manufacturer declaration explicitly states Regulatory VOC Content <50 g/L, SCAQMD Rule 1113, EPA Method 24. Its SDS §9 also labels <50 g/L as the VOC Regulatory Limit. No multiplier is applied.'),
  renner688:estimated({densityKgL:1.15,vocWeightPercent:5.60,solidsWeightPercent:38.70},'renner688-us-sds',`${rennerAssumption} Inputs: density 1.15 kg/L, VOC 5.60 wt%, solids 38.70 wt%. Calculated 179.2 g/L; source separately prints 180 g/L without a basis.`,10),
  renner785:estimated({densityKgL:1.18,vocWeightPercent:4.72,solidsWeightPercent:39.01},'renner785-us-sds',`${rennerAssumption} Inputs: density 1.18 kg/L, VOC 4.72 wt%, solids 39.01 wt%. Calculated 165.8 g/L; source separately prints 167 g/L without a basis.`,10),
  centurion:reported('≈110','centurion-tds','TDS reports 109.98 g/L minus exempt versus 48.55 g/L as supplied. Regulatory value rounded for display; no extra conversion.'),
  milesi:estimated({densityKgL:1.226,waterWeightPercent:48.7,actualVocGL:47.4},'milesi116-sds','2021 HKR116 base SDS: density 1.226 kg/L, water 48.7 wt%, actual VOC 47.4 g/L. Assumes no exempt solvents and water density 1 kg/L. Estimated regulatory VOC 117.6 g/L, rounded to 120. Density ±0.03 kg/L gives approximately 114–122 g/L before other uncertainty. HNB40 is not included.',10),
  krystal:assumed('≈570','krystal-tds','Uses the PDS catalyzed-at-10% range of 564–573 g/L, rounded to 570, as an assumed regulatory figure. Exempt-solvent fractions are not established.'),
  magnamax:reported('625 ± 4','magnamax-tds','Packaged VOC less exempt solvents; historical clear-finish PDS.'),
  emerald:reported('<50','emerald-tds'),
  advance:reported('<50','advance-sds','SDS §9 explicitly labels <50 g/L as the VOC Regulatory Limit. The TDS value 48.5 g/L has no stated basis and is not separately converted.'),
};

export const vocMethodReference = 'https://www.aqmd.gov/home/rules-compliance/compliance/vocs/calculations';
