export function isValidIsoDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isFinite(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === date;
}

export function isUpcoming(date: string, today: string): boolean {
  if (!isValidIsoDate(date) || !isValidIsoDate(today)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  const parsedToday = new Date(`${today}T00:00:00Z`);
  return parsed.valueOf() >= parsedToday.valueOf();
}
