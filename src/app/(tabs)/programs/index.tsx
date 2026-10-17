import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { pageCopy, programs } from '@/content/cache';
import { Card } from '@/components/Card';

export default function ProgramsScreen() {
  const page = pageCopy('programs');

  return (
    <Screen>
      <Card body={page.body} />
      {programs.map((program) => (
        <ListItem
          detail={program.summary}
          href={`/programs/${program.slug}`}
          key={program.slug}
          label={program.name}
        />
      ))}
    </Screen>
  );
}
