import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';

export default function AboutScreen() {
  const { data } = useContent();

  return (
    <Screen>
      <ContentNotice />
      <Card body={data.siteSettings.mission} title="Mission" />
      <Card body={data.siteSettings.vision} title="Vision" />
      <ListItem href="/more/find-us" label="Find Us" />
      <ListItem href="/more/newsletter" label="Newsletter" />
    </Screen>
  );
}
