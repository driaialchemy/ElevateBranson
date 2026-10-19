# Brand

Extracted from [elevatebranson.org](https://elevatebranson.org/) on 17 October 2026. Official files are still a human task. Until they arrive, the app uses this record and `src/theme/tokens.ts`.

## Logo

- Wordmark in the app: `assets/brand/logo.png`, from the public file `Elevate_Color-300x150.png` (April 2026).
- App icon: `assets/brand/mark.png`, from the public site icon. It is 192 pixels. A 1024 pixel icon should replace it when the CEO sends files.

## Color

Counted from the homepage CSS:

| Role | Hex | Use |
| --- | --- | --- |
| Teal | `#174A5B` | Text, buttons, headers. White on this teal is about 9.7:1. |
| Dark teal | `#224254` | Seen on the site. Not needed while `#174A5B` covers text. |
| Green | `#6BA539` | Card edge only. About 3:1 on white, so it is not used for text or buttons. |
| Olive | `#7DA34B` | Also on the site. Same limit as the green. |
| Sky | `#00A9CE` | On the site. About 2.8:1 on white, so it is not used for text. |
| Ink | `#3A3A3A` | Secondary text. |
| White | `#FFFFFF` | Cards. |
| Page | `#F3F6F6` | Screen background, a light tint of the teal. |

The splash screen and Android icon background in `app.json` use the same teal. Native config cannot import the token file.

## Type

Computed on 19 October 2026: headings Gotham Bold, body Avenir Medium at 18px, color rgb(34, 66, 84). Those are commercial fonts. The app loads Montserrat 600 for headings and Nunito Sans 400 for body text. Body size stays 16. A person still needs to license the official faces or confirm these stand-ins (human task 32).

## Shape

| Token | Value | Where it shows |
| --- | --- | --- |
| Button corner | 5px | Matches the website buttons. |
| Card corner | 12px | Phone cards. |
| Space | 8, 12, 16, 24, 32 | Padding and gaps. |
| Column | 720px | Centered on a wide browser. The sides use canvas `#E7EEEF`. |
| Shadow | teal at 12% opacity, blur 8, offset 2 | Cards and buttons. |

## Buttons and contrast

The website paints TAKE THE NEXT STEP in white on sky `#00A9CE` and SCHEDULE A TOUR in white on green `#6BA539`. DONATE text on the site is olive `#7DA34B`. Those pairs fail 4.5:1. Filled buttons use white text on teal `#174A5B`. A button sitting on a teal photo or a teal section is white with teal text, so it stays visible. Sky, olive, and green stay decorative (a stat rule or a card edge). Hero text sits on a teal scrim at 82% opacity so the white type stays readable over the photo. On a phone, the three homepage figures stack so the numbers stay on one line.

## Tone

Plain, warm, and short. Say what the screen is for in one or two sentences. The audience includes people in a housing crisis and older donors.

## Imagery

Downloaded 19 October 2026, compressed, and stored in `assets/brand`. The app bundles them. It does not hotlink.

| File | Alt text |
| --- | --- |
| `logo.png` | Elevate Branson wordmark. Do not recolor or stretch it. |
| `hero.jpg` | Portraits of neighbors, including a graduate holding a certificate of completion. |
| `facts.jpg` | A parent and three children sitting together on a couch. |
| `difference.jpg` | Photo from the Our Difference section of the Elevate Branson website. |
| `role.jpg` | Photo from the Our Role section of the Elevate Branson website. |
| `banner.jpg` | A turkey mascot and the words Click here for Thanksgiving event information. |
| `program-*.jpg` | Program page photos for Kids, Work, Entrepreneurs, Connections, Outreach, Rides, Health, Coffee, Thrift, Playground, and the tiny-house neighborhood. Computer Classes and Elevate Life had no photo on the site. |
