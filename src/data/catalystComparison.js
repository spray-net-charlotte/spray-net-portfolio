// This row describes the separate catalyst, not the coating base or overall product safety.
const noCatalyst = { label:'No added catalyst', note:'This reference is used without a separately added hardener.' };
export const catalystComparison = {
  'sn-coating': {
    label:'Yes',
    sources:['sn-catalyst-sds'],
    note:'Spray-Net uses an isocyanate-free catalyst. The April 2026 A-003 SDS lists water and multifunctional polycarbodiimide. The archived coating TDS names SWC010; the original source editions are retained separately.',
  },
  renner643: {
    label:'Depends on catalyst',
    sources:['renner-m404-sds'],
    note:'Optional 2K schedule. YC-M404 contains isocyanates; matching M401 / M402 SDS references have not been captured. Uncatalyzed 1K use has no added hardener.',
  },
  renner688: {
    label:'No',
    sources:['renner-m403-sds','renner-m404-sds'],
    note:'YC-M403 and YC-M404 SDS Section 3 list HDI / IPDI isocyanates and oligomers.',
  },
  renner785: {
    label:'No',
    sources:['renner-m403-sds'],
    note:'The selected YC-M403 hardener contains HDI / IPDI isocyanates and oligomers.',
  },
  centurion: {
    label:'No',
    sources:['centurion-hardener-sds'],
    note:'CW-4002 SDS Section 3 lists HDI and IPDI oligomers. Centurion also explicitly describes CW-4002 as an isocyanate hardener.',
  },
  milesi: {
    label:'No',
    sources:['milesi-hnb40-sds'],
    note:'The captured 2017 Bulgarian / EU HNB40 SDS lists aliphatic polyisocyanate and EUH204 (contains isocyanates). Regional / edition limits remain in the original document.',
  },
  krystal: {
    label:'No isocyanates listed',
    sources:['care-catalyst-sds'],
    note:'C1491 is an acid catalyst; its captured SDS lists alcohol, sulfonic acid, butyl acetate and phosphoric acid, with no isocyanates disclosed. That ingredient list alone does not verify an isocyanate-free formulation claim. It is not labeled as isocyanate-containing.',
  },
  magnamax: {
    label:'No added catalyst',
    sources:['magnamax-sds'],
    note:'Factory pre-catalyzed lacquer; no hardener is added by the user in this reference. The factory catalyst composition / explicit isocyanate-free claim has not been verified.',
  },
};

export function getCatalystComparison(product, summary) {
  if (catalystComparison[product.id]) return catalystComparison[product.id];
  return summary.catalyst === 'None' ? noCatalyst : {label:'Not verified',note:'A matched catalyst reference has not been verified.'};
}
