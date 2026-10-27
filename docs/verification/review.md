# Review the website

This is the review entry point for the seven-stage implementation plan. Technical verification and user acceptance are separate. User acceptance is currently **Not reviewed**.

## Open and check

Run `npm run dev` from the app folder, then open `http://127.0.0.1:5173/`. Use the five main navigation items and try the policy details, chart data tables and source filters.

## Evidence

- [Numerical checks](data-checks.json): 10 checks, 31 numerical claims traced to the report.
- [Claim ledger](claim-ledger.json): exact values, units, source IDs and report sections.
- [Responsive checks](responsive-checks.json): five pages at 1440, 768, 375 and 320 px.
- [Interaction checks](interaction-checks.json): keyboard menu/disclosures, source citation, filters and accessible tables.
- [Step tracker](step-tracker.csv): each planned step, outcome and evidence.
- [Production checks](production-checks.json): production route and static-document checks.

## Page screenshots

| Page | Desktop 1440 | Tablet 768 | Mobile 375 | Narrow 320 |
|---|---|---|---|---|
| Overview | [View](desktop/overview.png) | [View](768/overview.png) | [View](375/overview.png) | [View](320/overview.png) |
| India Data | [View](desktop/india-data.png) | [View](768/india-data.png) | [View](375/india-data.png) | [View](320/india-data.png) |
| Global Lessons | [View](desktop/global-lessons.png) | [View](768/global-lessons.png) | [View](375/global-lessons.png) | [View](320/global-lessons.png) |
| Action Plan | [View](desktop/action-plan.png) | [View](768/action-plan.png) | [View](375/action-plan.png) | [View](320/action-plan.png) |
| Sources | [View](desktop/sources.png) | [View](768/sources.png) | [View](375/sources.png) | [View](320/sources.png) |

Interaction screenshots: [expanded policies](interactions/policies-expanded-mobile.png), [source search](interactions/source-search-mobile.png), [chart tables](interactions/chart-tables-mobile.png).

## Manual acceptance checklist

- [ ] Visual direction follows the three references: navy, amber, teal, warm backgrounds, editorial hierarchy and responsive cards.
- [ ] Styled illustrations are an acceptable temporary treatment for missing standalone photographs.
- [ ] All three 2024 KPI values match the report, with year and MoRTH attribution.
- [ ] Selected road-user shares are not represented as a complete distribution.
- [ ] WHO estimates and police-reported counts are clearly distinguished.
- [ ] All six approaches expose evidence, limits and a possible India application.
- [ ] All 13 recommendations appear under the correct phase.
- [ ] A statistic and policy outcome can each be followed to their source entries.
- [ ] Mobile navigation, source search and chart tables are usable.
- [ ] Review existing content limitations before any public launch.

GitHub publication and Vercel deployment remain pending; local production verification does not imply a live deployment.
