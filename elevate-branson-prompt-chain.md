# Elevate Branson App: Optimized Prompt Chain

Built on the AI Alchemy 4-layer structure (Goal, Format, Guardrails, Context) with Gradual Execution (PB6), Cognitive Verifier, Recipe, and Fact Check List patterns.

**How to use:** Run in Claude Code from `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`. Paste Prompt 0 first, then one prompt per session or phase. Each phase ends with a commit and push, so any phase can be re-run without losing work. Context lives in `CLAUDE.md` and `docs/`, so later prompts stay short.

**Recommended stack (change in Prompt 1 if you disagree):**
- Expo (React Native, TypeScript): one codebase for iOS and Android, builds in the cloud so no Mac is needed.
- Sanity or similar headless CMS (free tier): staff edit events, programs, housing list, and hours without a developer or app-store release.
- Expo Push Service plus a small staff-only send page for notifications.
- Serverless function (Cloudflare Worker or Vercel) plus Resend for form emails.
- Giving and merch open in an in-app browser to the org's existing hosted donation and store pages.

---

## PROMPT 0: Foundation, Context, and Safety Rules (run once)

```
GOAL
Initialize the Elevate Branson mobile app project. Create CLAUDE.md as the persistent context for all later phases.

FORMAT
Create: CLAUDE.md, docs/FEATURES.md, docs/DECISIONS.md, docs/BLOCKERS.md, .gitignore, README.md.

GUARDRAILS (write these verbatim into CLAUDE.md as standing rules)
1. Repo: https://github.com/driaialchemy/ElevateBranson, local path C:\Users\msell\OneDrive\AIAlchemy\elevatebranson. Branch main. If the folder is not a git repo, git init and add the remote.
2. After each phase: run lint, typecheck, tests. Commit with message "phase-N: summary". Push to origin main.
3. Auto-resolve failures: diagnose, fix, rerun, up to 3 attempts. If still failing, log it in docs/BLOCKERS.md with the error and attempted fixes, then continue with the next independent task. Never stop to ask unless a rule below requires it.
4. Never commit secrets, API keys, or personal data. Use .env (gitignored) plus .env.example with placeholder values. Run a secrets scan (grep for key patterns) before every push.
5. .gitignore must exclude node_modules, .expo, build output, .env*. (The folder is inside OneDrive; keep installs lean.)
6. Never use destructive git (force push, reset --hard) or delete files outside this project folder.
7. Anything needing a human (App Store, Google Play, Apple Developer, Expo, CMS, Resend, or domain accounts, plus the CEO's content) goes in docs/HUMAN_TASKS.md as a numbered checklist. Do not block on it. Use clearly marked placeholder content.
8. Accessibility is mandatory: minimum 16pt text, dynamic type, 4.5:1 contrast, screen-reader labels, 44pt tap targets. The audience includes people in housing crisis and older donors.
9. Privacy: prayer requests and volunteer forms contain personal data. Collect the minimum, never log form bodies, send only to the configured staff email, add a privacy notice screen.
10. Token discipline: no re-explaining, no restating files, short status lines only.

CONTEXT
Nonprofit: Elevate Branson. Core followers install the app to stay informed about ~10 programs, communicate with staff, give, schedule tours, and volunteer. Push notifications mirror the content of their email newsletter. Website: https://elevatebranson.org/
Save the 17 requested features into docs/FEATURES.md exactly as listed: 1 About Us; 2 Find Us (map/address, may sit under About); 3 Volunteer (list of ~10 programs and opportunities, simple form emailing the volunteer coordinator); 4 Resources (150+ partner orgs for referrals, key item is an affordable housing list); 5 Social links; 6 Submit a prayer request; 7 Merch (buy a t-shirt); 8 Schedule a campus tour; 9 Tiny House info/updates; 10 Newest newsletter (may sit under About); 11 Website link; 12 Upcoming events; 13 Programs (Elevate Kids, Elevate Work, Elevate Entrepreneurs, others); 14 Thrift Store; 15 Elevate Coffee (hours, offerings); 16 Give/donate; 17 Playground (hours, info).
Record the stack choices above in docs/DECISIONS.md.
```

---

## PROMPT 1: Discovery and Decision Record (Cognitive Verifier + Flipped Interaction)

```
GOAL
Resolve open questions before building. Read CLAUDE.md and docs/FEATURES.md.

FORMAT
Write docs/OPEN_QUESTIONS.md, a table with: question, why it matters, recommended default, who answers. Then ask me ONLY the questions that cannot be defaulted, max 7, in one message.

GUARDRAILS
- Defaults must keep the build unblocked. Mark each default "assumed" in docs/DECISIONS.md.
- Verify via web search, then cite in DECISIONS.md: current Apple App Store rules for nonprofit donations and external payment links; Expo push notification setup requirements; current free-tier limits of the chosen CMS and email service. Flag anything uncertain as "verify".

CONTEXT
Questions to consider: official 10-program list; staff who maintain content (technical level); existing donation platform; existing merch store; tour scheduling tool; how housing list is maintained (spreadsheet? PDF?); newsletter platform (Mailchimp, Constant Contact, etc.) and whether it has an RSS feed or API; brand assets (logo, colors, fonts); developer accounts (Apple $99/yr, Google $25 once; nonprofit fee waivers may apply to Apple); volunteer coordinator email; privacy policy URL.
```

---

## PROMPT 2: App Shell and Navigation

```
GOAL
Scaffold the Expo TypeScript app with navigation and theme. Read CLAUDE.md and docs/DECISIONS.md.

FORMAT
Expo Router with 5 bottom tabs: Home, Programs, Events, Get Involved (Volunteer, Tour, Prayer, Give, Merch), More (About, Find Us, Resources, Social, Website, Newsletter, Privacy). Home surfaces quick actions, latest news, and next event. Place each of the 17 features in the structure and show the mapping in docs/NAVIGATION.md.

GUARDRAILS
Rules from CLAUDE.md apply. Brand theme from supplied assets, otherwise neutral warm placeholder with TODO in HUMAN_TASKS.md. Shared components: Screen, Card, Button, ListItem, ErrorState, EmptyState, OfflineBanner. Every screen works offline with cached content and shows a friendly error if the network fails. No feature logic yet, only stub screens.

CONTEXT
Followers are everyday people, many on older phones. Keep it fast, simple, and obvious. Max two taps to any feature from Home.
```

---

## PROMPT 3: Content Layer / CMS

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

---

## PROMPT 4: Informational Screens

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

---

## PROMPT 5: Forms and Backend (Volunteer, Tour, Prayer)

```
GOAL
Implement three forms plus a serverless endpoint that emails staff.

FORMAT
- Volunteer: select program (from CMS), name, email, phone optional, message. Emails the volunteer coordinator.
- Campus tour: name, email, phone, preferred dates and times, group size. Emails the tour contact. (If a scheduling tool exists per DECISIONS.md, deep link to it instead and keep the form as fallback.)
- Prayer request: request text, optional name and contact, "share publicly" toggle default OFF. Emails the prayer team.
Endpoint at /api/submit with a type field, input validation, per-IP rate limiting, honeypot field for spam, and a confirmation message in the app. Zod schemas shared between client and server.

GUARDRAILS
Rules from CLAUDE.md apply, especially #4 and #9. No form content in logs or analytics. Recipient emails come from server env vars only, never shipped in the app bundle. Tests: validation, rate limit, and a mocked email send. Include a retry queue so a submission made offline sends when connectivity returns.

CONTEXT
Staff follow up by conversation. Confirmation copy should set a realistic expectation ("Our coordinator will reach out").
```

---

## PROMPT 6: Push Notifications and Staff Send Tool

```
GOAL
Let staff send push notifications that mirror newsletter-style updates.

FORMAT
App: permission prompt with a value-first explanation screen (shown after first meaningful use, not at launch), token registration, topic preferences (News, Events, Programs, Giving, Housing), notification inbox screen, tap-to-deep-link to the relevant screen. Backend: token storage, send endpoint using Expo Push Service with batching and receipt checking, and a simple password-protected staff web page to compose and send to all or to a topic, with a preview and a test-send-to-me step.

GUARDRAILS
Rules from CLAUDE.md apply. Staff page needs authentication (single shared secret in env is acceptable for v1; log it in HUMAN_TASKS.md as upgrade-later). Never store personal data with tokens. Provide unsubscribe and per-topic controls. Add sending limits to prevent accidental spam (confirm dialog, cooldown).

CONTEXT
The CEO plans to use push for what the email newsletter covers. Start with the most recent newsletter format (I will forward it) as sample notification content in docs/NOTIFICATION_EXAMPLES.md.
```

---

## PROMPT 7: Giving, Merch, Events

```
GOAL
Implement Give, Merch, and Upcoming Events.

FORMAT
- Give: prominent button opening the organization's hosted donation page in the in-app browser (URL from SiteSettings). Include a short impact blurb.
- Merch: opens the hosted store page in the in-app browser.
- Events: CMS-driven list and detail, "Add to calendar" (device calendar), share, and optional "Remind me" local notification.

GUARDRAILS
Rules from CLAUDE.md apply. The app must not collect or store payment data. Per Prompt 1 research, follow current App Store rules for nonprofit donations and external links; if the research flagged risk, implement the compliant alternative and note it in HUMAN_TASKS.md.

CONTEXT
Keep giving one tap from Home and from More.
```

---

## PROMPT 8: Quality Gate (Fact Check List + Reflection)

```
GOAL
Audit the whole app against docs/FEATURES.md and CLAUDE.md rules, then auto-fix.

FORMAT
Produce docs/QA_REPORT.md: feature coverage table (17 rows, pass/fail), accessibility results, security and privacy checks, performance notes, and a "facts to verify" list (hours, addresses, links, program names, emails, donation and store URLs). Fix all fixable failures automatically (max 3 attempts each), re-run checks, and update the report.

GUARDRAILS
- Run: lint, typecheck, tests, expo-doctor, dependency audit, secrets scan.
- Test on small-screen and large-text configurations.
- Confirm no secrets in git history (git log -p search).
- Do not mark a feature pass without a test or a documented manual check.

CONTEXT
Treat unverified organizational facts as defects until the human checklist confirms them.
```

---

## PROMPT 9: Build, Release, Handoff

```
GOAL
Prepare store builds and hand the project to the organization.

FORMAT
Configure EAS (app.json, eas.json, bundle IDs, icons, splash, permissions strings). Create docs/RELEASE_CHECKLIST.md: Apple Developer enrollment (nonprofit fee waiver if eligible), Google Play account, store listing copy, screenshots list, privacy policy and App Privacy / Data Safety answers (derived from the actual data the app collects), TestFlight and internal testing steps, review notes. Write docs/HANDOFF.md: architecture one-pager, accounts and who owns each, staff guide link, how to send a notification, how to update content, annual renewals, who to call.

GUARDRAILS
Rules from CLAUDE.md apply. Account ownership must be the organization, not an individual; flag this prominently. Do not run production builds or submit to stores without explicit instruction from me; run preview builds only.

CONTEXT
End state: org-owned accounts, staff-editable content, repeatable releases, everything in GitHub.
```

---

## Optional: Run-All Wrapper (for long autonomous sessions)

```
Execute phases 2 through 8 in order. Before each phase: re-read CLAUDE.md. After each phase: commit, push, then print one status line: "Phase N done | blockers: X | human tasks added: Y". Stop only for rule #6 violations or if the same blocker repeats across three phases.
```
