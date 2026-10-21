# Remaining work

Reconciled 2026-10-20 against the repo (targeted searches only). Extend what exists; never rebuild.
"Config/deploy" marks code that exists and only needs setup or a deploy.

## CC-02 Resources, housing, giving (DONE 2026-10-20)
- DONE: housing and area-resources PDFs with English/Spanish switch (`PdfSheetCard`).
- DONE: extracted area-resources entries (60, all verify). Housing listings still empty; the Housing Information Sheet is PDF only.
- DONE: give hub lists the hosted donate and program forms.
- DONE: merch hidden unless `merchUrl`.
- DONE: DONATE NOW in the shared header on every screen except Give.

## CC-03 Media, content gaps, reports
- DONE: alt text test covers every Image and control.
- DONE: duotone heroes and card photos.
- DONE: TODO pages filled or excluded (`docs/CONTENT_CONFLICTS.md`).
- DONE: route bug not reproduced; regression test added.
- DONE: `docs/PARITY_REPORT.md` (`npm run audit:parity`).
- DONE: `docs/LINK_REPORT.md` (`npm run audit:links`).
- DONE: STAFF_GUIDE covers pages, opportunities, stories, give options, notifications, resources, audits.

## CC-04 Forms and backend
- DONE (CC-03 prompt, 2026-10-20): native forms. Screens: `volunteer.tsx`, `tour.tsx`, `prayer.tsx` in `src/app/(tabs)/get-involved/`. Missing: contact form, the six per-opportunity volunteer forms, and the `volunteer-native` / `tour-native` routes that `src/content/getInvolved.ts` points to.
- DONE: `/api/submit` (`src/app/api/submit+api.ts`, `worker/index.ts`, `src/server/handleSubmit.ts`). Config/deploy: deploy the worker, set `EXPO_PUBLIC_SUBMIT_URL`.
- DONE: shared Zod schemas, `src/forms/schema.ts` (volunteer, tour, prayer; no contact type).
- DONE: honeypot (`src/components/HoneypotField.tsx`, `handleSubmit.ts`).
- DONE: rate limit (`src/forms/rateLimit.ts`).
- DONE: Resend mail (`src/forms/mail.ts`). Config/deploy: Resend key and the staff inbox.
- DONE: offline queue (`src/forms/queue.ts`, `FormQueueRunner.tsx`, `deliver.ts`).
- DONE: privacy notice (`src/app/(tabs)/more/privacy.tsx`, `PrivacyLine.tsx`).
- DONE: `useNativeForms` wiring. Flag is `false` in `getInvolved.ts`; flip once the native routes exist.

## CC-05 Push
- DONE: token registration (`src/notifications/device.ts`, `src/app/api/push/register+api.ts`). Config/deploy.
- DONE: topics (`src/push/topics.ts`).
- DONE: inbox (`src/push/inbox.ts`, `src/notifications/inboxStore.ts`).
- DONE: send endpoint (`src/app/api/push/send+api.ts`, `src/push/send.ts`). Config/deploy.
- DONE: staff page (`src/push/staffPage.ts`, `src/app/staff/notify+api.ts`). Config/deploy: staff password.

## CC-06 / CC-07 Release
- DONE: `docs/QA_REPORT.md` (dated 19 Oct, before SP-01 to SP-06). Refresh after CC-02 to CC-05.
- DONE: `eas.json`.
- DONE: `docs/RELEASE_CHECKLIST.md`.
- DONE: `docs/WORKER_RUNBOOK.md`.
- DONE: `docs/HANDOFF.md`.
