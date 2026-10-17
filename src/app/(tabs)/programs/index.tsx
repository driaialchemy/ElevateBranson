import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';

export default function ProgramsScreen() {
  const { data } = useContent();

  return (
    <Screen>
      <ContentNotice />
      <Card body="These programs are published on the Elevate Branson website." />
      {data.programs.map((program) => (
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
