// Customer-facing planning comparison. These are finished-coating purchase costs,
// including required catalyst, not manufacturer ingredient or production costs.
export const coatingPriceDate = 'November 20, 2026';
export const coatingPrices = {
  'sn-coating': { amount:189.44, estimated:true, note:'Selected mixed-material estimate based on our coating and catalyst purchase costs.' },
  gallery: { amount:112.13, estimated:false, note:'Local Pro+ quote, white base. No added catalyst.' },
  emerald: { amount:91.34, estimated:false, note:'Local Pro+ quote, satin white base. No added catalyst.' },
  renner688: { amount:152.34, estimated:true, note:'Estimated contractor cost including M404 catalyst; reference mixture approximately 15% catalyst.' },
  centurion: { amount:134.71, estimated:true, note:'Estimated contractor cost for the 1800 system including CW-4002 catalyst. Matched dealer quote pending.' },
  milesi: { amount:121.71, estimated:true, note:'Selected contractor planning estimate for waterborne HKR114 + HNB1, including catalyst. Matched waterborne package pricing is pending. Earlier KKR513 / LNB99 prices are not used as a verified quote for this system.' },
  command: { amount:80.70, estimated:true, note:'Planning estimate: 20% below the $100.87 regular public price. No added catalyst.' },
  advance: { amount:71.19, estimated:true, note:'Planning estimate: 20% below the $88.99 public price. No added catalyst.' },
  krystal: { amount:73.05, estimated:true, note:'Clear finish. Planning estimate: 20% below coating and C1491 catalyst public prices, mixed at 10% catalyst by volume.' },
  magnamax: { amount:60.71, estimated:true, note:'Clear finish. Planning estimate: 20% below the $75.89 public price. Factory pre-catalyzed; no additional catalyst.' },
};

export const primerPrices = {
  'sn-primer': {amount:95.74,estimated:false,note:'Purchase cost: $478.70 for five U.S. gallons, divided by five. No separate catalyst.'},
  extreme: {amount:72.39,estimated:true,note:'Planning estimate: 20% below the $90.49 public gallon price.'},
  'sw-shellac': {amount:61.94,estimated:false,note:'Local Pro+ quote for one U.S. gallon, confirmed in consultation pricing.'},
  'sw-problock': {amount:27.18,estimated:true,note:'Planning estimate: 20% below the $33.98 retail gallon price for PB16W0100 oil-based primer.'},
  renner083: {amount:104.00,estimated:true,note:'Planning estimate: 20% below the $130 one-gallon public price.'},
  stix: {amount:47.99,estimated:true,note:'Planning estimate: 20% below the $59.99 public one-gallon listing; reference dealer listing was out of stock.'},
  bin: {amount:79.98,estimated:true,note:'Planning estimate: 20% below the $99.98 public gallon price for original shellac B-I-N.'},
  cover: {amount:39.98,estimated:true,note:'Planning estimate: 20% below the $49.98 public gallon price for High Hide 3551.'},
  bullseye: {amount:24.58,estimated:true,note:'Planning estimate: 20% below the $30.73 public gallon price for white 02001.'},
  kilz2: {amount:19.18,estimated:true,note:'Planning estimate: 20% below the $23.97 public gallon price for KILZ 2 All-Purpose.'},
};

export const getComparisonPrice = id => coatingPrices[id] || primerPrices[id];

export function formatCoatingPrice(id) {
  const price = getComparisonPrice(id);
  return price ? `≈$${price.amount.toFixed(2)}` : '—';
}
