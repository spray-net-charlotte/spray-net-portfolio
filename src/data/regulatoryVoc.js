// Comparison estimates, not compliance determinations. Original source values remain unchanged.
// Regulatory VOC = actual VOC g/L / (1 - water volume fraction - exempt volume fraction).
export function estimateRegulatoryVoc({ densityKgL, vocWeightPercent, solidsWeightPercent, waterWeightPercent, actualVocGL, exemptVolumeFraction = 0 }) {
  const water = waterWeightPercent ?? (100 - solidsWeightPercent - vocWeightPercent);
  const actual = actualVocGL ?? densityKgL * 1000 * vocWeightPercent / 100;
  const denominator = 1 - densityKgL * water / 100 - exemptVolumeFraction;
  if (![water, actual, denominator].every(Number.isFinite) || water < 0 || actual < 0 || denominator <= 0 || denominator > 1) throw new Error('Insufficient or invalid VOC estimate inputs');
  return actual / denominator;
}

export function estimateMixedRegulatoryVoc(components) {
  let mass = 0, denominator = 0;
  for (const {volumeLitres,actualVocGL,waterFraction = 0,exemptFraction = 0} of components) {
    if (![volumeLitres,actualVocGL,waterFraction,exemptFraction].every(Number.isFinite) || volumeLitres <= 0 || actualVocGL < 0 || waterFraction < 0 || exemptFraction < 0 || waterFraction + exemptFraction > 1) throw new Error('Invalid mixture estimate inputs');
    mass += volumeLitres * actualVocGL;
    denominator += volumeLitres * (1 - waterFraction - exemptFraction);
  }
  if (denominator <= 0) throw new Error('Mixture has no non-exempt volume');
  return mass / denominator;
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

const milesiMix = [{volumeLitres:1,actualVocGL:45.9,waterFraction:1.198*0.476},{volumeLitres:0.109,actualVocGL:2.1}];
export const professionalMixEstimates = {
  milesiUnthinned:estimateMixedRegulatoryVoc(milesiMix),
  milesiReduced:estimateMixedRegulatoryVoc([...milesiMix,{volumeLitres:0.05,actualVocGL:0,waterFraction:1}]),
  renner688Low:estimateMixedRegulatoryVoc([{volumeLitres:1,actualVocGL:64.4,waterFraction:0.64055},{volumeLitres:0.15,actualVocGL:285.56}]),
  renner688High:estimateMixedRegulatoryVoc([{volumeLitres:1,actualVocGL:64.4,waterFraction:0.64055},{volumeLitres:0.15*1.15/1.06,actualVocGL:335}]),
  renner785:estimateMixedRegulatoryVoc([{volumeLitres:1,actualVocGL:55.696,waterFraction:0.663986},{volumeLitres:0.10*1.18/1.08,actualVocGL:15}]),
};
const roundTen = value => Math.round(value / 10) * 10;

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
  renner688:{display:`≈${roundTen(professionalMixEstimates.renner688Low)}–${roundTen(professionalMixEstimates.renner688High)}*`,source:'renner688-us-sds',extraSources:['renner-u688-tds','renner-m404-sds'],note:'Selected required 2K system: U688 + YC-M404 at 15%, the TDS maximum-resistance schedule. Rough mixed regulatory estimate, not the old base-only 180 g/L. Base model: 1 L, density 1.15 kg/L, VOC 5.60 wt% (64.4 g), estimated water volume 0.64055 L from SDS solids / VOC balance. M404 density 1.06, VOC 26.94 wt% (285.56 g/L) versus separately printed 335 g/L with unstated basis. Assuming hardener contains no water / exempt solvent, 15% volume gives ≈210 g/L and 15% weight using printed 335 g/L gives ≈228 g/L. Range brackets those basis assumptions; no extra water added. Not a matched-batch Method 24 result.'},
  renner785:{display:`≈${roundTen(professionalMixEstimates.renner785)}*`,source:'renner785-us-sds',extraSources:['renner785-tds','renner-m403-sds'],note:'Selected required 2K system: M785 + YC-M403 at 10%. Rough mixed estimate, not the old base-only 167 g/L. Base: 1 L, density 1.18 kg/L, VOC 4.72 wt% (55.696 g), estimated water volume 0.663986 L from SDS solids / VOC balance. M403 density 1.08, VOC 1 wt% (10.8 g/L) versus separately printed 15 g/L. Assuming no water / exempt solvent in the hardener and 10% by weight or volume gives approximately 128–131 g/L, rounded to 130. Recipe percentage basis and water estimates remain assumptions; no extra water added.'},
  centurion:reported('≈110','centurion-tds','TDS reports 109.98 g/L minus exempt versus 48.55 g/L as supplied. Regulatory value rounded for display; no extra conversion.'),
  milesi:{display:`≈${roundTen(professionalMixEstimates.milesiUnthinned)}*`,source:'milesi114-sds',extraSources:['milesi-tds','milesi-hnb1-sds'],note:'Selected waterborne HKR114 + HNB1 2K recipe. Base SDS: 45.9 g/L actual VOC, density 1.198 kg/L, water 47.6 wt%. HNB1 SDS: 2.1 g/L VOC. TDS hardener volume: 10.9%. Approximate regulatory mixture VOC = (45.9 + 0.109 × 2.1) / (1 − 1.198 × 0.476 + 0.109) = 85.6 g/L, rounded to 90. Assumes the hardener contains no water, no exempt solvent subtraction, additive volumes and reference-edition equivalence. These archived 2015 SDS / 2016 TDS references are not a matched current-batch measurement. Adding only water does not change regulatory VOC under these assumptions.'},
  krystal:assumed('≈570','krystal-tds','Uses the PDS catalyzed-at-10% range of 564–573 g/L, rounded to 570, as an assumed regulatory figure. Exempt-solvent fractions are not established.'),
  magnamax:reported('625 ± 4','magnamax-tds','Packaged VOC less exempt solvents; historical clear-finish PDS.'),
  emerald:reported('<50','emerald-tds'),
  advance:reported('<50','advance-sds','SDS §9 explicitly labels <50 g/L as the VOC Regulatory Limit. The TDS value 48.5 g/L has no stated basis and is not separately converted.'),
};

export const vocMethodReference = 'https://www.aqmd.gov/home/rules-compliance/compliance/vocs/calculations';
