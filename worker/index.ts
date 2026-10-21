import { handleSubmit } from '../src/server/handleSubmit';
import { handleCalendar } from '../src/server/calendar';

const store = new Map<string, number[]>();

type WorkerEnv = {
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  VOLUNTEER_COORDINATOR_EMAIL?: string;
  TOUR_CONTACT_EMAIL?: string;
  PRAYER_TEAM_EMAIL?: string;
  CONTACT_EMAIL?: string;
};

export default {
  fetch(request: Request, env: WorkerEnv) {
    const path = new URL(request.url).pathname;
    if (path !== '/api/submit') {
      if (path === '/api/events') return handleCalendar(request);
      return new Response('Not found', { status: 404 });
    }
    return handleSubmit(request, { env, store });
  },
};
