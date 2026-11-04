# Prompt 04 (REVISED): Informational Screens

**Elevate Branson App Prompt Chain | Prompt 4 of 9 (revised after 03D and 03V)**
**Run in:** Claude Code, `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`
**When:** After Prompts 03D and 03V have run and pushed. Use this version, not the original Prompt 04.

Copy everything in the box below.

```
GOAL
Build the read-only information screens from the CMS, using the redesigned look and the hours and verification logic added in phases 3d and 3v. Read CLAUDE.md (including "Overrides to Prompt 4"), docs/BRAND.md, src/theme/tokens.ts, the shared components, and getOpenStatus.

FORMAT
Screens: About, Find Us, Programs (list and detail), Thrift Store, Elevate Coffee, Playground, Tiny House updates, Newsletter archive, Social links, Website link.
- Build every screen from the 3v components (Header, Hero, SectionHeader, Card, ListRow, ActionTile, Button) and tokens only. Match the website's look; use its photos where available, with alt text.
- Find Us: NO map image and no map API. Use an address card: address, main phone, campus hours, "Open in Maps" (iOS and Android deep links), "Call" button.
- Hours screens (Coffee, Thrift Store, Playground, Campus): call getOpenStatus for open/closed, today's hours, and next open time. Do not reimplement hours logic or hardcode dates or seasons. Show every season (Playground: school year, June and July, August) with its date range. Show "Last updated <date>" from lastVerified, plus the "Call to confirm" note when older than 90 days.
- Programs: image card per program, detail screen with description, who it serves, and how to get involved (links to Volunteer and Give).
- Tiny House: dated updates, newest first.
- Newsletter: list of issues; each opens in the in-app browser.
- Empty sections: if a section has no content, hide its tile, or show a short "Coming soon, call us at <main phone>" card. Never show a blank screen.

GUARDRAILS
Rules from CLAUDE.md apply. No hardcoded colors, fonts, copy, or hours. Open external links in the in-app browser or system handler, never a WebView with injected scripts. Accessibility: 4.5:1 contrast, 44pt targets, dynamic type, screen-reader labels. Offline: every screen shows cached content and the offline banner. Tests: add rendering tests for the empty states and for a Playground season change; the open-now tests from 03D must stay green. Check each screen in the browser at 390px and at desktop width; fix visible problems (up to 3 rounds). Auto-resolve failures (3 attempts), then log to docs/BLOCKERS.md and continue. Commit as "phase-4: information screens" and push to origin main. End with one status line: "Phase 4 done | screens: N | tests: pass | human tasks added: Y".

CONTEXT
Branson, Missouri (Central Time). Programs include Elevate Kids, Elevate Work, Elevate Entrepreneurs, and others to be confirmed. Followers include people seeking housing and help, so hours and contact details must be accurate and clearly dated.
```
