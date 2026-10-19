import { z } from 'zod';

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(''));

export const volunteerSchema = z.object({
  type: z.literal('volunteer'),
  program: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: optionalText(40),
  message: z.string().trim().min(1).max(2000),
  company: z.string().optional(),
});

export const tourSchema = z.object({
  type: z.literal('tour'),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  preferred: z.string().trim().min(1).max(500),
  groupSize: z.string().trim().regex(/^\d{1,3}$/),
  company: z.string().optional(),
});

export const prayerSchema = z.object({
  type: z.literal('prayer'),
  request: z.string().trim().min(1).max(2000),
  name: optionalText(120),
  contact: optionalText(200),
  sharePublicly: z.boolean().default(false),
  company: z.string().optional(),
});

export const submissionSchema = z.discriminatedUnion('type', [volunteerSchema, tourSchema, prayerSchema]);

export type VolunteerInput = z.infer<typeof volunteerSchema>;
export type TourInput = z.infer<typeof tourSchema>;
export type PrayerInput = z.infer<typeof prayerSchema>;
export type Submission = z.infer<typeof submissionSchema>;

const fieldCopy: Record<string, string> = {
  program: 'Choose a program.',
  name: 'Enter your name.',
  email: 'Enter a valid email.',
  phone: 'Enter a phone number.',
  message: 'Enter a short message.',
  preferred: 'Enter the days and times that work for you.',
  groupSize: 'Enter the number of people.',
  request: 'Enter your prayer request.',
  contact: 'Enter a shorter way to reach you.',
  form: 'Please check the form.',
};

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (!errors[key]) {
      errors[key] = fieldCopy[key] ?? 'Please check this field.';
    }
  }
  return errors;
}

export function isHoneypot(value: unknown): boolean {
  if (!value || typeof value !== 'object' || !('company' in value)) {
    return false;
  }
  const company = (value as { company?: unknown }).company;
  return typeof company === 'string' && company.trim().length > 0;
}

export const sentCopy = {
  volunteer: 'Our coordinator will reach out.',
  tour: 'Our coordinator will reach out.',
  prayer: 'Our coordinator will reach out if you left a way to reply.',
} as const;

export const queuedCopy =
  'This stays on your phone and will send when the connection returns. Our coordinator will reach out after it sends.';
