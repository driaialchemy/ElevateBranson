import { tokens } from '@/theme/tokens';
import { topicLabels, topics } from '@/push/topics';

export function staffPage(input: {
  previewTitle?: string;
  previewBody?: string;
  previewTopic?: string;
  message?: string;
  error?: string;
}): string {
  const preview =
    input.previewTitle && input.previewBody
      ? `<section><h2>Preview</h2><p><strong>${escapeHtml(input.previewTitle)}</strong></p><p>${escapeHtml(input.previewBody)}</p><p>Topic: ${escapeHtml(input.previewTopic ?? 'all')}</p></section>`
      : '';
  const notice = input.error
    ? `<p role="alert">${escapeHtml(input.error)}</p>`
    : input.message
      ? `<p>${escapeHtml(input.message)}</p>`
      : '';
  const choices: ('all' | (typeof topics)[number])[] = ['all', ...topics];
  const topicOptions = choices
    .map((topic) => {
      const label = topic === 'all' ? 'Everyone who left at least one topic on' : topicLabels[topic];
      const selected = input.previewTopic === topic ? ' selected' : '';
      return `<option value="${topic}"${selected}>${escapeHtml(label)}</option>`;
    })
    .join('');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Send a note</title>
  <style>
    body { background: ${tokens.color.background}; color: ${tokens.color.text}; font-family: sans-serif; font-size: 16px; line-height: 24px; margin: 0; padding: 16px; }
    main { max-width: 40rem; }
    label, p, h1, h2 { font-size: 16px; }
    h1 { font-size: 28px; line-height: 36px; }
    input, select, textarea, button { font-size: 16px; min-height: 44px; width: 100%; box-sizing: border-box; }
    button { background: ${tokens.color.primary}; color: ${tokens.color.onPrimary}; border: 0; border-radius: 12px; margin-top: 12px; }
    textarea { min-height: 120px; }
    section { background: ${tokens.color.surface}; border: 1px solid ${tokens.color.border}; border-radius: 12px; padding: 16px; margin: 16px 0; }
  </style>
</head>
<body>
  <main>
    <h1>Send a note</h1>
    <p>This goes to phones that turned notes on. It does not include anyone's name.</p>
    ${notice}
    ${preview}
    <form method="post">
      <label>Staff password<br /><input name="secret" type="password" autocomplete="current-password" /></label>
      <label>Title<br /><input name="title" maxlength="80" value="${escapeHtml(input.previewTitle ?? '')}" /></label>
      <label>Message<br /><textarea name="body" maxlength="180">${escapeHtml(input.previewBody ?? '')}</textarea></label>
      <label>Who receives it<br /><select name="topic">${topicOptions}</select></label>
      <label>Test phone token, only for a test send<br /><input name="testToken" autocomplete="off" /></label>
      <label><input name="confirmed" type="checkbox" style="width:auto" /> I mean to send this now</label>
      <button name="mode" type="submit" value="preview">Show preview</button>
      <button name="mode" type="submit" value="test">Send a test to that phone</button>
      <button name="mode" type="submit" value="send">Send the note</button>
    </form>
  </main>
</body>
</html>`;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
