import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Icon from '../components/Icon';
import BrandEmblem from '../components/BrandEmblem';
import Photo from '../components/Photo';
import Lightbox from '../components/Lightbox';
import { mediaUrl } from '../lib/media';
import { closeOverlay, updateQuery } from '../lib/navigation';
import { benchmarkProducts, benchmarkRows, catalystSafety, coatingProducts, comparisonChecked, comparisonDocuments, comparisonGroups, specificationRows } from '../data/comparisons';
import '../comparison.css';

const views = [['specs', 'Specifications'], ['safety', 'Safety & Materials'], ['benchmarks', 'Benchmarks'], ['sources', 'Source Documents']];
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
function DataTable({ title, ours, peer, rows }) {
  return <div className="coating-table-wrap"><table className="coating-table">
    <caption className="sr-only">{title}</caption>
    <thead><tr><th scope="col">Property</th><th scope="col"><span className="small-caps">SPRAY-NET</span>{ours}</th><th scope="col">{peer}</th></tr></thead>
    <tbody>{rows.map(([label, note, left, right]) => <tr key={label}><th scope="row">{label}{note && <span>{note}</span>}</th><td>{left}</td><td>{right}</td></tr>)}</tbody>
  </table></div>;
}
function SafetyCard({ product, route, ours }) {
  const safety = product.safety;
  return <article className={`coating-safety-card ${ours ? 'is-spraynet' : ''}`}>
    <p className="small-caps">{ours ? 'SPRAY-NET' : 'COMPARISON PRODUCT'}</p>
    <h2>{product.name}</h2><p className="comparison-document-edition">{safety.edition}</p>
    <p className="coating-signal">Signal Word: {safety.signal}</p>
    <ul>{safety.classes.map((item) => <li key={item}>{item}</li>)}</ul>
    <p>{safety.summary}</p>
    <details className="comparison-ingredients"><summary>Listed Ingredients &amp; CAS Numbers</summary>
      <p>Section 3 disclosures, by weight. These lists are not complete formulations.</p>
      <dl>{safety.ingredients.map(([name, cas, amount]) => <div key={cas}><dt>{name}<small>CAS {cas}</small></dt><dd>{amount}</dd></div>)}</dl>
    </details>
    <SourceLink id={product.sds} route={route}>Read SDS · {safety.pages}</SourceLink>
  </article>;
}
function DocumentCard({ doc, route }) {
  return <a className="comparison-document-card" href={sourceHref(doc.id, route)}>
    <span className="comparison-doc-kind">{doc.kind}</span><h3>{doc.title}</h3><p>{doc.variant}</p><p className="comparison-document-edition">{doc.edition}</p><span className="comparison-document-open">Read {doc.pages} {doc.pages === 1 ? 'Page' : 'Pages'}<Icon name="arrow" size={20} /></span>
  </a>;
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
      <p>Extracted text for reading and screen readers. Refer to the original page for table layout and symbols.</p>
      {text ? <pre>{text[page]}</pre> : failed ? <><p role="alert">Page text could not load. The original page is available below.</p><button className="button button-dark" onClick={() => setRetry(retry + 1)}>Try Again</button><Photo src={images[page].src} alt={images[page].alt} eager /></> : <p role="status">Loading page text…</p>}
    </div> : <button className="comparison-page-image" aria-label={`View page ${page + 1} fullscreen`} onClick={() => updateQuery(route, 'full', '1', false)}><Photo key={page} src={images[page].src} alt={images[page].alt} eager /></button>}
    <details className="comparison-provenance"><summary>Document Details &amp; Source</summary><p>{doc.sourceLabel}. Checked {comparisonChecked}.</p>{doc.sourceUrl && <p className="comparison-source-url">{doc.sourceUrl}</p>}<p>SHA-256: <code>{doc.sha256}</code></p><p>The original PDF and all {doc.pages} page images are included in the offline portfolio. This copy preserves the source edition; a newer formulation may have a different sheet.</p></details>
    {route.params.get('full') === '1' && <Lightbox images={images} index={page} onChange={setPage} onClose={() => closeOverlay(route, 'full')} />}
  </section>;
}

export default function Comparison({ route, documentId }) {
  const doc = docById(documentId);
  if (documentId) return doc ? <DocumentView key={doc.id} doc={doc} route={route} /> : <><PageHeader back="/comparison" backLabel="Comparison" title="Document Not Found" description="Choose a source from the comparison library." /><a className="button button-dark" href="#/comparison?view=sources">Browse Source Documents</a></>;
  const groupKey = route.params.get('coat') === 'primer' ? 'primer' : 'paint';
  const group = comparisonGroups[groupKey];
  const ours = coatingProducts[group.ours];
  const peerKey = group.peers.includes(route.params.get('peer')) ? route.params.get('peer') : group.peers[0];
  const peer = coatingProducts[peerKey];
  const view = views.some(([key]) => key === route.params.get('view')) ? route.params.get('view') : 'specs';
  const benchmark = benchmarkProducts.find((item) => item.id === route.params.get('test')) || benchmarkProducts[0];
  const sourceIds = new Set([ours.tds, ours.sds, ...group.peers.flatMap((id) => [coatingProducts[id].tds, coatingProducts[id].sds]), ...(groupKey === 'paint' ? ['sn-catalyst-sds', 'sn-benchmark'] : [])]);
  return <section className="coating-comparison">
    <PageHeader eyebrow="THE DETAILS BEHIND THE FINISH" title="Coating Comparison" description="Explore the chemistry, specifications and test results behind our cabinet finishing system." />
    <ChoiceGroup label="Coating type" options={Object.entries(comparisonGroups).map(([key, value]) => [key, value.label])} value={groupKey} onChange={(value) => updateQuery(route, 'coat', value)} />
    <div className="comparison-system-note"><BrandEmblem size={34} /><p><strong>Made for Cabinets.</strong> Interior primer and cabinet topcoat references. Each figure stays with its product, source edition and test method.</p></div>
    <ChoiceGroup label="Comparison view" options={views} value={view} onChange={(value) => updateQuery(route, 'view', value)} />
    {(view === 'specs' || view === 'safety') && <>
      <div className="comparison-peer-picker"><span>Compare With</span><ChoiceGroup label="Comparison product" options={group.peers.map((key) => [key, coatingProducts[key].name])} value={peerKey} onChange={(value) => updateQuery(route, 'peer', value)} /></div>
      <div className="comparison-editions"><p><strong>{ours.name}</strong>{ours.note}</p><p><strong>{peer.name}</strong>{peer.note}</p></div>
    </>}
    {view === 'specs' && <>
      <DataTable title={`${group.label} published technical specifications`} ours={ours.name} peer={peer.name} rows={specificationRows.filter(([key]) => groupKey === 'paint' || !['persoz', 'adhesion', 'mek'].includes(key)).map(([key, label, help]) => [label, help, ours.specs[key] || 'Not reported in this TDS', peer.specs[key] || 'Not reported in this TDS'])} />
      <div className="comparison-source-row"><SourceLink id={ours.tds} route={route}>Spray-Net TDS · Pages 1–2</SourceLink><SourceLink id={peer.tds} route={route}>{peer.name} {peer.id === 'emerald' ? 'PDS' : 'TDS'} · {peer.id === 'bin' ? 'Pages 2–3' : 'Page 1'}</SourceLink></div>
      <p className="comparison-reading-note">Published specifications describe each coating. They are not a head-to-head performance test. Unreported values remain unreported; coverage, solids and drying times do not establish an overall ranking.</p>
    </>}
    {view === 'safety' && <>
      <p className="comparison-reading-note">SDS classifications describe the supplied product and handling hazards. They do not rank the safety of a cured kitchen finish. VOC content is different from measured indoor-air emissions. Follow the full SDS, ventilation and protective-equipment requirements for every component.</p>
      <div className="comparison-safety-grid"><SafetyCard product={ours} ours route={route} /><SafetyCard product={peer} route={route} /></div>
      {groupKey === 'paint' && <article className="comparison-catalyst"><h3>{catalystSafety.name}</h3><p className="comparison-document-edition">{catalystSafety.edition}</p><p><strong>{catalystSafety.classes[0]} · {catalystSafety.signal}</strong></p><p>{catalystSafety.summary}</p><SourceLink id="sn-catalyst-sds" route={route}>Read Catalyst SDS · Pages 1–2</SourceLink></article>}
    </>}
    {view === 'benchmarks' && (groupKey === 'primer' ? <div className="comparison-empty"><Icon name="layers" size={36} /><h2>Primer Benchmarking</h2><p>A matched primer benchmark report is not included in this source set. Explore the published primer specifications or switch to Interior Paint for cabinet coating tests.</p><button className="button button-dark" onClick={() => updateQuery(route, 'coat', 'paint')}>See Cabinet Coating Tests<Icon name="arrow" size={18} /></button></div> : <>
      <div className="comparison-benchmark-intro"><p className="eyebrow">IN-HOUSE CABINET COATING TESTS</p><h2>The Finish, Put to the Test.</h2><p>Hardness, solvent resistance, household stains and washing. These are results reported in our cabinet coating comparison sheet, using the ASTM and KCMA methods listed below.</p><p className="comparison-reading-note">No test date, exact competitor SKUs, sheen, batch or cure schedule is printed. Treat these as the report’s historical results, not proof of performance for today’s formulations or an independent certification.</p></div>
      <label className="comparison-benchmark-select">Comparison in the Report<select value={benchmark.id} onChange={(event) => updateQuery(route, 'test', event.target.value)}>{benchmarkProducts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <DataTable title="In-house cabinet coating benchmark results" ours="Kitchen Cabinet Paint" peer={benchmark.name} rows={benchmarkRows.map(([label, method, result, key, index]) => [label, method, result, index === undefined ? benchmark[key] : benchmark[key][index]])} />
      <SourceLink id="sn-benchmark" route={route}>Read the Complete Benchmark Report · Page 1</SourceLink>
      <p className="comparison-reading-note">Pencil hardness (HB) and Persoz pendulum hardness (80 seconds in our TDS, ASTM D4366) are different measurements. A MEK rub result describes this solvent test; it does not establish resistance to every chemical.</p>
    </>)}
    {view === 'sources' && <><div className="comparison-library-heading"><h2>The Source Library</h2><p>TDS / PDS: technical specifications. SDS: handling, ingredients and safety. All pages are included for offline reading once the portfolio is ready offline.</p></div><div className="comparison-document-grid">{comparisonDocuments.filter((item) => sourceIds.has(item.id)).map((item) => <DocumentCard key={item.id} doc={item} route={route} />)}</div></>}
    <aside className="comparison-warranty"><Icon name="shield" size={34} /><div><h2>Our 15-Year No-Peel Warranty</h2><p>Our cabinet refinishing service includes a 15-year warranty against peeling, subject to your written proposal and warranty terms. Chips, scratches, accidental damage and wood / substrate damage are not blanket-covered. Your written agreement defines coverage and exclusions.</p><p>Preparation, application and the complete coating system matter. Laboratory results support an understanding of the finish; they do not calculate a 15-year service life.</p><details><summary>Warranty Reference</summary><p>Spray-Net cabinet-warranty FAQ and contract-warranty FAQ, checked {comparisonChecked}.</p><p className="comparison-source-url">spray-net.com/faqs/what-is-your-warranty-for-kitchen-cabinets<br />spray-net.com/faqs/how-does-my-contract-warranty-work</p></details></div></aside>
    <p className="comparison-reviewed">Source set checked {comparisonChecked}. Product editions and bases are identified above. New sheets can be added as they become available.</p>
  </section>;
}
