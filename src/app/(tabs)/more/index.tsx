import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
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
} as const;

export default function MoreScreen() {
  return (
    <Screen>
      {moreLinks.map((item) => (
        <ListItem detail={item.detail} href={item.href} icon={icons[item.href]} key={item.href} label={item.label} />
      ))}
    </Screen>
  );
}
