# Project context and detailed rules

This is the preserved long context from the former `CLAUDE.md`. Read it only when the current phase needs these details. Before changing the app, follow the concise rules in the root `AGENTS.md`.

## Product context

Nonprofit: Elevate Branson. Core followers install the app to stay informed about about 10 programs, communicate with staff, give, schedule tours, and volunteer. Push notifications mirror the content of the email newsletter. Website: https://elevatebranson.org/.

## Requested features

1. About Us
2. Find Us (map/address, may sit under About)
3. Volunteer (list of ~10 programs and opportunities, simple form emailing the volunteer coordinator)
4. Resources (150+ partner orgs for referrals, key item is an affordable housing list)
5. Social links
6. Submit a prayer request
7. Merch (buy a t-shirt)
8. Schedule a campus tour
9. Tiny House info/updates
10. Newest newsletter (may sit under About)
11. Website link
12. Upcoming events
13. Programs (Elevate Kids, Elevate Work, Elevate Entrepreneurs, others)
14. Thrift Store
15. Elevate Coffee (hours, offerings)
16. Give/donate
17. Playground (hours, info)

`docs/FEATURES.md` points here to keep older prompts working without duplicating the list.

## Stack and project references

Stack choices are recorded in `docs/DECISIONS.md`. Open failures are in `docs/BLOCKERS.md`; human follow-ups are in `docs/HUMAN_TASKS.md`. Staff content instructions are in `docs/STAFF_GUIDE.md`. App content is in `src/content`. Starter copy remains until a real Sanity project ID is configured. Only a public read token may be used by the app.

## Brand

The app reflects the Elevate Branson website's logo, colors, fonts, imagery, and tone. The extracted record is `docs/BRAND.md`, and UI tokens are in `src/theme/tokens.ts`. UI uses those tokens; do not hardcode colors or fonts elsewhere. Official brand files are still a human task.

## Overrides to Prompt 4

- No static map. Find Us uses an address card with address, main phone, hours, Open in Maps (iOS and Android deep links), and Call. No map API, map key, or paid service.
- Prompt 4 must call `getOpenStatus` and must not reimplement hours logic.
- Prompt 4 must use `Header`, `Hero`, `SectionHeader`, `Button`, `Card`, `StatTile`, `ActionTile`, `ListRow`, and `SeasonalBanner` from `src/components`.
