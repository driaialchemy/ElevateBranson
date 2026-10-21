# Human tasks

Do not block the build on these. Use the placeholders in [DECISIONS.md](DECISIONS.md) until each item is done.

1. Create an Expo account and an EAS project for this app.
2. Enroll Elevate Branson in the Apple Developer Program as the nonprofit legal entity, and request the fee waiver. The app must stay free of digital sales and in-app purchases for the waiver to apply.
3. Create a Google Play Console account. Confirm the current registration fee on Google’s site before paying.
4. Create a Sanity project on the Free plan. Invite content staff as Administrators.
5. Create a Resend account, verify a sending domain such as elevatebranson.org, and store the API key in server environment variables only.
6. Create a Cloudflare account for the form worker, or say if Vercel should host `/api/submit` instead.
7. Confirm the volunteer inbox can stay Volunteer@ElevateBranson.org.
8. Name the prayer-request inbox. Until then the server uses a placeholder and does not send real prayer mail.
9. Confirm who receives the existing tour form at [elevatebranson.org/schedule-a-tour](https://elevatebranson.org/schedule-a-tour/).
10. Say whether Elevate Branson is already approved by Apple for in-app fundraising. Until then, Give opens the website donate page in the in-app browser. The app does not collect or store payment data.
11. Send the merch store URL, or confirm there is no online shirt store yet. Shirts stay on that outside page. The app does not use in-app purchase.
12. Provide the affordable housing list and how often it changes. Do not send it in chat if it contains private resident information. Organization names and public phone numbers are enough.
13. Confirm or correct the working program list in [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).
14. Provide the logo, brand colors, and fonts.
15. Update the privacy policy so it covers the mobile app, including prayer requests and volunteer forms. The current page covers the website and social channels.
16. Request official brand files (logo SVG/PNG, brand guide) from the CEO; swap in when received.
17. Check each starter program summary against its page on elevatebranson.org. Copied 17 October 2026: Elevate Kids, Elevate Work, Elevate Entrepreneurs, Elevate Connections, Elevate Outreach, Elevate Rides, Elevate Health, Elevate Life, Elevate Community, Computer Classes, Elevate Coffee, Thrift Store, Playground.
18. Check the campus address 310 Gretna Road, Branson, MO 65616, main phone 417.335.9915, and thrift phone 417.986.1188.
19. Check campus hours, coffee hours (Monday–Friday 8:00 A.M.–3:00 P.M.), thrift hours, and the three playground seasons (school year, June and July, August).
20. Check the April through September 2026 newsletter titles and their public links.
21. Check the Facebook, Instagram, X, and LinkedIn links in the starter copy.
22. Add real events in the editing site. The public calendar page did not list event names, so the app ships with none.
23. Add the partner organization directory. The website says there are more than 150 groups and does not name them, so the app ships with none.
24. Add dated tiny-house progress notes when you have them. The welcome page describes the neighborhood and does not give a dated update, so the app ships with none.
25. Confirm the playground school-year start and end dates, and any holiday closures. The website names the school year and does not give those dates, so the app uses TODO and will not call the playground open or closed outside June, July, and August. Also confirm that "June and July" means June 1 through July 31 and "August" means August 1 through August 31.
26. Confirm whether coffee, thrift, and campus hours change by season. The website gives one weekly schedule for each and no start or end date, so those date fields are TODO until you confirm them.
27. Deploy `/api/submit` (the worker in `worker/` or the Expo server route) and set `EXPO_PUBLIC_SUBMIT_URL` to that public address. Put the Resend key and staff inboxes in the server environment only.
28. Replace the shared staff-page password with individual staff logins. Until then the send page uses one secret in `STAFF_PUSH_SECRET`.
29. Forward the latest newsletter so the sample note in `docs/NOTIFICATION_EXAMPLES.md` can be replaced. Do not send personal stories in a push.
30. Add Apple push (APNs) and Android (FCM) credentials to the Expo project before testing notes on a phone.
31. Check the Give sentence. It was copied from the individual and company donations paragraph on elevatebranson.org/donate/ on 19 October 2026.
32. License Gotham and Avenir, or confirm Montserrat 600 and Nunito Sans 400 can stay. The website uses Gotham Bold and Avenir Medium. Those files are commercial and are not in the app.
33. Check the homepage stats and section copy copied on 19 October 2026: 22.4% below the poverty line, 1,500+ residents in sub-par housing, and a shortage of 2,200 housing units, plus The Facts, The Vision, The Solution, Our Difference, Our Role, and The Plan.
34. Confirm where the Thanksgiving banner should go. The image says to click for event information. The page did not publish a separate destination, so the app opens the homepage.
35. Confirm the mailing-list address. The site opens a Mailmunch popup at https://elevatebranson.org/#mailmunch-pop-1057830 rather than a standalone form.
36. Confirm who each program serves. The app shows a line only where the public summary already named a group: Elevate Kids, Elevate Entrepreneurs, Elevate Outreach, Elevate Community, and Playground. Elevate Work, Connections, Rides, Health, Life, Computer Classes, Coffee, and the Thrift Store do not show that section until you add it.
37. Resolve the coffee-hours conflict: the coffee page says Monday–Friday 8:00 A.M.–3:00 P.M.; another block shows campus-style hours.
38. Resolve the Thrift Store hours conflict between its own page and the Contact page.
39. Resolve the Tuesday and Thursday hours conflict on the Mission and Vision page.
40. Confirm the Elevate Work employment outcome (83% or 91.9%) and identify the current source figure.
41. Confirm the correct public contact number for Cathy Brown (417.737.1041 or 417.243.0644).
42. Replace or remove the stale 2024/2025 Elevate Entrepreneurs dates.
43. Confirm the Playground school-year season start and end dates.
44. Name the prayer-request destination or provide the public form URL.
45. Confirm whether a merchandise store exists and provide its public URL if so.
46. Deploy the `/api/events` worker route and configure `EXPO_PUBLIC_SUBMIT_URL`; the public iCal feed returned HTTP 200 on 20 October 2026.
47. Confirm the organization approves displaying staff phone numbers in the app.
48. Review the 60 Area Resources entries pulled from the June 2026 sheet (`src/content/areaResources.json`). Every entry is marked verify. Listings that share a block on the sheet (for example the second phone for Harbor House, Branson Senior Center, and the Forsyth clinic) were left out; the PDF remains the full source. Add them in the CMS if wanted. Re-run `python -I scripts/extract_pdf_columns.py <sheet.pdf>` and `npx tsx scripts/parse-area-resources.ts` when the next sheet is posted.
49. Confirm who receives prayer requests (`PRAYER_TEAM_EMAIL`); the website has no prayer form. Until then, point it at Mike's own email for testing, along with `VOLUNTEER_COORDINATOR_EMAIL`, `TOUR_CONTACT_EMAIL`, and the new `CONTACT_EMAIL` (worker environment variables only).
50. Add `CONTACT_EMAIL=` (placeholder) to `.env.example`; the agent could not edit that file. Native forms switch on when `EXPO_PUBLIC_SUBMIT_URL` is set, so set it only after the worker is deployed.
51. The Square order-ahead site `https://elevate-coffee.square.site/` returns 404 (also on the live café page). The app now links to the café page instead. Give the new ordering link if one exists.
52. The sponsor link for Worley & Associates on the Theo page no longer loads; the app points that button at the Theo page. Confirm the sponsor's current site or remove the button.
53. The website hides some addresses with Cloudflare, so a few page paragraphs and the Volunteer summary still say "[email protected]". Buttons were decoded to real mailto links. Provide the intended address for each page so the text can be fixed. The Entrepreneurs page had one protected button with no address in the data; it was removed.
54. The decoded mailto buttons include staff first.last addresses. Confirm approval to show them (see item 47 for phones), and which Brenda Watson-Hill address is right (.com or .org; both appear on the site).
55. Individual neighbor stories, volunteer profiles, blog posts, and news archive pages are not imported; their links open the website in the in-app browser (see docs/PARITY_REPORT.md). Decide whether to import them.
56. Open every store, hosting, email, and build account (Apple Developer organization with D-U-N-S, Google Play, Expo, Cloudflare, Resend) under an Elevate Branson organization email with two administrators. See `docs/RELEASE_CHECKLIST.md`.
57. Provide the official logo artwork so a 1024 by 1024 app icon and the Android adaptive icon can replace `assets/brand/mark.png` (192 by 192 today).
58. Confirm the app bundle ID `org.elevatebranson.app` (iOS and Android) before the first build; it cannot change later.
59. Update the website privacy policy with an app section (forms, notifications, calendar button, who receives data, deletion contact) before store submission.
60. Approve the store listing text and take screenshots from a preview build.
61. Name the maintainer in `docs/HANDOFF.md` ("Who to call") and decide who owns the code repository after handoff.
62. Choose a persistent store and host for push tokens and the staff send page (`docs/WORKER_RUNBOOK.md`, "Known gap").
