import { Card } from '@/components/Card';
import { View } from 'react-native';
import { ContentNotice } from '@/components/ContentNotice';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';
import type { Page } from '@/content/types';

const slugs = ['meet-our-neighbors', 'meet-our-neighbors--2', 'meet-our-neighbors--3', 'meet-our-neighbors--4'];

export default function NeighborsScreen() {
  const { data } = useContent();
  const pages = slugs.map((slug) => data.pages?.find((page) => page.slug === slug)).filter((page): page is Page => !!page);
  return <Screen><ContentNotice /><SectionHeader label="Meet Our Neighbors" />{pages.map((page) => {
    const buttons = page.blocks.find((block) => block._type === 'buttonRow');
    const gallery = page.blocks.find((block) => block._type === 'imageGallery');
    const stories = buttons?._type === 'buttonRow' ? buttons.buttons.filter((button) => button.label !== 'Read More' && !/^\d+$/.test(button.label) && !/JOIN OUR MAILING LIST|Privacy Policy|Contact Us|Brand Partnership/i.test(button.label)) : [];
    const images = gallery?._type === 'imageGallery' ? gallery.images : [];
    return <View key={page.slug}><SectionHeader label={page.slug === slugs[0] ? 'Stories · Page 1' : `Stories · Page ${slugs.indexOf(page.slug) + 1}`} />{stories.map((story, index) => <Card key={`${story.url}-${index}`} title={story.label} body="Read this neighbor’s story." imageUrl={images[index]?.url} alt={images[index]?.alt ?? story.label} href={story.url} />)}</View>;
  })}</Screen>;
}
