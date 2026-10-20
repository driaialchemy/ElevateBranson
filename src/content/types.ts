export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type PageSection = 'about' | 'what-we-do' | 'get-involved' | 'visit' | 'media' | 'contact';

export type PageBlock =
  | { _type: 'richText'; paragraphs: string[]; headings?: string[] }
  | { _type: 'buttonRow'; buttons: { label: string; url: string }[] }
  | { _type: 'cardGrid'; cards: { title: string; summary: string; url?: string; image?: { url: string; alt: string } }[] }
  | { _type: 'statRow'; items: { value: string; label: string }[] }
  | { _type: 'factList'; items: { label: string; value: string }[] }
  | { _type: 'table'; headers: string[]; rows: string[][] }
  | { _type: 'hoursTable'; hoursId: string }
  | { _type: 'contactCard'; name: string; role?: string; phone?: string; email?: string }
  | { _type: 'pdfLink'; title: string; url: string; language?: string }
  | { _type: 'formLink'; title: string; url: string; interimOnly: boolean }
  | { _type: 'embed'; provider: 'spotify' | 'youtube' | 'calendar'; url: string }
  | { _type: 'faq'; items: { question: string; answer: string }[] }
  | { _type: 'timeline'; items: { date: string; title: string; body?: string; lastVerified?: string }[] }
  | { _type: 'storyList'; storyIds: string[] }
  | { _type: 'imageGallery'; images: { url: string; alt: string }[] }
  | { _type: 'todo'; message: string };

export type Page = {
  slug: string;
  title: string;
  section: PageSection;
  sourceUrl: string;
  heroImage?: { url: string; alt: string };
  summary: string;
  blocks: PageBlock[];
  lastVerified: string;
  status: 'verify';
};

export type Story = {
  id: string;
  slug: string;
  title: string;
  person?: string;
  summary: string;
  body?: string;
  image?: { url: string; alt: string };
  publishedOn?: string;
  sourceUrl: string;
  status: 'verify';
};

export type VolunteerOpportunity = {
  id: string;
  title: string;
  schedule?: string;
  description: string;
  ageRules?: string;
  groupSize?: string;
  formUrl?: string;
  sourceUrl: string;
  status: 'verify';
};

export type Newsletter = NewsletterIssue;

export type Episode = {
  id: string;
  title: string;
  publishedOn?: string;
  url: string;
  sourceUrl: string;
  status: 'verify';
};

export type Video = {
  id: string;
  title: string;
  url: string;
  sourceUrl: string;
  status: 'verify';
};

export type DayHours = {
  day: Weekday;
  opens: string | null;
  closes: string | null;
};

export type HoursSeason = {
  /** Current name. Older saved copies may only have `label`. */
  name?: string;
  label?: string;
  /** MM-DD, repeating each year. "TODO" when the website did not publish the day. */
  startDate?: string;
  endDate?: string;
  days: DayHours[];
  verify?: boolean;
};

export type Closure = {
  date: string;
  reason: string;
};

export type HoursPlace = 'campus' | 'coffee' | 'thrift' | 'playground';

export type Hours = {
  id: string;
  place: HoursPlace;
  seasons: HoursSeason[];
  closures?: Closure[];
  sourceUrl: string;
  verify: true;
  lastVerified?: string;
  verifiedBy?: string;
  conflict?: string;
};

export type Program = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  sourceUrl: string;
  verify: true;
  imageKey?: string;
  imageAlt?: string;
  /** Who the program is for. Omitted when the website did not say. */
  serves?: string;
};

export type HomeAction = {
  label: string;
  href: string;
};

export type HomeSection = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  imageKey?: string;
  imageAlt?: string;
  actions: HomeAction[];
  sourceUrl: string;
  verify: true;
};

export type HomeStat = {
  id: string;
  value: string;
  label: string;
  sourceUrl: string;
  verify: true;
};

export type SeasonalNotice = {
  id: string;
  imageKey: string;
  alt: string;
  href: string;
  sourceUrl: string;
  verify: true;
};

export type CalendarEvent = {
  id: string;
  title: string;
  summary: string;
  /** YYYY-MM-DD. The app treats this as an all-day event in America/Chicago. */
  startsOn: string;
  time?: string;
  location: string;
  sourceUrl: string;
  verify: true;
};

export type Resource = {
  id: string;
  name: string;
  category: string;
  summary: string;
  phone: string;
  address: string;
  sourceUrl: string;
  verify: true;
  lastVerified?: string;
  verifiedBy?: string;
};

export type HousingListing = {
  id: string;
  name: string;
  phone: string;
  address: string;
  summary: string;
  sourceUrl: string;
  verify: true;
  lastVerified?: string;
  verifiedBy?: string;
};

export type TinyHouseUpdate = {
  id: string;
  title: string;
  body: string;
  publishedOn: string;
  sourceUrl: string;
  verify: true;
};

export type NewsletterIssue = {
  id: string;
  title: string;
  publishedOn: string;
  url: string;
  sourceUrl: string;
  verify: true;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type SiteSettings = {
  mission: string;
  vision: string;
  address: string;
  phone: string;
  thriftPhone: string;
  infoEmail: string;
  volunteerEmail: string;
  socialLinks: SocialLink[];
  donateUrl: string;
  donateLabel?: string;
  /** Short sentence on the Give screen. Optional so an older saved copy still loads. */
  giveBlurb?: string;
  mailingListUrl?: string;
  mailingListLabel?: string;
  merchUrl: string;
  websiteUrl: string;
  tourUrl: string;
  sourceUrl: string;
  verify: true;
};

export type ContentBundle = {
  /** Optional for older offline bundles. */
  pages?: Page[];
  stories?: Story[];
  volunteerOpportunities?: VolunteerOpportunity[];
  episodes?: Episode[];
  videos?: Video[];
  programs: Program[];
  homeSections?: HomeSection[];
  homeStats?: HomeStat[];
  seasonalNotice?: SeasonalNotice | null;
  events: CalendarEvent[];
  resources: Resource[];
  housingListings: HousingListing[];
  tinyHouseUpdates: TinyHouseUpdate[];
  hours: Hours[];
  newsletters: NewsletterIssue[];
  siteSettings: SiteSettings;
};
