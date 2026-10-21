# Quality report

Rechecked 20 October 2026 after CC-02 to CC-05 (the first pass was 19 October). Lint, typecheck, and 110 tests pass. `npx expo-doctor` passes 21 of 21 checks. `npm run audit:parity` reports 170 of 170 website URLs accounted for, and `npm run audit:links` reports 0 broken links of about 350 checked.

**Summary: features pass 17 of 17 | defects open: 4 | facts to verify: 23.** The open defects are listed under "Open defects". Unverified organization facts are listed separately and count as open defects until `docs/HUMAN_TASKS.md` confirms them.

## Feature coverage

Each row has a screen test in `src/qa/rules.test.ts` and a page check on the running web build. The 20 October recheck loaded every route below (plus the new contact, volunteer, and tour form routes and Home) at 320px and found the expected phrase on each, with page width 320 and no element past the edge.

| # | Feature | Result | Page check |
| --- | --- | --- | --- |
| 1 | About Us | Pass | `/more/about` shows Mission |
| 2 | Find Us | Pass | `/more/find-us` shows 310 Gretna Road, Call, and Open in Maps |
| 3 | Volunteer | Pass | `/get-involved/volunteer` lists the six opportunities. The native form (`volunteer-native`, `src/forms/forms.test.ts`) needs the Code of Conduct acknowledgment; with no submit URL the website forms open |
| 4 | Resources | Pass | `/more/resources` has the English/Spanish PDF switch, search, and 60 entries from the June 2026 sheet, 20 at a time (`src/content/pdfSheets.test.ts`, `scripts/parse-area-resources.test.ts`) |
| 5 | Social links | Pass | `/more/social` shows Facebook, Instagram, X, and LinkedIn |
| 6 | Submit a prayer request | Pass | `/get-involved/prayer` keeps public sharing off until it is turned on |
| 7 | Merch | Pass | `/get-involved/merch` says the shirt store link is not in yet and does not take card numbers |
| 8 | Schedule a campus tour | Pass | `/get-involved/tour` opens the website form; `tour-native` checks weekday, holiday, 11 a.m. to 4 p.m., and 24-hour notice (`src/forms/forms.test.ts`) |
| 9 | Tiny House info/updates | Pass | `/programs/tiny-house` shows the public description and an empty update list |
| 10 | Newest newsletter | Pass | `/more/newsletter` shows the September 2026 title |
| 11 | Website link | Pass | `/more/website` shows https://elevatebranson.org/ |
| 12 | Upcoming events | Pass | `/events` explains that no event names were published. Detail, calendar, share, and reminder behavior is covered by `src/events/schedule.test.ts` |
| 13 | Programs | Pass | `/programs` shows Elevate Kids |
| 14 | Thrift Store | Pass | `/programs/thrift` shows the thrift phone 417.986.1188 |
| 15 | Elevate Coffee | Pass | `/programs/coffee` shows coffee hours |
| 16 | Give/donate | Pass | `/get-involved/give` lists ten hosted forms and the donate sentence. DONATE NOW is in the header on every screen except Give (`src/content/pdfSheets.test.ts`). Home and More both link here |
| 17 | Playground | Pass | `/programs/playground` shows playground hours |

Giving stays one tap from Home and from More. The app does not collect card numbers. Shirts, when a store link exists, open outside the app.

## Parity

`docs/PARITY_REPORT.md` (from `npm run audit:parity`): 170 of 170 website URLs are a native route, an imported page, an external fallback, or excluded with a reason. Excluded: the two 404 form pages, the store and account pages, and staff-only pages. About 99 links to individual stories, profiles, and posts open the website in the in-app browser because those pages are not imported (HUMAN_TASKS 55). No bundled image is missing. `docs/LINK_REPORT.md`: 0 broken. Facebook, Instagram, X, LinkedIn, and Amazon block automated checks and need a hand check.

## Accessibility

Pass, with the checks below.

- Text on the reading surfaces meets 4.5:1. Body, header, and title sizes are at least 16. Tap targets in the token file are 44. `src/theme/contrast.test.ts`.
- Screens do not set their own colors, and no screen turns off dynamic type. `src/qa/rules.test.ts`.
- Buttons, list rows, form fields, program choices, topic switches, and the prayer-sharing switch have screen-reader labels. The honeypot field is hidden from assistive tech.
- A 320px-wide viewport kept the page width at 320. The full home sentence and all five tab names were present, and no text box was wider than its space.
- The same page at 1280px wide also stayed inside the window.
- Text enlarged to twice the computed size at 320px still kept the page width at 320, and the tab names were still present. The small tab glyphs overflow their own icon box by about 10 pixels. The page does not scroll sideways.
- The in-app browser, phone call, and map buttons were not tapped. Those need a phone.

The first 320px screenshot looked clipped because headless Chrome laid the page out wider than the picture. Forcing a 320px viewport showed the text wrapping and all five tabs on screen. The screen container now keeps a max width of the window so a long line cannot widen the page.

## Brand consistency

Pass. Colors, spacing, and type come from `src/theme/tokens.ts`; a test fails if a screen sets its own color (`src/qa/rules.test.ts`). Hero banners and card photos use one teal duotone (`src/components/Duotone.tsx`), and white hero text stays at 4.5:1 over the brightest pixel (`src/theme/contrast.test.ts`). DONATE NOW is a dark green that passes 4.5:1. The brand fonts are not licensed, so Montserrat and Nunito Sans stand in (HUMAN_TASKS 16). Ten 390px screenshots are in `docs/brand-reference/after-sp/`; they were not compared pixel by pixel with the website.

## Security and privacy

Pass for the checks that can be done in this repo.

- Git history has no `.env` commit. A history search found no AWS keys, Stripe live keys, private-key blocks, or GitHub tokens. The only Resend-looking string is the placeholder `re_placeholder`.
- Form bodies are not written to logs. Volunteer, tour, and prayer mail goes only to the server inboxes. A honeypot and a rate limit are in place. Placeholder inboxes do not send.
- Give and merch do not store a card number. Prayer sharing defaults to off. Push tokens store topic choices and no name.
- Rechecked 20 October: a search of all git history found only placeholders (`your_staff_secret`, `re_placeholder`); `.env` and `.env.local` are ignored and only `.env.example` is tracked. No `console.*` call exists in `src` or `worker`. Recipient addresses are read only from server variables in `src/app/api/submit+api.ts` and the worker; the client bundle reads only `EXPO_PUBLIC_SUBMIT_URL`. Contact and volunteer mail follow the same rules as tour and prayer, and the volunteer form requires the Code of Conduct acknowledgment on the server.
- The staff send page stays locked until `STAFF_PUSH_SECRET` is a real secret. The example value is rejected.

## Performance

- 20 October: on the dev server with no throttling, Home loaded in about 1 second and every route above rendered within 2 seconds. The Resources list shows 20 entries at a time. No mid-range device profile was run, so this is not a device measurement.
- At 320px with text doubled, the Give, contact, tour, Resources, and Home screens stayed inside the screen. One program chip on the contact form was 3px too wide; it now shrinks and wraps.
- Expo Doctor reported no project issues.
- The feature pages above answered on the local site without a second loading step in the HTML check.
- Find Us does not call a map service. Content is the bundled starter copy until a real Sanity project id is set. Push tokens live in memory for the server process and reset when that process restarts.

## Config and deploy readiness

Nothing here is deployed. "Code done" means the code and its tests exist in the repo.

| Piece | Code done | Tests | Config needed (names only) | Deploy step | Who |
| --- | --- | --- | --- | --- | --- |
| `/api/events` public calendar feed | Yes (`src/server/calendar.ts`, `worker/index.ts`) | `src/server/calendar.test.ts`, `src/events/*.test.ts` | `EXPO_PUBLIC_SUBMIT_URL` (the app finds the worker from it); the Google Calendar must be public | Deploy the worker; the public feed returned HTTP 200 on 20 October | Developer; staff confirm the calendar is public |
| `/api/submit` forms | Yes (volunteer, tour, prayer, contact; honeypot, rate limit, offline queue) | `src/server/handleSubmit.test.ts`, `src/forms/*.test.ts` | `RESEND_API_KEY`, `RESEND_FROM`, `VOLUNTEER_COORDINATOR_EMAIL`, `TOUR_CONTACT_EMAIL`, `PRAYER_TEAM_EMAIL`, `CONTACT_EMAIL`, `EXPO_PUBLIC_SUBMIT_URL` | Deploy the worker, then set `EXPO_PUBLIC_SUBMIT_URL` for the app build. Native forms switch on only when it is set | Developer; staff name the inboxes (HUMAN_TASKS 49, 50) |
| Resend email | Yes (`src/server/handleSubmit.ts`) | Mail is stubbed in tests; no live send was made | `RESEND_API_KEY`, `RESEND_FROM`; a verified sending domain | Create the Resend account, verify the domain, store the key as a worker secret | Staff or IT for the domain; developer for the secret |
| Push notifications | Code only: token registration, topics, inbox, send, and the staff page exist (`src/push`, `src/app/api/push`, `src/app/staff`) | `src/push/push.test.ts` | `STAFF_PUSH_SECRET`, an Expo push project and credentials, a persistent token store | Run the Expo Router API routes on a server host (the worker serves only `/api/submit` and `/api/events`), replace the in-memory token store, then build with push credentials | Developer, with Apple and Google developer accounts held by the organization |

## Open defects

1. **Push tokens are kept in memory** (`src/server/pushMemory.ts`) and reset on restart, so push cannot go live until a persistent store is chosen.
2. **Push and staff routes have no host.** The worker handles only two paths, and the web export is static, so `/api/push/*` and `/staff/notify` will not run until a server host is set up.
3. **No worker config file (`wrangler`) and no `eas.json`** exist yet; the release phase adds them or documents the steps.
4. **Dependency audit:** 29 findings, all in the Expo and Metro build tools (see below), none fixable without a breaking downgrade.

## Dependency audit

Rechecked 20 October with `npm audit --omit=dev`: still 29 findings (11 moderate, 18 high), all in the Expo, Metro, and React Native build chain. The suggested fixes would install Expo 44 or React Native 0.72, which breaks the app, so none were applied.

Earlier note:

`npm audit` reports 29 vulnerabilities (11 moderate, 18 high) in the Expo and Metro tree: `braces`, `decode-uri-component`, `node-forge`, and `uuid`. The offered fix installs Expo 44 or another breaking package. That was not applied. Expo Doctor still passes on SDK 57. This is recorded here rather than forced.

## Facts to verify

These copied facts stay open defects until the matching item in `docs/HUMAN_TASKS.md` is confirmed. The app shows them on purpose, and it does not invent the missing ones.

| Fact | Status | Checklist |
| --- | --- | --- |
| Program names and summaries, including Elevate Kids, Elevate Work, and Elevate Entrepreneurs | Open | 17 |
| Campus address 310 Gretna Road, Branson, MO 65616, main phone 417.335.9915, thrift phone 417.986.1188 | Open | 18 |
| Campus, coffee, thrift, and playground hours | Open | 19, 26 |
| Playground season dates. School year is TODO, so the app will not call it open or closed outside June, July, and August | Open | 25 |
| Newsletter titles and public links, April through September 2026 | Open | 20 |
| Facebook, Instagram, X, and LinkedIn links | Open | 21 |
| Donate page https://elevatebranson.org/donate/ and the Give sentence copied from that page | Open | 10, 31 |
| Merch store URL. Blank until staff send one | Open | 11 |
| Events. None, because the public calendar did not list names | Open | 22 |
| Partner directory and housing list. None published | Open | 12, 23 |
| Tiny-house dated updates. None published | Open | 24 |
| Volunteer inbox Volunteer@ElevateBranson.org | Open | 7 |
| Prayer inbox. Still a placeholder, so real prayer mail is not sent | Open | 8 |
| Who receives the website tour form | Open | 9 |
| Apple fundraising approval. Not confirmed, so Give stays on the website | Open | 10 |
| Official logo files and the licensed fonts. The app uses the system font | Open | 16 |
| Area Resources entries (60) and the Housing Information Sheet, from the March and June 2026 PDFs | Open | 48 |
| Prayer request recipient and the test inbox | Open | 49 |
| Café order-ahead link (Square returns 404) and the Worley sponsor link | Open | 51, 52 |
| Staff emails in decoded mailto buttons, and which Brenda Watson-Hill address is right | Open | 54 |
| Leftover "[email protected]" text on pages | Open | 53 |
| Staff phone numbers shown in the app | Open | 47 |
| Conflicting values listed in `docs/CONTENT_CONFLICTS.md` (11 items, including café and thrift hours) | Open | see file |
