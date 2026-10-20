import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';
import { openExternal } from '@/components/openLink';
import { latestNewsletter } from '@/content/query';

export default function MediaScreen() {
  const { data } = useContent();
  const latest = latestNewsletter(data.newsletters);
  const episodes = [...(data.episodes ?? [])].sort((a, b) => (b.publishedOn ?? '').localeCompare(a.publishedOn ?? ''));
  return <Screen><ContentNotice /><SectionHeader label="Media" />
    <SectionHeader label="Newsletters" />
    {latest ? <Card title="Latest newsletter" body={`${latest.title} · ${latest.publishedOn}`} /> : null}
    {[...data.newsletters].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn)).map((issue) => <Button key={issue.id} label={`${issue.title} · ${issue.publishedOn}`} onPress={() => openExternal(issue.url)} />)}
    <SectionHeader label="In Pursuit Of Community" />
    {episodes.length ? episodes.map((episode) => <Button key={episode.id} label={`${episode.title}${episode.publishedOn ? ` · ${episode.publishedOn}` : ''}`} onPress={() => openExternal(episode.url)} />) : <Button label="Open podcast on Elevate Branson" onPress={() => openExternal('https://elevatebranson.org/podcast/')} />}
    <SectionHeader label="Videos" />
    {(data.videos ?? []).length ? (data.videos ?? []).map((video) => <Button key={video.id} label={video.title} onPress={() => openExternal(video.url)} />) : <Button label="Watch Elevate Branson videos" onPress={() => openExternal('https://elevatebranson.org/videos/')} />}
    <SectionHeader label="Press Releases" />
    <Button label="Read Press Releases" onPress={() => openExternal('https://elevatebranson.org/press-releases/')} />
  </Screen>;
}
