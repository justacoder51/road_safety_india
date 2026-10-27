# Architecture

## Input contract

Requirements: `../../prompt.txt`. Content: `../../road_safety_report.md`. References: the three PNGs in `../../reference_image_for_website/`. The requested report filename ending in `(1)` was not present; the actual report is fingerprinted in `public/data/report-manifest.json`.

## Component hierarchy

```text
main.jsx — React root / HashRouter
└── App
    └── DataProvider — fetch approved local JSON, loading/error state
        ├── Navbar — shared route definitions, desktop/mobile menus, skip link
        ├── main / Suspense
        │   ├── RouteEffects — title, route focus and hash scrolling
        │   └── Routes — lazy-loaded page components
        │       ├── Overview — Hero, StatCard, feature cards, RoadScene
        │       ├── IndiaData — StatCard, chart components, comparison/method panels
        │       ├── GlobalLessons — PolicyCard, Roadmap, CallToAction
        │       ├── ActionPlan — current Indian policy cards, phase recommendations
        │       ├── Sources — search/filter, source directory and definitions
        │       └── Not-found view
        └── Footer — shared navigation and Safe System strip
```

## Routes

| Path | Page |
|---|---|
| `/` | Overview |
| `/india-data` | India Data |
| `/global-lessons` | Global Lessons |
| `/action-plan` | Action Plan |
| `/sources` | Sources |
| unmatched | Not-found view with Overview link |

HashRouter provides client navigation compatible with GitHub Pages. Vite's configured base path scopes JSON, assets and document links to the project repository URL. Hash links connect source citations, road-user sections and roadmap phases. Source entries use stable IDs `s1` through `s21`.

## Data flow and responsibilities

Approved report extraction → `public/data/*.json` → `DataProvider` → page composition → reusable components. Components do not retrieve research websites. Supplied source PDFs are copied into `public/documents/`, and the production build copies those static files. The shipped application and verification scripts use JavaScript/JSX only.

`StatCard` uses the shared KPI dataset. `PolicyCard` renders one consistent schema for all countries. `Roadmap` and Action Plan use the same phase data. `SourceLink` resolves IDs from centralized metadata to in-site source anchors. Chart components receive data as props and use one ChartPanel for source notes and accessible data tables. `utils/formatters.js` formats numbers without changing the underlying values.

Pages are loaded on demand so Recharts is fetched with India Data rather than the Overview bundle. DataProvider fetches nine small local JSON files once per full app load. Reloading or opening a direct route remains supported.

## Design rules

Warm paper (`#faf9f5`), deep navy (`#0b2138`), amber (`#ffb829` family), teal (`#006575`), muted blue-gray text and subtle borders. Bold system typography avoids external font requests. Shared containers, rounded cards, split heroes, generous spacing and section order follow the supplied visual references. Responsive rules cover desktop, tablet, mobile and 320 px widths.

No standalone photography or usage-rights information was supplied. RoadScene is a decorative CSS placeholder with Lucide icons, and policy artwork uses CSS grids, country abbreviations and icons. Decorative artwork is hidden from assistive technology. Reference screenshots are never embedded or cropped into app assets.

## Accessibility and interaction

Semantic landmarks/headings, a skip link, visible focus, native buttons and disclosures, labeled source search, pressed states on category filters, text equivalents and expandable chart data tables. Native policy disclosures support keyboard activation. Chart animations are disabled; other transitions respect reduced motion. On navigation, the main region receives focus; hash links scroll to the target. Mobile menu Escape returns focus to its toggle.

## Deployment boundary

The user changed hosting from the original Vercel requirement to GitHub Pages. The existing public repository is justacoder51/road_safety_india. GitHub Actions will verify, build and publish the static output on pushes to main. Live publication status is recorded in docs/deployment.md; local preparation alone is not a successful deployment.
