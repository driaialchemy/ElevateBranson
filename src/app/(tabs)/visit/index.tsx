import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';

const places = [
  ['facility-rentals', 'Facility Rentals', '/page/facility-rentals'],
  ['elevate-cafe-and-coffee', 'Cafe and Coffee', '/programs/coffee'],
  ['elevate-thrift-store', 'Thrift Store', '/programs/thrift'],
  ['elevate-playground', 'Playground', '/programs/playground'],
] as const;

export default function VisitScreen() {
  const { data } = useContent();
  const pages = data.pages ?? [];
  return <Screen><ContentNotice /><SectionHeader label="Visit Elevate Branson" />{places.map(([slug, title, href]) => {
    const page = pages.find((item) => item.slug === slug);
    const program = data.programs.find((item) => item.slug === (slug === 'elevate-cafe-and-coffee' ? 'coffee' : slug === 'elevate-thrift-store' ? 'thrift' : slug === 'elevate-playground' ? 'playground' : ''));
    return <Card key={slug} title={title} body={page?.summary ?? program?.summary ?? ''} imageUrl={page?.heroImage?.url} alt={page?.heroImage?.alt ?? title} imageKey={program?.imageKey} href={href} />;
  })}</Screen>;
}
