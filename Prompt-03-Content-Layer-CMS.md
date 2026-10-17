# Prompt 03: Content Layer / CMS

**Elevate Branson App Prompt Chain | Prompt 3 of 9**
**Run in:** Claude Code, `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`
**When:** Paste into Claude Code after the previous phase has committed and pushed.

Copy everything in the box below.

```
GOAL
Let staff manage content without developers. Implement the CMS schema and an app-side content client with caching.

FORMAT
CMS schemas for: Program, Event, Resource (partner org), HousingListing, TinyHouseUpdate, Hours (Coffee, Thrift Store, Playground, Campus), NewsletterIssue, SiteSettings (address, social links, donate URL, merch URL, website URL, coordinator contacts). Typed content client in /src/content with offline cache and stale-while-revalidate. Seed content from https://elevatebranson.org/ (fetch pages, extract real program names, address, hours, and descriptions; mark every scraped item "verify" in HUMAN_TASKS.md).

GUARDRAILS
Rules from CLAUDE.md apply. Never fabricate hours, addresses, or housing data; use placeholders marked TODO. Read-only public CMS token only. Write instructions for staff in docs/STAFF_GUIDE.md in plain language with no jargon. If CMS account creation requires me, add to HUMAN_TASKS.md and build against local JSON fixtures that match the schema so work continues.

CONTEXT
Housing list changes often. Resources are 150+ orgs, so add category filters and search, plus tap-to-call and tap-to-map.
```
