import { registerToken } from '@/push/action';
import { pushMemory } from '@/server/pushMemory';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: 'Please try again.' }, { status: 400 });
  }
  const record = body && typeof body === 'object' ? (body as { token?: unknown; topics?: unknown }) : {};
  const saved = registerToken(
    pushMemory,
    typeof record.token === 'string' ? record.token : '',
    record.topics,
    new Date().toISOString(),
  );
  if (!saved) {
    return Response.json({ ok: false, message: 'This phone could not be registered.' }, { status: 400 });
  }
  return Response.json({ ok: true, topics: saved.topics });
}
