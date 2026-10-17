import { Card } from '@/components/Card';
import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { pageCopy } from '@/content/cache';

export default function AboutScreen() {
  const page = pageCopy('about');

  return (
    <Screen>
      <Card body={page.body} />
      <ListItem detail="Address, map, and phone." href="/more/find-us" label="Find Us" />
      <ListItem detail="The newest update." href="/more/newsletter" label="Newsletter" />
    </Screen>
  );
}
