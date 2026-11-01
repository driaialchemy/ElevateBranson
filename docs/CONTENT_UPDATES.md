# Updating lists and events

This is for staff. A developer still publishes the app.

## Area resources

The list people see today is the file `src/content/areaResources.json` inside the app project. It was copied from the public resource sheet. Changing a name, phone, or address means editing that file, then building and publishing the app again. It does not change by itself.

A Sanity editing site can replace that file when `EXPO_PUBLIC_SANITY_PROJECT_ID` is a real project. The app then loads the published records the next time it opens. That project is not confirmed. Who edits it: Unknown.

## Housing list

The app is ready for a housing list, but none is published. The bundled list is empty. The same Sanity project can hold housing records (name, public phone, address, short note). Until those records exist, the Resources screen says the list has not been added. Who adds the first list, and how often it changes: Unknown. Do not put private resident information in the app.

## Events

Upcoming events come from one public Google Calendar. The address is in `src/server/calendar.ts`. Add or change an event on that calendar. The app asks the server at `/api/events`, which keeps a copy for 15 minutes, so a change can take that long to show.

That server route is not on the current website copy. A developer deploys the worker and sets `EXPO_PUBLIC_SUBMIT_URL` in the app build. Until then, the Events screen cannot load the live calendar. Who can edit the Google Calendar: Unknown.

## What is instant, and what is not

- Resource file edit: not instant. A developer rebuilds and republishes the app.
- Sanity resource or housing edit, after the project is live: shows the next time the app loads. No store rebuild for that text.
- Google Calendar edit: about 15 minutes, and only after `/api/events` is deployed and the app build points at it.
- Who does the rebuild: a developer. Who owns the calendar and the Sanity project: Unknown.
