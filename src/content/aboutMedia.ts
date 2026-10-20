import type { CalendarEvent, Episode, NewsletterIssue, Video } from '@/content/types';

export const aboutStats = [
  { value: '390+', label: 'Elevate Work graduates' },
  { value: '91.9%', label: 'of Elevate Work graduates employed' },
  { value: '1,800+', label: 'class hours' },
  { value: '421', label: 'children served yearly' },
  { value: '31,200', label: 'neighbors served yearly' },
  { value: '150+', label: 'community resources' },
  { value: '300+', label: 'monthly connections' },
] as const;
export const communityIssues = [
  { title: 'Seasonal employment', body: 'Tourism jobs are often seasonal, lower wage, and offer fewer benefits or paths to advancement.' },
  { title: 'Household income', body: 'Taney County median household income is 17.3% below Missouri and 26.9% below the national average.' },
  { title: 'Health insurance', body: 'The share of insured residents in Taney County is 33.1% below the Missouri average.' },
  { title: 'Poverty', body: 'Poverty affects families across the community, especially women ages 18–35 raising children.' },
  { title: 'Food security', body: 'Branson’s 2022–2023 free and reduced lunch rate was 51.7%.' },
] as const;

export const financialSummary = [
  ['2024', '$1,666,464', '$1,498,349', '$168,115'],
  ['2023', '$1,406,096', '$1,545,191', '($139,095)'],
  ['2022', '$2,424,286', '$1,269,410', '$1,154,879'],
  ['2021', '$1,269,405', '$1,142,935', '$126,470'],
  ['2020', '$1,798,807', '$886,344', '$912,463'],
  ['2019', '$685,688', '$724,327', '($38,639)'],
] as const;

export const charityNavigatorUrl = 'https://www.charitynavigator.org/ein/264727548';
export const coreValues = [
  'We serve the poor, the forgotten and those who have no voice.',
  'We inspire people to be authentic, transparent, and non-judgmental.',
  'We empower people to take meaningful next steps.',
  'We create an amazing sense of community.',
  'We move people to embrace the journey of life change.',
  'We help people find their purpose.',
] as const;
export const recommendedBooks = ['Toxic Charity', 'Charity Detox', 'When Helping Hurts', 'True Charity'] as const;
export const aboutFaq = [
  { question: 'What is Elevate Branson?', answer: 'Elevate Branson is a 501(c)(3) organization providing resources and services to underserved neighbors in the Branson community.' },
  { question: 'Who does Elevate Branson serve?', answer: 'People in the Branson community who want to overcome barriers to reaching their full potential, as well as local businesses seeking workforce support.' },
  { question: 'What programs and services are available?', answer: 'Programs include workforce development, community resource connections, affordable housing, children’s programming, outreach, health services, and the Thrift Store.' },
  { question: 'How can I get involved?', answer: 'Volunteer, join the Advance Team, sponsor a tiny home, or leave a legacy gift.' },
] as const;
export const mediaCatalog: { newsletters: NewsletterIssue[]; episodes: Episode[]; videos: Video[]; events: CalendarEvent[] } = {
  newsletters: [], episodes: [], videos: [], events: [],
};
