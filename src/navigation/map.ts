export type FeatureRoute = {
  id: number;
  name: string;
  href: string;
  tapsFromHome: number;
};

export const tabs = [
  { label: 'Home', href: '/' },
  { label: 'Programs', href: '/programs' },
  { label: 'Events', href: '/events' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'More', href: '/more' },
] as const;

/** Shortest path from Home. A tab is one tap. A screen inside that tab is two. */
export const features: FeatureRoute[] = [
  { id: 1, name: 'About Us', href: '/more/about', tapsFromHome: 2 },
  { id: 2, name: 'Find Us', href: '/more/find-us', tapsFromHome: 1 },
  { id: 3, name: 'Volunteer', href: '/get-involved/volunteer', tapsFromHome: 1 },
  { id: 4, name: 'Resources', href: '/more/resources', tapsFromHome: 2 },
  { id: 5, name: 'Social links', href: '/more/social', tapsFromHome: 2 },
  { id: 6, name: 'Submit a prayer request', href: '/get-involved/prayer', tapsFromHome: 1 },
  { id: 7, name: 'Merch', href: '/get-involved/merch', tapsFromHome: 2 },
  { id: 8, name: 'Schedule a campus tour', href: '/get-involved/tour', tapsFromHome: 1 },
  { id: 9, name: 'Tiny House info/updates', href: '/programs/tiny-house', tapsFromHome: 2 },
  { id: 10, name: 'Newest newsletter', href: '/more/newsletter', tapsFromHome: 1 },
  { id: 11, name: 'Website link', href: '/more/website', tapsFromHome: 2 },
  { id: 12, name: 'Upcoming events', href: '/events', tapsFromHome: 1 },
  { id: 13, name: 'Programs', href: '/programs', tapsFromHome: 1 },
  { id: 14, name: 'Thrift Store', href: '/programs/thrift', tapsFromHome: 2 },
  { id: 15, name: 'Elevate Coffee', href: '/programs/coffee', tapsFromHome: 2 },
  { id: 16, name: 'Give/donate', href: '/get-involved/give', tapsFromHome: 1 },
  { id: 17, name: 'Playground', href: '/programs/playground', tapsFromHome: 2 },
];

export const homeQuickActions = [
  { label: 'Give', href: '/get-involved/give' },
  { label: 'Volunteer', href: '/get-involved/volunteer' },
  { label: 'Tour', href: '/get-involved/tour' },
  { label: 'Prayer', href: '/get-involved/prayer' },
  { label: 'Find Us', href: '/more/find-us' },
  { label: 'Newsletter', href: '/more/newsletter' },
  { label: 'Events', href: '/events' },
  { label: 'Resources', href: '/more/resources' },
] as const;

export const getInvolvedLinks = [
  { label: 'Volunteer', href: '/get-involved/volunteer', detail: 'See ways to help and leave your name.' },
  { label: 'Schedule a tour', href: '/get-involved/tour', detail: 'Ask for a time to visit campus.' },
  { label: 'Prayer request', href: '/get-involved/prayer', detail: 'Send a private note to the prayer team.' },
  { label: 'Give', href: '/get-involved/give', detail: 'Donate on the Elevate Branson website.' },
  { label: 'Merch', href: '/get-involved/merch', detail: 'Buy a shirt when a store link is ready.' },
] as const;

export const moreLinks = [
  { label: 'Give', href: '/get-involved/give', detail: 'Donate on the Elevate Branson website.' },
  { label: 'About Us', href: '/more/about', detail: 'Who Elevate Branson is.' },
  { label: 'Find Us', href: '/more/find-us', detail: 'Address, map, and phone.' },
  { label: 'Resources', href: '/more/resources', detail: 'Partner groups and the housing list.' },
  { label: 'Social links', href: '/more/social', detail: 'Find Elevate Branson on social media.' },
  { label: 'Website', href: '/more/website', detail: 'Open elevatebranson.org.' },
  { label: 'Newsletter', href: '/more/newsletter', detail: 'The newest update.' },
  { label: 'Notifications', href: '/more/notifications', detail: 'Choose which notes this phone receives.' },
  { label: 'Privacy', href: '/more/privacy', detail: 'How this app handles personal notes.' },
] as const;
