import { runPushAction, type PushFields } from '@/push/action';
import { pushMemory } from '@/server/pushMemory';

export async function POST(request: Request) {
  const fields = await readFields(request);
  const result = await runPushAction(fields, pushMemory, Date.now());
  if (!result.ok) {
    return Response.json({ ok: false, message: result.message }, { status: result.status });
  }
  return Response.json({ ok: true, message: result.message, preview: result.preview ?? false, count: result.count ?? 0 });
}

async function readFields(request: Request): Promise<PushFields> {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    return {
      secret: stringField(body.secret),
      title: stringField(body.title),
      body: stringField(body.body),
      topic: stringField(body.topic),
      mode: stringField(body.mode) || 'send',
      confirmed: body.confirmed === true || body.confirmed === 'true' || body.confirmed === 'on',
      testToken: stringField(body.testToken),
    };
  } catch {
    return { secret: '', title: '', body: '', topic: '', mode: 'send', confirmed: false, testToken: '' };
  }
}

function stringField(value: unknown): string {
  return typeof value === 'string' ? value : '';
}
