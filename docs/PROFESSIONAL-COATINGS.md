# Professional Coating References — Portfolio 1.8.3

The comparison includes 50 captured manufacturer / Spray-Net documents and 384 pages. Every displayed coating has a captured SDS. Brand buttons, pinned headings, and pinned property / Spray-Net columns keep the comparison navigable on tablets. All originals, page images and accessible text cache offline.

## New source documents

| Source | Edition / variant | Data locations |
| --- | --- | --- |
| Renner 083 TDS | March 3, 2023, Version 6; YI-M083/C02 White | p. 1: solids, application, coverage, drying |
| Renner U688 TDS | March 20, 2023, Version 2; U688 series | p. 1: catalysis, solids, application, drying |
| Renner 083 U.S. SDS | May 15, 2025, Revision 7; YI-M083/C02 | pp. 1–2: hazards / disclosures; p. 5: physical data |
| Renner 643 U.S. SDS | March 24, 2025, Revision 8; YL-M643/C02 | pp. 1–2: hazards / ingredients; p. 6: physical data |
| Renner U688 U.S. SDS | February 25, 2025, Revision 4; YO-30U688/SBN White | pp. 1–2: hazards / ingredients; p. 5: physical data |
| Renner M785 U.S. SDS | May 15, 2025, Revision 5; YO-10M785/SBN White | pp. 1–2: hazards / ingredients; p. 5: physical data |
| Renner YC-M404 U.S. SDS | March 25, 2025, Revision 8 | pp. 1–3: hardener classification / ingredients |
| Renner YC-M403 U.S. SDS | March 27, 2025, Revision 5 | pp. 1–3: hardener classification / ingredients |
| C1491 Care Catalyst U.S. SDS | October 23, 2026, Version 21 | pp. 1–2: classification / ingredients |
| Krystal laboratory brochure | May 2010 footer; clear conversion varnish | p. 2: 28 chemical and six performance results |
| MagnaMax laboratory brochure | January 2011 footer; clear pre-catalyzed lacquer | p. 2: 28 chemical and six performance results |

Renner's public SDS page supplies the captured direct public PDFs, even though its previously tested product-page buttons led to registered access. The 083 / U688 manufacturer TDS came from a supplier's public document collection. No registration was bypassed. Exact URLs, source hashes, original files and page counts are in `comparisonDocuments.js`.

## Values filled

Renner SDS §9.2 gives these uncatalyzed-base values:

| Product / exact base | VOC, g/L | Total solids at 250°C / 482°F |
| --- | --- | --- |
| 083 / C02 | 16 | 58.22% |
| 643 / C02 | 113 | 53.80% |
| 30U688 / SBN | 180 | 38.70% |
| 10M785 / SBN | 167 | 39.01% |

The SDS does not state the VOC subtraction basis. These values are not mixed / catalyzed coating values. The SDS total-solids test is separate from TDS solids and is not relabeled weight or volume solids. Renner 083 TDS reports 55 ± 2% solids without weight / volume basis, 6–10 m²/L coverage, 60-minute dust-free / 90-minute handling and 8–24-hour overcoating at its printed conditions.

The 083, U688 and M785 U.S. base SDS list no OSHA hazard classification but name possible allergic-reaction contributors. The 643 U.S. base SDS gives Skin Sensitization 1A. The 083 Section 3 gives no ingredient concentration table; the app says that explicitly instead of showing missing SDS or implying full formulation disclosure.

## Separate hardener safety

M403 and M404 are isocyanate-containing hardeners with Danger signal words and separately listed classifications, including respiratory / skin sensitization. C1491 Care Catalyst has a Danger signal word with flammability, skin-corrosion, eye-damage and narcotic-effects classifications. Their selected ingredient / CAS ranges and original SDS are accessible in the hardener row. M403's separate EU environmental note is not relabeled a U.S. health classification.

The separate Spray-Net A-003 SDS remains in that row. The cabinet TDS names SWC010; the A-003 sheet does not establish catalyst equivalence or an updated mixing specification. Showing base and hardener sheets does not classify the final mixed coating. Renner 643's optional M401 / M402 alternatives are not represented as captured; the linked M404 sheet covers M404 only.

## Published test results

- **Gallery PDS p. 2:** ASTM D3363 pencil hardness **6H after seven-day drying**, White B52W00010. The former missing-hardness statement was incorrect and is replaced. The separate KCMA statement does not provide individual chemical scores or a numerical MEK count.
- **Spray-Net TDS p. 2:** nine KCMA 9.4 chemical ratings of 5, KCMA 9.5 detergent / water pass, KCMA 9.2 heat / shrinkage pass, KCMA 9.3 hot / cold pass and three freeze / thaw cycles. Individual chemical exposure durations and specimen cure are not printed in this TDS. The historical in-house report remains separate with its own 24-hour exposures, HB pencil result and competitor identities.
- **Krystal brochure p. 2:** all 28 chemical and six performance ratings are included, including 20 hot / cold cycles, blocking after four-hour drying, print after 24-hour drying, cross-hatch 5 on the manufacturer's own 1–5 scale, wet heat 4, and edge soak 5. Chemical results include 77% sulfuric acid **1 / Poor**; the other listed chemical ratings are 5. Its original is scanned; accessible table text is manually transcribed and checked visually against p. 2.
- **MagnaMax brochure p. 2:** all 28 chemical and six performance ratings, including 77% sulfuric acid **1 / Poor** and nail polish remover **4 / Very Good**. Other listed chemical ratings are 5.

The brochures reference AWI / KCMA chemical contact schedules without printing individual durations. Their cross-hatch score of 5 is not an ASTM 5B classification. Matching numbers do not prove matching protocols. These manufacturer studies are separate from Spray-Net's historical head-to-head report; no newly added product is assigned those older competitor results. The brochures describe clear finish families, not every current sheen / base, and do not independently certify a 15-year service life.

## Remaining source limits

Numerical MEK / Persoz values for current COMMAND HP3920 and Renner U688 / M785 were not verified in the reviewed manufacturer material. They remain unreported. Informal review videos and results for unrelated products were excluded.

The M785 technical reference remains the February 2021 European TDS; its later U.S. SDS is identified separately and does not establish identical formulation. U688's new 2023 TDS header identifies U688 but retains some C688 references in its body; the original inconsistency is preserved. The old 2020 C688 TDS and Dutch 643 SDS remain archived separately. MagnaMax's April 2009 C148-family PDS and July 2022 MC14814SF Clear Tint Base SDS remain different variants. Krystal retains the November 2014 PDS / June 2022 base SDS alongside the separately dated catalyst / test references.

## Maintenance

Edit `professionalPrimers.js`, `professionalPaints.js` and `coatingHardeners.js`; Spray-Net and retail data are in `comparisons.js`. Preserve original PDFs, source identities, per-page images and accessible text. After updates run the build, source-integrity / evidence-link checks, tablet navigation, accessibility and offline tests. Prices are omitted.
