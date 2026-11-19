# Professional Coating References — Portfolio 1.8.2

This release expands the existing sheet with professional finishes and a visible **Find a Brand** control. It preserves all columns, pins Spray-Net and property names, and keeps brand headers visible while scrolling. It does not assign a universal product ranking from different tests, chemistry or regulatory classifications.

## Primer additions

- Sherwin-Williams White Pigmented Shellac: July 2023 PDS, B49W08150; November 1, 2026 U.S. SDS, B49W8150. Specifications p. 1; SDS classifications / ingredients pp. 1–2. Liquid shellac, not synthetic shellac or aerosol.
- Sherwin-Williams ProBlock Quick Dry Oil-Based: April 2026 PDS, PB16W0100; September 5, 2026 U.S. SDS. Specifications p. 1; SDS Sections 2–3 pp. 1–3. Oil-modified and waterbased ProBlock products are different formulas.
- Renner 643: manufacturer-authored October 26, 2020 regional TDS and April 24, 2024 Dutch / EU CLP SDS. TDS specifications p. 1; SDS classification p. 2, ingredients pp. 3–4. Classification is translated and explicitly identified as EU CLP. The reported 50 ± 2% solids has no printed weight / volume basis; it is in a separate row. The cited SDS is the basecoat, not a mixed 2K system.
- Renner 083: official Renner Process Guide identifies YI-M083/C02 in 1K cabinet systems, printed pp. 4–7. This is a guide reference, not a verified TDS/SDS; unavailable chemistry and safety fields remain unavailable.

## Paint / finishing-system additions

| Product | Source identity | Important scope |
| --- | --- | --- |
| Gallery Series | October 2024 PDS, B52W00010; August 29, 2026 SDS, B52W10 | 10 Gloss Matte White, 1K acrylic. PDS p. 1; SDS pp. 1–2. |
| COMMAND | October 8, 2026 HP3920 TDS; March 20, 2025 HP3920-7X SDS | Current HP series, not the separately listed discontinued V392. Satin / tintable-white SDS. TDS p. 1; SDS pp. 1–3. |
| Renner 688 | March 23, 2020 YO xxC688/XXX TDS, Version 3 | Regional C688 reference, not verified current U.S. U688. White and neutral solids are unqualified as to weight / volume and are not placed in either solids column. |
| Renner 785 | February 18, 2021 YO xxM785/XXX TDS, Version 17 | European two-pack reference, not a U688/U765 substitute. Solids basis unqualified. |
| Krystal | November 2014 C145-family manufacturer PDS; June 19, 2022 C14514B Satin SDS | Clear post-catalyzed amino-alkyd conversion varnish. Historical editions; not proof of current formulation. PDS pp. 1–2; SDS pp. 1–3. C1491 catalyst is separately required and its SDS is not included. |
| MagnaMax | April 2009 C148-family manufacturer PDS; July 19, 2022 MC14814SF SDS | Historical clear pre-catalyzed lacquer. SDS is Clear Tint Base Satin, a different variant from the general C148 PDS; never silently treated as the same formulation. PDS pp. 1–2; SDS pp. 1–3. |

Manufacturer-authored reference PDFs hosted by regional suppliers remain primary documents, with the actual retrieval URL and original SHA-256 in `comparisonDocuments.js`. They are not represented as current U.S. editions or as third-party testing. M.L. Campbell's public product pages confirm the conversion-varnish / pre-catalyzed-lacquer product families; their manufacturer-authored archived sheets provide the displayed figures. Download dates are not revision dates.

## Remaining source gaps

Renner's current U.S. TDS/SDS links lead to its registered-user area. Public regional manufacturer-authored sheets and the official process guide are included as explicitly dated references, not a substitute for authenticated current U.S. sheets. Matched Renner 083, C688 and M785 SDS / hardener sheets are not verified. No missing SDS is classified as safe. The complete mixed-system classifications for Krystal and Renner 2K systems are not inferred from base-component documents.

Selected ingredients are summarized to keep the sheet readable; the full captured SDS contains the complete disclosed list. Manufacturer KCMA / AWI statements are labeled as published claims. Historical Spray-Net comparative tests remain a separate table; Gallery, COMMAND, Renner and the industrial systems are not retroactively assigned those test results.

## Updating

Edit `src/data/professionalPrimers.js` or `src/data/professionalPaints.js`, product order in `comparisons.js`, and source metadata in `comparisonDocuments.js`. Every captured original, page image and extracted-text file is precached. Add only matched editions, then run the content build and coating-comparison tests. Full metadata, hashes and dates are maintained per document. Prices are intentionally omitted.
