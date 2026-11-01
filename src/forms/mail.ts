import type { Submission } from '@/forms/schema';

export type ServerEnv = {
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  VOLUNTEER_COORDINATOR_EMAIL?: string;
  TOUR_CONTACT_EMAIL?: string;
  PRAYER_TEAM_EMAIL?: string;
  PRAYER_TO_EMAIL?: string;
  CONTACT_EMAIL?: string;
  NEWSLETTER_TO_EMAIL?: string;
};

export type OutboundMail = {
  to: string;
  subject: string;
  text: string;
};

const recipientKey = {
  volunteer: 'VOLUNTEER_COORDINATOR_EMAIL',
  tour: 'TOUR_CONTACT_EMAIL',
  prayer: 'PRAYER_TO_EMAIL',
  contact: 'CONTACT_EMAIL',
  newsletter: 'NEWSLETTER_TO_EMAIL',
} as const;

export function staffRecipient(type: Submission['type'], env: ServerEnv): string | null {
  const named = type === 'prayer' ? env.PRAYER_TO_EMAIL?.trim() || env.PRAYER_TEAM_EMAIL?.trim() : env[recipientKey[type]]?.trim();
  const value = named ?? '';
  if (!value || value.toLowerCase().endsWith('@example.org')) {
    return null;
  }
  return value;
}

export function mailReady(env: ServerEnv): boolean {
  const key = env.RESEND_API_KEY?.trim() ?? '';
  return key.length > 0 && key !== 're_placeholder';
}

export function buildMail(submission: Submission, to: string): OutboundMail {
  if (submission.type === 'volunteer') {
    return {
      to,
      subject: 'Volunteer request',
      text: [
        `Program: ${submission.program}`,
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Phone: ${blank(submission.phone)}`,
        'Code of Conduct: acknowledged',
        '',
        blank(submission.message),
      ].join('\n'),
    };
  }
  if (submission.type === 'contact') {
    return {
      to,
      subject: `Contact: ${submission.program}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Phone: ${blank(submission.phone)}`,
        `Program: ${submission.program}`,
        '',
        submission.message,
      ].join('\n'),
    };
  }
  if (submission.type === 'newsletter') {
    return {
      to,
      subject: 'Mailing list signup',
      text: [`Name: ${blank(submission.name)}`, `Email: ${submission.email}`].join('\n'),
    };
  }
  if (submission.type === 'tour') {
    return {
      to,
      subject: 'Tour request',
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone}`,
        `People: ${submission.groupSize}`,
        `Preferred times: ${submission.preferred}`,
        `Details: ${blank(submission.details)}`,
      ].join('\n'),
    };
  }
  return {
    to,
    subject: 'Prayer request',
    text: [
      `Name: ${blank(submission.name)}`,
      `Contact: ${blank(submission.contact)}`,
      `Share publicly: ${submission.sharePublicly ? 'yes' : 'no'}`,
      '',
      submission.request,
    ].join('\n'),
  };
}

function blank(value: string | undefined): string {
  const trimmed = value?.trim() ?? '';
  return trimmed.length > 0 ? trimmed : 'Not given';
}
