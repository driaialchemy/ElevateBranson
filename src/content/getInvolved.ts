import type { Page, VolunteerOpportunity } from '@/content/types';

const origin = 'https://elevatebranson.org';

export const useNativeForms = false;
export const volunteerFormTarget = (opportunity: VolunteerOpportunity) => useNativeForms ? `/get-involved/volunteer-native?opportunity=${opportunity.id}` : opportunity.formUrl ?? opportunity.sourceUrl;

export const volunteerOpportunities: VolunteerOpportunity[] = [
  { id: 'meal-makers', title: 'Meal Makers', schedule: 'First and third Thursday, 8:00–9:30 a.m.', description: 'Prepare sandwiches, meal bags, and resource sheets for neighbors.', ageRules: 'All ages welcome.', groupSize: 'Groups of 5–10.', formUrl: `${origin}/volunteer-form-morning-meal-makers/`, sourceUrl: `${origin}/volunteer/`, status: 'verify' },
  { id: 'meal-delivery-outreach', title: 'Meal Delivery + Outreach', schedule: 'First and third Thursday, 5:30–8:30 p.m.', description: 'Deliver sack meals and share resource information at weekly-stay motels.', ageRules: 'Under 16 must attend with a parent.', groupSize: 'Contact Elevate about group size.', formUrl: `${origin}/volunteer-form-evening-meal-delivery-and-outreach/`, sourceUrl: `${origin}/volunteer/`, status: 'verify' },
  { id: 'thrift-store', title: 'Thrift Store', schedule: 'Weekdays, 9 a.m.–6 p.m.; Saturday, 9 a.m.–4 p.m.', description: 'Sort, hang, clean, and test donated items.', ageRules: '18+ or with a parent.', groupSize: 'Groups of 2–4.', formUrl: `${origin}/volunteer-form-elevate-thrift-store/`, sourceUrl: `${origin}/volunteer/`, status: 'verify' },
  { id: 'elevate-work', title: 'Elevate Work', schedule: 'Monday and Wednesday, 6–8 p.m.; call for dates.', description: 'Mentor a student or support a workforce development class.', ageRules: 'Contact Elevate for age requirements.', groupSize: 'Ask about group availability.', formUrl: `${origin}/volunteer-form-elevate-work/`, sourceUrl: `${origin}/volunteer/`, status: 'verify' },
  { id: 'elevate-entrepreneurs', title: 'Elevate Entrepreneurs', schedule: 'Schedule not listed; contact Elevate.', description: 'Help people starting a business connect with education and resources.', ageRules: 'Contact Elevate for age requirements.', groupSize: 'Ask about group availability.', formUrl: `${origin}/volunteer-form-elevate-entrepreneurs/`, sourceUrl: `${origin}/volunteer/`, status: 'verify' },
  { id: 'building-maintenance', title: 'Building Maintenance and Cleaning', schedule: 'Weekdays, 9 a.m.–6 p.m.', description: 'Help maintain welcoming, safe spaces across the Elevate campus.', ageRules: 'Contact Elevate for age requirements.', groupSize: 'Ask about group availability.', formUrl: `${origin}/volunteer-form-building-maintenance-and-cleaning/`, sourceUrl: `${origin}/volunteer/`, status: 'verify' },
];

export const volunteerImages: Record<string, string> = {
  'meal-makers': 'program-elevate-outreach',
  'meal-delivery-outreach': 'program-elevate-outreach',
  'thrift-store': 'program-thrift',
  'elevate-work': 'program-elevate-work',
  'elevate-entrepreneurs': 'program-elevate-entrepreneurs',
  'building-maintenance': 'hero',
};

export const volunteerLinks = {
  conduct: 'https://elevatebranson.org/wp-content/uploads/2021/03/Volunteer-Code-Of-Conduct.pdf',
  opportunities: 'https://elevatebranson.org/wp-content/uploads/2025/08/VolunteerOpportunities_2025.pdf',
  rewards: '/page/rewards-program',
  profiles: '/page/meet-our-volunteers',
  give5: 'https://ozarkmountainlegacy.org/give-5/',
  facebook: 'https://www.facebook.com/elevatebranson.org/',
  phone: '417.335.9915',
  email: 'Info@ElevateBranson.org',
} as const;

export const givingDetails = {
  advance: { amount: 'From $35 per month', benefits: ['Poverty education packet', 'Elevate sticker', 'Insider communications', '25% discount at participating Elevate services'], url: 'https://elevatebranson.app.neoncrm.com/forms/advance-team' },
  businessTiers: [
    { tier: '$249/month', price: '$249/month', employees: 'Base level' },
    { tier: '$499/month', price: '$499/month', employees: '100+ employees' },
    { tier: '$799/month', price: '$799/month', employees: '500+ employees' },
  ],
  businessBenefits: ['Scooter access for employees', 'Elevate Work and Entrepreneurs enrollment', 'Workforce courses', '25% discount', '$20 counseling sessions'],
  businessUrl: 'https://elevatebranson.app.neoncrm.com/forms/business-partner',
  brandSteps: ['Complete the pre-assessment', 'Talk with the Elevate team', 'Plan local programs and partnerships', 'Launch Elevate services in your community'],
  brandUrl: 'https://elevatebranson.org/elevate-branding-licensure-pre-vetting-questionnaire/',
  legacyOptions: ['Include Elevate Branson in your will or trust', 'Create a naming opportunity', 'Establish a charitable trust', 'Name Elevate Branson as a life insurance beneficiary'],
  legacyContact: { name: 'Matt Grindstaff', phone: '417.598.0962' },
  rewards: ['Earn $5 in Elevate credit for every volunteer hour, up to four hours per week.', 'Use credits for sack meals, thrift store purchases, rides to the pantry, identification documents, and classes.'],
  tourUrl: `${origin}/schedule-a-tour/`,
  tourDays: 'Monday through Friday, with at least 24 hours’ notice.',
  tourTimes: ['11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.'],
  tourHolidays: ['2026-01-01', '2026-01-19', '2026-02-16', '2026-05-25', '2026-06-19', '2026-07-03', '2026-09-07', '2026-10-12', '2026-11-11', '2026-11-26', '2026-12-25'],
} as const;

export const tourFormTarget = () => useNativeForms ? '/get-involved/tour-native' : givingDetails.tourUrl;

export function availableTourDates(startDate: string, days: number, holidays: readonly string[]): string[] {
  const closed = new Set(holidays);
  const start = new Date(`${startDate}T12:00:00`);
  if (Number.isNaN(start.getTime()) || days <= 0) return [];
  const dates: string[] = [];
  for (let offset = 0; offset < days; offset += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    const day = date.getDay();
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (day !== 0 && day !== 6 && !closed.has(iso)) dates.push(iso);
  }
  return dates;
}

export function volunteerStories(page: Page | undefined) {
  if (!page) return [];
  const text = page.blocks.find((block) => block._type === 'richText');
  if (!text || text._type !== 'richText') return [];
  const names = (text.headings ?? []).filter((heading) => heading.endsWith(':') && !heading.toLowerCase().includes('hours of operation')).map((heading) => heading.replace(/:$/, ''));
  return names.map((name, index) => {
    const key = name.replace(/[^a-z]/gi, '').toLowerCase();
    const firstName = name.split(/\s+&\s+/)[0].trim().split(/\s+/)[0].replace(/[^a-z]/gi, '').toLowerCase();
    const words = (paragraph: string): string[] => paragraph.toLowerCase().match(/[a-z]+/g) ?? [];
    const body = text.paragraphs.find((paragraph) => paragraph.length > 75 && words(paragraph)[0] === firstName)
      ?? text.paragraphs.find((paragraph) => {
        const paragraphWords: string[] = words(paragraph);
        return paragraph.length > 75 && paragraphWords.includes(firstName);
      })
      ?? (key === 'jerrysanderson' ? text.paragraphs[21] : key === 'douglay' ? text.paragraphs[23] : undefined);
    return { id: `${key}-${index}`, name, body: body ?? 'Read more about this Elevate Branson volunteer story on the website.' };
  });
}
