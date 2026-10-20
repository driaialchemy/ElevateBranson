# How to update what the app shows

This is for staff. You do not need a developer for ordinary updates.

## Monthly media refresh

Once a month, run `npm run refresh:media` from the project root and commit the updated `src/content/mediaCatalog.json`. This refreshes the newsletter archive and Spotify episode titles and dates from their public sources. Video links open the current website video page.

The phone keeps the last copy it downloaded. When the phone is online, it downloads a fresh copy and saves that. If the download fails, the last copy stays on screen with a short message.

The editing website is not set up yet. Until that account exists, the app shows starter copy that was taken from elevatebranson.org on 17 October 2026. A person still needs to check that copy. See the checklist in HUMAN_TASKS.md.

## What you can change

- A program: the name, a short description, and the page it came from.
- An event: the name, the date, where it is, and a short description. The date is the whole day. The app can add that day to the phone calendar, share the public details, or set a reminder for 9:00 a.m. Central Time that morning. Do not turn a class schedule into an event unless it is a dated event.
- A partner group: the name, a category such as Food or Health, a public phone, a public address, and a short description. The website says there are more than 150 groups and does not list their names. Add only groups you are willing to publish.
- A housing listing: the public organization name, public phone, public address, and the date you last checked it. Do not add resident names, private stories, or private phone numbers. A listing with no date is hidden. Review the housing list every week. If the date is more than 90 days old, the app adds "Call to confirm."
- A partner group also needs that last-checked date. The app shows "Last updated" with the date on partner groups, housing listings, and hours.
- Hours for the campus, the coffee shop, the thrift store, and the playground. Each place can have more than one season. Give every season a name, the first month and day, the last month and day, and the hours for each day of the week. Write the days as 06-01 for June 1. If you do not know the first or last day, type TODO. The app will still show those hours, and it will not say open or closed until the days are real. The playground keeps three seasons: school year, June and July, and August. Add a holiday as a date and a short reason, such as 2026-12-25 and Christmas. The app uses Central Time for Branson, even when the phone is set to another time zone.
- A newsletter: the title, the date, and the link to read it.
- A tiny-house note: a date and what changed. Do not invent a date.
- The campus address, main phone, thrift phone, public email, social links, donate link, a short Give sentence, website link, tour link, and shirt-store link. Leave the shirt-store link blank until you have one. The Give sentence on the phone was copied from the donate page until you replace it.

## What stays off this public list

Prayer requests, volunteer form answers, and private staff phone numbers do not belong in these pages. The volunteer inbox on the website is Volunteer@ElevateBranson.org. Personal staff addresses stay out of the app.

## After the editing site exists

Someone creates the Sanity project named in the human checklist, then puts only the public read key in the app settings. The app never gets a key that can change or delete pages.

Each item you add needs a short description and the website page it came from. New words you type yourself do not need the “please check this” flag. Words copied from the website still do, until a person confirms them.

The Find Us page shows the address, phone, and hours, plus buttons to call and to open the address in the phone's maps app. It does not show a map picture inside the app.
