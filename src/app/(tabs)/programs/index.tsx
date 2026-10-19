import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';

export default function ProgramsScreen() {
  const { data } = useContent();

  return (
    <Screen>
      <ContentNotice />
      <SectionHeader label="Programs" />
      <Card body="These programs are published on the Elevate Branson website." />
      {data.programs.map((program) => (
        <Card
          alt={program.imageAlt}
          body={program.summary}
          href={`/programs/${program.slug}`}
          imageKey={program.imageKey}
          key={program.slug}
          title={program.name}
        />
      ))}
    </Screen>
  );
}
