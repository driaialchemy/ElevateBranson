export type IcsEvent = { title: string; time: string; location: string; description: string };

type ParsedTime = { date: string; clock: string; allDay: boolean; epoch: number };
type EventData = { uid: string; title: string; location: string; description: string; start?: ParsedTime; end?: ParsedTime; rule?: string; status?: string; exclusions: Set<string> };

const weekdayCodes = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

export function parseCalendarIcs(ics: string, now = new Date(), daysAhead = 370): IcsEvent[] {
  const lines = ics.replace(/\r?\n[ \t]/g, '').split(/\r?\n/);
  const records: EventData[] = [];
  let current: EventData | undefined;
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      current = { uid: `event-${records.length}`, title: '', location: '', description: '', exclusions: new Set() };
      continue;
    }
    if (line === 'END:VEVENT') {
      if (current?.start && current.title && current.status !== 'CANCELLED') records.push(current);
      current = undefined;
      continue;
    }
    if (!current) continue;
    const colon = line.indexOf(':');
    if (colon < 0) continue;
    const key = line.slice(0, colon);
    const value = unescapeText(line.slice(colon + 1));
    const name = key.split(';')[0];
    if (name === 'UID') current.uid = value;
    else if (name === 'SUMMARY') current.title = value;
    else if (name === 'LOCATION') current.location = value;
    else if (name === 'DESCRIPTION') current.description = plainText(value);
    else if (name === 'DTSTART') current.start = parseDate(value, key);
    else if (name === 'DTEND') current.end = parseDate(value, key);
    else if (name === 'RRULE') current.rule = value;
    else if (name === 'STATUS') current.status = value;
    else if (name === 'EXDATE') for (const excluded of value.split(',')) current.exclusions.add(excluded.slice(0, 8));
  }

  const after = now.getTime();
  const through = after + daysAhead * 86400000;
  const events: (IcsEvent & { sort: number })[] = [];
  for (const record of records) {
    const rule = parseRule(record.rule);
    let count = 0;
    const ageDays = Math.max(0, Math.floor((after - record.start!.epoch) / 86400000));
    const maxOffset = Math.min(ageDays + daysAhead + 2, 6000);
    for (let offset = 0; offset <= maxOffset; offset += 1) {
      const occurrence = addDays(record.start!, offset);
      if (rule.until && occurrence.date > rule.until) break;
      if (!matchesRule(record.start!, occurrence, rule, offset)) continue;
      count += 1;
      if (rule.count && count > rule.count) break;
      if (record.exclusions.has(occurrence.date.replaceAll('-', ''))) continue;
      if (!rule.frequency && offset > 0) break;
      if (occurrence.epoch < after || occurrence.epoch > through) continue;
      events.push({
        title: record.title,
        time: occurrence.allDay ? occurrence.date : `${occurrence.date}T${occurrence.clock}`,
        location: record.location,
        description: record.description,
        sort: occurrence.epoch,
      });
      if (!rule.frequency) break;
    }
  }
  return events.sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title)).map(({ sort: _sort, ...event }) => event);
}

function parseDate(value: string, key: string): ParsedTime | undefined {
  const raw = value.trim();
  const day = /^(\d{4})(\d{2})(\d{2})$/.exec(raw);
  if (day) return makeTime(`${day[1]}-${day[2]}-${day[3]}`, '00:00', true);
  const timed = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?(Z)?$/.exec(raw);
  if (!timed) return undefined;
  let date = `${timed[1]}-${timed[2]}-${timed[3]}`;
  let clock = `${timed[4]}:${timed[5]}`;
  const utc = timed[7] === 'Z';
  const tzid = /TZID=([^;:]+)/.exec(key)?.[1];
  const rawEpoch = Date.UTC(+timed[1]!, +timed[2]! - 1, +timed[3]!, +timed[4]!, +timed[5]!);
  const epoch = utc ? rawEpoch : localEpoch(date, clock, tzid || 'America/Chicago');
  if (utc) ({ date, clock } = inZone(rawEpoch, 'America/Chicago'));
  return { date, clock, allDay: false, epoch };
}

function inZone(epoch: number, zone: string): { date: string; clock: string } {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: zone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).formatToParts(new Date(epoch));
  const get = (key: string) => parts.find((part) => part.type === key)?.value ?? '00';
  return { date: `${get('year')}-${get('month')}-${get('day')}`, clock: `${get('hour')}:${get('minute')}` };
}

function makeTime(date: string, clock: string, allDay: boolean): ParsedTime {
  const [y, m, d] = date.split('-').map(Number);
  return { date, clock, allDay, epoch: Date.UTC(y!, m! - 1, d!) };
}

function localEpoch(date: string, clock: string, zone: string): number {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = clock.split(':').map(Number);
  let guess = Date.UTC(year!, month! - 1, day!, hour!, minute!);
  for (let i = 0; i < 3; i += 1) {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: zone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).formatToParts(new Date(guess));
    const get = (key: string) => Number(parts.find((part) => part.type === key)?.value);
    guess += Date.UTC(year!, month! - 1, day!, hour!, minute!) - Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'));
  }
  return guess;
}

function addDays(start: ParsedTime, days: number): ParsedTime {
  const [year, month, day] = start.date.split('-').map(Number);
  const result = new Date(Date.UTC(year!, month! - 1, day! + days));
  const date = `${result.getUTCFullYear()}-${String(result.getUTCMonth() + 1).padStart(2, '0')}-${String(result.getUTCDate()).padStart(2, '0')}`;
  return { ...start, date, epoch: start.epoch + days * 86400000 };
}

function parseRule(value = ''): { frequency?: string; interval: number; count?: number; until?: string; byDay: string[] } {
  const fields = Object.fromEntries(value.split(';').map((part) => { const [key, val = ''] = part.split('='); return [key, val]; }));
  const until = fields.UNTIL?.match(/^(\d{4})(\d{2})(\d{2})/)?.slice(1).join('-');
  return { frequency: fields.FREQ, interval: Math.max(1, Number(fields.INTERVAL) || 1), count: fields.COUNT ? Number(fields.COUNT) : undefined, until, byDay: fields.BYDAY?.split(',') ?? [] };
}

function matchesRule(start: ParsedTime, occurrence: ParsedTime, rule: ReturnType<typeof parseRule>, offset: number): boolean {
  if (!rule.frequency) return offset === 0;
  const [sy, sm, sd] = start.date.split('-').map(Number);
  const [oy, om, od] = occurrence.date.split('-').map(Number);
  const delta = Math.floor(offset);
  if (rule.frequency === 'DAILY') return delta % rule.interval === 0;
  if (rule.frequency === 'WEEKLY') return Math.floor(delta / 7) % rule.interval === 0 && (rule.byDay.length === 0 ? delta % 7 === 0 : rule.byDay.some((day) => day.slice(-2) === weekdayCodes[new Date(Date.UTC(oy!, om! - 1, od!)).getUTCDay()]));
  if (rule.frequency === 'MONTHLY') {
    if ((oy! * 12 + om! - sy! * 12 - sm!) % rule.interval !== 0) return false;
    if (!rule.byDay.length) return od === sd;
    const date = new Date(Date.UTC(oy!, om! - 1, od!));
    return rule.byDay.some((day) => {
      const code = day.slice(-2);
      if (weekdayCodes[date.getUTCDay()] !== code) return false;
      const ordinal = Number(day.slice(0, -2));
      return !ordinal || ordinal > 0 && Math.ceil(od! / 7) === ordinal || ordinal < 0 && Math.ceil((new Date(Date.UTC(oy!, om!, 0)).getUTCDate() - od! + 1) / 7) === Math.abs(ordinal);
    });
  }
  if (rule.frequency === 'YEARLY') return (oy! - sy!) % rule.interval === 0 && om === sm && od === sd;
  return false;
}

function unescapeText(value: string): string {
  return value.replace(/\\n/gi, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\\\/g, '\\').trim();
}

function plainText(value: string): string {
  return value.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1').replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').trim();
}
