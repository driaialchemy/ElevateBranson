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

The site sets headings in Gotham (Bold and Light) and body text in Avenir (Medium and Heavy). Those are paid fonts and the files are not in the repo. `tokens.font.family` stays unset so phones use the system font. Body size is 16.

## Tone

Plain, warm, and short. Say what the screen is for in one or two sentences. The audience includes people in a housing crisis and older donors.

## Imagery

The homepage uses a wide photo banner and the color logo. This phase uses the logo only. Do not invent photos.
