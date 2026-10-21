# Worker runbook

Nothing here has been deployed. Do not deploy, set secrets, or point the app at a live URL until the owner says so. All hosting accounts must belong to Elevate Branson, not to a person.

## What runs where

| Path | Code | Served by today | Purpose |
| --- | --- | --- | --- |
| `POST /api/submit` | `src/server/handleSubmit.ts` | `worker/index.ts` | Volunteer, tour, prayer, and contact forms. Validates, rate limits, checks the honeypot, emails staff through Resend |
| `GET /api/events` | `src/server/calendar.ts` | `worker/index.ts` | Reads the public Google Calendar feed and returns events as JSON, cached 15 minutes |
| `POST /api/push/register` | `src/app/api/push/register+api.ts` | Expo Router API route only | Stores a push token and topic choices |
| `POST /api/push/send` and `/staff/notify` | `src/app/api/push/send+api.ts`, `src/app/staff/notify+api.ts` | Expo Router API route only | Staff send page and the send call |

**Known gap:** the worker file serves only `/api/submit` and `/api/events`. The push and staff routes need a host that runs Expo Router API routes (server output), and the push token store is in memory (`src/server/pushMemory.ts`), so tokens vanish on restart. Before push goes live: choose a persistent store (for example Cloudflare KV or D1), replace `pushMemory`, and either add the push routes to the worker or deploy the Expo server output next to it. The app builds the push URL from the same base as `EXPO_PUBLIC_SUBMIT_URL`, so both must end up under one origin.

## Secrets and variables (names only)

Set these as worker secrets or variables, never in the repo or in `app.json`.

| Name | Used by | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | `/api/submit` | Secret. `re_placeholder` is rejected |
| `RESEND_FROM` | `/api/submit` | Sender on the verified domain |
| `VOLUNTEER_COORDINATOR_EMAIL` | volunteer forms | Staff inbox |
| `TOUR_CONTACT_EMAIL` | tour form | Staff inbox |
| `PRAYER_TEAM_EMAIL` | prayer form | Staff inbox; owner still to confirm (HUMAN_TASKS 49) |
| `CONTACT_EMAIL` | contact form | Staff inbox |
| `STAFF_PUSH_SECRET` | `/staff/notify` | Secret; the page stays locked while it is the example value |
| `EXPO_PUBLIC_SUBMIT_URL` | the app build (not a secret) | Public worker URL ending in `/api/submit`; set in `eas.json` env for the build |

Addresses ending in `@example.org` are treated as not set. Until the test phase ends, use one staff member's own email for all four inboxes.

## Deploy `/api/submit` and `/api/events` (Cloudflare Workers)

1. In the organization's Cloudflare account, install Wrangler (`npx wrangler login`).
2. Create `wrangler.toml` next to `worker/index.ts` (not in the repo yet):
   ```toml
   name = "elevate-branson-api"
   main = "worker/index.ts"
   compatibility_date = "2026-10-01"
   ```
3. Set each secret: `npx wrangler secret put RESEND_API_KEY`, then the same for the other names in the table.
4. Deploy: `npx wrangler deploy`. Note the URL it prints.
5. Put `https://<that-url>/api/submit` in `EXPO_PUBLIC_SUBMIT_URL` in `eas.json` (preview profile first). With the variable empty, the app opens the website forms.
6. Add a custom domain such as `api.elevatebranson.org` later so the URL does not change.

## Test each endpoint

Use a test inbox. Replace `$URL` with the worker URL.

- **Events:** `curl -s $URL/api/events | head -c 400` should return JSON with an `events` list. The calendar must be public; a failure returns a friendly error body, not a stack trace.
- **Submit, valid contact form:**
  `curl -s -X POST $URL/api/submit -H "Content-Type: application/json" -d '{"type":"contact","name":"Test","email":"test@example.com","program":"General","message":"Test","company":""}'`
  expect `{"ok":true,...}` and one email in the test inbox.
- **Submit, bad form:** drop the email field; expect status 400 and no email.
- **Honeypot:** set `"company":"x"`; expect 200 and no email.
- **Rate limit:** send six valid requests within a few minutes from one address; the sixth returns 429.
- **Inbox missing:** unset one recipient; expect 503 "The office inbox is not ready yet."
- **Push (after the gap above is closed):** register a token from a preview build, open `/staff/notify`, use Preview then a test send to one token, then a confirmed broadcast.
- Repo tests: `npm test` covers `handleSubmit`, the calendar handler, the push logic, and form rules without network access.

## Logs and privacy

The code never logs form bodies. Keep it that way: do not add `console.log` of requests, and leave worker log capture at errors only. Mail in the staff inbox is the only record of a submission.

## Roll back

- List versions: `npx wrangler deployments list`. Roll back: `npx wrangler rollback`.
- If forms misbehave, unset `EXPO_PUBLIC_SUBMIT_URL` in the next app build (the app then opens website forms). Already installed builds keep the old URL, so keep the endpoint alive and fix forward.
- If the Resend key leaks, revoke it in Resend and run `npx wrangler secret put RESEND_API_KEY` with a new one.
- If the calendar feed fails, `/api/events` returns a friendly failure and the Events screen links to the website calendar.

## Where the public URL goes

`EXPO_PUBLIC_SUBMIT_URL` in `eas.json` (`build.preview.env` and `build.production.env`), and in a local `.env` for development (the `.env` file is ignored by git; `.env.example` holds placeholders only). The events and push URLs are derived from it.
