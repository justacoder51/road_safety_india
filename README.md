# Road Safety India

Safer Roads, Brighter Tomorrow. A responsive, evidence-based frontend that explains India's road-safety burden, policy evidence and an adaptation agenda.

## What is included

- **Overview:** split hero, 2024 MoRTH KPIs, feature links and Safe System themes.
- **India Data:** reported fatality trend, selected road-user shares, road-category fatalities, accessible chart tables and a same-year reported/estimated explanation.
- **Global Lessons:** six reusable policy cards with keyboard-operable details, evidence, outcomes, limits and India applications.
- **Action Plan:** existing Indian policy context and 13 recommendations across three phases.
- **Sources:** 21 report references, local source PDFs, definitions, source search and category filters.

## Run locally

Requires Node.js compatible with Vite 7 (Node 20.19+ or 22.12+; developed with Node 24.13.0) and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://127.0.0.1:5173/`.

```sh
npm run verify:data
npm run build
npm run preview
```

The build output is `dist/`. The preview normally runs at `http://127.0.0.1:4173/`.

## Stack and scope

React, JavaScript/JSX, Vite, Tailwind CSS, Recharts, Lucide React and React Router. Local JSON is served from `public/data/`. Native HTML disclosures, input controls and tables avoid another runtime library. This is a frontend with no external data API, authentication or backend.

## Data provenance

The sole content source is `../road_safety_report.md` (27 October 2026). The prompt's `road_safety_report(1).md` is absent; the actual file mapping is intentional. A SHA-256 fingerprint is stored in `public/data/report-manifest.json`. Citation URLs reproduce the report and were not retrieved for additional research during implementation.

The app ships a copy of the report and supplied supporting documents in `public/documents/`, so the source register is usable after deployment. Research inputs and design references remain outside the app folder at their original paths. Supplied screenshots are design references, not displayed website assets. Standalone photos were not supplied; CSS road scenes and Lucide illustrations are the documented placeholder treatment.

After an editorially approved report change, review and update the affected JSON, source metadata, bundled documents and report fingerprint, then run:

```sh
npm run verify:data
```

Ordinary development and production builds need only the committed JSON and bundled documents. Update explicit acceptance values only after reviewing the changed report. An unchanged report fingerprint is part of the verification contract.

Known content limits: incomplete comparable country rates, selected road-user shares, unresolved source-edition/fatality-definition details, and daily approximations requiring arithmetic review. The website uses exact annual totals and displays the limitations. No new estimates or country rankings have been added.

## Architecture and engineering principles

- **DRY:** shared cards, roadmap, navigation, source metadata and formatters; repeated statistics use one dataset.
- **Separation of concerns:** pages compose UI; components render; JSON stores content; utilities load/format; routing handles navigation.
- **Incremental development:** work and verification are recorded against the seven planned iterations. Integration checks and review evidence are retained in `docs/verification/`.
- **Clear documentation:** see [architecture](docs/architecture.md), [data sources](docs/data-sources.md), [development log](docs/development-log.md), and [review checklist](docs/verification/review.md).

## GitHub Pages deployment

The connected account is justacoder51. The existing public repository is https://github.com/justacoder51/road_safety_india. Hosting uses GitHub Pages, following the user's updated instruction. Vercel is not required. See [deployment details and status](docs/deployment.md).

The GitHub workflow verifies the bundled report/data and builds the site on pull requests; pushes to main also publish Pages. The workflow sets the project base path from the repository name. Hash routing keeps all five pages refreshable on static hosting. No environment secrets or external APIs are required.

To test the Pages path locally in PowerShell, set `$env:PAGES_BASE_PATH='/road_safety_india/'`, then run `npm run build` and `npm run preview`. Open `http://127.0.0.1:4173/road_safety_india/`. Plain local development still works with `npm run dev` when the base variable is unset.

The data verifier automatically uses the approved report in public/documents when the parent workspace report is absent; test it explicitly with `npm run verify:data -- --bundled-report`. Git attributes preserve the report's fingerprint across operating systems.

## Review evidence

The review page links desktop/tablet/mobile screenshots, data checks, the numerical claim ledger, interaction checks and the step tracker. User acceptance is a separate field and remains unreviewed until explicitly recorded.
