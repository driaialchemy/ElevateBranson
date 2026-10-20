/**
 * Editing-site document shapes. This file is data only.
 * The Sanity studio is not installed. Staff create these documents
 * after the project in HUMAN_TASKS item 4 exists.
 * The app reads with a public dataset. Never put a write token in the app.
 */
import { z } from 'zod';

const link = z.object({ label: z.string(), url: z.string() });
const image = z.object({ url: z.string(), alt: z.string() });
export const pageBlockSchema = z.discriminatedUnion('_type', [
  z.object({ _type: z.literal('richText'), paragraphs: z.array(z.string()), headings: z.array(z.string()).optional() }),
  z.object({ _type: z.literal('buttonRow'), buttons: z.array(link) }),
  z.object({ _type: z.literal('cardGrid'), cards: z.array(z.object({ title: z.string(), summary: z.string(), url: z.string().optional(), image: image.optional() })) }),
  z.object({ _type: z.literal('statRow'), items: z.array(z.object({ value: z.string(), label: z.string() })) }),
  z.object({ _type: z.literal('factList'), items: z.array(z.object({ label: z.string(), value: z.string() })) }),
  z.object({ _type: z.literal('table'), headers: z.array(z.string()), rows: z.array(z.array(z.string())) }),
  z.object({ _type: z.literal('hoursTable'), hoursId: z.string() }),
  z.object({ _type: z.literal('contactCard'), name: z.string(), role: z.string().optional(), phone: z.string().optional(), email: z.string().optional() }),
  z.object({ _type: z.literal('pdfLink'), title: z.string(), url: z.string(), language: z.string().optional() }),
  z.object({ _type: z.literal('formLink'), title: z.string(), url: z.string(), interimOnly: z.boolean() }),
  z.object({ _type: z.literal('embed'), provider: z.enum(['spotify', 'youtube', 'calendar']), url: z.string() }),
  z.object({ _type: z.literal('faq'), items: z.array(z.object({ question: z.string(), answer: z.string() })) }),
  z.object({ _type: z.literal('timeline'), items: z.array(z.object({ date: z.string(), title: z.string(), body: z.string().optional(), lastVerified: z.string().optional() })) }),
  z.object({ _type: z.literal('storyList'), storyIds: z.array(z.string()) }),
  z.object({ _type: z.literal('imageGallery'), images: z.array(image) }),
  z.object({ _type: z.literal('todo'), message: z.string() }),
]);

export const pageSchema = z.object({
  slug: z.string(), title: z.string(), section: z.enum(['about', 'what-we-do', 'get-involved', 'visit', 'media', 'contact']),
  sourceUrl: z.string().url(), heroImage: image.optional(), summary: z.string(), blocks: z.array(pageBlockSchema),
  lastVerified: z.string(), status: z.literal('verify'),
});

export const cmsSchema = {
  page: { name: 'page', fields: ['slug', 'title', 'section', 'sourceUrl', 'heroImage', 'summary', 'blocks', 'lastVerified', 'status'], blockTypes: ['richText', 'buttonRow', 'cardGrid', 'statRow', 'factList', 'table', 'hoursTable', 'contactCard', 'pdfLink', 'formLink', 'embed', 'faq', 'timeline', 'storyList', 'imageGallery'] },
  story: { name: 'story', fields: ['slug', 'title', 'person', 'summary', 'body', 'image', 'publishedOn', 'sourceUrl', 'status'] },
  volunteerOpportunity: { name: 'volunteerOpportunity', fields: ['title', 'schedule', 'description', 'ageRules', 'groupSize', 'formUrl', 'sourceUrl', 'status'] },
  episode: { name: 'episode', fields: ['title', 'publishedOn', 'url', 'sourceUrl', 'status'] },
  video: { name: 'video', fields: ['title', 'url', 'sourceUrl', 'status'] },
  program: {
    name: 'program',
    fields: ['name', 'slug', 'summary', 'serves', 'sourceUrl', 'imageKey', 'imageAlt', 'verify'],
  },
  event: {
    name: 'event',
    fields: ['title', 'summary', 'startsOn', 'location', 'sourceUrl', 'verify'],
  },
  resource: {
    name: 'resource',
    fields: ['name', 'category', 'summary', 'phone', 'address', 'sourceUrl', 'verify', 'lastVerified', 'verifiedBy'],
  },
  housingListing: {
    name: 'housingListing',
    fields: ['name', 'phone', 'address', 'summary', 'sourceUrl', 'verify', 'lastVerified', 'verifiedBy'],
  },
  tinyHouseUpdate: {
    name: 'tinyHouseUpdate',
    fields: ['title', 'body', 'publishedOn', 'sourceUrl', 'verify'],
  },
  hours: {
    name: 'hours',
    fields: ['place', 'seasons', 'closures', 'sourceUrl', 'verify', 'lastVerified', 'verifiedBy'],
    seasonFields: ['name', 'startDate', 'endDate', 'days', 'verify'],
    closureFields: ['date', 'reason'],
    places: ['campus', 'coffee', 'thrift', 'playground'],
  },
  newsletterIssue: {
    name: 'newsletterIssue',
    fields: ['title', 'publishedOn', 'url', 'sourceUrl', 'verify'],
  },
  homeSection: {
    name: 'homeSection',
    fields: ['eyebrow', 'title', 'body', 'imageKey', 'imageAlt', 'actions', 'sourceUrl', 'verify'],
  },
  homeStat: {
    name: 'homeStat',
    fields: ['value', 'label', 'sourceUrl', 'verify'],
  },
  seasonalNotice: {
    name: 'seasonalNotice',
    fields: ['imageKey', 'alt', 'href', 'sourceUrl', 'verify'],
  },
  siteSettings: {
    name: 'siteSettings',
    fields: [
      'mission',
      'vision',
      'address',
      'phone',
      'thriftPhone',
      'infoEmail',
      'volunteerEmail',
      'socialLinks',
      'donateUrl',
      'donateLabel',
      'giveBlurb',
      'mailingListUrl',
      'mailingListLabel',
      'merchUrl',
      'websiteUrl',
      'tourUrl',
      'sourceUrl',
      'verify',
    ],
  },
} as const;

export const contentQuery = `{
  "pages": *[_type == "page"]{ "slug": slug.current, title, section, sourceUrl, heroImage, summary, blocks, lastVerified, status },
  "stories": *[_type == "story"]{ "id": _id, "slug": slug.current, title, person, summary, body, image, publishedOn, sourceUrl, status },
  "volunteerOpportunities": *[_type == "volunteerOpportunity"]{ "id": _id, title, schedule, description, ageRules, groupSize, formUrl, sourceUrl, status },
  "episodes": *[_type == "episode"]{ "id": _id, title, publishedOn, url, sourceUrl, status },
  "videos": *[_type == "video"]{ "id": _id, title, url, sourceUrl, status },
  "programs": *[_type == "program"]{ "id": _id, name, "slug": slug.current, summary, serves, sourceUrl, imageKey, imageAlt, verify },
  "homeSections": *[_type == "homeSection"]{ "id": _id, eyebrow, title, body, imageKey, imageAlt, actions, sourceUrl, verify },
  "homeStats": *[_type == "homeStat"]{ "id": _id, value, label, sourceUrl, verify },
  "seasonalNotice": *[_type == "seasonalNotice"][0]{ "id": _id, imageKey, alt, href, sourceUrl, verify },
  "events": *[_type == "event"]{ "id": _id, title, summary, startsOn, location, sourceUrl, verify },
  "resources": *[_type == "resource"]{ "id": _id, name, category, summary, phone, address, sourceUrl, verify, lastVerified, verifiedBy },
  "housingListings": *[_type == "housingListing"]{ "id": _id, name, phone, address, summary, sourceUrl, verify, lastVerified, verifiedBy },
  "tinyHouseUpdates": *[_type == "tinyHouseUpdate"]{ "id": _id, title, body, publishedOn, sourceUrl, verify },
  "hours": *[_type == "hours"]{ "id": _id, place, seasons, closures, sourceUrl, verify, lastVerified, verifiedBy },
  "newsletters": *[_type == "newsletterIssue"]{ "id": _id, title, publishedOn, url, sourceUrl, verify },
  "siteSettings": *[_type == "siteSettings"][0]{ mission, vision, address, phone, thriftPhone, infoEmail, volunteerEmail, socialLinks, donateUrl, donateLabel, giveBlurb, mailingListUrl, mailingListLabel, merchUrl, websiteUrl, tourUrl, sourceUrl, verify }
}`;
