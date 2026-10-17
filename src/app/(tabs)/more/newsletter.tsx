import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { latestNews, pageCopy } from '@/content/cache';

export default function NewsletterScreen() {
  const page = pageCopy('newsletter');

  return (
    <Screen>
      <Card body={latestNews.body} title={latestNews.title} />
      <Card body={page.body} />
    </Screen>
  );
}
