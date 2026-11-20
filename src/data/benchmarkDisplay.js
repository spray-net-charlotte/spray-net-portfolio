// Reading guide for this historical report, not a certification or universal grade.
export const benchmarkNames = {
  'bm-advance':'BM Advance', 'inslx-cabinet':'INSL-X Cabinet Coat',
  'sw-alkyd':'SW Alkyd Urethane', 'sw-emerald':'SW Emerald',
  'sw-precat':'SW Pre-Cat', 'behr-cabinet':'BEHR Cabinet & Trim',
};
export function benchmarkDisplay(key, value) {
  const text = String(value);
  if (/not separately reported/i.test(text)) return { text:'—', level:'unknown', label:'Not reported' };
  if (key === 'chemical') return { text, level:Number(value) === 5 ? 'strong' : Number(value) >= 3 ? 'mixed' : 'weak', label:Number(value) === 5 ? 'Strong' : Number(value) >= 3 ? 'Mid' : 'Weak' };
  if (key === 'hardness') {
    const level = /^(HB|F|\d?H)$/.test(text) ? 'strong' : /^(B|[23]B)$/.test(text) ? 'mixed' : 'weak';
    return { text, level, label:level === 'strong' ? 'Strong' : level === 'mixed' ? 'Mid' : 'Weak' };
  }
  if (key === 'mek') {
    const count = Number(text.replace('>',''));
    const level = count >= 100 ? 'strong' : count >= 30 ? 'mixed' : 'weak';
    return { text, level, label:level === 'strong' ? 'Strong' : level === 'mixed' ? 'Mid' : 'Weak' };
  }
  if (/gone|dissolved/i.test(text)) return { text:'Dissolved', level:'weak', label:'Weak' };
  if (/many blisters/i.test(text)) return { text:'Many blisters', level:'weak', label:'Weak' };
  if (/scratched easily/i.test(text)) return { text:'Scratches easily', level:'weak', label:'Weak' };
  if (/softer|slight color|color changed/i.test(text)) return { text:/softer/i.test(text) ? 'Softer film' : /slight/i.test(text) ? 'Slight change' : 'Color changed', level:'mixed', label:'Mid' };
  return { text:/paint film hard/i.test(text) ? 'Hard film' : /no color/i.test(text) ? 'No change' : text, level:'strong', label:'Strong' };
}
