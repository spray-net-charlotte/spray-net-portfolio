# Coating Comparison Source Register

Checked November 19, 2026. Scope: **cabinet refinishing primer and topcoat**, not interior wall paint. The initial reference set is not a market-share ranking. No pricing is included.

## Source files and traceability

`src/data/comparisonDocuments.js` records the identity, source URL where available, printed date or footer code, page count, local path and SHA-256 of every original. `src/data/comparisons.js` stores the transcribed figures and their limitations. All 57 captured source PDFs, 438 page images and per-page extracted text are in `public/media/comparison/<document-id>/`. The in-app reader stays inside the portfolio, supports fullscreen and selectable text, and works offline after service-worker installation.

Spray-Net originals were retrieved from the existing South Charlotte sales library (`Sales/Spray-Net VS the World`) and cross-checked with Ezee Assist's references in Brave. The Ezee answer was used for discovery; values were verified against the PDFs, including visual inspection of the benchmark table. Ezee-generated summaries are not used as primary evidence. Its temporary signed attachment links are not published.

| Document | Edition / exact identity | Figure locations |
| --- | --- | --- |
| Spray-Net Interior Primer TDS | Stain Blocking High-Build Primer; copyright 2023, no printed revision date or G-002K code | Application / dry schedule p. 1; epoxy vehicle, solids, VOC basis, film and coverage p. 2 |
| Spray-Net Primer SDS | SWP 1420 / G-002K, SDS 1393; Jan. 11, 2022 | Classifications / statements p. 1; Section 3 ingredients p. 2 |
| Spray-Net Cabinet Coating TDS | Waterborne Polyurethane; SUW IR Series; copyright 2023, no printed revision date | Application / cure p. 1; chemistry, solids, two VOC bases, hardness / MEK / adhesion p. 2 |
| Spray-Net Cabinet Coating SDS | SDS 1203; Jan. 12, 2022 | Classifications / statements p. 1; Section 3 ingredients p. 2 |
| Spray-Net A-003 Catalyst SDS | SDS 1112; Apr. 2, 2026 | Classification and 80% water / 20% polycarbodiimide p. 1; PPE / physical properties p. 3 |
| Spray-Net Cabinet Coating Test Results | No printed test date, exact tested SKU, sheen, batch or cure schedule | All results p. 1; explicitly in-house ASTM / KCMA methods |
| INSL-X Stix TDS | SXA-110, White; footer `102726` | Technical data / cure discussion p. 1 |
| INSL-X Stix SDS | SXA-1100, White; Dec. 30, 2024 | Section 2 p. 1; Section 3 p. 2 |
| Zinsser B-I-N TDS | BIN-03; Sept. 12, 2019; liquid shellac primer, SKU 00904 included | Drying p. 2; physical properties p. 3 |
| Zinsser B-I-N SDS | SKU 904 quart; Sept. 15, 2026 | Section 2 p. 1; Section 3 p. 2 |
| Benjamin Moore ADVANCE TDS | Satin 792, Base 1; footer `070122` | Technical data and 30-day hardness qualification p. 1 |
| Benjamin Moore ADVANCE SDS | 792-1X, Base 1; Jan. 4, 2024 | Section 2 pp. 1–2; Section 3 pp. 2–3 |
| Sherwin-Williams Emerald PDS | Satin K37 series; March 2026; numerical data for Ultrawhite K37W01750 | Technical figures p. 1 |
| Sherwin-Williams Emerald SDS | Satin High Hide White K37W2751; Oct. 23, 2026 | Sections 2–3 pp. 1–2 |

## Open identity / edition issues

- The Spray-Net 2023 TDSs are the verified reference editions, **not certified current formulations**. Ezee did not establish newer primer/topcoat sheets. The Academy QR-code link to a differently named primer TDS returned 404 in Brave. Do not replace dates with the retrieval date.
- The primer TDS describes interior cabinet / furniture application but contains contradictory exterior-only boilerplate. It does not print G-002K. Preserve the original; verify a matched replacement with product support before turning it into application guidance.
- The cabinet TDS names SWC010 catalyst; the separately dated current A-003 SDS does not establish equivalence or a revised mixing instruction. The app does not give a new mixing ratio or classify the mixed system from the catalyst alone.
- Emerald's PDS is a series sheet with numerical data for **Ultrawhite**; the retrieved SDS is **High Hide White**. This difference is explicit in the UI and source cards. Its PDS also prints the inconsistent temperature pair `77°F (20°C)`; this is retained and identified, not silently corrected.
- The benchmark is a historical in-house report. A 2021 repository date from Ezee is not a printed test date and is not presented as one. Its six competitors are separate test identities, not matched to today's ADVANCE/Emerald SKUs.

## Comparison rules

- Never treat a missing value as zero or a failed test. Never compare weight solids directly with volume solids.
- Retain VOC reporting bases. Spray-Net's `<150 g/L minus water/exempt` and `<65 g/L applied` are different quantities. A lower VOC figure alone does not prove lower exposure, safer application, lower cured-film emissions or longer life.
- Coverage must retain its film thickness and theoretical/practical basis. No automatic best-product scoring.
- SDS Section 2 classifications and selected Section 3 disclosed ingredients are shown where a matched source is captured; missing classifications remain unverified. Signal words and category numbers are not a universal safety score; ingredients are not the complete recipe. Classification differences may reflect jurisdiction, reporting rules and source editions. Do not claim any complete system is non-toxic from the catalyst SDS.
- The ASTM D3363 pencil scale is ordinal, not a ratio. HB versus 7B does not mean a percentage or multiple. Persoz seconds (ASTM D4366) are a different test.
- Reported MEK counts and KCMA results apply to their test, not every household chemical or real-world service life. Do not call the in-house sheet an independent certification.
- Keep full originals and metadata when adding data; update the source register and rerun validation / tablet tests. Do not add unsupported safety, superiority or warranty claims.

## Warranty references

Official cabinet FAQ: https://www.spray-net.com/faqs/what-is-your-warranty-for-kitchen-cabinets

Official contract FAQ: https://www.spray-net.com/faqs/how-does-my-contract-warranty-work

Checked November 19, 2026. The cabinet FAQ advertises a 15-year no-peel service warranty and distinguishes chips, scratches, accidental damage and wood damage. The contract FAQ describes product / labor peeling coverage subject to the written proposal. The app summarizes this scope and points to the customer's written agreement; it does not create new terms or imply that laboratory results prove a 15-year lifespan. The full current South Charlotte customer contract was not part of this source set.


## Expanded Primer Sheet — 1.8.1

Six competitor primers now appear on one sheet. Selection covers general-purpose acrylic, solvent-based stain blocking, and specialty bonding; no sales-volume survey establishes a most-used ranking. KILZ 2 and Bulls Eye 1-2-3 supply the general-purpose end of the range. A lower price tier is not proof of poor performance.

- KILZ 2 No. 2000 U.S. TDS, March 2019: specifications p. 1. Manufacturer CDN source is recorded in metadata. The manufacturer-linked 3E catalog supplied the matching U.S. March 7, 2024 SDS (Sections 2–3, p. 1).
- Bulls Eye 1-2-3: BEY123-01 TDS, February 8, 2022, physical data p. 3; SKU 2001 SDS, November 5, 2025, Sections 2–3 p. 1. No assigned signal word is preserved alongside the 11% unknown acute-toxicity statement.
- High Hide Cover Stain: CVS-04 TDS, March 18, 2022, physical data p. 3; explicitly the 350 VOC formulation. Matched SKU 3551 SDS, November 1, 2022, Sections 2–3 pp. 1–2.
- Extreme Bond: PDS October 2023, technical data p. 1; White B51W1150 SDS, November 3, 2026, Sections 2–3 pp. 1–2. PDS lists White but prints Clear B51W01150 above its numerical block; the discrepancy is retained in product notes.

All eight added source documents include original hashes, complete page images, extracted text and offline caching. Exterior is a navigation entry with an explicit empty state, not a populated or verified comparison yet.


Matching SDS follow-up: KILZ 2 U.S. No. 2000, March 7, 2024, retrieved from the English / U.S. entry in the manufacturer-linked 3E catalog (Sections 2–3, p. 1). High Hide Cover Stain SKU 3551 SDS, November 1, 2022, retrieved from Rust-Oleum (Sections 2–3, pp. 1–2). Earlier pending-SDS notes above are resolved; no other SKU was substituted.


## Professional expansion — 1.8.2

See [Professional coating references](PROFESSIONAL-COATINGS.md) for all additional products, exact source editions, catalyst scope, regional Renner references and remaining source gaps. The current set contains 39 originals and 287 rendered pages. The 1.8.1 six-primer section above records that earlier source set; the current primer sheet has ten competitor references.


## Source gap closure — 1.8.3

Added 11 original manufacturer documents: U.S. SDS for Renner 083, 643, U688 and M785; M403 / M404 hardeners; C1491 Care Catalyst; manufacturer TDS for 083 and U688; Krystal (May 2010) and MagnaMax (January 2011) laboratory-result brochures. All displayed base coatings now have captured SDS. Renner’s public SDS page supplies direct public PDF links; its previously inaccessible product-page buttons do not describe current SDS availability. Original editions are retained separately.

Gallery PDS p. 2 reports ASTM D3363 pencil hardness 6H after seven-day drying. The earlier statement that no numerical hardness result was published was incorrect and is replaced. Spray-Net’s HB result remains identified as its separate historical study; it is not a matched cure / sheen comparison.

Renner SDS §9.2 VOC / total solids are identified separately from TDS figures and from mixed / catalyzed coatings. The SDS total-solids test at 250°C is not relabeled weight or volume solids. Base classifications are separate from hardener classifications. Renner 083’s empty ingredient table is represented as no Section 3 concentrations disclosed, not missing SDS or a full-formula disclosure.

The in-app manufacturer tables include all 28 chemical and six performance results from each M.L. Campbell brochure, including the 77% sulfuric-acid rating of 1 and MagnaMax nail-polish-remover rating of 4. Krystal’s original is scanned; its accessible text is explicitly a manual table transcription checked against rendered p. 2. Current product pages corroborate most ratings but do not replace the captured dated study. No current HP3920 or Renner numerical MEK / Persoz result was verified in the reviewed manufacturer material; those cells remain unreported. Retailer opinions, informal videos, and unrelated products were not substituted for measured values.


## Centurion, Milesi and certification evidence — 1.8.4

- **Centurion 1800 Series CW-3116 Satin White:** undated CW-3115–3118 TDS; October 21, 2020 base and CW-4002 catalyst SDS. TDS solids: 38.77 ± 1% volume, 46.34 ± 1% weight. VOC: 109.98 g/L minus exempt / 48.55 g/L as supplied. Catalyst 20%, pot life five hours. KCMA is a manufacturer compliance claim without an attached report. The base SDS prints Warning alongside Aspiration Hazard Category 1; the chart preserves and flags this inconsistency. The catalyst SDS also contains inconsistent classification wording. No current-formula equivalence is assumed.
- **Milesi HKR116 White 10 Gloss:** December 2016 HKR111-series TDS; July 23, 2021 U.S. base SDS, version 102. HNB40 schedule: 10% weight / 11.5% volume, two-hour pot life, touch dry two hours and complete drying 96 hours at 18–22°C / 65–70% RH. Base solids 49.2 ± 2%, mixed solids 50.1 ± 2%, with basis unspecified. Base SDS VOC 47.4 g/L / 3.87%, reporting basis unspecified; Warning / Skin Sensitization Category 1. HNB40 SDS is March 2017 Bulgarian / EU CLP only, explicitly not verified as a current U.S. formula. HNB3 and HNB1 schedules are separate alternatives, not combined. A retailer HKR116 TDS link led to another product series and was excluded.
- **COMMAND HP3920:** Berkeley Analytical certificate 251023-06, October 23, 2025, CDPH v1.2 (2017) chamber emissions; classroom / office scenarios, 14-day TVOC ≤0.5 mg/m³. The original includes manufacturer ClearChem declaration pages and the laboratory certificate on page 4. This measures emissions, not hardness, chemical resistance or a 15-year lifetime.

The new KCMA / ANSI row covers every product. KCMA A161.1 Quality certifies cabinet designs including structure, drawers, doors and finish; Severe Use and ESP are distinct programs, not paint grades. ANSI does not certify products. Finish-test reports and manufacturer compliance claims are identified separately; no cabinet-line certificate is verified here. Unknown is not a failed test. Sources: https://kcma.org/certification and https://ansi.org/standards-faqs (checked November 19, 2026). Edit `src/data/kcmaEvidence.js` when new product-specific evidence becomes available.

No category average is calculated: unmatched protocols, cure schedules, products, editions and units do not establish a defensible industry benchmark. Milesi family-level scratch / outdoor certifications are not assigned to HKR116. All seven additions preserve original PDF hashes, complete page images and offline text. Total: 57 documents / 438 pages.
