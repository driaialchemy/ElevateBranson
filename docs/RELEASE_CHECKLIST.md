# Release checklist

Status on 20 October 2026: preview builds only. Nothing has been built for the stores, deployed, or submitted. Do not run a production build, deploy the worker, or submit to a store until the owner says so.

> **Every account below must belong to Elevate Branson, not to a person.** Use an organization email such as a shared info address, a company-owned Apple ID and Google account, and two named administrators. If an account sits under one person's login, the app, its reviews, and its push keys leave with them.

## 1. Accounts

| Account | What it needs | Owner | Done |
| --- | --- | --- | --- |
| Apple Developer Program (organization) | Legal entity name, D-U-N-S number (free from Dun & Bradstreet; allow up to 2 weeks), a person with legal authority to sign, a public website. Nonprofits that are eligible can ask Apple for a fee waiver at enrollment. Check the current rules on developer.apple.com | Elevate Branson | No |
| Google Play Console (organization) | One-time registration fee, D-U-N-S number for organization accounts, verification of the organization. New accounts may need a closed test with testers before production; check the current Play rules | Elevate Branson | No |
| Expo (EAS) account | Organization team, not a personal login. Needed for builds and for push credentials | Elevate Branson | No |
| Resend | Account, verified sending domain, API key stored as a worker secret | Elevate Branson | No |
| Cloudflare (worker host) | Account in the organization's name | Elevate Branson | No |
| Neon CRM, Constant Contact, Google Calendar | Already owned by the organization; confirm who the administrators are | Elevate Branson | Confirm |

## 2. Project settings already in the repo

- `app.json`: name "Elevate Branson", version 1.0.0, iOS bundle ID `org.elevatebranson.app`, Android package `org.elevatebranson.app`, build number 1, version code 1, portrait only, light mode, splash from the logo on the brand teal, `usesNonExemptEncryption` set to false (the app uses only standard HTTPS).
- `eas.json`: a `preview` profile (internal distribution, Android APK, iOS device build) and a `production` profile. **Only run `preview`.** `EXPO_PUBLIC_SUBMIT_URL` is empty in both until the worker is deployed; with it empty the app opens the website forms instead of the native ones.
- Permission strings: calendar (write only), "Elevate Branson adds an event you choose to your calendar." Notifications are requested only after a person opens the notes offer and agrees.
- Confirm the bundle ID with the owner before the first build; it cannot change after the app is created in the stores.

## 3. Before the first build

1. **Icon.** `assets/brand/mark.png` is 192 by 192 pixels. The stores need a 1024 by 1024 square icon (no transparency for iOS) and an Android adaptive foreground. Get the official logo artwork and replace the file. See HUMAN_TASKS.
2. Replace the stand-in fonts only if the organization licenses Gotham and Avenir.
3. Run `npm test`, `npx tsc --noEmit`, `npm run lint`, `npx expo-doctor`, `npm run audit:parity`, and `npm run audit:links`. All should pass.
4. Clear the open items in `docs/QA_REPORT.md` under "Open defects" and "Facts to verify", or accept them in writing.
5. Run `npx eas-cli build --profile preview --platform all` (needs the Expo account). Install on a real iPhone and Android phone.

## 4. Test on devices

- **TestFlight (iOS):** Apple Developer account, create the app in App Store Connect with the bundle ID, upload a build (`eas submit` or Transporter), add internal testers (up to 100 with App Store Connect roles), install through TestFlight.
- **Internal testing (Android):** create the app in Play Console, upload the `.aab`, add testers by email on the internal track.
- Hand-test: Home, DONATE NOW, each Give link in the in-app browser, call and map buttons, the calendar add button, the notes offer and a test push, each form with the worker deployed and a test inbox, the English and Spanish PDF switch, airplane mode (offline banner and queued form), and large text.
- Check on Android that the calendar permission asks only to write.

## 5. Store listing

**Name:** Elevate Branson. **Subtitle (iOS, 30 characters):** Neighbors helping neighbors. **Category:** Lifestyle or Social Networking; Google Play: Lifestyle.

**Short description (80 characters):** Programs, events, volunteering, and giving for Elevate Branson.

**Full description (draft; staff must approve every line):**

> Elevate Branson helps families in Branson, Missouri, break the cycle of poverty through job training, housing, and community support. Use this app to find programs and hours, see upcoming events, volunteer, schedule a campus tour, send a prayer request, find area resources, read the newsletter, and give.
>
> The app does not collect card numbers. Gifts are completed on the Elevate Branson website.

**Keywords (iOS, 100 characters):** Branson,nonprofit,volunteer,thrift,coffee,community,poverty,housing,jobs,donate

**Support URL:** https://elevatebranson.org/contact-us/ **Marketing URL:** https://elevatebranson.org/ **Privacy policy:** https://elevatebranson.org/privacy-policy/ (see item 7: the policy was written for the website and needs an app update).

**Screenshots needed:** iPhone 6.9-inch (and 6.5-inch if required), iPad 13-inch because `supportsTablet` is on, Android phone, and a 7-inch and 10-inch tablet if the listing offers tablets. Suggested six: Home, Programs, Events, Volunteer, Resources with the language switch, Give. Take them from a preview build, not the web.

## 6. App Privacy (Apple) and Data safety (Google) answers

Derived from what the app and worker actually do on 20 October 2026. Re-check if code changes.

| Data | Collected? | How it is used | Linked to the person? | Shared with others |
| --- | --- | --- | --- | --- |
| Name, email, phone | Only when a person submits a volunteer, tour, or contact form | Reply to the request (app functionality) | Yes, sent to staff by email | The email service (Resend) delivers it; no sale, no advertising |
| Prayer request text, optional name or contact, share-publicly choice (off by default) | Only when submitted | Reply and prayer | Only if the person adds a name or contact | Resend delivers it to the staff inbox |
| Device push token and topic choices | Only after the person agrees to notifications | Send the notes they chose | Not linked to a name; it is a device identifier | Expo's push service delivers messages |
| Calendar | The app writes one event on tap; it does not read the calendar | Add an event the person chose | No | No |
| Payment or card data | **No.** Gifts happen on hosted Neon CRM and donation pages in the browser | n/a | n/a | n/a |
| Location, contacts, photos, health, browsing history | No | n/a | n/a | n/a |
| Analytics, advertising ID, crash reports | None present in the code | n/a | n/a | n/a |
| Account or login | None | n/a | n/a | n/a |

- Apple "Data Used to Track You": none. Apple "Data Linked to You": contact info (name, email, phone) and user content (prayer text), for app functionality. "Data Not Linked to You": device ID (push token).
- Google Data safety: data is encrypted in transit (HTTPS); collected data types are name, email, phone, other user-generated content, and device ID; none is sold; no data is used for advertising; users can ask staff to delete a request by contacting the office. Confirm the deletion path with staff and write it into the privacy policy.
- Form bodies are not written to logs, and the app keeps no database of submissions; mail is the record. Offline forms wait on the phone until they send.

## 7. Privacy policy

The listing links to https://elevatebranson.org/privacy-policy/. That page was written for the website. Staff need to add a short app section covering the forms, push notifications, the calendar button, and who receives the data, and an email for deletion requests. Do not submit until this is done.

## 8. Review notes (paste into App Store Connect and Play Console)

> Elevate Branson is a nonprofit in Branson, Missouri. The app shows programs, hours, events, and ways to help. **Giving:** the app does not process payments or collect card numbers. DONATE NOW and the Give screen open the organization's hosted donation pages (Neon CRM and z2systems) in the in-app browser, as a donation to a registered 501(c)(3) charity (EIN 26-4727548 per Charity Navigator). No digital goods or app features are unlocked by giving. **Forms:** volunteer, tour, contact, and prayer forms send a message to staff by email; there are no accounts. **Notifications:** optional, asked after the person taps a button in the app. **Demo access:** no login is needed. If your tester cannot reach the form server, forms fall back to the website.

Apple may ask for nonprofit confirmation for fundraising. Confirm in App Store Connect before submitting (see HUMAN_TASKS and `docs/OPEN_QUESTIONS.md`).

## 9. Submit (only on the owner's instruction)

1. Production build, upload, fill the listing and privacy answers, attach screenshots and review notes.
2. Apple: submit for review; Google: promote from internal to production after any required closed testing.
3. After approval, set the release date. Tell staff the store links.

## 10. After release

Watch the staff inbox for form mail, send one test push to staff, and note the dates in `docs/HANDOFF.md` renewals.
