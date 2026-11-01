export const topics = ['news', 'events', 'programs', 'giving', 'housing'] as const;

export type Topic = (typeof topics)[number];

export const topicLabels: Record<Topic, string> = {
  news: 'News',
  events: 'Events',
  programs: 'Programs',
  giving: 'Giving',
  housing: 'Housing & resource list updates',
};

export const topicRoutes: Record<Topic, string> = {
  news: '/more/newsletter',
  events: '/events',
  programs: '/programs',
  giving: '/get-involved/give',
  housing: '/more/resources',
};

export function isTopic(value: string): value is Topic {
  return (topics as readonly string[]).includes(value);
}

/** Stored phones may still say `resources` from the separate toggle. That choice is the housing topic now. */
export function normalizeTopics(value: unknown): Topic[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const unique = new Set<Topic>();
  for (const item of value) {
    if (item === 'resources' || item === 'housing') {
      unique.add('housing');
      continue;
    }
    if (typeof item === 'string' && isTopic(item)) {
      unique.add(item);
    }
  }
  return [...unique];
}

export function isKnownRoute(href: string): boolean {
  return (Object.values(topicRoutes) as string[]).includes(href);
}

export function routeForTopic(topic: Topic | 'all'): string {
  if (topic === 'all') {
    return topicRoutes.news;
  }
  return topicRoutes[topic];
}
