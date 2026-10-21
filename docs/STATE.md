# Project state

Last completed phase: CC-02.
Next phase: CC-03.

Open blockers:
- Deploy the `/api/events` worker route and set `EXPO_PUBLIC_SUBMIT_URL` for the published app.
- `/forms/13/` and `/forms/30/` on the source site return 404 or redirect outside the allowed host.
- Nine imported pages contain TODO blocks where text extraction was unavailable.
- Confirm the café and Thrift Store hours with the organization; venue pages conflict with secondary hours blocks.
- Confirm approval to display public staff phone numbers in the app.
- Confirm the Playground school-year season start and end dates.

Files changed in SP-06:
- About hub content, statistics, values, FAQ, financial summary, and neighbor story listing.
- Media screens and monthly newsletter/podcast catalog refresh script.
- Public ICS calendar client/worker route, recurrence parsing, and event actions.
- More navigation, imported content fixtures/types, and targeted coverage.
- `docs/STAFF_GUIDE.md`, `docs/HUMAN_TASKS.md`, and this state file.

Switched from Codex to Claude Code after SP-06. CC-02 done: PdfSheetCard with EN/ES switch (`src/components/PdfSheetCard.tsx`, `src/content/pdfSheets.ts`), 60 extracted Area Resources entries (`src/content/areaResources.json`, scripts `extract_pdf_columns.py` and `parse-area-resources.ts`), DONATE NOW hidden only on Give (`headerRules.ts`), Give hub lists hosted forms (`src/content/giving.ts`). Next: CC-03. Push status: see git log.
Remaining work, by phase, with DONE/PARTIAL/NOT STARTED status: `docs/REMAINING.md`. Read the phase section before building.
