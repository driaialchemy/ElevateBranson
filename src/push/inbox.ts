export type InboxNote = {
  id: string;
  title: string;
  body: string;
  href: string;
  receivedAt: string;
};

export function addInboxNote(notes: InboxNote[], note: InboxNote): InboxNote[] {
  const rest = notes.filter((item) => item.id !== note.id);
  return [note, ...rest].slice(0, 50);
}
