# Prompt 04: Informational Screens

**Elevate Branson App Prompt Chain | Prompt 4 of 9**
**Run in:** Claude Code, `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`
**When:** Paste into Claude Code after the previous phase has committed and pushed.

Copy everything in the box below.

```
GOAL
Build the read-only screens from the CMS: About, Find Us, Programs (list and detail), Thrift Store, Elevate Coffee, Playground, Tiny House updates, Newsletter archive, Social links, Website link.

FORMAT
One screen per feature using shared components. Find Us: static map preview, address, "Open in Maps" deep link (iOS and Android), tap-to-call, hours. Hours screens show open-now status computed from Hours data and local time (America/Chicago). Newsletter: list of issues with in-app browser view of each.

GUARDRAILS
Rules from CLAUDE.md apply. Open all external links in the in-app browser or system handler, never a raw WebView with injected scripts. Write unit tests for the open-now logic including edge cases (closed days, holidays, past midnight).

CONTEXT
Branson, Missouri (Central Time). Programs include Elevate Kids, Elevate Work, Elevate Entrepreneurs, and others to be confirmed.
```
