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
  const [activeBrand, setActiveBrand] = useState('');
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
  }, []);
  const group = comparisonGroups[groupKey];
  const products = [group.ours, ...group.peers].map(id => coatingProducts[id]);
  const sourceIds = new Set(products.flatMap(p => [p.tds,p.sds,p.tests?.source,...(p.extraSources || []),...(p.hardeners || []).map(id => coatingHardeners[id].sds)]).filter(Boolean));
  const brandFor = p => p.brand || (p.name.startsWith('Sherwin-Williams') ? 'Sherwin-Williams' : p.name.startsWith('INSL-X') ? 'INSL-X' : p.name.startsWith('Benjamin Moore') ? 'Benjamin Moore' : p.name.startsWith('Zinsser') ? 'Zinsser' : p.name.startsWith('KILZ') ? 'KILZ' : 'Spray-Net');
  const brands = [...new Set(products.slice(1).map(brandFor))];
  const jumpToBrand = brand => {
    const product = products.find(p => brandFor(p) === brand);
    const container = sheet.current;
    const target = container.querySelector(`[data-product="${product.id}"]`);
    const pinned = [...container.querySelectorAll('thead th')].slice(0,2).reduce((sum,cell) => sum + cell.getBoundingClientRect().width,0);
    container.scrollTo({left:Math.max(0,container.scrollLeft + target.getBoundingClientRect().left - container.getBoundingClientRect().left - pinned),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    setActiveBrand(brand);
  };
  if (groupKey === 'paint') { sourceIds.add('sn-benchmark'); sourceIds.add('sn-catalyst-sds'); }
  return <>
    <h2 className="comparison-sheet-title">{groupKey === 'primer' ? 'Cabinet Primers' : 'Cabinet Paint'} — All Brands</h2>
    <div className="comparison-brand-jumps" role="group" aria-label="Jump to a brand"><span>Find a Brand</span>{brands.map(brand => <button key={brand} className="chip" aria-pressed={activeBrand === brand} onClick={() => jumpToBrand(brand)}>{brand}</button>)}</div>
    <p className="comparison-reading-note">Tap a brand or swipe to compare.</p>
    <div ref={sheet} className="comparison-matrix-scroll" role="region" aria-label="All-brand comparison sheet" tabIndex={0}>
      <table className="comparison-matrix"><caption className="sr-only">{groupKey === 'primer' ? 'Primer' : 'Paint'} specifications across all brands</caption>
        <thead><tr><th scope="col">Compare</th>{products.map(p => <th scope="col" key={p.id} data-product={p.id}><span className="small-caps">{brandFor(p).toUpperCase()}</span>{p.name}<small>{p.detail}</small></th>)}</tr></thead>
        <tbody>
          {groupKey === 'paint' && <tr><th scope="row">Meets KCMA</th>{products.map(p => <td key={p.id} data-product={p.id}>{kcmaFinishStatus[p.id] || 'Not verified'}</td>)}</tr>}
          {summaryRows.map(([key,label]) => <tr key={key}><th scope="row">{label}</th>{products.map(p => <td key={p.id} data-product={p.id}>{key === 'voc' ? regulatoryVoc[p.id]?.display || '—' : getComparisonSummary(p)[key] || '—'}</td>)}</tr>)}
          <tr><th scope="row">Documents</th>{products.map(p => <td key={p.id} data-product={p.id}><SourceLink id={p.tds} route={route}>TDS</SourceLink>{p.sds && <SourceLink id={p.sds} route={route}>SDS</SourceLink>}</td>)}</tr>
        </tbody>
      </table>
    </div>
    <p className="comparison-reading-note">* Estimated or assumed VOC basis. ≈ Approximate. &lt; Upper limit. Solids: vol = volume, wt = weight. Drying times depend on conditions.</p>
    <details className="comparison-source-library"><summary>VOC Calculation Notes</summary><p>Regulatory VOC excludes water and exempt-solvent volume. Estimates use the stated assumptions; basis-assumed entries use the published value without a conversion. Base components and catalyzed mixtures are identified below.</p>{products.map(p => {const value = regulatoryVoc[p.id]; return value && <div key={p.id}><h3>{p.name} · {value.display} g/L</h3><p>{value.note}</p><SourceLink id={value.source} route={route}>VOC Source</SourceLink></div>;})}<p className="comparison-source-url">Method reference: {vocMethodReference}</p></details>
    {groupKey === 'paint' && <>
      <h2 className="comparison-sheet-title">Cabinet Coating Benchmarks — All Brands</h2>
      <p className="comparison-reading-note">Historical Spray-Net lab comparison. Products and test conditions differ from the current specification sheets above.</p>
      <div className="comparison-matrix-scroll" role="region" aria-label="All-brand benchmark sheet" tabIndex={0}><table className="comparison-matrix"><caption className="sr-only">In-house cabinet coating benchmarks across all brands</caption><thead><tr><th scope="col">Test</th><th scope="col">Spray-Net Kitchen Cabinet Paint</th>{benchmarkProducts.map(p => <th scope="col" key={p.id}>{p.name}</th>)}</tr></thead><tbody>{benchmarkRows.map(([label,method,result,key,index]) => <tr key={label}><th scope="row">{label}<small>{method}</small></th><td>{result}</td>{benchmarkProducts.map(p => <td key={p.id} data-product={p.id}>{index === undefined ? p[key] : p[key][index]}</td>)}</tr>)}</tbody></table></div>
      <SourceLink id="sn-benchmark" route={route}>Read Complete Benchmark Report</SourceLink>
      <details className="comparison-source-library"><summary>Additional Published Test Results</summary>
        <div className="comparison-matrix-scroll" role="region" aria-label="Published manufacturer tests" tabIndex={0}><table className="comparison-published-tests"><caption className="sr-only">Additional published coating tests</caption><thead><tr><th scope="col">Coating</th><th scope="col">Results</th></tr></thead><tbody>
          {products.filter(p => p.tests).map(p => <tr key={p.id}><th scope="row">{p.name}</th><td><TestResults product={p} route={route}/></td></tr>)}
          <tr><th scope="row">Sherwin-Williams Gallery Series</th><td>6H Pencil Hardness · ASTM D3363 · 7-day dry<SourceLink id="gallery-tds" route={route}>Test Source</SourceLink></td></tr>
        </tbody></table></div>
      </details>
    </>}
    <details className="comparison-source-library"><summary>Source Documents &amp; Product Notes</summary><h2>The Source Library</h2><details><summary>Product Notes</summary>{products.map(p => <div key={p.id}><h3>{p.name}</h3><p>{p.note}</p></div>)}</details><div className="comparison-document-grid">{comparisonDocuments.filter(d => sourceIds.has(d.id)).map(doc => <DocumentCard key={doc.id} doc={doc} route={route}/>)}</div></details>
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
