const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export function freshnessNote(lastVerified: string | undefined, now = new Date()): string {
  if (!lastVerified || !datePattern.test(lastVerified)) {
    return '';
  }
  const label = `Last updated ${lastVerified}`;
  return isStale(lastVerified, now) ? `${label}. Call to confirm.` : label;
}

export function isStale(lastVerified: string | undefined, now = new Date(), timeZone = 'America/Chicago'): boolean {
  if (!lastVerified || !datePattern.test(lastVerified)) {
    return false;
  }
  const today = chicagoDate(now, timeZone);
  return daysBetween(lastVerified, today) > 90;
}

function chicagoDate(now: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  return `${value('year')}-${value('month')}-${value('day')}`;
}

function daysBetween(start: string, end: string): number {
  const [startYear, startMonth, startDay] = start.split('-').map(Number);
  const [endYear, endMonth, endDay] = end.split('-').map(Number);
  const startUtc = Date.UTC(startYear, startMonth - 1, startDay);
  const endUtc = Date.UTC(endYear, endMonth - 1, endDay);
  return Math.round((endUtc - startUtc) / 86400000);
}
