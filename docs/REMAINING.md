# Remaining work

Reconciled 2026-10-20 against the repo (targeted searches only). Extend what exists; never rebuild.
"Config/deploy" marks code that exists and only needs setup or a deploy.

## CC-02 Resources, housing, giving
- PARTIAL: housing and area-resources PDFs with language switch. PDF links exist (`pdfLink` block in `src/components/PageBlockRenderer.tsx`, `src/content/programDetails.ts:172`). Missing: English/Spanish switch and the area-resources PDFs.
- PARTIAL: extracted resource and housing entries. `src/app/(tabs)/more/resources.tsx` and housing fixtures exist. Missing: extracted area-resources entries.
- PARTIAL: give hub options. `src/app/(tabs)/get-involved/give.tsx`, `giveBlurb` in `src/content/types.ts`. Verify each way to give is listed.
- DONE: merch hidden unless `merchUrl` (`src/components/MerchPanel.tsx`; fixture `merchUrl` is empty).
- PARTIAL: Give reachable from header and Home. Home has a give action (`src/app/(tabs)/index.tsx`). No Give in `src/components/Header.tsx`.

## CC-03 Media, content gaps, reports
- PARTIAL: images with alt text. `alt` is required in `BrandImage.tsx` and `siteImages.ts`. Per-image coverage not audited.
- NOT STARTED: duotone heroes (no matches in `src/`).
- NOT STARTED: nine pages with TODO extraction blocks (STATE.md blocker; fill from source site).
- NOT STARTED: wrong-content route bug. Not logged anywhere; reproduce via `src/app/page/[slug].tsx` and `pageRoutes.ts`.
- NOT STARTED: `docs/PARITY_REPORT.md`.
- NOT STARTED: `docs/LINK_REPORT.md` (`src/content/links.ts` and its test exist; no report).
- PARTIAL: STAFF_GUIDE coverage. `docs/STAFF_GUIDE.md` updated in SP-06; later phases not covered.

## CC-04 Forms and backend
- PARTIAL: native forms. Screens: `volunteer.tsx`, `tour.tsx`, `prayer.tsx` in `src/app/(tabs)/get-involved/`. Missing: contact form, the six per-opportunity volunteer forms, and the `volunteer-native` / `tour-native` routes that `src/content/getInvolved.ts` points to.
- DONE: `/api/submit` (`src/app/api/submit+api.ts`, `worker/index.ts`, `src/server/handleSubmit.ts`). Config/deploy: deploy the worker, set `EXPO_PUBLIC_SUBMIT_URL`.
- DONE: shared Zod schemas, `src/forms/schema.ts` (volunteer, tour, prayer; no contact type).
- DONE: honeypot (`src/components/HoneypotField.tsx`, `handleSubmit.ts`).
- DONE: rate limit (`src/forms/rateLimit.ts`).
- DONE: Resend mail (`src/forms/mail.ts`). Config/deploy: Resend key and the staff inbox.
- DONE: offline queue (`src/forms/queue.ts`, `FormQueueRunner.tsx`, `deliver.ts`).
- DONE: privacy notice (`src/app/(tabs)/more/privacy.tsx`, `PrivacyLine.tsx`).
- PARTIAL: `useNativeForms` wiring. Flag is `false` in `getInvolved.ts`; flip once the native routes exist.

## CC-05 Push
- DONE: token registration (`src/notifications/device.ts`, `src/app/api/push/register+api.ts`). Config/deploy.
- DONE: topics (`src/push/topics.ts`).
- DONE: inbox (`src/push/inbox.ts`, `src/notifications/inboxStore.ts`).
- DONE: send endpoint (`src/app/api/push/send+api.ts`, `src/push/send.ts`). Config/deploy.
- DONE: staff page (`src/push/staffPage.ts`, `src/app/staff/notify+api.ts`). Config/deploy: staff password.

## CC-06 / CC-07 Release
- DONE: `docs/QA_REPORT.md` (dated 19 Oct, before SP-01 to SP-06). Refresh after CC-02 to CC-05.
- NOT STARTED: `eas.json`.
- NOT STARTED: `docs/RELEASE_CHECKLIST.md`.
- NOT STARTED: `docs/WORKER_RUNBOOK.md`.
- NOT STARTED: `docs/HANDOFF.md`.
