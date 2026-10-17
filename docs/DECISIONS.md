# Decisions

Defaults below are marked **assumed** unless a public page or vendor doc settled them. Anything still uncertain is marked **verify**. Sources were checked on 17 October 2026.

## Assumed product defaults

| Decision | Choice | Status |
| --- | --- | --- |
| App | Expo (React Native, TypeScript), Expo Router in a later phase | assumed |
| Content | Sanity Free plan. Public read token only. Local JSON fixtures until a project exists. | assumed |
| Content editors | Non-technical staff use Sanity Studio as Administrators. The Free plan includes Administrator and Viewer only. | assumed |
| Push | Expo Push Service. Test with a development build on a physical device. | assumed |
| Forms host | Cloudflare Worker at `/api/submit`. Vercel remains acceptable if the Worker account is a problem. | assumed |
| Form email | Resend, after a domain is verified. Until then, submissions can be tested only to the Resend account email. | assumed |
| Give | Open [https://elevatebranson.org/donate/](https://elevatebranson.org/donate/) in the system browser. No card form in the app. Neon CRM is the processor behind that page. | assumed |
| In-app fundraising | Not used. Treat Elevate Branson as not yet approved under App Store 3.2.1(vi). | verify |
| Merch | No store URL found. Placeholder screen. Physical goods later use an external checkout (App Store 3.1.3(e)). | assumed |
| Tours | Primary: open [https://elevatebranson.org/schedule-a-tour/](https://elevatebranson.org/schedule-a-tour/) (WPForms). Fallback: in-app form for offline use. | assumed |
| Housing list | CMS collection, staff-maintained, empty until a real list is provided. | assumed |
| Newsletter | Read the website. RSS exists at [https://elevatebranson.org/feed/](https://elevatebranson.org/feed/). Constant Contact stays the email sender and is not integrated in v1. | assumed |
| Programs | Working list from the public site: Elevate Connections, Elevate Outreach, Elevate Work, Elevate Entrepreneurs, Elevate Kids, Elevate Rides, Elevate Community, Elevate Health, Elevate Coffee, Elevate Thrift Store. | verify |
| Campus | 310 Gretna Road, Branson, MO 65616. Main phone 417.335.9915. Hours differ by campus, thrift, and café on the website and will be stored per place. | verify |
| Volunteer mail | Volunteer@ElevateBranson.org, the address published on the volunteer page. | verify |
| Prayer mail | Placeholder in server env until staff name an inbox. | assumed |
| Brand | Warm neutral placeholder. No logo file in the repo. | assumed |
| Privacy | In-app notice plus a link to [https://elevatebranson.org/privacy-policy/](https://elevatebranson.org/privacy-policy/). | assumed |
| Accounts | Apple, Google Play, Expo, Sanity, Resend, and Cloudflare accounts are not required to keep building. | assumed |

## Apple App Store: donations and external payment links

Fetched from the [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) on 17 October 2026. Apple posted a guidelines revision on 16 October 2026; the notes do not say the donation sections below changed ([Apple Developer news](https://developer.apple.com/news/?id=92th7e5i)).

- **3.2.1(vi).** Approved nonprofits may fundraise inside their own apps if the campaign follows the guidelines, supports Apple Pay, discloses how funds are used, follows the law, and can provide tax receipts. Extra information goes to App Review on request. Approval steps are on [Apple Pay for Donations](https://developer.apple.com/apple-pay/nonprofits/) (payment provider, Apple Developer membership, nonprofit approval, and the Donate with Apple Pay button; Candid Seal of Transparency or Benevity).
- **3.2.2(iv).** Unless the nonprofit is approved under 3.2.1(vi), the app must be free and may collect charitable funds only outside the app, such as via Safari or SMS.
- **3.1.3(e).** Physical goods and services consumed outside the app, including merch, must use a purchase method other than in-app purchase.
- **3.1.1(a).** External-purchase entitlements are for digital content or services. They are a different path from nonprofit donations. The United States storefront also allows some external links without those entitlements. This app does not rely on that entitlement.

**verify:** Whether Elevate Branson already has Apple nonprofit fundraising approval. The build does not wait on it.

Apple Developer Program membership is 99 USD per year ([enrollment](https://developer.apple.com/programs/enroll/)). Eligible nonprofits can request a fee waiver if they are a legal entity, are not an individual or sole proprietor, do not sell digital goods or services in any app, and have not signed the Paid Applications Agreement ([fee waiver](https://developer.apple.com/support/fee-waiver/)). **verify:** Google Play’s current registration fee. The prompt chain cites a one-time fee; confirm it on Google’s site before anyone pays.

## Expo push notification setup

- Client: permission, then an `ExpoPushToken` for the EAS `projectId`. Library: `expo-notifications`. Setup guide: [Push notifications setup](https://docs.expo.dev/push-notifications/push-notifications-setup/).
- Android: Firebase Cloud Messaging v1. Upload a Google service-account key to EAS and add `google-services.json` plus `expo.android.googleServicesFile`. Guide: [FCM credentials](https://docs.expo.dev/push-notifications/fcm-credentials/).
- iOS: a paid Apple Developer membership (a fee waiver still supplies a membership) and an APNs key. EAS can generate the key on the first build. The test device must be registered before that build. Guide: [managed credentials](https://docs.expo.dev/app-signing/managed-credentials/).
- Remote push needs a physical device.
- From Expo SDK 53, Android push does not work in Expo Go. Use a development build ([SDK 53 changelog](https://expo.dev/changelog/sdk-53), [`expo-notifications`](https://docs.expo.dev/versions/unversioned/sdk/notifications/)).
- **verify:** Expo’s FAQ says SDK 53 and later Expo Go does not support push at all, while the SDK 53 changelog still says iOS push works in Expo Go ([FAQ](https://docs.expo.dev/push-notifications/faq/)). Plan on a development build either way.

## Sanity Free plan

Source: [Sanity pricing](https://www.sanity.io/pricing), checked 17 October 2026. Free quotas are hard caps. There is no overage billing. Hitting a cap blocks that function until the month resets or the plan changes ([plans and payments](https://www.sanity.io/docs/platform-management/plans-and-payments)).

| Quota | Free plan |
| --- | --- |
| Seats | 20 |
| Roles | Administrator and Viewer only |
| Datasets | 2, public only |
| Documents | 10,000 |
| API CDN requests | 1,000,000 per month |
| API requests | 250,000 per month |
| Bandwidth | 100 GB per month |
| Assets | 100 GB |

A few programs, events, about 150 resources, and a housing list fit in 10,000 documents if the app reads through the CDN. **verify:** live quotas in the Sanity project dashboard after the project exists.

## Resend Free plan

Sources: [account quotas](https://www.resend.com/docs/knowledge-base/account-quotas-and-limits) and [pricing](https://resend.com/pricing), checked 17 October 2026.

- 3,000 transactional emails per month and 100 per UTC calendar day. The day resets at midnight UTC.
- Sent and received mail both count. Each To, Cc, and Bcc recipient counts separately.
- Up to 3 verified domains on the current quotas page.
- The `onboarding@resend.dev` sender can mail only the Resend account’s own address. Other recipients need a verified domain ([403 error](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain)).

Volunteer, tour, and prayer volume for this org fits the free quota. Domain verification is a human task before real staff delivery.

Branding: mirror the website. Assumed until the CEO supplies official brand files.
