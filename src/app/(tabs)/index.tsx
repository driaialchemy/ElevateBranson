import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, useWindowDimensions, View } from 'react-native';

import { ActionTile } from '@/components/ActionTile';
import { BrandImage } from '@/components/BrandImage';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HoursBlock } from '@/components/HoursBlock';
import { ListRow } from '@/components/ListRow';
import { openHref } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { SeasonalBanner } from '@/components/SeasonalBanner';
import { SectionHeader } from '@/components/SectionHeader';
import { StatTile } from '@/components/StatTile';
import { useContent } from '@/content/client';
import { hoursFor, latestNewsletter } from '@/content/query';
import { homeQuickActions } from '@/navigation/map';
import { tokens } from '@/theme/tokens';

const actionIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  '/get-involved/give': 'heart-outline',
  '/get-involved/volunteer': 'people-outline',
  '/get-involved/tour': 'walk-outline',
  '/get-involved/prayer': 'chatbubble-ellipses-outline',
  '/more/find-us': 'location-outline',
  '/more/newsletter': 'newspaper-outline',
  '/events': 'calendar-outline',
  '/more/resources': 'library-outline',
};

const socialIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Facebook: 'logo-facebook',
  Instagram: 'logo-instagram',
  X: 'logo-twitter',
  LinkedIn: 'logo-linkedin',
};

export default function HomeScreen() {
  const { data } = useContent();
  const hero = data.homeSections?.find((section) => section.id === 'hero');
  const stories = data.homeSections?.filter((section) => section.id !== 'hero') ?? [];
  const issue = latestNewsletter(data.newsletters);
  const campus = hoursFor(data, 'campus');
  const donateLabel = data.siteSettings.donateLabel || 'DONATE NOW';
  const stackedStats = useWindowDimensions().width < 520;
  const darkSections = new Set(['facts', 'difference', 'plan']);

  return (
    <Screen>
      <ContentNotice />
      <SeasonalBanner notice={data.seasonalNotice} />
      <Header donateHref="/get-involved/give" donateLabel={donateLabel} />
      {hero ? (
        <Hero
          actionHref={hero.actions[0]?.href}
          actionLabel={hero.actions[0]?.label}
          alt={hero.imageAlt || hero.title}
          imageKey={hero.imageKey || 'hero'}
          subtitle={hero.body}
          title={hero.title}
        />
      ) : null}
      {data.homeStats && data.homeStats.length > 0 ? (
        <View style={{ flexDirection: stackedStats ? 'column' : 'row', gap: tokens.space.sm }}>
          {data.homeStats.map((stat) => (
            <StatTile key={stat.id} label={stat.label} value={stat.value} />
          ))}
        </View>
      ) : null}
      {stories.map((section) => {
        const onDark = darkSections.has(section.id);
        return (
          <View
            key={section.id}
            style={{
              backgroundColor: onDark ? tokens.color.primary : undefined,
              borderRadius: onDark ? tokens.radius : 0,
              gap: tokens.space.sm,
              marginHorizontal: onDark ? -tokens.space.md : 0,
              padding: onDark ? tokens.space.md : 0,
            }}>
            {section.eyebrow ? <SectionHeader label={section.eyebrow} onDark={onDark} /> : null}
            {section.title ? (
              <Text
                style={{
                  color: onDark ? tokens.color.onPrimary : tokens.color.text,
                  fontFamily: tokens.font.family.heading,
                  fontSize: tokens.font.size.header,
                  lineHeight: tokens.font.lineHeight.header,
                }}>
                {section.title}
              </Text>
            ) : null}
            {section.id === 'difference' && section.imageKey ? (
              <BrandImage alt={section.imageAlt || section.eyebrow} imageKey={section.imageKey} />
            ) : null}
            {section.body ? (
              <Text
                style={{
                  color: onDark ? tokens.color.onPrimary : tokens.color.text,
                  fontFamily: tokens.font.family.body,
                  fontSize: tokens.font.size.body,
                  lineHeight: tokens.font.lineHeight.body,
                }}>
                {section.body}
              </Text>
            ) : null}
            {section.actions.map((action) => (
              <Button
                key={action.label}
                label={action.label}
                onPress={() => openHref(action.href)}
                variant={onDark ? 'secondary' : action.href.includes('give') || action.href.includes('donate') ? 'donate' : 'primary'}
              />
            ))}
            {section.id !== 'difference' && section.imageKey ? (
              <BrandImage alt={section.imageAlt || section.eyebrow} imageKey={section.imageKey} />
            ) : null}
          </View>
        );
      })}
      <SectionHeader label="Ways to help" />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space.sm }}>
        {homeQuickActions.map((action) => (
          <ActionTile
            href={action.href}
            icon={actionIcons[action.href] ?? 'ellipse-outline'}
            key={action.href}
            label={action.label}
          />
        ))}
      </View>
      <Card
        body={issue ? `${issue.title}. Published ${issue.publishedOn}.` : 'No newsletter has been published in the app yet.'}
        title="Newest newsletter"
      />
      {issue ? <ListRow href="/more/newsletter" icon="newspaper-outline" label="Read the newsletter" /> : null}
      <SectionHeader label="Visit" />
      {campus ? <HoursBlock hours={campus} /> : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space.sm }}>
        {data.siteSettings.socialLinks.map((link) => (
          <ActionTile
            href={link.url}
            icon={socialIcons[link.label] ?? 'globe-outline'}
            key={link.url}
            label={link.label}
          />
        ))}
      </View>
      {data.siteSettings.mailingListUrl && data.siteSettings.mailingListLabel ? (
        <Button
          label={data.siteSettings.mailingListLabel}
          onPress={() => openHref(data.siteSettings.mailingListUrl || '')}
          variant="secondary"
        />
      ) : null}
      <ListRow href="/more/privacy" icon="lock-closed-outline" label="Privacy" />
    </Screen>
  );
}
