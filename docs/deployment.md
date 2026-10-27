# GitHub Pages deployment

Status: GitHub-only hosting requested. Local Pages configuration prepared; push and live deployment pending verification.

## Account and repository

- Confirmed account: `justacoder51`.
- Existing public repository: https://github.com/justacoder51/road_safety_india
- Planned website location: https://justacoder51.github.io/road_safety_india/
- Host: GitHub Pages. Vercel is not required.
- Project root: the application folder.

## How publication works

The GitHub Actions workflow `.github/workflows/ci.yml` verifies the approved bundled report and data, builds Vite, uploads `dist`, and publishes GitHub Pages on pushes to `main`. Pull requests run verification/build without publishing.

Builds use `PAGES_BASE_PATH=/road_safety_india/` (derived from the repository name in Actions). Local JSON, downloads and source PDFs use Vite's base path. React Router uses hash routes, for example `#/india-data`, so page refreshes work on static GitHub Pages without server rewrites. Section and citation links preserve the route hash.

GitHub Pages must use GitHub Actions as its publishing source. The workflow needs read access to source and, in the deployment job, `pages: write` and `id-token: write`. Node.js 24 and `npm ci` reproduce the locked build.

## Local equivalent

In PowerShell from the app folder:

```powershell
$env:PAGES_BASE_PATH='/road_safety_india/'
npm run verify:data -- --bundled-report
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/road_safety_india/`. Navigate through the site's links; routes include `#/india-data`, `#/global-lessons`, `#/action-plan` and `#/sources`.

The data checker uses the bundled approved report when the original parent-workspace file is absent. Git attributes preserve its exact bytes for the SHA-256 check. Dependencies, caches, environment files and build output stay excluded from Git.

## Deployment verification

After publication, record the exact Git commit and successful Actions run. Check the actual Pages URL, all five hash routes and direct refresh, charts, source filters, section/citation links and bundled PDF links. A prepared workflow is not a completed live deployment.

## Hosting documentation

- GitHub Pages overview: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Vite's official GitHub Pages deployment guide: https://vite.dev/guide/static-deploy.html#github-pages

These are software-hosting references only; no road-safety information was added to the content datasets.
