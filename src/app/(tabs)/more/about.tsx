import { BrandImage } from '@/components/BrandImage';
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
      <BrandImage
        alt={data.homeSections?.find((section) => section.id === 'hero')?.imageAlt || 'Elevate Branson'}
        imageKey={data.homeSections?.find((section) => section.id === 'hero')?.imageKey}
      />
      <Card body={data.siteSettings.mission} title="Mission" />
      <Card body={data.siteSettings.vision} title="Vision" />
      <ListItem href="/more/find-us" icon="location-outline" label="Find Us" />
      <ListItem href="/more/newsletter" icon="newspaper-outline" label="Newsletter" />
    </Screen>
  );
}
