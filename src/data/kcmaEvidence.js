// Claims apply only to the product and reference named here. Unknown is not a failure.
// Coating finish compliance, separate from a cabinet-line certification seal.
export const kcmaFinishStatus = {
  'sn-coating': 'Yes',
  gallery: 'Yes',
  centurion: 'Yes',
  magnamax: 'Yes',
  krystal: 'Yes',
};

export const kcmaEvidence = {
  'sn-coating': {
    status: 'Manufacturer Finish Tests Reported',
    detail: 'The coating TDS reports KCMA 9.2–9.5 finish-performance results, including chemical, detergent, heat and cold-cycle tests. These are finish results, not certification of a cabinet design or proof of a warranty term.',
    source: 'sn-coating-tds',
  },
  gallery: {
    status: 'Manufacturer Compliance Claim',
    detail: 'The PDS states KCMA hardness and household-chemical requirements are met when properly applied. No cabinet-line certificate or independent KCMA test report is attached.',
    source: 'gallery-tds',
  },
  centurion: {
    status: 'Manufacturer Compliance Claim',
    detail: 'The CW-3115–3118 TDS claims KCMA performance specifications are met or exceeded. It does not name the standard edition, laboratory, scores or a certified cabinet line.',
    source: 'centurion-tds',
  },
  krystal: {
    status: 'Manufacturer Compliance Claim',
    detail: 'The manufacturer Krystal product page states that this clear finish meets or exceeds KCMA finish-performance requirements. This is a finish claim, separate from cabinet-line certification.',
    sourceUrl: 'https://www.mlcampbell.com/product/krystal/',
    source: 'krystal-performance',
  },
  magnamax: {
    status: 'Manufacturer Finish Tests Reported',
    detail: 'The archived clear-finish brochure reports KCMA chemical tests. It is not a certificate for every current pigmented formula or a cabinet line.',
    source: 'magnamax-performance',
  },
};

export function getKcmaEvidence(productId, group) {
  return kcmaEvidence[productId] || {
    status: 'Certification Not Verified',
    detail: group === 'primer'
      ? 'No standalone primer certification verified in the captured documents. Finish performance depends on the complete applied system; this is not a failed test.'
      : 'No product-specific KCMA claim, test report or cabinet-line certificate located in the captured documents. This is not a failed test or evidence that the product cannot meet the standard.',
  };
}

export const kcmaPrograms = [
  ['A161.1 Quality', 'Cabinet-design certification covering structural strength, drawers, doors and finish durability.'],
  ['Severe Use', 'A separate cabinet program for demanding wear conditions. It is not a standalone paint grade.'],
  ['Environmental Stewardship (ESP)', 'Manufacturer sustainability practices. It does not rank coating hardness or chemical resistance.'],
];
export const kcmaReferences = [
  'https://kcma.org/certification',
  'https://kcma.org/certifications/kcma-quality-cabinet-certification',
  'https://ansi.org/standards-faqs',
];
