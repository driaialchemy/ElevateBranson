export const offlineMessage =
  "We can't reach Elevate Branson right now. You're seeing saved information.";

export type PageCopy = {
  title: string;
  body: string;
};

const pages: Record<string, PageCopy> = {
  volunteer: {
    title: 'Volunteer',
    body: 'A short form will email the volunteer coordinator. You will choose a program, then leave your name and a way to reach you.',
  },
  prayer: {
    title: 'Prayer request',
    body: 'You can send a prayer request to the prayer team. Your note is private unless you later choose to share it. The form is not active yet.',
  },
  tour: {
    title: 'Schedule a tour',
    body: 'Campus tours are requested on the Elevate Branson website today. An in-app form will be the backup when you are offline.',
  },
  privacy: {
    title: 'Privacy',
    body: 'Prayer requests and volunteer forms collect only what staff need to reply. The app does not keep a copy of what you type in its logs. The website privacy policy is at https://elevatebranson.org/privacy-policy/. That page was written for the website. An update that covers this app is still needed.',
  },
};

export function pageCopy(id: string): PageCopy {
  return (
    pages[id] ?? {
      title: 'Elevate Branson',
      body: 'This page will be filled in from saved content.',
    }
  );
}
