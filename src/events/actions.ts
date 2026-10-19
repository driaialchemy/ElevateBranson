import { Platform, Share } from 'react-native';

import type { CalendarEvent } from '@/content/types';

import { allDayWindow, eventPath, eventTimeZone, reminderInstant, shareText } from '@/events/schedule';

export type ActionResult = {
  ok: boolean;
  message: string;
};

export async function addEventToCalendar(event: CalendarEvent): Promise<ActionResult> {
  const window = allDayWindow(event.startsOn);
  if (!window) {
    return { ok: false, message: 'This event needs a real date before it can be added to a calendar.' };
  }
  if (Platform.OS === 'web') {
    return { ok: false, message: 'Adding to a calendar works in the Elevate Branson app on a phone.' };
  }
  try {
    const Calendar = await import('expo-calendar');
    const permission = await Calendar.requestCalendarPermissions(true);
    if (permission.status !== 'granted') {
      return { ok: false, message: 'Calendar access stays off until you allow it in the phone settings.' };
    }
    const calendar = await writableCalendar(Calendar);
    if (!calendar) {
      return { ok: false, message: 'No calendar on this phone can accept a new event.' };
    }
    await calendar.createEvent({
      title: event.title,
      startDate: window.start,
      endDate: window.end,
      allDay: true,
      location: event.location,
      notes: event.summary,
      timeZone: eventTimeZone,
    });
    return { ok: true, message: 'Added to your calendar.' };
  } catch {
    return { ok: false, message: 'This event could not be added to the calendar.' };
  }
}

export async function remindAboutEvent(event: CalendarEvent, now = new Date()): Promise<ActionResult> {
  const when = reminderInstant(event.startsOn, now);
  if (!when) {
    return { ok: false, message: 'That morning has already passed, so a reminder would be too late.' };
  }
  if (Platform.OS === 'web') {
    return { ok: false, message: 'Reminders work in the Elevate Branson app on a phone.' };
  }
  try {
    const Notifications = await import('expo-notifications');
    const current = await Notifications.getPermissionsAsync();
    const status = current.status === 'granted' ? current.status : (await Notifications.requestPermissionsAsync()).status;
    if (status !== 'granted') {
      return { ok: false, message: 'Reminders stay off until you allow notifications in the phone settings.' };
    }
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('event-reminders', {
        name: 'Event reminders',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
    const identifier = `event-${event.id}`;
    await Notifications.cancelScheduledNotificationAsync(identifier).catch(() => undefined);
    await Notifications.scheduleNotificationAsync({
      identifier,
      content: {
        title: event.title,
        body: `${event.startsOn}. ${event.location}`,
        data: { href: eventPath(event.id) },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: when,
        channelId: 'event-reminders',
      },
    });
    return { ok: true, message: 'A reminder is set for 9:00 a.m. Central Time that morning.' };
  } catch {
    return { ok: false, message: 'A reminder could not be set on this phone.' };
  }
}

export async function shareEvent(event: CalendarEvent): Promise<ActionResult> {
  try {
    const result = await Share.share({ message: shareText(event), title: event.title });
    if (result.action === Share.dismissedAction) {
      return { ok: true, message: '' };
    }
    return { ok: true, message: '' };
  } catch {
    return { ok: false, message: 'Sharing is not available on this device.' };
  }
}

async function writableCalendar(Calendar: typeof import('expo-calendar')) {
  if (Platform.OS === 'ios') {
    try {
      return Calendar.getDefaultCalendarSync();
    } catch {
      // Fall through to the calendar list.
    }
  }
  const calendars = await Calendar.getCalendars(Calendar.EntityTypes.EVENT);
  return calendars.find((item) => item.allowsModifications && item.isPrimary) ?? calendars.find((item) => item.allowsModifications);
}
