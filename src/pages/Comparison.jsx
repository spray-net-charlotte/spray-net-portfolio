import { useEffect, useRef, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Icon from '../components/Icon';
import BrandEmblem from '../components/BrandEmblem';
import Photo from '../components/Photo';
import Lightbox from '../components/Lightbox';
import { mediaUrl } from '../lib/media';
import { closeOverlay, navigate, updateQuery } from '../lib/navigation';
import { benchmarkProducts, benchmarkRows, coatingHardeners, coatingProducts, comparisonChecked, comparisonDocuments, comparisonGroups } from '../data/comparisons';
import { getComparisonSummary, summaryRows } from '../data/comparisonSummary.js';
import { kcmaFinishStatus } from '../data/kcmaEvidence.js';
import { regulatoryVoc, vocMethodReference } from '../data/regulatoryVoc.js';
import { getCatalystComparison } from '../data/catalystComparison.js';
import { coatingPriceDate, getComparisonPrice, formatCoatingPrice } from '../data/coatingPrices.js';
import { benchmarkNames, benchmarkDisplay } from '../data/benchmarkDisplay.js';
import { coatingDryingNotes, dryingDealerReferences } from '../data/coatingDrying.js';
import '../comparison.css';

const docById = (id) => comparisonDocuments.find((doc) => doc.id === id);
function sourceHref(id, route) {
  const params = new URLSearchParams(route.params);
  params.delete('full');
  return `#/comparison/${id}${params.size ? `?${params}` : ''}`;
}
function SourceLink({ id, route, children }) {
  const doc = docById(id);
  return <a className="comparison-source-link" href={sourceHref(id, route)}><Icon name="layers" size={19} />{children || `${doc.title} · ${doc.kind}`}</a>;
}
function ChoiceGroup({ label, options, value, onChange }) {
  return <div className="comparison-choices" role="group" aria-label={label}>{options.map(([id, text]) => <button key={id} className="chip" aria-pressed={value === id} onClick={() => onChange(id)}>{text}</button>)}</div>;
}
function DocumentCard({ doc, route }) {
  return <a className="comparison-document-card" href={sourceHref(doc.id, route)}>
    <span className="comparison-doc-kind">{doc.kind}</span><h3>{doc.title}</h3><p>{doc.variant}</p><p className="comparison-document-edition">{doc.edition}</p><span className="comparison-document-open">Read {doc.pages} {doc.pages === 1 ? 'Page' : 'Pages'}<Icon name="arrow" size={20} /></span>
  </a>;
}
function TestResults({ product, route }) {
  const tests = product.tests;
  return tests ? <details className="comparison-test-results"><summary>{tests.values.length} Reported Results</summary><p>{tests.conditions}</p><dl>{tests.values.map(([name,result]) => <div key={name}><dt>{name}</dt><dd>{result}</dd></div>)}</dl><SourceLink id={tests.source} route={route}>Read Test Source</SourceLink></details> : product.specs.performance || 'No numerical test results in the captured source.';
}
function BenchmarkCell({ value, testKey, productId }) {
  const score = benchmarkDisplay(testKey, value);
  return <td data-product={productId} className={`benchmark-score score-${score.level}`} title={String(value)}><span>{score.text}</span><small>{score.label}</small></td>;
}
function DocumentView({ doc, route }) {
  const [page, setPage] = useState(0);
  const [text, setText] = useState(null);
  const [showText, setShowText] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    fetch(mediaUrl(`${doc.base}/text.json`)).then((response) => {
      if (!response.ok) throw new Error('Document text unavailable');
      return response.json();
    }).then((value) => { if (!cancelled) setText(value); }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [doc.id, retry]);
  const params = new URLSearchParams(route.params); params.delete('full');
  const back = `/comparison${params.size ? `?${params}` : ''}`;
  const images = Array.from({ length: doc.pages }, (_, index) => ({ src: `${doc.base}/${index + 1}.webp`, alt: `${doc.title} ${doc.kind} · Page ${index + 1} of ${doc.pages}` }));
  return <section className="comparison-document-view">
    <PageHeader back={back} backLabel="Comparison" eyebrow={`${doc.kind} · ORIGINAL DOCUMENT`} title={doc.title} description={`${doc.variant} · ${doc.edition}`} />
    <div className="comparison-reader-controls" aria-label="Document controls">
      <button className="button button-light" disabled={page === 0} onClick={() => setPage(page - 1)}><Icon name="back" size={18} />Previous Page</button>
      <label>Page <select aria-label="Document page" value={page} onChange={(event) => setPage(Number(event.target.value))}>{images.map((_, i) => <option key={i} value={i}>{i + 1} of {doc.pages}</option>)}</select></label>
      <button className="button button-light" disabled={page === doc.pages - 1} onClick={() => setPage(page + 1)}>Next Page<Icon name="arrow" size={18} /></button>
      <button className="button button-dark" onClick={() => updateQuery(route, 'full', '1', false)}><Icon name="expand" size={18} />Fullscreen</button>
      <button className="button button-light" aria-pressed={showText} onClick={() => setShowText(!showText)}>{showText ? 'Show Original Page' : 'Read Page Text'}</button>
    </div>
    <p className="comparison-page-status" role="status">Page {page + 1} of {doc.pages}</p>
    {showText ? <div className="comparison-page-text">
      <p>{doc.textNote || 'Extracted text for reading and screen readers. Refer to the original page for table layout and symbols.'}</p>
      {text ? <pre>{text[page]}</pre> : failed ? <><p role="alert">Page text could not load. The original page is available below.</p><button className="button button-dark" onClick={() => setRetry(retry + 1)}>Try Again</button><Photo src={images[page].src} alt={images[page].alt} eager /></> : <p role="status">Loading page text…</p>}
    </div> : <button className="comparison-page-image" aria-label={`View page ${page + 1} fullscreen`} onClick={() => updateQuery(route, 'full', '1', false)}><Photo key={page} src={images[page].src} alt={images[page].alt} eager /></button>}
    <details className="comparison-provenance"><summary>Document Details &amp; Source</summary><p>{doc.sourceLabel}. Checked {comparisonChecked}.</p>{doc.sourceUrl && <p className="comparison-source-url">{doc.sourceUrl}</p>}<p>SHA-256: <code>{doc.sha256}</code></p><p>The original PDF and all {doc.pages} page images are included in the offline portfolio. This copy preserves the source edition; a newer formulation may have a different sheet.</p></details>
    {route.params.get('full') === '1' && <Lightbox images={images} index={page} onChange={setPage} onClose={() => closeOverlay(route, 'full')} />}
  </section>;
}


function ComparisonSheet({ groupKey, route }) {
  const sheet = useRef(null);
  useEffect(() => {
    const header = document.querySelector('.app-header');
    const containers = [...document.querySelectorAll('.coating-comparison .comparison-matrix-scroll')];
    const update = () => containers.forEach(container => {
      const overlap = Math.max(0, (header?.getBoundingClientRect().bottom || 0) - container.getBoundingClientRect().top);
      container.style.setProperty('--comparison-sticky-offset', `${overlap}px`);
      container.style.scrollPaddingTop = `${overlap + container.querySelector('thead').getBoundingClientRect().height + 8}px`;
    });
    update();
    const observer = new ResizeObserver(update);
    if (header) observer.observe(header);
    window.addEventListener('scroll', update, { passive:true });
    window.addEventListener('resize', update);
    return () => { observer.disconnect(); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [route.raw]);
  const group = comparisonGroups[groupKey];
  const allProducts = [group.ours, ...group.peers].map(id => coatingProducts[id]);
  const brandFor = p => p.brand || (p.name.startsWith('Sherwin-Williams') ? 'Sherwin-Williams' : p.name.startsWith('INSL-X') ? 'INSL-X' : p.name.startsWith('Benjamin Moore') ? 'Benjamin Moore' : p.name.startsWith('Zinsser') ? 'Zinsser' : p.name.startsWith('KILZ') ? 'KILZ' : 'Spray-Net');
  const brands = [...new Set(allProducts.slice(1).map(brandFor))];
  const selectedBrands = (route.params.get('brands') || '').split(',').filter(brand => brands.includes(brand));
  const products = allProducts.filter(p => p.id === group.ours || !selectedBrands.length || selectedBrands.includes(brandFor(p)));
  const sourceIds = new Set(products.flatMap(p => [p.tds,p.sds,p.tests?.source,...(p.extraSources || []),...(regulatoryVoc[p.id]?.extraSources || []),...(p.hardeners || []).map(id => coatingHardeners[id].sds)]).filter(Boolean));
  const toggleBrand = brand => {
    const next = selectedBrands.includes(brand) ? selectedBrands.filter(value => value !== brand) : [...selectedBrands,brand];
    const params = new URLSearchParams(route.params);
    if (next.length) params.set('brands',next.join(',')); else params.delete('brands');
    navigate(`${route.path}?${params}`);
    sheet.current?.scrollTo({left:0});
  };
  if (groupKey === 'paint') { sourceIds.add('sn-benchmark'); sourceIds.add('sn-catalyst-sds'); }
  return <>
    <h2 className="comparison-sheet-title">{groupKey === 'primer' ? 'Cabinet Primers' : 'Cabinet Paint'} — {selectedBrands.length ? 'Selected Brands' : 'All Brands'}</h2>
    <div className="comparison-brand-jumps" role="group" aria-label="Filter brands"><span>Compare Brands</span><button className="chip" aria-pressed={!selectedBrands.length} onClick={() => {const params=new URLSearchParams(route.params);params.delete('brands');navigate(`${route.path}?${params}`);sheet.current?.scrollTo({left:0});}}>All Brands</button>{brands.map(brand => <button key={brand} className="chip" aria-pressed={selectedBrands.includes(brand)} onClick={() => toggleBrand(brand)}>{brand}</button>)}</div>
    <p className="comparison-reading-note">Select one or more brands. Spray-Net stays alongside your selections.</p>
    <div ref={sheet} className="comparison-matrix-scroll" role="region" aria-label="All-brand comparison sheet" tabIndex={0}>
      <table className="comparison-matrix"><caption className="sr-only">{groupKey === 'primer' ? 'Primer' : 'Paint'} specifications across all brands</caption>
        <thead><tr><th scope="col">Compare</th>{products.map(p => <th scope="col" key={p.id} data-product={p.id}><span className="small-caps">{brandFor(p).toUpperCase()}</span>{p.name}<small>{p.detail}</small></th>)}</tr></thead>
        <tbody>
          <tr className="comparison-cost-row"><th scope="row">Contractor Cost<small>{groupKey === 'paint' ? 'USD / Mixed Gal.' : 'USD / U.S. Gal.'}</small></th>{products.map(p => <td key={p.id} data-product={p.id}>{formatCoatingPrice(p.id)}</td>)}</tr>
          {groupKey === 'paint' && <tr><th scope="row">Meets KCMA</th>{products.map(p => <td key={p.id} data-product={p.id}>{kcmaFinishStatus[p.id] || 'Not verified'}</td>)}</tr>}
          {summaryRows.filter(([key]) => groupKey === 'paint' || !['catalyst','isocyanateFree'].includes(key)).map(([key,label]) => <tr key={key}><th scope="row">{label}</th>{products.map(p => <td key={p.id} data-product={p.id}>{key === 'voc' ? regulatoryVoc[p.id]?.display || '—' : key === 'isocyanateFree' ? getCatalystComparison(p, getComparisonSummary(p)).label : getComparisonSummary(p)[key] || '—'}</td>)}</tr>)}
          <tr><th scope="row">Documents</th>{products.map(p => <td key={p.id} data-product={p.id}><SourceLink id={p.tds} route={route}>TDS</SourceLink>{p.sds && <SourceLink id={p.sds} route={route}>SDS</SourceLink>}</td>)}</tr>
        </tbody>
      </table>
    </div>
    <details className="comparison-source-library"><summary>Price Comparison Notes</summary><p>{groupKey === 'paint' ? 'Contractor material cost per U.S. gallon of mixed coating, including required catalyst.' : 'Contractor material cost per U.S. gallon of primer.'} ≈ Approximate. Prices vary by supplier and account. Before added reducer, delivery, tax and spray loss. {groupKey === 'paint' && 'Clear varnish and lacquer are identified separately.'} Reference date: {coatingPriceDate}.</p><p>{groupKey === 'paint' && 'Mixed cost = (coating cost + required catalyst cost) ÷ combined mixture volume. '}Estimated discounts are planning assumptions, not dealer quotes. Material price alone does not establish coating performance.</p>{products.map(p => getComparisonPrice(p.id) && <div key={p.id}><h3>{p.name} · {formatCoatingPrice(p.id)}</h3><p>{getComparisonPrice(p.id).note}</p></div>)}</details>
    <p className="comparison-reading-note">* Estimated or assumed VOC basis. ≈ Approximate. &lt; Upper limit. Solids: vol = volume, wt = weight. Drying times depend on conditions.</p>
    <details className="comparison-source-library"><summary>Drying &amp; Recoat Notes</summary><p>Dry to Touch uses one endpoint throughout. — means that endpoint is not reported; dust-free and handling times are kept here. Touch dry does not mean ready to sand, recoat or return to service. Recoat entries marked ≈ are estimates from sanding-ready times and require complete drying plus sanding.</p>{products.map(p => <div key={p.id}><h3>{p.name}</h3><p>{coatingDryingNotes[p.id] || `${p.specs.touch || 'Dry-to-touch time not reported.'} Recoat: ${p.specs.recoat || 'Not reported.'}`}</p><SourceLink id={p.tds} route={route}>Drying Source</SourceLink>{dryingDealerReferences[p.id] && <p className="comparison-source-url">Dealer reference: {dryingDealerReferences[p.id]}</p>}</div>)}</details>
    <details className="comparison-source-library"><summary>VOC Calculation Notes</summary><p>Regulatory VOC excludes water and exempt-solvent volume. Estimates use the stated assumptions; basis-assumed entries use the published value without a conversion. Base components and catalyzed mixtures are identified below.</p>{products.map(p => {const value = regulatoryVoc[p.id]; return value && <div key={p.id}><h3>{p.name} · {value.display} g/L</h3><p>{value.note}</p><SourceLink id={value.source} route={route}>VOC Source</SourceLink>{value.extraSources?.map(id => <SourceLink key={id} id={id} route={route}/>)}</div>;})}<p className="comparison-source-url">Method reference: {vocMethodReference}</p></details>
    {groupKey === 'paint' && <>
      <h2 className="comparison-sheet-title">Cabinet Coating Benchmarks — All Brands</h2>
      <p className="comparison-reading-note">Historical Spray-Net lab comparison. Products and test conditions differ from the current specification sheets above.</p>
      <div className="benchmark-legend" aria-label="Benchmark color guide"><span className="score-strong">Strong</span><span className="score-mixed">Mid</span><span className="score-weak">Weak</span><span className="score-unknown">Not Reported</span></div>
      <div className="benchmark-scroll" role="region" aria-label="All-brand benchmark sheet" tabIndex={0}><table className="benchmark-matrix"><caption className="sr-only">In-house cabinet coating benchmarks across all brands</caption><thead><tr><th scope="col">Test</th><th scope="col">Spray-Net</th>{benchmarkProducts.map(p => <th scope="col" key={p.id}><abbr title={p.name}>{benchmarkNames[p.id]}</abbr></th>)}</tr></thead><tbody>{benchmarkRows.map(([label,method,result,key,index]) => <tr key={label}><th scope="row" title={method}>{label}</th><BenchmarkCell value={result} testKey={key} productId="sn-coating"/>{benchmarkProducts.map(p => <BenchmarkCell key={p.id} productId={p.id} testKey={key} value={index === undefined ? p[key] : p[key][index]}/>)}</tr>)}</tbody></table></div>
      <details className="comparison-source-library"><summary>Benchmark Score Guide</summary><p>Colors summarize this historical report; they are not universal coating grades. Pencil: HB or harder = strong, B–3B = mid, 4B or softer = weak. MEK: 100+ rubs = strong, 30–99 = mid, below 30 = weak. Chemical ratings: 5 = strong, 3–4 = mid, 1–2 = weak. Unreported results stay gray.</p><p>Detergent / water: unchanged film = strong; softening or color change = mid; blistering, easy scratching or dissolved film = weak.</p>{benchmarkRows.map(([label,method]) => <p key={label}><strong>{label}:</strong> {method}</p>)}</details>
      <SourceLink id="sn-benchmark" route={route}>Read Complete Benchmark Report</SourceLink>
      <details className="comparison-source-library"><summary>Additional Published Test Results</summary>
        <div className="comparison-matrix-scroll" role="region" aria-label="Published manufacturer tests" tabIndex={0}><table className="comparison-published-tests"><caption className="sr-only">Additional published coating tests</caption><thead><tr><th scope="col">Coating</th><th scope="col">Results</th></tr></thead><tbody>
          {products.filter(p => p.tests).map(p => <tr key={p.id}><th scope="row">{p.name}</th><td><TestResults product={p} route={route}/></td></tr>)}
          <tr><th scope="row">Sherwin-Williams Gallery Series</th><td>6H Pencil Hardness · ASTM D3363 · 7-day dry<SourceLink id="gallery-tds" route={route}>Test Source</SourceLink></td></tr>
        </tbody></table></div>
      </details>
    </>}
    <details className="comparison-source-library"><summary>Source Documents &amp; Product Notes</summary><h2>The Source Library</h2><details><summary>Product Notes</summary>{products.map(p => <div key={p.id}><h3>{p.name}</h3><p>{p.note}</p></div>)}</details><details><summary>Catalyst Comparison Notes</summary><p>The row describes the separate catalyst. “No added catalyst” is different from an isocyanate-free catalyst; neither is an overall safety rating.</p>{products.map(p => {const info=getCatalystComparison(p,getComparisonSummary(p));return <div key={p.id}><h3>{p.name} · {info.label}</h3><p>{info.note}</p>{info.sources?.map(id => <SourceLink key={id} id={id} route={route}>Catalyst Reference</SourceLink>)}</div>;})}</details><div className="comparison-document-grid">{comparisonDocuments.filter(d => sourceIds.has(d.id)).map(doc => <DocumentCard key={doc.id} doc={doc} route={route}/>)}</div></details>
    <aside className="comparison-warranty"><Icon name="shield" size={34}/><div><h2>Our 15-Year No-Peel Warranty</h2><p>15 years against peeling. See your proposal and warranty for coverage.</p><details><summary>Warranty Reference</summary><p>Spray-Net cabinet-warranty and contract-warranty FAQs, checked {comparisonChecked}. Laboratory tests do not calculate a 15-year service life.</p><p className="comparison-source-url">spray-net.com/faqs/what-is-your-warranty-for-kitchen-cabinets<br/>spray-net.com/faqs/how-does-my-contract-warranty-work</p></details></div></aside>
    <p className="comparison-reviewed">Sources checked {comparisonChecked}.</p>
  </>;
}
export default function Comparison({ route, documentId }) {
  const doc = docById(documentId);
  if (documentId) return doc ? <DocumentView key={doc.id} doc={doc} route={route}/> : <><PageHeader back="/comparison" backLabel="Comparison" title="Document Not Found"/><a href="#/comparison" className="button button-dark">Back to Comparison</a></>;
  const area = route.params.get('area') || (route.params.has('coat') ? 'interior' : '');
  const coat = ['primer','paint'].includes(route.params.get('coat')) ? route.params.get('coat') : '';
  const chooseArea = value => navigate(`/comparison?area=${value}`);
  return <section className="coating-comparison">
    <PageHeader eyebrow="THE DETAILS BEHIND THE FINISH" title="Coating Comparison" description="Compare our coating systems with familiar brands, from everyday primers to specialty finishes." back={coat ? '/comparison?area=interior' : area ? '/comparison' : '/'} backLabel={coat ? 'Interior' : area ? 'Comparison' : 'Home'}/>
    <ChoiceGroup label="Interior or Exterior" options={ [['interior','Interior'],['exterior','Exterior']] } value={area} onChange={chooseArea}/>
    {area === 'interior' && <div className="comparison-flow-step"><ChoiceGroup label="Interior coating" options={ [['primer','Primer'],['paint','Paint']] } value={coat} onChange={value => navigate(`/comparison?area=interior&coat=${value}`)}/></div>}
    {!area && <div className="comparison-empty"><BrandEmblem size={42}/><h2>Choose Interior or Exterior</h2><p>Explore the coatings, then compare the brands together on one sheet.</p></div>}
    {area === 'interior' && !coat && <div className="comparison-empty"><h2>Start with Primer or Paint</h2><p>Compare cabinet coatings side by side.</p></div>}
    {area === 'exterior' && <div className="comparison-empty"><h2>Exterior Comparison Coming Next</h2><p>Exterior coating sheets will be added here. The interior cabinet comparison is ready to explore.</p><button className="button button-dark" onClick={() => chooseArea('interior')}>Explore Interior</button></div>}
    {area === 'interior' && coat && <ComparisonSheet key={coat} groupKey={coat} route={route}/>}
  </section>;
}
