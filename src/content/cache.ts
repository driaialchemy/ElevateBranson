export const offlineMessage =
  "We can't reach Elevate Branson right now. You're seeing saved information.";

export type PageCopy = {
  title: string;
  body: string;
};

const pages: Record<string, PageCopy> = {
  about: {
    title: 'About Us',
    body: 'Elevate Branson helps neighbors find purpose, work, and support. A fuller story will replace this placeholder.',
  },
  'find-us': {
    title: 'Find Us',
    body: 'Campus address on file: 310 Gretna Road, Branson, MO 65616. Phone: 417.335.9915. Map and hours will be confirmed before release.',
  },
  volunteer: {
    title: 'Volunteer',
    body: 'A short form will email the volunteer coordinator. You will choose a program, then leave your name and a way to reach you.',
  },
  resources: {
    title: 'Resources',
    body: 'Partner groups for referrals will be listed here, with search and filters. The affordable housing list is the key list.',
  },
  social: {
    title: 'Social links',
    body: 'Links to Elevate Branson social pages will show here after they are copied from the website.',
  },
  prayer: {
    title: 'Prayer request',
    body: 'You can send a prayer request to the prayer team. Your note is private unless you later choose to share it. The form is not active yet.',
  },
  merch: {
    title: 'Merch',
    body: 'No online shirt store was found. This screen will open that store when a link is added.',
  },
  tour: {
    title: 'Schedule a tour',
    body: 'Campus tours are requested on the Elevate Branson website today. An in-app form will be the backup when you are offline.',
  },
  'tiny-house': {
    title: 'Tiny House',
    body: 'Updates about the tiny homes at Elevate Community will show here. Nothing is published in the app yet.',
  },
  newsletter: {
    title: 'Newsletter',
    body: 'The newest newsletter will show here. Saved placeholder: the website posts a monthly update under News.',
  },
  website: {
    title: 'Website',
    body: 'The website is https://elevatebranson.org/. Opening it in the app browser comes in a later step.',
  },
  events: {
    title: 'Events',
    body: 'Upcoming events will be listed here.',
  },
  programs: {
    title: 'Programs',
    body: 'Programs help with work, kids, health, housing, and daily needs.',
  },
  thrift: {
    title: 'Thrift Store',
    body: 'The thrift store sells donated goods and gives people work experience. Hours will be confirmed before release.',
  },
  coffee: {
    title: 'Elevate Coffee',
    body: 'Elevate Coffee is the cafe on campus. Hours and the menu will be confirmed before release.',
  },
  give: {
    title: 'Give',
    body: 'Donations open https://elevatebranson.org/donate/ in the browser. This app does not take card numbers.',
  },
  playground: {
    title: 'Playground',
    body: 'The playground is on campus. Hours and what is open will be confirmed before release.',
  },
  privacy: {
    title: 'Privacy',
    body: 'Prayer requests and volunteer forms collect only what staff need to reply. The app does not keep a copy of what you type in its logs. The website privacy policy is at https://elevatebranson.org/privacy-policy/. That page was written for the website. An update that covers this app is still needed.',
  },
};

export function pageCopy(id: string): PageCopy {
  return (
    pages[id] ?? {
      title: 'Elevate Branson',
      body: 'This page will be filled in from saved content.',
    }
  );
}

export const latestNews = {
  title: 'Newest newsletter',
  body: 'Placeholder. The latest issue will appear here when the news feed is connected.',
};

export const nextEvent = {
  title: 'Next event',
  body: 'Placeholder. The next event will appear here when the event list is connected.',
};

export const programs = [
  { slug: 'elevate-kids', name: 'Elevate Kids', summary: 'Meals, learning, and care for children.' },
  { slug: 'elevate-work', name: 'Elevate Work', summary: 'Job skills and mentors.' },
  { slug: 'elevate-entrepreneurs', name: 'Elevate Entrepreneurs', summary: 'Help starting a small business.' },
  { slug: 'elevate-connections', name: 'Elevate Connections', summary: 'A guide to other local help.' },
  { slug: 'elevate-outreach', name: 'Elevate Outreach', summary: 'Meals delivered to neighbors.' },
  { slug: 'elevate-rides', name: 'Elevate Rides', summary: 'Rides to the help people need.' },
  { slug: 'elevate-community', name: 'Elevate Community', summary: 'The tiny-home village next to campus.' },
  { slug: 'elevate-health', name: 'Elevate Health', summary: 'Connections to health care.' },
  { slug: 'coffee', name: 'Elevate Coffee', summary: 'Cafe drinks and lunch on campus.' },
  { slug: 'thrift', name: 'Thrift Store', summary: 'Low prices and job training.' },
  { slug: 'playground', name: 'Playground', summary: 'A place for kids to play on campus.' },
  { slug: 'tiny-house', name: 'Tiny House updates', summary: 'News about the tiny homes.' },
];

export function programBySlug(slug: string) {
  return programs.find((program) => program.slug === slug);
}
