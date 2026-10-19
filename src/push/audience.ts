import { isTopic, type Topic } from '@/push/topics';

export type PushTokenRecord = {
  token: string;
  topics: Topic[];
  updatedAt: string;
};

const tokenPattern = /^ExponentPushToken\[[^\]]+\]$/;

export function isPushToken(value: string): boolean {
  return tokenPattern.test(value.trim());
}

export function cleanTopics(value: unknown): Topic[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const unique = new Set<Topic>();
  for (const item of value) {
    if (typeof item === 'string' && isTopic(item)) {
      unique.add(item);
    }
  }
  return [...unique];
}

export function upsertToken(records: PushTokenRecord[], token: string, topics: Topic[], updatedAt: string): PushTokenRecord[] {
  const next: PushTokenRecord = { token: token.trim(), topics, updatedAt };
  const rest = records.filter((record) => record.token !== next.token);
  return [...rest, next];
}

export function recipients(records: PushTokenRecord[], topic: Topic | 'all'): PushTokenRecord[] {
  return records.filter((record) => {
    if (record.topics.length === 0) {
      return false;
    }
    return topic === 'all' || record.topics.includes(topic);
  });
}

export function dropTokens(records: PushTokenRecord[], tokens: string[]): PushTokenRecord[] {
  const gone = new Set(tokens);
  return records.filter((record) => !gone.has(record.token));
}
