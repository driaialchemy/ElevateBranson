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
10. Say whether Elevate Branson is already approved by Apple for in-app fundraising. Until then, Give opens the website donate page.
11. Send the merch store URL, or confirm there is no online shirt store yet.
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
