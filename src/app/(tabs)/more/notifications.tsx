import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { enablePush, savedToken, savedTopics, saveTopics } from '@/notifications/device';
import { readInbox } from '@/notifications/inboxStore';
import { pushDecidedKey } from '@/notifications/PushOffer';
import type { InboxNote } from '@/push/inbox';
import { topicLabels, topics, type Topic } from '@/push/topics';
import { tokens } from '@/theme/tokens';

export default function NotificationsScreen() {
  const [chosen, setChosen] = useState<Topic[]>([...topics]);
  const [notes, setNotes] = useState<InboxNote[]>([]);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    void savedTopics().then(setChosen);
    void readInbox().then(setNotes);
    void savedToken().then(setToken);
  }, []);

  function toggle(topic: Topic) {
    const next = chosen.includes(topic) ? chosen.filter((item) => item !== topic) : [...chosen, topic];
    setChosen(next);
    void saveTopics(next);
  }

  return (
    <Screen>
      <Card
        body="A note can tell you when the newsletter, an event, a program, a giving need, or the housing list changes. Your name is not stored with the phone token. You can turn each topic off, or turn them all off."
        title="Notes on this phone"
      />
      {topics.map((topic) => (
        <View key={topic} style={{ alignItems: 'center', flexDirection: 'row', gap: tokens.space.md, minHeight: tokens.tapTarget }}>
          <Switch
            accessibilityLabel={topicLabels[topic]}
            onValueChange={() => toggle(topic)}
            thumbColor={tokens.color.surface}
            trackColor={{ false: tokens.color.border, true: tokens.color.primary }}
            value={chosen.includes(topic)}
          />
          <Text
            style={{
              color: tokens.color.text,
              flex: 1,
              fontFamily: tokens.font.family.body,
              fontSize: tokens.font.size.body,
              lineHeight: tokens.font.lineHeight.body,
            }}>
            {topicLabels[topic]}
          </Text>
        </View>
      ))}
      <Button
        label="Turn on notifications"
        onPress={() => {
          void enablePush(chosen).then(async (result) => {
            await AsyncStorage.setItem(pushDecidedKey, 'yes');
            if ('token' in result) {
              setToken(result.token);
              setMessage('Notifications are on. Our coordinator will use them for the topics you left on.');
              return;
            }
            setMessage(result.error);
          });
        }}
      />
      <Button
        label="Turn off all notes"
        onPress={() => {
          setChosen([]);
          void saveTopics([]);
          void AsyncStorage.setItem(pushDecidedKey, 'no');
          setMessage('All topics are off. This phone will not get new notes.');
        }}
      />
      {message ? <Card body={message} title="Notifications" /> : null}
      {token ? <Card body={token} title="Phone token for a test send" /> : null}
      {notes.length === 0 ? (
        <EmptyState body="Notes you receive will be listed here." title="Inbox" />
      ) : (
        notes.map((note) => (
          <ListItem detail={note.body} href={note.href} icon="notifications-outline" key={note.id} label={note.title} />
        ))
      )}
    </Screen>
  );
}
