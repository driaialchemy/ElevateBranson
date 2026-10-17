import type { CalendarEvent, ContentBundle, HoursPlace, NewsletterIssue, Program, Resource } from '@/content/types';

export function filterResources(resources: Resource[], query: string, category: string): Resource[] {
  const needle = query.trim().toLowerCase();
  return resources.filter((resource) => {
    const categoryOk = category === 'All' || resource.category === category;
    const haystack = `${resource.name} ${resource.summary} ${resource.category}`.toLowerCase();
    const queryOk = needle.length === 0 || haystack.includes(needle);
    return categoryOk && queryOk;
  });
}

export function resourceCategories(resources: Resource[]): string[] {
  const names = resources.map((resource) => resource.category);
  return ['All', ...new Set(names)];
}

export function programBySlug(programs: Program[], slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}

export function hoursFor(bundle: ContentBundle, place: HoursPlace) {
  return bundle.hours.find((item) => item.place === place);
}

export function latestNewsletter(issues: NewsletterIssue[]): NewsletterIssue | undefined {
  return [...issues].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn))[0];
}

export function todayIso(now = new Date()): string {
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function nextCalendarEvent(events: CalendarEvent[], today: string): CalendarEvent | undefined {
  return events
    .filter((event) => event.startsOn >= today)
    .sort((a, b) => a.startsOn.localeCompare(b.startsOn))[0];
}
