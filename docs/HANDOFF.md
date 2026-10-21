# Handoff

Written 20 October 2026 for Elevate Branson staff and whoever maintains the app next. Plain language first; developer steps are marked.

> **Every account must belong to Elevate Branson, not to a person.** Apple, Google, Expo, Cloudflare, Resend, and the code host should all use an organization email and have at least two administrators. If one person leaves and owns an account alone, the app can be locked out of updates.

## What was built

A phone app (iPhone and Android, with a web version) that mirrors elevatebranson.org: programs, hours, events, volunteering, tours, area resources, newsletter and podcast, prayer requests, contact, and giving. The app never takes card numbers; giving opens the organization's own donation pages in the phone's browser.

Status: all code is in the repository `https://github.com/driaialchemy/ElevateBranson`. **Nothing is deployed and nothing is in the stores.** The remaining steps are in `docs/RELEASE_CHECKLIST.md` and `docs/WORKER_RUNBOOK.md`, and the list of things only a person can do is `docs/HUMAN_TASKS.md`.

## Architecture on one page

- **App:** Expo and React Native with Expo Router. One codebase for iOS, Android, and web. Colors and type are in `src/theme/tokens.ts`.
- **Content:** the screens read a content bundle. Today that is starter copy in the repository (`src/content/fixtures.ts`, imported website pages in `content/pages/*.json`, `src/content/mediaCatalog.json`, `src/content/areaResources.json`). A Sanity editing site was planned but is **not set up**; until it exists, content changes are code changes (see below). The phone keeps the last copy it downloaded and shows it offline.
- **Forms:** the app posts volunteer, tour, prayer, and contact forms to a small server (a Cloudflare Worker, `worker/index.ts`). The server checks them, blocks spam, and emails the right staff inbox through Resend. Nothing is stored in a database. If the phone is offline, the form waits on the phone and sends later. With no server address set, the app opens the website forms instead.
- **Events:** the server reads the organization's public Google Calendar and gives the app a short list. Staff edit the calendar in Google Calendar; it must stay public.
- **Push notifications:** Expo's push service. People choose topics (News, Events, Programs, Giving, Housing). Staff send from a locked web page (`/staff/notify`). **Not live:** the token store is in memory and the routes need a host (see the runbook).
- **Giving:** buttons that open Neon CRM and donation pages. Merch is hidden until a shirt-store link exists.
- **Checks:** `npm test` (110 tests), `npx tsc --noEmit`, `npm run lint`, `npm run audit:parity`, `npm run audit:links`, `npx expo-doctor`. Reports are in `docs/QA_REPORT.md`, `docs/PARITY_REPORT.md`, and `docs/LINK_REPORT.md`.

## Accounts and who owns each

Fill in the owner column when the accounts exist. "Organization" means the account's legal owner is Elevate Branson with a shared email, not a personal login.

| Account | Used for | Owner today | Should be |
| --- | --- | --- | --- |
| GitHub `driaialchemy/ElevateBranson` | The code | Developer's account (AI Alchemy) | Move to an Elevate Branson organization, or keep a signed agreement and an admin on the nonprofit side |
| Apple Developer Program | iPhone app | Not created | Organization (needs D-U-N-S) |
| Google Play Console | Android app | Not created | Organization |
| Expo (EAS) | Builds and push | Not created | Organization team |
| Cloudflare | Worker hosting | Not created | Organization |
| Resend | Sending form email | Not created | Organization; verified sending domain |
| Sanity (editing site) | Content editing | Not created | Organization; optional |
| Neon CRM / z2systems | Donation forms | Elevate Branson | Elevate Branson |
| Constant Contact | Newsletters | Elevate Branson | Elevate Branson |
| Google Calendar (public) | Events | Elevate Branson | Elevate Branson, two editors |
| Domain and website (elevatebranson.org) | Website, privacy policy | Elevate Branson | Elevate Branson |

## How to do things

**Send a notification (once push is live).** Open `/staff/notify` on the server, enter the staff password, write a short title and message, pick a topic, press Preview, check it, then confirm. A cooldown stops repeat blasts. Use "test send" to one phone first. The password is the `STAFF_PUSH_SECRET` secret; keep it in the organization's password manager.

**Update content.** Today this is a developer task: edit the files named above and release a new build, or (after the Sanity site exists) edit in the browser and the app picks it up. For website pages, run `npm run import:site` to pull fresh text, then review pages marked verify. Staff-facing notes on each content type are in `docs/STAFF_GUIDE.md`. Never invent a date or a price; leave a marked TODO instead.

**Edit the calendar.** Add or change events in the organization's Google Calendar. The app shows them within about 15 minutes. If the Events screen says the calendar is unavailable, check that the calendar is still shared publicly.

**Refresh media.** Once a month run `npm run refresh:media`, commit `src/content/mediaCatalog.json`. It updates newsletters, podcast episodes, and videos.

**Update the Area Resources list.** When a new sheet is posted, update the two PDF links in `src/content/pdfSheets.ts`, then re-run `python -I scripts/extract_pdf_columns.py <sheet.pdf>` and `npx tsx scripts/parse-area-resources.ts` and review the entries.

**Check links and coverage.** `npm run audit:links` and `npm run audit:parity` write fresh reports. Run them before each release.

## Annual and recurring renewals

| Item | When | Notes |
| --- | --- | --- |
| Apple Developer Program | Every year | Lapse removes the app from the store. Put the date on the shared calendar once enrolled |
| Google Play | One-time fee; keep contact and policy details current | Yearly policy and target-SDK updates may require a new build |
| Domain, Resend sending domain | Yearly or as the registrar sets | Form email stops if the sending domain lapses |
| Expo, Cloudflare plans | Per plan | Free tiers may fit; confirm |
| Push, store, and form-email keys | Review yearly; rotate when staff leave | Names are in the worker runbook |
| Dependencies | Every few months, and before each release | `npm audit` currently shows findings in build tools only; update Expo versions as releases come |
| Hours, school-year dates, staff phones | Each season | See the facts list in `docs/QA_REPORT.md` |
| Charity Navigator, donation page text, privacy policy | Yearly | The policy needs an app section before store submission |

## Who to call

- **Elevate Branson main office:** 417.335.9915, Info@ElevateBranson.org, 310 Gretna Road, Branson, MO 65616.
- **Developer or maintainer:** TODO. Add a name, email, and phone for whoever maintains the code after handoff. The project was built with AI assistance by AI Alchemy; contact details are not recorded in the repository.
- **Apple, Google, Expo, Cloudflare, Resend support:** use each service's support page while signed in as an organization admin.

## What is still open

Read these before launch: `docs/HUMAN_TASKS.md` (numbered list of things only a person can do), `docs/QA_REPORT.md` ("Open defects" and "Facts to verify"), `docs/CONTENT_CONFLICTS.md` (website values that disagree), and `docs/BLOCKERS.md`. The biggest items: create the organization accounts, supply a 1024-pixel app icon, confirm the form inboxes, update the privacy policy for the app, choose a persistent push store and host, confirm staff phone and email display, and verify hours and dates.
