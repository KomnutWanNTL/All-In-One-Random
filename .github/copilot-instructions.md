# Project Guidelines

## Code Style
- Use vanilla JavaScript ES modules (`import`/`export`) under `js/`.
- Keep module responsibilities clear:
  - `js/api.js`: loading and state (`appData`)
  - `js/generators.js`: pure-ish random data generators
  - `js/ui.js`: rendering and display orchestration
  - `js/main.js`: app bootstrap and event wiring
- Prefer guard clauses for missing data before generating values.
- Keep user-facing text in Thai unless there is a clear reason to use English labels.

## Architecture
- This project is a static single-page app (no build step, no backend).
- Entry point is `index.html`, which loads `js/main.js` as `type="module"`.
- On `DOMContentLoaded`, `loadAllData()` fetches JSON files in `src/` and stores them in `appData`.
- UI generation should happen after data is loaded; `displayRandomData()` is the current rendering pipeline.

## Build and Test
- Run with a local static server, not `file://`.
- Recommended command:
  - `python3 -m http.server 8000`
- Open `http://localhost:8000`.
- When changing generator logic, validate at least:
  - Thai ID checksum still valid
  - Address mapping still consistent (`province_id -> district_id -> sub_district_id`)
  - UI still renders all cards without console errors

## Conventions
- JSON in `src/` is the source of truth; do not hardcode geographic lookup values in code.
- Keep generated output explicitly marked as mock data (not production identity/payment data).
- For performance-sensitive address generation, prefer indexed lookups over repeated `filter()` scans on large arrays.
- Avoid unbounded recursion in generators. Use bounded retries or fallback behavior.
- Use `addEventListener` over inline `onclick` for new UI actions.
