import { buildMail, mailReady, staffRecipient, type OutboundMail, type ServerEnv } from '@/forms/mail';
import { allowRequest } from '@/forms/rateLimit';
import { isHoneypot, sentCopy, submissionSchema } from '@/forms/schema';

export type SendEmail = (mail: OutboundMail, env: ServerEnv) => Promise<void>;

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function clientIp(request: Request): string {
  const cloudflare = request.headers.get('cf-connecting-ip')?.trim();
  if (cloudflare) {
    return cloudflare;
  }
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || 'unknown';
}

export async function sendWithResend(mail: OutboundMail, env: ServerEnv): Promise<void> {
  const from = env.RESEND_FROM?.trim() || 'Elevate Branson <onboarding@resend.dev>';
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
    }),
  });
  if (!response.ok) {
    throw new Error('mail-failed');
  }
}

export async function handleSubmit(
  request: Request,
  options: {
    env: ServerEnv;
    sendEmail?: SendEmail;
    now?: number;
    store?: Map<string, number[]>;
  },
): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: jsonHeaders });
  }
  if (request.method !== 'POST') {
    return respond(405, { ok: false, message: 'Please try again.' });
  }

  const store = options.store ?? new Map<string, number[]>();
  const now = options.now ?? Date.now();
  if (!allowRequest(store, clientIp(request), now)) {
    return respond(429, { ok: false, message: 'Please wait a few minutes and try again.' });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return respond(400, { ok: false, message: 'Please check the form.' });
  }

  if (isHoneypot(body)) {
    return respond(200, { ok: true, message: sentCopy.volunteer });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return respond(400, { ok: false, message: 'Please check the form.' });
  }

  const to = staffRecipient(parsed.data.type, options.env);
  if (!to || !mailReady(options.env)) {
    return respond(503, { ok: false, message: 'The office inbox is not ready yet.' });
  }

  const send = options.sendEmail ?? sendWithResend;
  try {
    await send(buildMail(parsed.data, to), options.env);
  } catch {
    return respond(502, { ok: false, message: 'We could not send that. Please try again.' });
  }

  return respond(200, { ok: true, message: sentCopy[parsed.data.type] });
}

function respond(status: number, body: { ok: boolean; message: string }): Response {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}
