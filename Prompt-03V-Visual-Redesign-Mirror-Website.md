# Prompt 03V: Visual Redesign to Mirror elevatebranson.org

**Elevate Branson App Prompt Chain | Patch between Prompt 03D and Prompt 4**
**Run in:** Claude Code, `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`
**When:** After Prompt 03D, before Prompt 4. Run once. Prompt 4 then builds its screens on the new look.

Copy everything in the box below.

```
GOAL
Redesign the app's visual layer so it closely mirrors https://elevatebranson.org/ (adapted for a phone), replacing the current plain text-list look. Keep all content logic, schemas, tests, and offline behavior working. Read CLAUDE.md, docs/BRAND.md, src/theme/tokens.ts, and the shared components from Prompt 2.

PROBLEM (owner feedback with screenshot)
Home is a bare list of text links (Give, Volunteer, Tour, Prayer, Find Us, Newsletter) on a pale background: no hero, no photos, no icons, no cards, no prominent Donate button, lots of empty space. The tab bar shows dropdown arrows instead of icons on web. On a wide browser the layout stretches edge to edge. The owner wants it to feel like the website.

FORMAT
1. CAPTURE THE LOOK. Use Playwright (install as a dev dependency if missing; do not commit browsers) to load the website at 390px and 1280px wide. Save full-page screenshots to docs/brand-reference/. Extract computed styles: exact colors (hex), font families and weights, heading sizes, button shape, radius, and colors, section background colors, spacing. Download the logo, hero image, and section photos into assets/brand/ (compressed, with alt text recorded in docs/BRAND.md). Update docs/BRAND.md and src/theme/tokens.ts with the real values. Add radii, shadows, and a spacing scale to the tokens.
2. COMPONENTS (src/components). Build: Header (logo plus DONATE NOW button), Hero (full-width photo, dark overlay for legibility, headline, subhead, primary button), SectionHeader (short ALL-CAPS label matching the site), Button (primary filled, secondary outline, donate accent; website shape and colors), Card, StatTile, ActionTile (icon plus label, two-column grid), ListRow (icon, title, chevron), SeasonalBanner (shown only when the content has one). Use @expo/vector-icons with one consistent icon style. Give the tab bar real icons and the brand active color; fix the web dropdown arrows.
3. HOME. Rebuild in the website's order: optional seasonal banner; header with DONATE NOW; hero "Helping Families Break the Cycle of Poverty" with subhead "Job training, housing, and community support in Branson, Missouri." and a TAKE THE NEXT STEP button; three-stat row; then THE FACTS, THE VISION, THE SOLUTION, OUR DIFFERENCE (with SCHEDULE A TOUR button), OUR ROLE, and THE PLAN ("You can be part of the solution." with Learn More, Volunteer, Donate buttons) as stacked cards; then a quick-actions ActionTile grid covering the main features (Give, Volunteer, Tour, Prayer, Find Us, Newsletter, Events, Resources); newsletter card; footer block with hours, social icons, join mailing list, privacy link. Read all section copy and stat numbers from the content layer (add HomeSection and Stat entries with a sourceUrl), copied from the website and marked "verify" in HUMAN_TASKS.md. Do not hardcode copy in components. Stat figures must come from the website text; if one cannot be read, show a TODO placeholder, never a guessed number.
4. EVERY OTHER SCREEN. Replace plain text lists with Cards, ListRows with icons, and photos where the site has them (Programs, About, Coffee, Thrift Store, Playground, Tiny House). Consistent brand-colored page headers, spacing, and typography. Programs: image card per program.
5. WEB WIDTH. Center content with a max width (about 720px) on wide screens so the browser preview looks like a phone-style layout, with the brand background on the sides.

GUARDRAILS
Rules from CLAUDE.md apply. Use tokens only: no hardcoded colors or fonts in screens or components. Never alter, recolor, or distort the logo. Accessibility stays mandatory: 4.5:1 text contrast (including text over photos, using the overlay), 44pt tap targets, 16pt minimum text, dynamic type, alt text and screen-reader labels on every image and icon button. Fonts: use the site's fonts only if embedding is allowed (Google Fonts is fine); otherwise the closest free match, logged in HUMAN_TASKS.md. Images: compress, lazy-load, cache for offline, never hotlink. No new paid services or API keys. Prompt 4 must use these components; append that to CLAUDE.md under "Overrides to Prompt 4". Keep lint, typecheck, and all existing tests passing. SELF-REVIEW LOOP: screenshot the app at 390px wide and compare against the reference screenshots; fix the most visible differences; repeat up to 3 rounds; save final screenshots to docs/brand-reference/after/. Auto-resolve failures (3 attempts), then log to docs/BLOCKERS.md and continue. Commit as "phase-3v: visual redesign to mirror website" and push to origin main. End with one status line: "3V done | screens restyled: N | tests: pass | human tasks added: Y".

CONTEXT
Elevate Branson is a Branson, Missouri nonprofit helping families break the cycle of poverty (job training, housing, community support). Tone is hopeful, direct, and mission-driven, with faith-based language. Followers include people in housing need and older donors, so the design should feel warm and trustworthy and stay easy to read. The website was built with Elementor and Google Fonts. Official brand files are still a human task; use the website's assets until they arrive.
```
