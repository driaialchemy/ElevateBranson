export const rateLimitCount = 5;
export const rateLimitWindowMs = 10 * 60 * 1000;

export function allowRequest(
  store: Map<string, number[]>,
  ip: string,
  now: number,
  limit = rateLimitCount,
  windowMs = rateLimitWindowMs,
): boolean {
  const recent = (store.get(ip) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    store.set(ip, recent);
    return false;
  }
  recent.push(now);
  store.set(ip, recent);
  return true;
}
