import { runPushAction, type PushFields } from '@/push/action';
import { staffPage } from '@/push/staffPage';
import { pushMemory } from '@/server/pushMemory';

export function GET() {
  return html(staffPage({}));
}

export async function POST(request: Request) {
  const fields = await readForm(request);
  if (fields.mode === 'preview') {
    const result = await runPushAction(fields, pushMemory, Date.now());
    if (!result.ok) {
      return html(staffPage({ error: result.message, previewTitle: fields.title, previewBody: fields.body, previewTopic: fields.topic }), result.status);
    }
    return html(
      staffPage({
        previewTitle: fields.title,
        previewBody: fields.body,
        previewTopic: fields.topic,
        message: result.message,
      }),
    );
  }
  const result = await runPushAction(fields, pushMemory, Date.now());
  if (!result.ok) {
    return html(
      staffPage({
        error: result.message,
        previewTitle: fields.title,
        previewBody: fields.body,
        previewTopic: fields.topic,
      }),
      result.status,
    );
  }
  return html(staffPage({ message: result.message, previewTitle: fields.title, previewBody: fields.body, previewTopic: fields.topic }));
}

function html(markup: string, status = 200) {
  return new Response(markup, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

async function readForm(request: Request): Promise<PushFields> {
  try {
    const params = new URLSearchParams(await request.text());
    const confirmed = params.get('confirmed');
    return {
      secret: params.get('secret') ?? '',
      title: params.get('title') ?? '',
      body: params.get('body') ?? '',
      topic: params.get('topic') ?? '',
      mode: params.get('mode') ?? 'preview',
      confirmed: confirmed === 'on' || confirmed === 'true',
      testToken: params.get('testToken') ?? '',
    };
  } catch {
    return { secret: '', title: '', body: '', topic: 'all', mode: 'preview', confirmed: false, testToken: '' };
  }
}
