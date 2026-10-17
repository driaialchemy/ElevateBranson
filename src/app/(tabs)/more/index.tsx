import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { moreLinks } from '@/navigation/map';

export default function MoreScreen() {
  return (
    <Screen>
      {moreLinks.map((item) => (
        <ListItem detail={item.detail} href={item.href} key={item.href} label={item.label} />
      ))}
    </Screen>
  );
}
