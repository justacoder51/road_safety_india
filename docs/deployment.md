# GitHub Pages deployment

Status: **LIVE on GitHub Pages**, verified 27 October 2026.

Website: https://justacoder51.github.io/road_safety_india/

Repository: https://github.com/justacoder51/road_safety_india

Published application commit: 8b76ce119a5dc912bb7ac80968650da8021754c4

Successful workflow: https://github.com/justacoder51/road_safety_india/actions/runs/40494145035

## Account and repository

- Confirmed account: `justacoder51`.
- Existing public repository: https://github.com/justacoder51/road_safety_india
- Live website location: https://justacoder51.github.io/road_safety_india/
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

## Completed verification

GitHub's verify-and-build and publish jobs both succeeded. The first publishing attempt reached Pages before it was enabled; enabling workflow-based Pages and retrying the publishing job resolved that setup race.

All five live hash routes were opened and refreshed; India Data rendered all three charts. Live source search passed. The production verifier passed 17 HTTP, entry-asset, JSON, report and PDF checks against the public URL. Browser warnings/errors were empty. Evidence is in docs/verification/github-pages-live.json and production-checks.json.

Later pushes to main publish website changes automatically. The documentation-only completion record uses [skip ci] because it changes no application or deployment code.
