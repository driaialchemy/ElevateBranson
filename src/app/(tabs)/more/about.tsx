import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { Hero } from '@/components/Hero';
import { ListRow } from '@/components/ListRow';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';
import { AnimatedStatRow } from '@/components/AnimatedStatRow';
import { aboutStats, charityNavigatorUrl } from '@/content/aboutMedia';
import { Button } from '@/components/Button';
import { FAQAccordion } from '@/components/FAQAccordion';
import { openExternal } from '@/components/openLink';
import { aboutFaq, communityIssues, coreValues, recommendedBooks } from '@/content/aboutMedia';

export default function AboutScreen() {
  const { data } = useContent();
  const hero = data.homeSections?.find((section) => section.id === 'hero');
  const donateLabel = data.siteSettings.donateLabel || 'DONATE NOW';

  return (
    <Screen>
      <ContentNotice />

      {hero?.imageKey ? (
        <Hero
          alt={hero.imageAlt || hero.title}
          imageKey={hero.imageKey}
          subtitle={hero.body}
          title={hero.title}
        />
      ) : null}
      <SectionHeader label="Learn More" />
      <AnimatedStatRow items={aboutStats} />
      <SectionHeader label="Community Issues" />
      {communityIssues.map((issue) => <Card key={issue.title} title={issue.title} body={issue.body} />)}
      <Button label="Charity Navigator four-star profile" onPress={() => openExternal(charityNavigatorUrl)} />
      <SectionHeader label="About Elevate Branson" />
      {data.siteSettings.mission ? <Card body={data.siteSettings.mission} title="Mission" /> : null}
      {data.siteSettings.vision ? <Card body={data.siteSettings.vision} title="Vision" /> : null}
      <SectionHeader label="Core Values" />
      {coreValues.map((value, index) => <Card key={value} title={`Value ${index + 1}`} body={value} />)}
      <Card title="Our Philosophy" body="We disempower people when we do for them what they have the ability to do for themselves. Equal exchange honors the gifts, time, and relationships neighbors bring." />
      <SectionHeader label="Recommended Books" />
      {recommendedBooks.map((book) => <Card key={book} title={book} body="Recommended by Elevate Branson." />)}
      <SectionHeader label="Frequently Asked Questions" />
      <FAQAccordion items={[...aboutFaq]} />
      <ListRow href="/page/learn-more" icon="information-circle-outline" label="Learn More" />
      <ListRow href="/page/mission-and-vision" icon="heart-outline" label="Mission and Vision" />
      <ListRow href="/page/organizational-history" icon="time-outline" label="Organizational History" />
      <ListRow href="/page/frequently-asked-questions" icon="help-circle-outline" label="Frequently Asked Questions" />
      <ListRow href="/page/financials" icon="document-text-outline" label="Financials" />
      <ListRow href="/more/neighbors" icon="people-outline" label="Meet Our Neighbors" />
      <ListRow href="/more/find-us" icon="location-outline" label="Find Us" />
      <ListRow href="/more/newsletter" icon="newspaper-outline" label="Newsletter" />
    </Screen>
  );
}
