import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';

export default function AboutScreen() {
  const { data } = useContent();

  return (
    <Screen>
      <ContentNotice />
      <Card body={data.siteSettings.mission} title="Mission" />
      <Card body={data.siteSettings.vision} title="Vision" />
    </Screen>
  );
}
