import { Card } from '@/components/Card';
import { comingSoon } from '@/content/infoScreens';

export function ComingSoon({ phone }: { phone: string }) {
  return <Card body={comingSoon(phone)} />;
}
