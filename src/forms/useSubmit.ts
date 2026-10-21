import { useState } from 'react';
import type { z } from 'zod';

import { deliverForm } from '@/forms/deliver';
import { fieldErrors, type Submission } from '@/forms/schema';
import { useNetwork } from '@/network/NetworkProvider';

/** Validates, delivers, and keeps the confirmation text. Never logs the form body. */
export function useSubmit<T extends Submission>(schema: z.ZodType<T, z.ZodTypeDef, unknown>) {
  const { online } = useNetwork();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState(false);

  async function submit(input: unknown, extraErrors: Record<string, string> = {}) {
    const parsed = schema.safeParse(input);
    const problems = { ...(parsed.success ? {} : fieldErrors(parsed.error)), ...extraErrors };
    if (!parsed.success || Object.keys(extraErrors).length > 0) {
      setErrors(problems);
      return;
    }
    setErrors({});
    setPending(true);
    try {
      setNotice(await deliverForm(parsed.data, online));
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'Please try again.' });
    } finally {
      setPending(false);
    }
  }

  return { errors, notice, pending, submit };
}
