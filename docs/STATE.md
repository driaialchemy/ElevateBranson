# Project state

Last completed phase: CC-04 prompt (TODO pages, route bug, duotone, alt text).
Next phase: CC-05 (parity and link audits).

Open blockers:
- Deploy the `/api/events` worker route and set `EXPO_PUBLIC_SUBMIT_URL` for the published app.
- `/forms/13/` and `/forms/30/` on the source site return 404 or redirect outside the allowed host.
- Confirm the café and Thrift Store hours with the organization; venue pages conflict with secondary hours blocks.
- Confirm approval to display public staff phone numbers in the app.
- Confirm the Playground school-year season start and end dates.

Files changed in SP-06:
- About hub content, statistics, values, FAQ, financial summary, and neighbor story listing.
- Media screens and monthly newsletter/podcast catalog refresh script.
- Public ICS calendar client/worker route, recurrence parsing, and event actions.
- More navigation, imported content fixtures/types, and targeted coverage.
- `docs/STAFF_GUIDE.md`, `docs/HUMAN_TASKS.md`, and this state file.

Switched from Codex to Claude Code after SP-06. CC-02 done: PdfSheetCard with EN/ES switch (`src/components/PdfSheetCard.tsx`, `src/content/pdfSheets.ts`), 60 extracted Area Resources entries (`src/content/areaResources.json`, scripts `extract_pdf_columns.py` and `parse-area-resources.ts`), DONATE NOW hidden only on Give (`headerRules.ts`), Give hub lists hosted forms (`src/content/giving.ts`). Next: CC-03. Pushed to origin main. If push fails with a bad token, an invalid `GITHUB_TOKEN` env var is overriding the working `gh` login; push with `env -u GITHUB_TOKEN git -c credential.helper= -c "credential.helper=!gh auth git-credential" push origin main`.
Remaining work, by phase, with DONE/PARTIAL/NOT STARTED status: `docs/REMAINING.md`. Read the phase section before building.

CC-03 done: contact form (`more/contact-form.tsx`, `contactSchema`, `CONTACT_EMAIL`), `volunteer-native` and `tour-native` routes, shared `src/forms/useSubmit.ts`, `useNativeForms` derived from `EXPO_PUBLIC_SUBMIT_URL`, tests in `src/forms/forms.test.ts`. `.env.example` not updated (agent access denied): see HUMAN_TASKS 50. Not run in the app.

CC-04 done: 8 form-only pages filled with their real field lists plus a website-form link; `/forms/13/` and `/forms/30/` excluded (404; see CONTENT_CONFLICTS.md). Route bug not reproduced: About and nine other routes showed the right content at 390px in the web dev server on 2026-10-20 (static export not tested); `src/navigation/routeTitles.test.ts` added. Teal duotone on heroes and card photos (`src/components/Duotone.tsx`, tokens.duotone, contrast test). `src/qa/altText.test.ts` fails on any Image, Pressable, Switch or TextInput without a label. Added `.claude/launch.json` (web preview).
