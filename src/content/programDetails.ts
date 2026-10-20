export type ProgramDate = { title: string; startsOn: string; endsOn?: string; lastVerified?: string };
export type ProgramInfo = {
  facts: { label: string; value: string }[];
  contact?: { name: string; role?: string; phone?: string };
  extraContacts?: { name: string; role?: string; phone: string }[];
  actions: { label: string; url: string }[];
  volunteerUrl?: string;
  table?: { headers: string[]; rows: string[][] };
  faq?: { question: string; answer: string }[];
  offerings?: { title: string; summary: string }[];
  dates?: ProgramDate[];
  staleDateCount?: number;
  timeline?: { title: string; date: string; body?: string; lastVerified: string }[];
};

const verified = '2026-10-20';
const site = 'https://elevatebranson.org';

export const programDetails: Record<string, ProgramInfo> = {
  'elevate-community': {
    facts: [
      { label: 'Community', value: 'A tiny-home neighborhood on five acres near Branson employment opportunities.' },
      { label: 'Homes', value: '400 sq ft, furnished, one bathroom, a porch, and Energy Star features.' },
      { label: 'Rent', value: '$495 per month, including utilities and trash.' },
      { label: 'Eligibility', value: 'Adults 18 or older, with at least 12 months of Taney County residency; income and ID documents are required.' },
      { label: 'Lease and pets', value: 'Month-to-month lease. One small pet may be approved; an additional pet charge applies.' },
      { label: 'Sponsorship', value: '$45,000 sponsors a home; optional packages are available.' },
    ],
    contact: { name: 'Bryan Stallings', role: 'Elevate Community', phone: '417.294.1300' },
    actions: [
      { label: 'Residency Application (PDF)', url: 'https://elevatebranson.org/wp-content/uploads/2026/01/ResidencyApplication_January2026.pdf' },
      { label: 'Sponsorship Options (PDF)', url: 'https://elevatebranson.org/wp-content/uploads/2025/07/TinyHomeSponsorshipCustomizationOptions.pdf' },
      { label: 'Schedule a Tour', url: `${site}/schedule-a-tour/` },
    ],
    faq: [
      { question: 'Who can apply?', answer: 'Applicants must be at least 18, have lived in Taney County for at least one year, and provide identification and income documents. Applicants are screened for suitability and must meet the community rules.' },
      { question: 'How many people can live in a home?', answer: 'Homes are intended for one person and may accommodate an established couple when both applicants qualify.' },
      { question: 'How long can residents stay?', answer: 'Residents may stay while following community rules and meeting annual income guidelines. Leases are month to month.' },
      { question: 'Are pets allowed?', answer: 'One small pet may be approved by management; an additional pet charge and leash rules apply.' },
    ],
    timeline: [
      { title: 'Project planning and bid work', date: '2024', body: 'The project completed rebidding and moved into pre-construction planning.', lastVerified: verified },
      { title: 'Site preparation and dedication', date: '2025', body: 'Site work continued and the community held a dedication celebration.', lastVerified: verified },
    ],
  },
  'elevate-rides': {
    facts: [
      { label: 'Vehicles', value: '49cc motor scooters.' },
      { label: 'Rental eligibility', value: 'A valid driver’s license is required; ownership riders need a Class M license.' },
      { label: 'Rental setup', value: 'Attend Scooter School and pay a $65 deposit, then arrange payment and pick up the keys.' },
      { label: 'Ownership — step 1', value: 'Become a business partner.' },
      { label: 'Ownership — step 2', value: 'Qualified employees complete an application.' },
      { label: 'Ownership — step 3', value: 'Attend scooter training at Elevate Branson.' },
      { label: 'Ownership — step 4', value: 'Pass the driver test for a Class M license.' },
      { label: 'Ownership — step 5', value: 'Set up a payment plan and pick up the scooter keys.' },
    ],
    contact: { name: 'Dan Friday', role: 'Elevate Rides Director', phone: '417.295.7575' },
    table: { headers: ['Rental option', 'Price'], rows: [['J-1 students', '$50 per week'], ['Local rental with one-month agreement', '$65 per week'], ['Scooter School deposit', '$65']] },
    actions: [
      { label: 'Rental Application', url: 'https://elevatebranson.my.salesforce-sites.com/j1' },
      { label: 'Become a Business Partner', url: 'https://elevatebranson.app.neoncrm.com/forms/business-partner' },
    ],
  },
  'elevate-work': {
    facts: [
      { label: 'Course length', value: 'Nine weeks and 18 classes.' },
      { label: 'Schedule', value: 'Monday and Wednesday, 6:00–8:00 P.M.' },
      { label: 'Student support', value: 'Childcare, dinner, and transportation are available.' },
      { label: 'Employer support', value: 'Graduates receive guaranteed interviews with participating employers; mentors and mock interviewers support classes.' },
    ],
    contact: { name: 'Donna McConkey', role: 'Elevate Work Director', phone: '417.527.1709' },
    dates: [
      { title: 'January class', startsOn: '2026-01-05', lastVerified: verified },
      { title: 'March class', startsOn: '2026-03-16', lastVerified: verified },
      { title: 'September class', startsOn: '2026-09-14', lastVerified: verified },
    ],
    actions: [
      { label: 'Student Application', url: `${site}/elevate-work-student-application-2/` },
      { label: 'Business Partnership', url: `${site}/business-partnership/` },
      { label: 'Sponsor Elevate Work', url: `${site}/donate/` },
    ],
    volunteerUrl: `${site}/volunteer-form-elevate-work/`,
  },
  'computer-classes': {
    facts: [{ label: 'Schedule', value: 'Sessions are listed for Mondays and Wednesdays. Contact Elevate Branson to confirm times and available seats.' }],
    contact: { name: 'Donna McConkey', role: 'Class availability', phone: '417.527.1709' },
    dates: [
      { title: 'Basic Computer Skills — Winter', startsOn: '2026-01-12', endsOn: '2026-01-28', lastVerified: verified },
      { title: 'Basic Computer Skills — Spring', startsOn: '2026-03-23', endsOn: '2026-04-08', lastVerified: verified },
      { title: 'Basic Computer Skills — Fall', startsOn: '2026-09-21', endsOn: '2026-10-07', lastVerified: verified },
      { title: 'Word — Winter', startsOn: '2026-02-02', endsOn: '2026-02-18', lastVerified: verified },
      { title: 'Word — Spring', startsOn: '2026-04-13', endsOn: '2026-04-29', lastVerified: verified },
      { title: 'Word — Fall', startsOn: '2026-10-12', endsOn: '2026-10-28', lastVerified: verified },
      { title: 'Excel — Winter', startsOn: '2026-02-23', endsOn: '2026-03-11', lastVerified: verified },
      { title: 'Excel — Spring', startsOn: '2026-05-04', endsOn: '2026-05-20', lastVerified: verified },
      { title: 'Excel — Fall', startsOn: '2026-11-02', endsOn: '2026-11-18', lastVerified: verified },
      { title: 'Financial Literacy — Winter', startsOn: '2026-01-19', endsOn: '2026-02-11', lastVerified: verified },
      { title: 'Financial Literacy — Spring', startsOn: '2026-03-30', endsOn: '2026-04-22', lastVerified: verified },
      { title: 'Financial Literacy — Fall', startsOn: '2026-09-28', endsOn: '2026-10-21', lastVerified: verified },
    ],
    actions: [{ label: 'Read class details', url: `${site}/computer-classes/` }],
  },
  'elevate-entrepreneurs': {
    facts: [
      { label: 'Early-Stage Business Boot Camp', value: 'Eight-week business boot camp.' },
      { label: 'Community Business Academy', value: 'Twelve-week program offered in spring and fall.' },
      { label: 'Other offerings', value: 'Business Acceleration, Credit to Capital, and Lunch-and-Learn sessions.' },
      { label: 'Date status', value: '2024 and 2025 event dates are stale and hidden until the current schedule is confirmed.' },
    ],
    contact: { name: 'Chris Hunter', role: 'Elevate Entrepreneurs Director', phone: '417.335.9915' },
    actions: [{ label: 'Sign Up', url: 'https://elevatebranson.app.neoncrm.com/nx/portal/neonevents/events?path=%2Fportal%2Fevents%2F40854' }],
    volunteerUrl: `${site}/volunteer-form-elevate-entrepreneurs/`,
    staleDateCount: 2,
  },
  'elevate-health': {
    facts: [
      { label: 'Eligibility', value: 'Individual and group counseling for people age 12 and older.' },
      { label: 'Counselor', value: 'Brenda “Bre” Watson-Hill, MA in Counseling; Missouri LPC, CRADC, and EMDR Therapist.' },
      { label: 'Payment', value: 'Individual counseling uses an income-based sliding scale. Up to half the fee may be covered with Elevate Reward Points.' },
    ],
    contact: { name: 'Bre Watson-Hill', role: 'Elevate Community Counselor — appointments', phone: '417.243.0060' },
    extraContacts: [{ name: 'Elevate Health', role: 'Inquiries', phone: '417.243.0660' }],
    table: { headers: ['Federal poverty guideline', 'Individual', 'Group'], rows: [['100% or less', '$10', '$5'], ['101–200%', '$20', '$5'], ['201–300%', '$30', '$5'], ['301% and above', '$50', '$5']] },
    actions: [{ label: 'Read Elevate Health details', url: `${site}/elevate-health/` }],
  },
  'elevate-kids': {
    facts: [{ label: 'Who it serves', value: 'Children and families experiencing poverty, housing instability, or other barriers.' }],
    contact: { name: 'Cathy Brown', role: 'Elevate Kids Director', phone: '417.737.1041' },
    offerings: [
      { title: 'Sensory Room', summary: 'A public space for children who need help decompressing and learning.' },
      { title: 'Natural Playground', summary: 'Outdoor play designed to support children affected by trauma and stress.' },
      { title: 'Theo', summary: 'An on-site certified therapy dog who works with children and adults.' },
      { title: 'After-School Program', summary: 'Homework, games, art, playground time, and sensory-room activities.' },
      { title: 'Summer School', summary: 'Reading, phonics, math, art, life skills, and outdoor play.' },
      { title: 'Kid-Sized Life Skills', summary: 'Children of Elevate Work students learn alongside their parents.' },
      { title: 'Up With Kids!', summary: 'Partners support children living in weekly-stay motels during school breaks.' },
    ],
    actions: [
      { label: 'Help Our Area Children', url: `${site}/elevate-kids-sponsorship/` },
      { label: 'Ask a question', url: `${site}/contact-us/` },
    ],
  },
  theo: {
    facts: [{ label: 'Theo', value: 'A rescue dog and certified on-site therapy dog who works primarily with Elevate Kids.' }, { label: 'Theo’s Heroes', value: 'A $250 sponsorship helps support Theo’s work with children and neighbors.' }],
    contact: { name: 'Cathy Brown', role: 'Elevate Kids Director', phone: '417.737.1041' },
    actions: [
      { label: 'Join Theo’s Heroes', url: 'https://elevatebranson.app.neoncrm.com/forms/theos-heroes' },
      { label: 'Download Theo Coloring Pages', url: `${site}/theo/` },
    ],
  },
  'elevate-outreach': {
    facts: [
      { label: 'What it does', value: 'Volunteers prepare and deliver basic meals to neighbors in extended-stay motels.' },
      { label: 'Next steps', value: 'Meal delivery helps build relationships and connect neighbors with other programs and resources.' },
    ],
    contact: { name: 'Betsy Foster', role: 'Volunteer & Events Coordinator', phone: '417.593.2254' },
    actions: [{ label: 'Volunteer with Elevate Outreach', url: `${site}/volunteer/` }],
    volunteerUrl: `${site}/volunteer-form-evening-meal-delivery-and-outreach/`,
  },
  'elevate-connections': {
    facts: [
      { label: 'Support', value: 'Help with identification, mail, applications, paperwork, transportation, basic case management, and voter registration.' },
      { label: 'Resource network', value: 'Connections to over 150 resource organizations.' },
      { label: 'Partner support', value: 'Partners contribute $100 or more per month and refer neighbors who need support.' },
      { label: 'Rewards', value: 'Volunteers earn 5 points per hour, up to five hours per week; points can support listed Elevate services.' },
    ],
    contact: { name: 'Jordanna Boyd', role: 'Elevate Connections Director', phone: '417.239.7818' },
    actions: [
      { label: 'Become a Partner', url: 'https://elevatebranson.app.neoncrm.com/forms/13' },
      { label: 'Rewards Program', url: `${site}/rewards-program/` },
      { label: 'Area Resources and Housing', url: '/more/resources' },
      { label: 'Housing Information (PDF)', url: 'https://elevatebranson.org/wp-content/uploads/2026/03/HousingInformationSheet_March2026.pdf' },
    ],
  },
};
