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

## CU-02 Behavior fixes (DONE 2026-11-01)
- DONE: one notification topic, "Housing & resource list updates". A stored `resources` choice becomes `housing` and is registered again with the phone token.
- DONE: mailing list opens an in-app form (`/more/mailing-list`) because the website button is only a Mailmunch popup. Posts type `newsletter` to `/api/submit`. Flagged HUMAN_TASKS 70.
- DONE: Prayer request is on Home, Get Involved, and More. Unset `EXPO_PUBLIC_SUBMIT_URL` shows "Demo: not sent". Recipient is `PRAYER_TO_EMAIL`, with `PRAYER_TEAM_EMAIL` as the older name. Flagged HUMAN_TASKS 71.
- DONE: `docs/CONTENT_UPDATES.md`. Gaps are HUMAN_TASKS 72–74.

## CU-01 Content edits (DONE 2026-10-30)
- DONE: COO 2026-10-29 notes recorded in `docs/CLIENT_NOTES.md` and applied to local pages, program details, hours, and contacts.
- DONE: import applies `src/content/clientOverrides.ts` after each page so a later import cannot restore removed programs or the old Tiny Homes, Rides, and Kids copy.
- Flagged in HUMAN_TASKS 64–69: Theo photo, contact directory, school-year hours, business-partnership scooter line, volunteer stories that still say Outreach.

## CC-06 / CC-07 Release
- DONE: `docs/QA_REPORT.md` (dated 19 Oct, before SP-01 to SP-06). Refresh after CC-02 to CC-05.
- DONE: `eas.json`.
- DONE: `docs/RELEASE_CHECKLIST.md`.
- DONE: `docs/WORKER_RUNBOOK.md`.
- DONE: `docs/HANDOFF.md`.
