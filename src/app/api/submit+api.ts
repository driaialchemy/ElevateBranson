import { handleSubmit } from '@/server/handleSubmit';

const store = new Map<string, number[]>();

export function OPTIONS(request: Request) {
  return handleSubmit(request, { env: serverEnv(), store });
}

export function POST(request: Request) {
  return handleSubmit(request, { env: serverEnv(), store });
}

function serverEnv() {
  return {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
    VOLUNTEER_COORDINATOR_EMAIL: process.env.VOLUNTEER_COORDINATOR_EMAIL,
    TOUR_CONTACT_EMAIL: process.env.TOUR_CONTACT_EMAIL,
    PRAYER_TEAM_EMAIL: process.env.PRAYER_TEAM_EMAIL,
  };
}
