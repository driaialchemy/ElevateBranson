export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

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
};

export type Program = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  sourceUrl: string;
  verify: true;
};

export type CalendarEvent = {
  id: string;
  title: string;
  summary: string;
  startsOn: string;
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
  merchUrl: string;
  websiteUrl: string;
  tourUrl: string;
  sourceUrl: string;
  verify: true;
};

export type ContentBundle = {
  programs: Program[];
  events: CalendarEvent[];
  resources: Resource[];
  housingListings: HousingListing[];
  tinyHouseUpdates: TinyHouseUpdate[];
  hours: Hours[];
  newsletters: NewsletterIssue[];
  siteSettings: SiteSettings;
};
