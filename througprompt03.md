# Progress

Status through 17 October 2026. Prompts 00 through 03 are done and pushed to `main`. Prompt 04 has not started.

Latest commit: `3801dd1` — phase-3: add content schema, starter copy, and offline cache.

Repo: https://github.com/driaialchemy/ElevateBranson

## Completed

| Phase | Commit | What shipped |
| --- | --- | --- |
| 0 | `148c2ad` | Foundation: standing rules, feature list, decision record, blocker log, human checklist, `.gitignore`, `.env.example`, README. |
| 1 | `ef47928` | Discovery defaults. Open questions recorded with assumed answers so later prompts can continue. |
| 1b | `6b321cc` | Brand rule: the app follows elevatebranson.org. Official brand files are still a human task. |
| 2 | `87639cb` | Expo SDK 57 app shell, five tabs, all 17 features within two taps of Home, brand tokens, shared screens, offline banner. |
| 3 | `3801dd1` | Content shapes, starter copy from the public website, offline cache, and a client that refreshes when a real Sanity project id is set. |

There are no open blockers in `docs/BLOCKERS.md`.

## What the app does now

- Opens as Elevate Branson with the website wordmark, teal and page colors from `src/theme/tokens.ts`, and system fonts until official font files arrive.
- Five tabs: Home, Programs, Events, Get Involved, More.
- Home shows shortcuts, the September 2026 newsletter, and an empty next-event card.
- Programs lists 13 published programs. Coffee, thrift, and playground show the hours copied from the website. Playground keeps school year, June and July, and August as separate seasons.
- About shows the mission and vision. Find Us shows 310 Gretna Road, the main phone, campus hours, call, and maps.
- Resources has search, category filters, tap-to-call, and tap-to-map. The partner list and the housing list are empty because the website does not publish those names.
- Give opens the website donate page. The app does not collect card numbers. Merch stays empty until a store link exists.
- Social, website, and newsletter links open in the phone browser.
- Offline, the app keeps the last saved copy and says so.

## Still a placeholder

Volunteer, tour, and prayer are explanation screens. The forms and the email worker are Prompt 05.

Events, the partner directory, housing listings, and dated tiny-house notes are empty on purpose. Staff add them after the editing site exists. See `docs/STAFF_GUIDE.md` and human tasks 22–24.

A static map preview and “open now” are Prompt 04. Push notifications are Prompt 06. Store submission checks are Prompt 08.

## Waiting on a person

Accounts and content that the build does not invent are listed in `docs/HUMAN_TASKS.md` (items 1–24). The next ones that change the app are a Sanity project, a check of the starter copy, real events, the partner list, housing listings, and a merch URL if one exists.

## Checks

Phase 3 passed lint, typecheck, and 19 tests. Web pages for Home, Programs, coffee hours, events, Find Us, and Resources rendered the expected text. Search, call, and map were not clicked in a browser.
