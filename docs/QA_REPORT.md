# Quality report

Checked 19 October 2026, after prompts 00 through 07. Lint, typecheck, and 53 tests passed. `npx expo-doctor` passed 21 of 21 checks.

## Feature coverage

Each row has a screen test in `src/qa/rules.test.ts` and a page check on the running site. Every page returned status 200 and the phrase in the last column.

| # | Feature | Result | Page check |
| --- | --- | --- | --- |
| 1 | About Us | Pass | `/more/about` shows Mission |
| 2 | Find Us | Pass | `/more/find-us` shows 310 Gretna Road, Call, and Open in Maps |
| 3 | Volunteer | Pass | `/get-involved/volunteer` lists the programs and the coordinator form |
| 4 | Resources | Pass | `/more/resources` has search and the empty partner and housing states |
| 5 | Social links | Pass | `/more/social` shows Facebook, Instagram, X, and LinkedIn |
| 6 | Submit a prayer request | Pass | `/get-involved/prayer` keeps public sharing off until it is turned on |
| 7 | Merch | Pass | `/get-involved/merch` says the shirt store link is not in yet and does not take card numbers |
| 8 | Schedule a campus tour | Pass | `/get-involved/tour` opens the website form and keeps an in-app fallback |
| 9 | Tiny House info/updates | Pass | `/programs/tiny-house` shows the public description and an empty update list |
| 10 | Newest newsletter | Pass | `/more/newsletter` shows the September 2026 title |
| 11 | Website link | Pass | `/more/website` shows https://elevatebranson.org/ |
| 12 | Upcoming events | Pass | `/events` explains that no event names were published. Detail, calendar, share, and reminder behavior is covered by `src/events/schedule.test.ts` |
| 13 | Programs | Pass | `/programs` shows Elevate Kids |
| 14 | Thrift Store | Pass | `/programs/thrift` shows the thrift phone 417.986.1188 |
| 15 | Elevate Coffee | Pass | `/programs/coffee` shows coffee hours |
| 16 | Give/donate | Pass | `/get-involved/give` shows the donate sentence and Give on the website. Home and More both link here |
| 17 | Playground | Pass | `/programs/playground` shows playground hours |

Giving stays one tap from Home and from More. The app does not collect card numbers. Shirts, when a store link exists, open outside the app.

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

## Security and privacy

Pass for the checks that can be done in this repo.

- Git history has no `.env` commit. A history search found no AWS keys, Stripe live keys, private-key blocks, or GitHub tokens. The only Resend-looking string is the placeholder `re_placeholder`.
- Form bodies are not written to logs. Volunteer, tour, and prayer mail goes only to the server inboxes. A honeypot and a rate limit are in place. Placeholder inboxes do not send.
- Give and merch do not store a card number. Prayer sharing defaults to off. Push tokens store topic choices and no name.
- The staff send page stays locked until `STAFF_PUSH_SECRET` is a real secret. The example value is rejected.

## Performance

- Expo Doctor reported no project issues.
- The feature pages above answered on the local site without a second loading step in the HTML check.
- Find Us does not call a map service. Content is the bundled starter copy until a real Sanity project id is set. Push tokens live in memory for the server process and reset when that process restarts.

## Dependency audit

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
