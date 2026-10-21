import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';

import {
  contactFormTarget,
  givingDetails,
  isTourSlotAllowed,
  nativeFormsEnabled,
  tourFormTarget,
  tourSlotHour,
  volunteerFormTarget,
  volunteerOpportunities,
} from '../content/getInvolved.ts';
import { buildMail, staffRecipient } from './mail.ts';
import { contactPrograms, contactSchema, volunteerSchema } from './schema.ts';

const contact = { type: 'contact', name: 'Test Neighbor', email: 'neighbor@example.com', program: 'Kids', message: 'Hello', phone: '' };

test('contact schema takes the ten programs and requires name, email, and message', () => {
  assert.equal(contactPrograms.length, 10);
  assert.equal(contactSchema.safeParse(contact).success, true);
  assert.equal(contactSchema.safeParse({ ...contact, program: 'Nothing' }).success, false);
  assert.equal(contactSchema.safeParse({ ...contact, email: 'nope' }).success, false);
  assert.equal(contactSchema.safeParse({ ...contact, message: '' }).success, false);
  assert.equal(contactSchema.safeParse({ ...contact, phone: undefined }).success, true);
});

test('contact mail goes only to CONTACT_EMAIL and names the program', () => {
  assert.equal(staffRecipient('contact', {}), null);
  assert.equal(staffRecipient('contact', { CONTACT_EMAIL: 'staff@example.com' }), 'staff@example.com');
  const parsed = contactSchema.parse(contact);
  assert.match(buildMail(parsed, 'staff@example.com').subject, /Kids/);
});

test('volunteer requests need the Code of Conduct acknowledgment; questions and phone are optional', () => {
  const base = { type: 'volunteer', program: 'Meal Makers', name: 'Test Neighbor', email: 'neighbor@example.com', phone: '', message: '' };
  assert.equal(volunteerSchema.safeParse(base).success, false);
  assert.equal(volunteerSchema.safeParse({ ...base, conductAccepted: false }).success, false);
  assert.equal(volunteerSchema.safeParse({ ...base, conductAccepted: true }).success, true);
});

test('every volunteer opportunity routes to the native screen with its id', () => {
  assert.equal(volunteerOpportunities.length, 6);
  for (const item of volunteerOpportunities) {
    assert.equal(volunteerFormTarget(item, true), `/get-involved/volunteer-native?opportunity=${item.id}`);
  }
  assert.ok(existsSync(new URL('../app/(tabs)/get-involved/volunteer-native.tsx', import.meta.url)));
});

test('tour slots are weekdays, 11 a.m. to 4 p.m., not holidays, and 24 hours ahead', () => {
  const now = new Date('2026-10-20T12:00:00');
  assert.equal(tourSlotHour('11 a.m.'), 11);
  assert.equal(tourSlotHour('12 p.m.'), 12);
  assert.equal(tourSlotHour('4 p.m.'), 16);
  assert.equal(tourSlotHour('5 p.m.'), null);
  assert.equal(tourSlotHour('10 a.m.'), null);
  assert.equal(isTourSlotAllowed('2026-10-22', '2 p.m.', now), true);
  assert.equal(isTourSlotAllowed('2026-10-21', '11 a.m.', now), false);
  assert.equal(isTourSlotAllowed('2026-10-21', '2 p.m.', now), true);
  assert.equal(isTourSlotAllowed('2026-10-24', '2 p.m.', now), false);
  assert.equal(isTourSlotAllowed('2026-10-25', '2 p.m.', now), false);
  assert.equal(isTourSlotAllowed('2026-11-11', '2 p.m.', new Date('2026-11-01T09:00:00')), false);
  assert.ok(givingDetails.tourHolidays.includes('2026-11-11'));
});

test('flag is on only when a submit URL is configured', () => {
  assert.equal(nativeFormsEnabled(undefined), false);
  assert.equal(nativeFormsEnabled('  '), false);
  assert.equal(nativeFormsEnabled('https://your-worker.example/api/submit'), false);
  assert.equal(nativeFormsEnabled('https://elevate.workers.dev/api/submit'), true);
});

test('flag off falls back to website forms; flag on points at native routes that exist', () => {
  for (const item of volunteerOpportunities) {
    assert.match(volunteerFormTarget(item, false), /^https:\/\/elevatebranson\.org\//);
  }
  assert.match(tourFormTarget(false), /^https:\/\/elevatebranson\.org\//);
  assert.match(contactFormTarget(false), /^https:\/\/elevatebranson\.org\//);

  const routes = [tourFormTarget(true), contactFormTarget(true), volunteerFormTarget(volunteerOpportunities[0], true)];
  for (const href of routes) {
    const path = href.split('?')[0];
    const group = path.startsWith('/more/') ? 'more' : 'get-involved';
    const file = new URL(`../app/(tabs)/${group}/${path.split('/').pop()}.tsx`, import.meta.url);
    assert.ok(existsSync(file), href);
  }
});
