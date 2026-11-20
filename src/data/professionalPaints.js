// Verified manufacturer reference editions; source identities are recorded per document.
export const professionalPaints = {
  "gallery": {
    "id": "gallery",
    "name": "Sherwin-Williams Gallery Series",
    "brand": "Sherwin-Williams",
    "detail": "1K Waterborne Acrylic · 10 Gloss Matte White",
    "tds": "gallery-tds",
    "sds": "gallery-sds",
    "note": "October 2024 PDS, B52W00010; August 2026 U.S. SDS, B52W10. White 10 Gloss reference; other sheens and bases differ.",
    "specs": {
      "system": "Professional Waterborne · Pigmented / White",
      "catalysis": "1K · single component",
      "resin": "Acrylic",
      "volume": "27 ± 2%",
      "weight": "38 ± 2%",
      "voc": "176 g/L · less exempt solvents, 40 CFR 59.406",
      "wet": "3–4 mil",
      "dry": "0.9–1.2 mil per coat; maximum 4 mil total system",
      "coverage": "400–430 sq ft · 1 mil dry, no loss",
      "touch": "30 minutes · 77°F, 50% RH",
      "recoat": "45 minutes",
      "cure": "Stackable 24 hours; full cure not specified",
      "pencil": "6H · ASTM D3363 · 7-day dry · White B52W00010",
      "performance": "PDS p. 2 reports 6H pencil hardness after seven days. PDS p. 1 states KCMA hardness / household-chemical requirements are met when properly applied; no individual chemical scores or MEK count are printed."
    },
    "safety": {
      "signal": "Warning",
      "edition": "August 29, 2026 · B52W10 · U.S.",
      "classes": [
        "Carcinogenicity · Category 2"
      ],
      "summary": "The supplied-product SDS identifies a suspected cancer hazard. Unknown acute toxicity: 1.2% dermal and 2.5% inhalation.",
      "ingredients": [
        [
          "Titanium Dioxide",
          "13463-67-7",
          "≥10–≤30%"
        ],
        [
          "2-(2-Butoxyethoxy)ethanol",
          "112-34-5",
          "≥1–≤5%"
        ],
        [
          "2-(2-Ethoxyethoxy)ethanol",
          "111-90-0",
          "≥0.5–≤1.5%"
        ],
        [
          "2-Butoxyethanol",
          "111-76-2",
          "≥0.5–≤1.5%"
        ]
      ],
      "pages": "Sections 2–3 · Pages 1–2"
    },
    "specSources": {
      "pencil": "gallery-tds"
    }
  },
  "command": {
    "id": "command",
    "name": "Benjamin Moore COMMAND",
    "brand": "Benjamin Moore",
    "detail": "1K Acrylic Urethane · Satin HP3920",
    "tds": "command-tds",
    "sds": "command-sds",
    "note": "Current HP3920 reference: October 2026 TDS; March 2025 SDS for HP3920-7X Tintable White. The older V392 series is separately listed as discontinued by the manufacturer; its data is not substituted.",
    "specs": {
      "system": "Professional Waterborne · Pigmented",
      "catalysis": "1K · single component",
      "resin": "Acrylic Urethane",
      "volume": "41 ± 2% · TDS labels this mixed",
      "voc": "<50 g/L · subtraction basis not stated",
      "wet": "3.6–4.6 mil",
      "dry": "1.5–1.9 mil",
      "coverage": "350–450 sq ft · at stated film thickness",
      "touch": "15 minutes · 77°F, 50% RH",
      "recoat": "1 hour",
      "cure": "24-hour return to service; full cure not specified",
      "performance": "TDS describes adhesion, abrasion resistance and early block resistance, but prints no numerical pencil, Persoz or MEK test result. General performance statements are not substituted for test counts.",
      "emissions": "CDPH v1.2 (2017) compliant · classroom / private-office scenarios; 14-day TVOC ≤0.5 mg/m³. Berkeley Analytical certificate 251023-06, October 23, 2025. Emissions testing, not a durability benchmark."
    },
    "safety": {
      "signal": "Warning",
      "edition": "March 20, 2025 · HP3920-7X · U.S.",
      "classes": [
        "Eye Irritation · Category 2A",
        "Skin Sensitization · Category 1"
      ],
      "summary": "The supplied-product SDS identifies serious eye irritation and possible skin allergy.",
      "ingredients": [
        [
          "Titanium Dioxide",
          "13463-67-7",
          "15–20%"
        ],
        [
          "Kaolin",
          "1332-58-7",
          "1–5%"
        ],
        [
          "Zinc Phosphate",
          "7779-90-0",
          "1–5%"
        ],
        [
          "Ammonium Hydroxide",
          "1336-21-6",
          "0.1–0.5%"
        ],
        [
          "C12–14 Alcohols, Ethoxylated",
          "68439-50-9",
          "0.1–0.5%"
        ],
        [
          "Iodopropynyl Butylcarbamate",
          "55406-53-6",
          "0.1–0.5%"
        ]
      ],
      "pages": "Sections 2–3 · Pages 1–3"
    },
    "extraSources": [
      "command-emissions"
    ],
    "specSources": {
      "emissions": "command-emissions"
    }
  },
  "renner688": {
    "id": "renner688",
    "name": "Renner 688 Kitchen Topcoat",
    "brand": "Renner",
    "detail": "2K Waterborne · U688 · 30 Gloss White SDS",
    "tds": "renner-u688-tds",
    "extraSources": [
      "renner-guide",
      "renner688-tds"
    ],
    "note": "March 2023 U688-series manufacturer TDS, Version 2; February 25, 2025 U.S. SDS, Revision 4, YO-30U688/SBN White. The TDS retains some C688 references in its body; its header identifies U688. The older regional C688 TDS is archived separately. SDS values describe the uncatalyzed 30-gloss white base; hardener and mixed-system properties differ.",
    "specs": {
      "system": "Professional 2K Waterborne · White / Neutral",
      "catalysis": "2023 U688 TDS: YC-M403 or M404 at 10–15%; 15% for best chemical / physical resistance. Separate component SDS sheets are included.",
      "resin": "2K Waterborne Kitchen Topcoat · resin family not specified in TDS",
      "unqualifiedSolids": "White 42 ± 3%; neutral 32 ± 3% · sheet does not state weight / volume basis",
      "wet": "150 µm maximum vertical wet hold (about 5.9 mil); 100–150 g/m² coat weight",
      "coverage": "7–10 m²/L (about 285–407 sq ft/U.S. gal) · source application rate",
      "touch": "Dust-free 45 minutes; handling 4 hours · 20°C, 45–65% RH, 120 g/m²",
      "cure": "Stackable 24 hours in air-dry schedule; full cure not specified",
      "voc": "180 g/L (5.60%) · U.S. YO-30U688/SBN base SDS §9.2; subtraction basis not stated",
      "sdsSolids": "38.70% at 250°C / 482°F · U.S. YO-30U688/SBN base SDS §9.2"
    },
    "safety": {
      "signal": "No Signal Word",
      "edition": "February 25, 2025 · Revision 4 · YO-30U688/SBN · U.S. HazCom",
      "classes": [
        "Not Classified as Hazardous in This U.S. SDS"
      ],
      "summary": "The base SDS lists no hazard classification, but names CMIT/MIT, BIT and tetramethyldecynediol as possible allergic-reaction contributors. This classification does not include the required M403 / M404 hardener.",
      "ingredients": [
        [
          "2-Butoxyethanol",
          "111-76-2",
          "2–<3%"
        ]
      ],
      "pages": "Sections 2–3 · Pages 1–2"
    },
    "sds": "renner688-us-sds",
    "hardeners": [
      "m403",
      "m404"
    ],
    "specSources": {
      "voc": "renner688-us-sds",
      "sdsSolids": "renner688-us-sds"
    }
  },
  "renner785": {
    "id": "renner785",
    "name": "Renner 785 Two-Pack Topcoat",
    "brand": "Renner",
    "detail": "2K Waterborne · M785 · 10 Gloss White SDS",
    "tds": "renner785-tds",
    "note": "February 2021 M785-series European TDS, Version 17; May 15, 2025 U.S. SDS, Revision 5, YO-10M785/SBN White. Technical and safety editions / jurisdictions remain identified separately; identical formulation across them is not established. SDS VOC / total solids belong to the U.S. 10-gloss white base only. Not a U688/U765 substitute.",
    "specs": {
      "system": "Professional 2K Waterborne · White / Neutral",
      "catalysis": "Regional TDS: YC-M403 at 4–10%; alternative hardeners are listed. Match product / hardener editions before use.",
      "resin": "Two-Pack Water-Based Topcoat · resin family not specified",
      "unqualifiedSolids": "White 37 ± 3%; neutral 29 ± 3% · sheet does not state weight / volume basis",
      "wet": "150 µm vertical wet hold (about 5.9 mil); 100–150 g/m² per coat",
      "touch": "Dust-free 30 minutes; handling 4 hours · 20°C, 45–65% RH, 120 g/m²",
      "cure": "Stackable 16 hours in air-dry schedule; full cure not specified",
      "voc": "167 g/L (4.72%) · U.S. YO-10M785/SBN base SDS §9.2; subtraction basis not stated",
      "sdsSolids": "39.01% at 250°C / 482°F · U.S. YO-10M785/SBN base SDS §9.2"
    },
    "safety": {
      "signal": "No Signal Word",
      "edition": "May 15, 2025 · Revision 5 · YO-10M785/SBN · U.S. HazCom",
      "classes": [
        "Not Classified as Hazardous in This U.S. SDS"
      ],
      "summary": "The base SDS lists no hazard classification, but names MIT, CMIT/MIT and BIT preservatives as possible allergic-reaction contributors. The separately supplied hardener has its own classification.",
      "ingredients": [
        [
          "2-(2-Butoxyethoxy)ethanol",
          "112-34-5",
          "1.5–<2%"
        ]
      ],
      "pages": "Sections 2–3 · Pages 1–2"
    },
    "sds": "renner785-us-sds",
    "hardeners": [
      "m403",
      "m404"
    ],
    "specSources": {
      "voc": "renner785-us-sds",
      "sdsSolids": "renner785-us-sds"
    }
  },
  "krystal": {
    "id": "krystal",
    "name": "M.L. Campbell Krystal",
    "brand": "M.L. Campbell",
    "detail": "Post-Catalyzed Conversion Varnish · Clear",
    "tds": "krystal-tds",
    "sds": "krystal-sds",
    "note": "Historical manufacturer-authored C145-family PDS, November 2014; C14514B Satin base SDS, June 2022. Clear finishing system, not pigmented cabinet paint. These editions do not certify today’s formula. The separate October 2026 C1491 Care Catalyst SDS is included. Base and hardener classifications are not a classification of the combined mixed system.",
    "specs": {
      "system": "Industrial Solvent-Borne · Clear Conversion Varnish",
      "catalysis": "Post-catalyzed · C1491 Care Catalyst; PDS specifies 12.8 fl oz per U.S. gallon (10:1). Separate catalyst hazards must also be considered.",
      "resin": "Post-Catalyzed Amino Alkyd",
      "volume": "34 ± 2% · packaged",
      "weight": "42 ± 5% · packaged",
      "voc": "Packaged 551–560 g/L; catalyzed at 10%: 564–573 g/L · PDS reporting basis",
      "wet": "4–5 mil per coat",
      "dry": "Maximum 4–5 mil total dry system; per-coat dry thickness not specified",
      "coverage": "524 ± 25 sq ft · theoretical at 1 mil dry; excludes spray loss",
      "touch": "15–25 minutes · 77°F",
      "recoat": "After complete drying; sand between coats",
      "cure": "Stacking dry 4–8 hours; full cure not specified",
      "performance": "34 manufacturer-reported chemical / performance results are included, with source and test conditions. Clear finish; brochure does not establish current SKU / sheen / batch."
    },
    "safety": {
      "signal": "Danger",
      "edition": "June 19, 2022 · C14514B Satin · base component only",
      "classes": [
        "Flammable Liquid · Category 2",
        "Skin Irritation · Category 2",
        "Serious Eye Damage · Category 1",
        "Carcinogenicity · Category 1A",
        "Specific Target Organ Toxicity, Single Exposure · Category 3 (Respiratory Irritation / Narcotic Effects)",
        "Specific Target Organ Toxicity, Repeated Exposure · Category 2"
      ],
      "summary": "The base SDS identifies fire, eye damage, irritation, cancer and organ-exposure hazards and notes formaldehyde. The catalyst is a separate component; this is not a complete mixed-system assessment.",
      "ingredients": [
        [
          "n-Butyl Acetate",
          "123-86-4",
          "≥25–≤50%"
        ],
        [
          "Ethanol",
          "64-17-5",
          "≤10%"
        ],
        [
          "1-Butanol",
          "71-36-3",
          "≤9.1%"
        ],
        [
          "Isobutylated Urea-Formaldehyde Polymer",
          "68002-18-6",
          "≤5%"
        ],
        [
          "Cellulose Nitrate",
          "9004-70-0",
          "≤3%"
        ],
        [
          "Formaldehyde (Maximum)",
          "50-00-0",
          "<0.1%"
        ]
      ],
      "pages": "Sections 2–3 · Pages 1–3"
    },
    "extraSources": [
      "krystal-performance"
    ],
    "tests": {
      "source": "krystal-performance",
      "conditions": "Manufacturer laboratory results · clear finish · May 2010 brochure. AWI / KCMA chemical exposure schedules are referenced without individual durations. Scale: 5 Excellent, 4 Very Good, 3 Good, 2 Fair, 1 Poor. Not the same study as Spray-Net’s historical head-to-head test.",
      "values": [
        [
          "Vinegar",
          "5 · Excellent"
        ],
        [
          "Lemon Juice",
          "5 · Excellent"
        ],
        [
          "Orange Juice",
          "5 · Excellent"
        ],
        [
          "Grape Juice",
          "5 · Excellent"
        ],
        [
          "Ketchup",
          "5 · Excellent"
        ],
        [
          "Coffee",
          "5 · Excellent"
        ],
        [
          "Olive Oil",
          "5 · Excellent"
        ],
        [
          "Boiling Water",
          "5 · Excellent"
        ],
        [
          "Cold Water",
          "5 · Excellent"
        ],
        [
          "Nail Polish Remover",
          "5 · Excellent"
        ],
        [
          "Household Ammonia",
          "5 · Excellent"
        ],
        [
          "VM&P Naphtha",
          "5 · Excellent"
        ],
        [
          "Isopropyl Alcohol",
          "5 · Excellent"
        ],
        [
          "Wine",
          "5 · Excellent"
        ],
        [
          "Windex",
          "5 · Excellent"
        ],
        [
          "409 Cleaner",
          "5 · Excellent"
        ],
        [
          "Lysol",
          "5 · Excellent"
        ],
        [
          "33% Sulfuric Acid",
          "5 · Excellent"
        ],
        [
          "77% Sulfuric Acid",
          "1 · Poor"
        ],
        [
          "28% Ammonium Hydroxide",
          "5 · Excellent"
        ],
        [
          "Gasoline",
          "5 · Excellent"
        ],
        [
          "Murphy’s Oil Soap",
          "5 · Excellent"
        ],
        [
          "Vodka 100 Proof",
          "5 · Excellent"
        ],
        [
          "1% Detergent",
          "5 · Excellent"
        ],
        [
          "10% TSP",
          "5 · Excellent"
        ],
        [
          "Ethanol / Water",
          "5 · Excellent"
        ],
        [
          "Mustard",
          "5 · Excellent"
        ],
        [
          "Acetone",
          "5 · Excellent"
        ],
        [
          "Print Resistance",
          "5 · Excellent · no print after 24-hour drying"
        ],
        [
          "Hot & Cold Check Resistance",
          "5 · Excellent · passes 20 cycles"
        ],
        [
          "Cross Hatch",
          "5 · Excellent on manufacturer’s 1–5 scale; not an ASTM 5B grade"
        ],
        [
          "Blocking",
          "5 · Excellent · after 4-hour drying"
        ],
        [
          "Wet Heat Resistance",
          "4 · Very Good"
        ],
        [
          "Edge Soak",
          "5 · Excellent"
        ]
      ]
    },
    "hardeners": [
      "care"
    ]
  },
  "magnamax": {
    "id": "magnamax",
    "name": "M.L. Campbell MagnaMax",
    "brand": "M.L. Campbell",
    "detail": "Pre-Catalyzed Lacquer · Clear",
    "tds": "magnamax-tds",
    "sds": "magnamax-sds",
    "note": "Historical C148-family clear PDS, April 2009. The July 2022 SDS is MC14814SF Clear Tint Base Satin, a different variant. Its classification is identified by that exact code; it is not assigned to every C148 variant. This is a clear finish rather than pigmented paint.",
    "specs": {
      "system": "Industrial Solvent-Borne · Clear Lacquer",
      "catalysis": "Pre-catalyzed lacquer; no added catalyst specified in this PDS",
      "resin": "Pre-Catalyzed Clear Lacquer · water-white formulation",
      "volume": "25 ± 2% · packaged",
      "weight": "33 ± 3% · packaged",
      "voc": "625 ± 4 g/L · packaged, less exempt solvents · historical PDS",
      "wet": "3–6 mil per coat, 2–3 coats",
      "dry": "2.5–5 mil total dry system; per-coat dry thickness not specified",
      "coverage": "405 ± 5 sq ft · theoretical at 1 mil dry; excludes spray loss",
      "touch": "15–25 minutes · 77°F",
      "recoat": "After complete drying; sand between coats",
      "cure": "Stacking dry 4–6 hours; full cure not specified",
      "performance": "34 manufacturer-reported chemical / performance results are included, with source and test conditions. Clear finish; brochure does not establish current SKU / sheen / batch."
    },
    "safety": {
      "signal": "Danger",
      "edition": "July 19, 2022 · MC14814SF Clear Tint Base Satin; different variant from PDS",
      "classes": [
        "Flammable Liquid · Category 2",
        "Skin Irritation · Category 2",
        "Serious Eye Damage · Category 1",
        "Carcinogenicity · Category 1A",
        "Specific Target Organ Toxicity, Single Exposure · Category 3 (Narcotic Effects)",
        "Specific Target Organ Toxicity, Repeated Exposure · Category 2"
      ],
      "summary": "The cited variant SDS identifies fire, eye damage, irritation, cancer and repeated-exposure hazards, and notes formaldehyde. It does not establish the classification of another base or edition.",
      "ingredients": [
        [
          "n-Butyl Acetate",
          "123-86-4",
          "≥25–≤50%"
        ],
        [
          "Ethanol",
          "64-17-5",
          "≤9.2%"
        ],
        [
          "Cellulose Nitrate",
          "9004-70-0",
          "≤10%"
        ],
        [
          "2-Propanol",
          "67-63-0",
          "≤10%"
        ],
        [
          "Isobutylated Urea-Formaldehyde Polymer",
          "68002-18-6",
          "≤5%"
        ],
        [
          "Formaldehyde (Maximum)",
          "50-00-0",
          "<0.1%"
        ]
      ],
      "pages": "Sections 2–3 · Pages 1–3"
    },
    "extraSources": [
      "magnamax-performance"
    ],
    "tests": {
      "source": "magnamax-performance",
      "conditions": "Manufacturer laboratory results · clear finish · January 2011 brochure. AWI / KCMA chemical exposure schedules are referenced without individual durations. Scale: 5 Excellent, 4 Very Good, 3 Good, 2 Fair, 1 Poor. Not the same study as Spray-Net’s historical head-to-head test.",
      "values": [
        [
          "Vinegar",
          "5 · Excellent"
        ],
        [
          "Lemon Juice",
          "5 · Excellent"
        ],
        [
          "Orange Juice",
          "5 · Excellent"
        ],
        [
          "Grape Juice",
          "5 · Excellent"
        ],
        [
          "Ketchup",
          "5 · Excellent"
        ],
        [
          "Coffee",
          "5 · Excellent"
        ],
        [
          "Olive Oil",
          "5 · Excellent"
        ],
        [
          "Boiling Water",
          "5 · Excellent"
        ],
        [
          "Cold Water",
          "5 · Excellent"
        ],
        [
          "Nail Polish Remover",
          "4 · Very Good"
        ],
        [
          "Household Ammonia",
          "5 · Excellent"
        ],
        [
          "VM&P Naphtha",
          "5 · Excellent"
        ],
        [
          "Isopropyl Alcohol",
          "5 · Excellent"
        ],
        [
          "Wine",
          "5 · Excellent"
        ],
        [
          "Windex",
          "5 · Excellent"
        ],
        [
          "409 Cleaner",
          "5 · Excellent"
        ],
        [
          "Lysol",
          "5 · Excellent"
        ],
        [
          "33% Sulfuric Acid",
          "5 · Excellent"
        ],
        [
          "77% Sulfuric Acid",
          "1 · Poor"
        ],
        [
          "28% Ammonium Hydroxide",
          "5 · Excellent"
        ],
        [
          "Gasoline",
          "5 · Excellent"
        ],
        [
          "Murphy’s Oil Soap",
          "5 · Excellent"
        ],
        [
          "Vodka 100 Proof",
          "5 · Excellent"
        ],
        [
          "1% Detergent",
          "5 · Excellent"
        ],
        [
          "10% TSP",
          "5 · Excellent"
        ],
        [
          "Ethanol / Water",
          "5 · Excellent"
        ],
        [
          "Mustard",
          "5 · Excellent"
        ],
        [
          "Acetone",
          "5 · Excellent"
        ],
        [
          "Print Resistance",
          "5 · Excellent · no print after 24-hour drying"
        ],
        [
          "Hot & Cold Check Resistance",
          "5 · Excellent · passes 20 cycles"
        ],
        [
          "Cross Hatch",
          "5 · Excellent on manufacturer’s 1–5 scale; not an ASTM 5B grade"
        ],
        [
          "Blocking",
          "5 · Excellent · after 4-hour drying"
        ],
        [
          "Wet Heat Resistance",
          "4 · Very Good"
        ],
        [
          "Edge Soak",
          "5 · Excellent"
        ]
      ]
    }
  },
  "centurion": {
    "id": "centurion",
    "name": "Centurion 1800 Series",
    "brand": "Centurion",
    "detail": "2K Acrylic Polyurethane · CW-3116 Satin White",
    "tds": "centurion-tds",
    "sds": "centurion-sds",
    "hardeners": [
      "cw4002"
    ],
    "note": "Undated CW-3115–3118 TDS and October 2020 base / catalyst SDS. The TDS covers CW-3116 Satin; the SDS covers all four white sheens. Current formulation equivalence has not been verified.",
    "specs": {
      "system": "Professional Waterborne · White / Pigmented",
      "catalysis": "2K · CW-4002 at 20%; 5-hour pot life",
      "resin": "OH Functional Acrylic Polyol",
      "volume": "38.77 ± 1%",
      "weight": "46.34 ± 1%",
      "voc": "109.98 g/L · minus exempt; 48.55 g/L · as supplied",
      "coverage": "622 sq ft · 1 mil dry, 100% transfer efficiency",
      "touch": "Dust-free 10–15 minutes · 77°F, 50% RH; touch time not stated",
      "recoat": "Sand 45–60 minutes; no separate recoat time specified",
      "cure": "Package overnight; full cure not specified",
      "performance": "TDS claims KCMA performance specifications are met or exceeded; no test scores, methods, cure schedule or independent laboratory report are attached."
    },
    "safety": {
      "signal": "Warning · as printed; see discrepancy note",
      "edition": "October 21, 2020 · CW-3115–3118",
      "classes": [
        "Skin Irritation · Category 2",
        "Eye Irritation · Category 2A",
        "Aspiration Hazard · Category 1 (as printed)"
      ],
      "summary": "The SDS prints Warning alongside Aspiration Hazard Category 1, an apparent internal labeling inconsistency. Classification and signal word are transcribed, not corrected or independently validated. Hazard statements also describe ingestion / skin / inhalation harm and respiratory irritation. Obtain a current matched SDS before application.",
      "ingredients": [
        [
          "2-Butoxyethanol",
          "111-76-2",
          "1–5%"
        ],
        [
          "Dipropylene Glycol Monobutyl Ether",
          "29911-28-2",
          "0–1%"
        ]
      ],
      "pages": "Sections 2–3 · pages 1–3"
    }
  },
  "milesi": {
    "id": "milesi",
    "name": "Milesi HKR116",
    "brand": "Milesi",
    "detail": "2K Waterborne White · 10 Gloss · HNB40 Schedule",
    "tds": "milesi-tds",
    "sds": "milesi116-sds",
    "hardeners": [
      "hnb40"
    ],
    "note": "December 2016 HKR-series TDS; July 2021 U.S. HKR116 base SDS. HNB40 at 10% by weight is one TDS schedule; HNB3 and HNB1 are separate alternatives. The available HNB40 SDS is a 2017 Bulgarian / EU reference, not verified as the current U.S. hardener. No formula equivalence across editions is established.",
    "specs": {
      "system": "Professional Waterborne · White / Pigmented",
      "catalysis": "2K · HNB40 at 10% weight / 11.5% volume; 2-hour pot life",
      "resin": "Water-based pigmented converter; exact resin not identified in this TDS",
      "unqualifiedSolids": "HKR116 base 49.2 ± 2%; HNB40 mixture 50.1 ± 2% · basis not identified",
      "voc": "47.4 g/L / 3.87% · 2021 base SDS §9; subtraction basis not stated",
      "wet": "Airmix 4.0–5.0 mil; hand spray 3.6–4.3 mil · HNB40 schedule",
      "touch": "2 hours · 18–22°C / 64–72°F, 65–70% RH · HNB40 schedule",
      "cure": "Complete drying 96 hours; stackable 24 hours · HNB40 schedule",
      "performance": "No numerical hardness, adhesion, MEK or KCMA results in this HKR-series TDS. Brand-level tests for other products are not assigned to HKR116."
    },
    "specSources": {
      "voc": "milesi116-sds"
    },
    "safety": {
      "signal": "Warning",
      "edition": "July 23, 2021 · Version 102 · HKR116 · U.S. OSHA HCS",
      "classes": [
        "Skin Sensitization · Category 1"
      ],
      "summary": "May cause an allergic skin reaction. This is the supplied base SDS; hardener classification is separate. The older 2015 HKR114 sheet is a different sheen and is not substituted.",
      "ingredients": [
        [
          "2-Butoxyethanol",
          "111-76-2",
          "1–2.49%"
        ],
        [
          "Dipropylene Glycol Monomethyl Ether",
          "34590-94-8",
          "1–<5%"
        ],
        [
          "2-(2-Butoxyethoxy)ethanol",
          "112-34-5",
          "<0.5%"
        ],
        [
          "C16–18 Ethoxylated Alcohols",
          "68439-49-6",
          "<0.5%"
        ],
        [
          "Methylisothiazolinone",
          "2682-20-4",
          "≥0.0015–<0.01%"
        ],
        [
          "CMIT / MIT Mixture",
          "55965-84-9",
          "≥0.00025–<0.0015%"
        ]
      ],
      "pages": "Sections 2–3 · pages 1–2"
    }
  }
};
