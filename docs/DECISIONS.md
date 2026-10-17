# Decisions

Starting stack from the prompt chain. Prompt 1 may revise these.

| Area | Choice | Why |
| --- | --- | --- |
| App | Expo (React Native, TypeScript) | One codebase for iOS and Android. Cloud builds, so no Mac is required. |
| Content | Sanity or a similar headless CMS (free tier) | Staff edit events, programs, the housing list, and hours without a developer or an app-store release. |
| Push | Expo Push Service, plus a small staff-only send page | Notifications mirror newsletter-style updates. Staff can send them without a developer. |
| Forms | Serverless function (Cloudflare Worker or Vercel) plus Resend | Volunteer, tour, and prayer forms email staff. |
| Give and merch | In-app browser to the org's existing donation and store pages | Reuse hosted pages instead of building payments in the app. |
