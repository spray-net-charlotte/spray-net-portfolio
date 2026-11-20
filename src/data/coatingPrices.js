// Customer-facing planning comparison. These are finished-coating purchase costs,
// including required catalyst, not manufacturer ingredient or production costs.
export const coatingPriceDate = 'November 19, 2026';
export const coatingPrices = {
  'sn-coating': { amount:189.44, estimated:true, note:'Selected mixed-material estimate based on our coating and catalyst purchase costs.' },
  gallery: { amount:112.13, estimated:false, note:'Local Pro+ quote, white base. No added catalyst.' },
  emerald: { amount:91.34, estimated:false, note:'Local Pro+ quote, satin white base. No added catalyst.' },
  renner688: { amount:152.34, estimated:true, note:'Estimated contractor cost including M404 catalyst; reference mixture approximately 15% catalyst.' },
  centurion: { amount:134.71, estimated:true, note:'Estimated contractor cost for the 1800 system including CW-4002 catalyst. Matched dealer quote pending.' },
  milesi: { amount:121.71, estimated:true, note:'Estimated 15% contractor discount on $165.73 / 5 L coating and $73.98 / U.S. quart catalyst. Assumes KKR513 + LNB99 at 11.6% catalyst by volume.' },
  command: { amount:80.70, estimated:true, note:'Planning estimate: 20% below the $100.87 regular public price. No added catalyst.' },
  advance: { amount:71.19, estimated:true, note:'Planning estimate: 20% below the $88.99 public price. No added catalyst.' },
  krystal: { amount:73.05, estimated:true, note:'Clear finish. Planning estimate: 20% below coating and C1491 catalyst public prices, mixed at 10% catalyst by volume.' },
  magnamax: { amount:60.71, estimated:true, note:'Clear finish. Planning estimate: 20% below the $75.89 public price. Factory pre-catalyzed; no additional catalyst.' },
};

export function formatCoatingPrice(id) {
  const price = coatingPrices[id];
  return price ? `≈$${price.amount.toFixed(2)}` : '—';
}
