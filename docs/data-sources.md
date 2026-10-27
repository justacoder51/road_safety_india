# Data sources and content decisions

The sole informational input is `../../road_safety_report.md`, prepared 27 October 2026. The prompt's alternate filename was not supplied. `public/data/report-manifest.json` records the exact original-file SHA-256. Data extraction and verification do not retrieve external research content.

## Dataset traceability

| Local JSON | Content | Report sections | Attribution |
|---|---|---|---|
| india-statistics | 2024 KPIs; 2018–2024 reported death trend; separate 2021 reported/WHO burden; qualitative comparison | 2.1, 2.4, 3 | s1, s5, s6, s8 |
| road-user-data | Three selected fatality shares, 2024 | 2.2 | s1 |
| road-type-data | Deaths, reported shares and crashes for three road categories, 2024 | 2.3 | s1 |
| international-policies | Six approaches; outcomes, limitations and India application | 5–6 | s14–s21 |
| indian-policies | Existing legislation, programmes and enforcement, with evidence limits | 4–5 | s9–s13 |
| action-plan | 5 near-, 5 medium-, 3 long-term recommendations | 7 | Report recommendations; not claimed measured results |
| definitions | Statistical and methodological explanations | 1–3, 5.5, 9 | Report definitions |
| sources | All 21 source-register entries, supplied document paths and existing URLs | 10 | Original register numbers preserved |
| report-manifest | Selected report path, fingerprint and content rule | Input metadata | Not a research statistic |

## Numerical acceptance values

| Measure | Exact value | Year / unit |
|---|---|---|
| Reported crashes | 487,707 | 2024, crashes |
| Reported fatalities | 177,175 | 2024, people |
| Reported injuries | 471,441 | 2024, people injured; not a serious-injury-only count |
| Fatality trend | 157,593; 158,984; 138,383; 153,972; 168,491; 172,890; 177,175 | One annual value each for 2018–2024 |
| Selected road users | 46.2%; 20.6%; 12.4% | 2024 shares of fatalities; two-wheelers, pedestrians, light-vehicle occupants |
| Road-category deaths | 64,772; 39,277; 73,126 | 2024; National Highways including expressways, State Highways, other roads |
| India reported burden | 153,972 | 2021, people killed |
| WHO estimated burden | 216,618; 95% CI 193,271–239,965 | 2021, estimated people killed |
| WHO estimated rate | 15.4 per 100,000 people | 2021, population mortality rate |
| Viet Nam hospital outcomes | 16% lower head-injury risk; 18% lower road-death risk | Short-term observational hospital study after the 2007 law; 20 hospitals, first 3 months |
| UK camera outcomes | 36.4% fewer fatal/serious collisions; 16% fewer injury collisions | Adjusted 2016 observational evaluation, 50 sites in Great Britain |

The generated [claim ledger](verification/claim-ledger.json) records 31 numerical data fields/claims, report sections and source IDs. Source URLs are centralized in `public/data/sources.json`; visible citations navigate to the corresponding source entry, where the external URL or supplied document can be opened.

## Limitations and decisions

1. Police counts and modeled estimates use separate records and visible method labels. The comparison panel uses 2021 for both measures; the national headline remains 2024.
2. The three road-user categories are incomplete. They appear as independent bars and cards, with an explicit partial-coverage explanation. No normalized full-share chart or inferred residual category.
3. No complete comparable India–Viet Nam–Singapore mortality-rate dataset appears in the report. The site uses a qualitative comparison, not a numerical country ranking. The report's incomplete modeled-count discussion is not turned into a chart.
4. National Highways include expressways. Published road-class shares are rounded, so their percentage total need not equal exactly 100. Counts sum to 177,175.
5. The 2020 decline is marked as COVID-19 disruption rather than durable policy success.
6. The report's per-day approximations need an editorial arithmetic review. The app uses exact annual totals and does not silently alter the source report.
7. Report edition dates, consistent fatality follow-up definitions and some source provenance details remain unresolved in the report. The app preserves these caveats. It does not claim that every source-register item was independently re-verified.
8. A short before/after evaluation cannot establish the national causal impact of India's 2019 amendment. The website distinguishes programmes, observed changes and causal effects.
9. Only Viet Nam and the UK policy cards display numerical intervention outcomes from the report. Other cards explain their qualitative evidence and missing numerical estimate.
10. All 13 action recommendations preserve the report's recommendation text. No invented budgets, owners, completed milestones or India-specific impact projections.

## Verification

`npm run verify:data` checks the report fingerprint, exact acceptance values, source references, local document existence, recommendation text and approved runtime libraries. Results: `docs/verification/data-checks.json`; numerical ledger: `docs/verification/claim-ledger.json`. This verifies faithful implementation of the supplied report; it does not certify the underlying research as independently audited.
