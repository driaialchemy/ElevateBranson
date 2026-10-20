import { ListItem } from '@/components/ListItem';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { moreLinks } from '@/navigation/map';

const icons = {
  '/get-involved/give': 'heart-outline',
  '/more/about': 'information-circle-outline',
  '/more/find-us': 'location-outline',
  '/more/resources': 'library-outline',
  '/more/social': 'globe-outline',
  '/more/website': 'globe-outline',
  '/more/newsletter': 'newspaper-outline',
  '/more/notifications': 'notifications-outline',
  '/more/privacy': 'lock-closed-outline',
  '/events': 'calendar-outline',
} as const;

export default function MoreScreen() {
  const { data } = useContent();
  return (
    <Screen>

      {(data.pages ?? []).filter((page) => ['about', 'media', 'contact'].includes(page.section) && !page.slug.startsWith('forms-')).map((page) => (
        <Card key={page.slug} title={page.title} body={page.summary} imageUrl={page.heroImage?.url} alt={page.heroImage?.alt} href={`/page/${page.slug}`} />
      ))}
      {moreLinks.map((item) => (
        <ListItem detail={item.detail} href={item.href} icon={icons[item.href]} key={item.href} label={item.label} />
      ))}
    </Screen>
  );
}
