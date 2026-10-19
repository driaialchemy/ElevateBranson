/**
 * Editing-site document shapes. This file is data only.
 * The Sanity studio is not installed. Staff create these documents
 * after the project in HUMAN_TASKS item 4 exists.
 * The app reads with a public dataset. Never put a write token in the app.
 */
export const cmsSchema = {
  program: {
    name: 'program',
    fields: ['name', 'slug', 'summary', 'sourceUrl', 'verify'],
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
      'merchUrl',
      'websiteUrl',
      'tourUrl',
      'sourceUrl',
      'verify',
    ],
  },
} as const;

export const contentQuery = `{
  "programs": *[_type == "program"]{ "id": _id, name, "slug": slug.current, summary, sourceUrl, verify },
  "events": *[_type == "event"]{ "id": _id, title, summary, startsOn, location, sourceUrl, verify },
  "resources": *[_type == "resource"]{ "id": _id, name, category, summary, phone, address, sourceUrl, verify, lastVerified, verifiedBy },
  "housingListings": *[_type == "housingListing"]{ "id": _id, name, phone, address, summary, sourceUrl, verify, lastVerified, verifiedBy },
  "tinyHouseUpdates": *[_type == "tinyHouseUpdate"]{ "id": _id, title, body, publishedOn, sourceUrl, verify },
  "hours": *[_type == "hours"]{ "id": _id, place, seasons, closures, sourceUrl, verify, lastVerified, verifiedBy },
  "newsletters": *[_type == "newsletterIssue"]{ "id": _id, title, publishedOn, url, sourceUrl, verify },
  "siteSettings": *[_type == "siteSettings"][0]{ mission, vision, address, phone, thriftPhone, infoEmail, volunteerEmail, socialLinks, donateUrl, merchUrl, websiteUrl, tourUrl, sourceUrl, verify }
}`;
