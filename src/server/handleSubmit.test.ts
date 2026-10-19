import assert from 'node:assert/strict';
import test from 'node:test';

import type { OutboundMail, ServerEnv } from '../forms/mail.ts';
import { handleSubmit } from './handleSubmit.ts';

const ready: ServerEnv = {
  RESEND_API_KEY: 're_test_key',
  VOLUNTEER_COORDINATOR_EMAIL: 'volunteer@staff.test',
  TOUR_CONTACT_EMAIL: 'tours@staff.test',
  PRAYER_TEAM_EMAIL: 'prayer@staff.test',
};

function post(body: unknown, ip = '203.0.113.10') {
  return new Request('https://staff.example/api/submit', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'cf-connecting-ip': ip },
    body: JSON.stringify(body),
  });
}

const volunteer = {
  type: 'volunteer',
  program: 'Elevate Kids',
  name: 'Test Neighbor',
  email: 'neighbor@example.com',
  phone: '',
  message: 'I can help on Tuesdays.',
  company: '',
};

test('invalid forms are rejected and not emailed', async () => {
  const sent: OutboundMail[] = [];
  const response = await handleSubmit(post({ type: 'volunteer', name: 'Test Neighbor', company: '' }), {
    env: ready,
    now: 1_000,
    store: new Map(),
    sendEmail: async (mail) => {
      sent.push(mail);
    },
  });
  assert.equal(response.status, 400);
  assert.equal(sent.length, 0);
});

test('a honeypot submission looks successful and is not emailed', async () => {
  const sent: OutboundMail[] = [];
  const response = await handleSubmit(post({ ...volunteer, company: 'Acme Bots' }), {
    env: ready,
    now: 1_000,
    store: new Map(),
    sendEmail: async (mail) => {
      sent.push(mail);
    },
  });
  assert.equal(response.status, 200);
  assert.equal(sent.length, 0);
});

test('a volunteer request is emailed only to the coordinator inbox', async () => {
  const sent: OutboundMail[] = [];
  const response = await handleSubmit(post(volunteer), {
    env: ready,
    now: 1_000,
    store: new Map(),
    sendEmail: async (mail) => {
      sent.push(mail);
    },
  });
  const payload = (await response.json()) as { message: string };
  assert.equal(response.status, 200);
  assert.match(payload.message, /coordinator will reach out/);
  assert.equal(sent.length, 1);
  assert.equal(sent[0]?.to, 'volunteer@staff.test');
  assert.equal(sent[0]?.subject, 'Volunteer request');
  assert.match(sent[0]?.text ?? '', /I can help on Tuesdays/);
});

test('a prayer request stays private unless sharing is on', async () => {
  const sent: OutboundMail[] = [];
  await handleSubmit(
    post({
      type: 'prayer',
      request: 'Please pray for steady work.',
      name: '',
      contact: '',
      company: '',
    }),
    {
      env: ready,
      now: 1_000,
      store: new Map(),
      sendEmail: async (mail) => {
        sent.push(mail);
      },
    },
  );
  assert.equal(sent[0]?.to, 'prayer@staff.test');
  assert.match(sent[0]?.text ?? '', /Share publicly: no/);
});

test('placeholder inboxes are not used', async () => {
  const sent: OutboundMail[] = [];
  const response = await handleSubmit(post(volunteer), {
    env: { ...ready, VOLUNTEER_COORDINATOR_EMAIL: 'volunteer@example.org', RESEND_API_KEY: 're_placeholder' },
    now: 1_000,
    store: new Map(),
    sendEmail: async (mail) => {
      sent.push(mail);
    },
  });
  assert.equal(response.status, 503);
  assert.equal(sent.length, 0);
});

test('the sixth request from one address is told to wait', async () => {
  const sent: OutboundMail[] = [];
  const store = new Map<string, number[]>();
  const sendEmail = async (mail: OutboundMail) => {
    sent.push(mail);
  };
  for (let count = 0; count < 5; count += 1) {
    const response = await handleSubmit(post(volunteer), { env: ready, now: 5_000, store, sendEmail });
    assert.equal(response.status, 200);
  }
  const blocked = await handleSubmit(post(volunteer), { env: ready, now: 5_000, store, sendEmail });
  assert.equal(blocked.status, 429);
  assert.equal(sent.length, 5);
});
