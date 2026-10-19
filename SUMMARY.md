# Elevate Branson app

What has been built through the last prompt. The site to try is http://localhost:8081/

This is a free phone app for Elevate Branson. People can read about the programs, find the campus, give, volunteer, ask for a tour, send a prayer request, and get short notes. Staff can later edit the words in Sanity and send a notification from a password page. The app does not take card numbers.

The code is on `main` in https://github.com/driaialchemy/ElevateBranson

## What each phase added

0. Safety rules, the 17 features, and the decision to keep secrets out of the repo.
1. Discovery record: Expo, Sanity, Expo push, Resend, and the Apple rules that keep donations on the website.
2. The app shell: Home, Programs, Events, Get Involved, and More. Brand colors live in one token file.
3. Starter copy from elevatebranson.org, saved on the phone for offline reading.
3d. Find Us is an address card with hours, Call, and Open in Maps. No map picture and no map key. Seasonal hours use Central Time.
4. Website, newsletter, social, and donate links open in the in-app browser.
5. Volunteer, tour, and prayer forms. They email only the staff inbox named in server settings. Offline answers wait on the phone and send later.
6. Notification topics, an inbox, and a staff send page at `/staff/notify`. The phone asks only after someone has opened a page, and only if they agree.
7. Give, with the public donate sentence and a button to the website. Merch opens a store link when one exists. Each event can be added to the phone calendar, shared, or set as a 9:00 a.m. Central Time reminder.
8. A quality pass. All 17 features have a screen and a page check. The report is `docs/QA_REPORT.md`. On a narrow screen the page stays the width of the window and the five tabs stay reachable.

## What you can tap today

Open http://localhost:8081/

- Home: Give, Volunteer, Tour, Prayer, Find Us, and Newsletter.
- Programs: the public program list, coffee, thrift, playground, and tiny house.
- Events: an empty list until staff add real event names.
- Get Involved: the three forms, Give, and Merch.
- More: Give, About, Find Us, Resources, social links, the website, newsletters, notification choices, and privacy.

Give opens https://elevatebranson.org/donate/ inside the app browser. Merch says the shirt store link has not been provided. Resources and housing are empty because those lists were not on the public site. Prayer and volunteer messages will not really send until the email service and staff inboxes are set up.

## Still waiting on a person

The checklist is `docs/HUMAN_TASKS.md`. The important ones are an Expo and Apple account, a Sanity project, a Resend sending domain, the prayer inbox, a merch URL if one exists, real events, the partner and housing lists, and a check of the copied hours, address, and program words. Hours the website did not date are marked TODO, and the app will not claim those places are open or closed.

`docs/QA_REPORT.md` lists those copied facts as still needing a human check.
