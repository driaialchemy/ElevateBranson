import { Card } from '@/components/Card';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';

export default function ProgramsScreen() {
  const { data } = useContent();
  const donateLabel = data.siteSettings.donateLabel || 'DONATE NOW';

  return (
    <Screen>
      <ContentNotice />

      <SectionHeader label="Programs" />
      {data.programs.length === 0 ? (
        <ComingSoon phone={data.siteSettings.phone} />
      ) : (
        data.programs.map((program) => (
          <Card
            alt={program.imageAlt}
            body={program.summary}
            href={`/programs/${program.slug}`}
            imageKey={program.imageKey}
            key={program.slug}
            title={program.name}
          />
        ))
      )}
    </Screen>
  );
}
