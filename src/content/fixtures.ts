import type {
  ContentBundle,
  DayHours,
  Hours,
  HoursSeason,
  Program,
  Weekday,
} from '@/content/types';

const weekdays: Weekday[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

function season(
  name: string,
  open: Partial<Record<Weekday, [string, string]>>,
  startDate: string,
  endDate: string,
): HoursSeason {
  const days: DayHours[] = weekdays.map((day) => {
    const span = open[day];
    return span ? { day, opens: span[0], closes: span[1] } : { day, opens: null, closes: null };
  });
  return { name, label: name, startDate, endDate, days, verify: true };
}

const weekday = (opens: string, closes: string): Partial<Record<Weekday, [string, string]>> => ({
  monday: [opens, closes],
  tuesday: [opens, closes],
  wednesday: [opens, closes],
  thursday: [opens, closes],
  friday: [opens, closes],
});

const programs: Program[] = [
  {
    id: 'elevate-kids',
    name: 'Elevate Kids',
    slug: 'elevate-kids',
    summary:
      'Meals and care for children living in or near poverty, plus a sensory room, after-school and summer programs, and the playground.',
    sourceUrl: 'https://elevatebranson.org/elevate-kids/',
    verify: true,
  },
  {
    id: 'elevate-work',
    name: 'Elevate Work',
    slug: 'elevate-work',
    summary:
      'Job skills, interview practice, and resume help. Classes meet Monday and Wednesday, 6:00–8:00 P.M., for nine weeks.',
    sourceUrl: 'https://elevatebranson.org/elevate-work/',
    verify: true,
  },
  {
    id: 'elevate-entrepreneurs',
    name: 'Elevate Entrepreneurs',
    slug: 'elevate-entrepreneurs',
    summary: 'Education for people starting a business or a side gig, including an early-stage boot camp.',
    sourceUrl: 'https://elevatebranson.org/elevate-entrepreneurs/',
    verify: true,
  },
  {
    id: 'elevate-connections',
    name: 'Elevate Connections',
    slug: 'elevate-connections',
    summary:
      'Help with IDs, mail, paperwork, rides to appointments, case management, and voting. The program connects neighbors with more than 150 organizations.',
    sourceUrl: 'https://elevatebranson.org/elevate-connections/',
    verify: true,
  },
  {
    id: 'elevate-outreach',
    name: 'Elevate Outreach',
    slug: 'elevate-outreach',
    summary: 'Sack meals delivered to people staying in weekly motels.',
    sourceUrl: 'https://elevatebranson.org/elevate-outreach/',
    verify: true,
  },
  {
    id: 'elevate-rides',
    name: 'Elevate Rides',
    slug: 'elevate-rides',
    summary: 'Motorized scooters for getting around Branson, where public transit is limited.',
    sourceUrl: 'https://elevatebranson.org/elevate-rides/',
    verify: true,
  },
  {
    id: 'elevate-health',
    name: 'Elevate Health',
    slug: 'elevate-health',
    summary: 'Works with care providers so neighbors can get medical care, including counseling.',
    sourceUrl: 'https://elevatebranson.org/elevate-health/',
    verify: true,
  },
  {
    id: 'elevate-life',
    name: 'Elevate Life',
    slug: 'elevate-life',
    summary:
      'A group that explores faith and life questions. Dinner is 5:45–6:30 P.M. and the meeting is 6:30–8:00 P.M. on the second and fourth Thursday, on campus.',
    sourceUrl: 'https://elevatebranson.org/elevate-life/',
    verify: true,
  },
  {
    id: 'elevate-community',
    name: 'Elevate Community',
    slug: 'elevate-community',
    summary:
      'A tiny-home neighborhood next to campus for local residents, especially people who work front-line jobs.',
    sourceUrl: 'https://elevatebranson.org/elevate-community/',
    verify: true,
  },
  {
    id: 'computer-classes',
    name: 'Computer Classes',
    slug: 'computer-classes',
    summary:
      'Classes in basic computers, Word, Excel, and financial literacy. They meet Monday and Wednesday, 3:30–5:00 P.M.',
    sourceUrl: 'https://elevatebranson.org/computer-classes/',
    verify: true,
  },
  {
    id: 'coffee',
    name: 'Elevate Coffee',
    slug: 'coffee',
    summary: 'Espresso, lunch specials, desserts, and coffee subscriptions inside Elevate Branson.',
    sourceUrl: 'https://elevatebranson.org/elevate-cafe-and-coffee/',
    verify: true,
  },
  {
    id: 'thrift',
    name: 'Thrift Store',
    slug: 'thrift',
    summary:
      'A second-hand shop. Sales support programs, and the store offers work experience and rewards credits.',
    sourceUrl: 'https://elevatebranson.org/elevate-thrift-store/',
    verify: true,
  },
  {
    id: 'playground',
    name: 'Playground',
    slug: 'playground',
    summary:
      'A natural playground. Time outside is part of how the campus supports children dealing with trauma and stress.',
    sourceUrl: 'https://elevatebranson.org/elevate-playground/',
    verify: true,
  },
];

const hours: Hours[] = [
  {
    id: 'hours-campus',
    place: 'campus',
    sourceUrl: 'https://elevatebranson.org/contact-us/',
    verify: true,
    closures: [],
    lastVerified: '2026-10-17',
    verifiedBy: 'elevatebranson.org',
    seasons: [
      season(
        'Campus',
        {
          monday: ['09:00', '18:00'],
          tuesday: ['13:00', '18:00'],
          wednesday: ['09:00', '18:00'],
          thursday: ['10:00', '18:00'],
          friday: ['09:00', '16:00'],
        },
        'TODO',
        'TODO',
      ),
    ],
  },
  {
    id: 'hours-coffee',
    place: 'coffee',
    sourceUrl: 'https://elevatebranson.org/elevate-cafe-and-coffee/',
    verify: true,
    closures: [],
    lastVerified: '2026-10-17',
    verifiedBy: 'elevatebranson.org',
    seasons: [season('Coffee shop', weekday('08:00', '15:00'), 'TODO', 'TODO')],
  },
  {
    id: 'hours-thrift',
    place: 'thrift',
    sourceUrl: 'https://elevatebranson.org/elevate-thrift-store/',
    verify: true,
    closures: [],
    lastVerified: '2026-10-17',
    verifiedBy: 'elevatebranson.org',
    seasons: [
      season('Thrift store', { ...weekday('09:00', '18:00'), saturday: ['09:00', '16:00'] }, 'TODO', 'TODO'),
    ],
  },
  {
    id: 'hours-playground',
    place: 'playground',
    sourceUrl: 'https://elevatebranson.org/elevate-playground/',
    verify: true,
    closures: [],
    lastVerified: '2026-10-17',
    verifiedBy: 'elevatebranson.org',
    seasons: [
      season(
        'School year',
        {
          monday: ['09:00', '17:00'],
          tuesday: ['09:00', '15:30'],
          wednesday: ['09:00', '17:00'],
          thursday: ['09:00', '15:30'],
          friday: ['09:00', '15:30'],
        },
        'TODO',
        'TODO',
      ),
      season(
        'June and July',
        {
          monday: ['13:00', '17:30'],
          tuesday: ['13:00', '17:30'],
          wednesday: ['13:00', '17:30'],
          thursday: ['09:00', '17:30'],
          friday: ['09:00', '15:30'],
        },
        '06-01',
        '07-31',
      ),
      season(
        'August',
        {
          monday: ['09:00', '17:30'],
          tuesday: ['13:00', '17:30'],
          wednesday: ['09:00', '17:30'],
          thursday: ['09:00', '17:30'],
          friday: ['09:00', '15:30'],
        },
        '08-01',
        '08-31',
      ),
    ],
  },
];

export const fixtures: ContentBundle = {
  programs,
  events: [],
  resources: [],
  housingListings: [],
  tinyHouseUpdates: [],
  hours,
  newsletters: [
    {
      id: 'newsletter-2026-09',
      title: 'September 2026 Newsletter',
      publishedOn: '2026-09-29',
      url: 'https://conta.cc/4zKde9a',
      sourceUrl: 'https://elevatebranson.org/',
      verify: true,
    },
    {
      id: 'newsletter-2026-08',
      title: 'August 2026 Newsletter',
      publishedOn: '2026-08-28',
      url: 'https://conta.cc/4h9vylh',
      sourceUrl: 'https://elevatebranson.org/',
      verify: true,
    },
    {
      id: 'newsletter-2026-07',
      title: 'July 2026 Newsletter',
      publishedOn: '2026-07-27',
      url: 'https://conta.cc/4eGUrlj',
      sourceUrl: 'https://elevatebranson.org/',
      verify: true,
    },
    {
      id: 'newsletter-2026-06',
      title: 'June 2026 Newsletter',
      publishedOn: '2026-06-30',
      url: 'https://conta.cc/43rNnnL',
      sourceUrl: 'https://elevatebranson.org/',
      verify: true,
    },
    {
      id: 'newsletter-2026-05',
      title: 'May 2026 Newsletter',
      publishedOn: '2026-05-28',
      url: 'https://conta.cc/3P4yYds',
      sourceUrl: 'https://elevatebranson.org/',
      verify: true,
    },
    {
      id: 'newsletter-2026-04',
      title: 'April 2026 Newsletter',
      publishedOn: '2026-04-29',
      url: 'https://conta.cc/41vXUgm',
      sourceUrl: 'https://elevatebranson.org/',
      verify: true,
    },
  ],
  siteSettings: {
    mission: 'To elevate our community by empowering our neighbors to reach their full potential.',
    vision: 'For every individual to know hope, dignity, and purpose through the love of Jesus.',
    address: '310 Gretna Road, Branson, MO 65616',
    phone: '417.335.9915',
    thriftPhone: '417.986.1188',
    infoEmail: 'Info@ElevateBranson.org',
    volunteerEmail: 'Volunteer@ElevateBranson.org',
    socialLinks: [
      { label: 'Facebook', url: 'https://www.facebook.com/elevatebranson.org/' },
      { label: 'Instagram', url: 'https://www.instagram.com/elevate_branson' },
      { label: 'X', url: 'https://twitter.com/elevatebranson' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/company/elevate-branson' },
    ],
    donateUrl: 'https://elevatebranson.org/donate/',
    giveBlurb:
      'Individuals, families, and organizations who want to support all that we do to improve our community can make a one-time or recurring gift that empowers our neighbors to reach their full potential.',
    merchUrl: '',
    websiteUrl: 'https://elevatebranson.org/',
    tourUrl: 'https://elevatebranson.org/schedule-a-tour/',
    sourceUrl: 'https://elevatebranson.org/contact-us/',
    verify: true,
  },
};
