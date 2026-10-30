# Allayze Care

A responsive, frontend-only care planning demonstration with fictional Willowbrook Care Home records. Designed for widescreen presentations and phone browsers.

**Demo sign-in:** `admin` / `Allayze2026`.

## Run locally

Requires Node.js 22 or newer. Run `npm run dev`, then open http://127.0.0.1:4173. No runtime dependencies or backend are needed. Serve over HTTP; opening index.html directly will prevent JSON loading.

For tests, run `npm ci` followed by `npm test`.

## Demonstrate

1. Overview: see care priorities, completion and recent notes.
2. People: search, filter, create a profile, and explore Margaret Wilson’s preferences and support circle.
3. Care plans: create or edit personal goals, support instructions, progress and review dates. Mark a review complete to clear its dashboard flag.
4. Daily tasks: create assigned tasks, complete or reopen them. Completion updates Insights.
5. Handover: record care, wellbeing, incident or family-update notes, flag and resolve follow-ups.
6. Insights: view current totals and goal progress. Weekly history is clearly labelled illustrative.
7. Demo settings: export JSON or reset sample data for the next presentation.

The in-app Demo guide includes a five-minute walkthrough and a source-linked comparison of the five reference platforms.

## Data and scope

`data.json` contains the original fictional scenario. Changes persist in localStorage under `allayze-care-v1`. The sign-in session uses sessionStorage. Export downloads the current state as JSON. Reset only replaces this app’s demo key; it does not clear unrelated browser storage.

The demo date is fixed at Friday 30 October 2026 for reproducible presentations. Newly entered notes have their actual timestamp. This is a presentation gate, **not secure authentication**: credentials are necessarily visible in frontend source. There is no backend, cross-device sync, clinical decision support, eMAR, genuine family messaging or production access control. Do not enter real personal or care data.

## Design

Deep teal navigation, warm neutral surfaces and sage accents establish a calm care workspace. Amber marks reviews and coral marks follow-up items; every status also has a text label. Layout adapts at 1150, 900 and 700 pixels; phones use a collapsible navigation menu. All app routes use URL hashes so GitHub Pages supports refresh and deep links without a server rewrite. Forms use labels and native validation, dialogs provide keyboard focus containment, and motion respects reduced-motion settings. Google Fonts are optional; system sans-serif fallbacks keep the app functional without them.

## Publishing

The GitHub Actions workflow tests and packages only the six public app assets, then deploys to GitHub Pages. Set repository **Settings → Pages → Source → GitHub Actions** and push to `main`. The intended repository is `Allayze/care-plan-demo` unless another destination is specified.

## Research basis

Reviewed public vendor pages on 30 October 2026. The comparison identifies distinctive emphasis, not verified exclusivity or a full procurement evaluation.

| Platform | Emphasised capabilities | Demo interpretation |
| --- | --- | --- |
| [Nourish](https://nourishcare.com/) | Person-centred care and broad insights offerings | Preferences, overview and insights |
| [CareDocs](https://www.caredocs.co.uk/) | Configurable assessments, plans and interventions | Editable care goals and support instructions |
| [Log my Care](https://www.logmycare.co.uk/) | Simple adoption, group oversight, incident workflows | Quick recording and handover follow-ups |
| [PCS](https://personcentredsoftware.com/) | Connected care, wellbeing and family engagement | Wellbeing goals, support circles and family notes |
| [Access](https://www.theaccessgroup.com/en-gb/health-social-care/care-management-software/) | Connected planning, rostering, medication and compliance | Assigned tasks and coherent navigation |

The shared themes are person-centred digital information, care planning, care recording and operational oversight. Allayze Care simplifies those patterns; it does not reproduce vendor interfaces or claim their integrations or certifications.
