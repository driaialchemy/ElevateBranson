# Wording changes (CU-05)

Logged before edits on 2026-11-03. Decision from Hannah, 2026-10-29, confirmed by Mike, 2026-10-30: remove ownership-scooter content in Elevate Rides; remove the Elevate Outreach program (it is being revamped) and Elevate Life. Keep the rental and ride service. Keep generic lowercase "outreach" that does not name the program. Website form URLs stay so the live forms still open.

## Hits

| File | Line | Text | Action |
| --- | --- | --- | --- |
| content/pages/elevate-rides.json | 12 | Our 49cc scooters are now available for the public. | Keep. Public rental, not ownership. |
| content/pages/elevate-rides.json | 20 | Motorized scooters for reliable transit and forward mobility. | Keep. Describes the rental fleet. |
| content/pages/elevate-rides.json | 21 | Our Dealership: | Remove. Leftover ownership heading. Rental heading stays. |
| src/content/fixtures.ts | 98 | Motorized scooters for getting around Branson, where public transit is limited. | Keep. Ride service. |
| src/content/programDetails.ts | 44 | 49cc motor scooters. | Keep. Rental fact. |
| src/content/programDetails.ts | 46 | Attend Scooter School and pay a $65 deposit... | Keep. Rental setup. |
| src/content/programDetails.ts | 49 | Scooter School deposit | Keep. Rental price row. |
| src/content/giving.ts | 10 | Sponsor scooters and rides. | Keep. Sponsorship of the rental program, not an ownership offer. |
| content/pages/business-partnership.json | 14 | Premier Access to Our Affordable Transportation Initiative for Your Employees | Remove. Introduces the employee scooter offer. |
| content/pages/business-partnership.json | 15 | Preliminary access to a select amount of scooters for your employees at their earliest availability. | Remove. Ownership-style employee scooter access. |
| src/content/getInvolved.ts | 53 | Scooter access for employees | Remove. Same benefit on the partnership screen. |
| content/pages/volunteer.json | 19 | important outreach of our organization | Keep. Generic lowercase outreach. |
| content/pages/volunteer.json | 36 | Meal Delivery and Outreach Program | Change to Meal Delivery program. |
| content/pages/volunteer.json | 46, 47 | MEAL DELIVERY + OUTREACH | Change to MEAL DELIVERY. |
| content/pages/volunteer.json | 81 | volunteer-form-evening-meal-delivery-and-outreach | Keep. Live form URL. |
| src/content/getInvolved.ts | 18 | Meal Delivery + Outreach | Change the title to Meal Delivery. Keep the id and form URL. |
| content/pages/meet-our-volunteers.json | 12 | outreach opportunities | Keep. Generic. |
| content/pages/meet-our-volunteers.json | 14 | Thursday night Elevate Outreach program | Change to Thursday night meal delivery. |
| content/pages/meet-our-volunteers.json | 29 | through Elevate Outreach; Elevate Outreach sack meals | Change to through meal delivery; sack meals. |
| content/pages/meet-our-volunteers.json | 36 | Thursday outreach programs | Keep. Generic. |
| content/pages/contact-us.json | 109 | ELEVATE OUTREACH | Remove the heading. The program page is already gone. |
| content/pages/volunteer-form-evening-meal-delivery-and-outreach.json | 3, 17 | Evening Meal Delivery and Outreach | Change the visible title to Evening Meal Delivery. Keep the slug and URL. |

Import filters in `src/content/clientOverrides.ts` that still contain the old phrases stay. They strip that copy if a later import brings it back. Tests that feed those phrases in and assert they come out removed stay for the same reason.
