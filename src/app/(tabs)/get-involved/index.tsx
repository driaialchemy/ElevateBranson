import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { getInvolvedLinks } from '@/navigation/map';

export default function GetInvolvedScreen() {
  return (
    <Screen>
      {getInvolvedLinks.map((item) => (
        <ListItem detail={item.detail} href={item.href} key={item.href} label={item.label} />
      ))}
    </Screen>
  );
}
