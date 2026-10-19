import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { noteFromContent, rememberNote } from '@/notifications/inboxStore';
import { isOpenableHref } from '@/events/schedule';

export function NotificationListener() {
  const router = useRouter();

  useEffect(() => {
    let remove = () => {};
    void import('expo-notifications')
      .then((Notifications) => {
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldPlaySound: false,
            shouldSetBadge: false,
            shouldShowAlert: true,
            shouldShowBanner: true,
            shouldShowList: true,
          }),
        });
        const received = Notifications.addNotificationReceivedListener((event) => {
          const note = noteFromContent(event.request.content);
          if (note) {
            void rememberNote(note);
          }
        });
        const opened = Notifications.addNotificationResponseReceivedListener((response) => {
          const content = response.notification.request.content;
          const note = noteFromContent(content);
          if (note) {
            void rememberNote(note);
          }
          const href = typeof content.data?.href === 'string' ? content.data.href : '';
          if (isOpenableHref(href)) {
            router.push(href);
          }
        });
        remove = () => {
          received.remove();
          opened.remove();
        };
      })
      .catch(() => {});
    return () => remove();
  }, [router]);

  return null;
}
