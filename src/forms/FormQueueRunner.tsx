import { useEffect } from 'react';

import { flushStoredForms } from '@/forms/deliver';
import { useNetwork } from '@/network/NetworkProvider';

export function FormQueueRunner() {
  const { online } = useNetwork();

  useEffect(() => {
    if (online) {
      void flushStoredForms();
    }
  }, [online]);

  return null;
}
