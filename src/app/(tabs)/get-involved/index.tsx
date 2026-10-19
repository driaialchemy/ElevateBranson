import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { getInvolvedLinks } from '@/navigation/map';

const icons = {
  '/get-involved/volunteer': 'people-outline',
  '/get-involved/tour': 'walk-outline',
  '/get-involved/prayer': 'chatbubble-ellipses-outline',
  '/get-involved/give': 'heart-outline',
  '/get-involved/merch': 'shirt-outline',
} as const;

export default function GetInvolvedScreen() {
  return (
    <Screen>
      {getInvolvedLinks.map((item) => (
        <ListItem detail={item.detail} href={item.href} icon={icons[item.href]} key={item.href} label={item.label} />
      ))}
    </Screen>
  );
}
