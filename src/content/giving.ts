export type GiveOption = { id: string; label: string; hint: string; url: string };

/** Hosted forms listed on elevatebranson.org/donate/ (checked 2026-10-20). The app never takes card numbers. */
export const giveOptions: GiveOption[] = [
  { id: 'donate', label: 'Give a gift', hint: 'One-time or monthly gift.', url: 'https://elevatebranson.z2systems.com/donation.jsp?campaign=1' },
  { id: 'dedicate', label: 'Dedicate a donation', hint: 'Give in honor or memory of someone.', url: 'https://elevatebranson.app.neoncrm.com/forms/dedicate-a-donation' },
  { id: 'general-match', label: 'General matching donation', hint: 'Match gifts for daily operations.', url: 'https://elevatebranson.app.neoncrm.com/forms/general-operations-matching-donation' },
  { id: 'tiny-home-match', label: 'Tiny home matching grant', hint: 'Help neighbors move into tiny homes.', url: 'https://elevatebranson.app.neoncrm.com/forms/elevate-community-matching-form' },
  { id: 'playground-match', label: 'Elevate Kids playground matching fund', hint: 'Support the playground.', url: 'https://elevatebranson.app.neoncrm.com/forms/playground-matching-donation' },
  { id: 'rides', label: 'Sponsor Elevate Rides', hint: 'Sponsor scooters and rides.', url: 'https://elevatebranson.app.neoncrm.com/forms/elevate-rides-sponsorship' },
  { id: 'work', label: 'Sponsor Elevate Work', hint: 'Sponsor jobs and training.', url: 'https://elevatebranson.app.neoncrm.com/forms/elevate-work-sponsorship' },
  { id: 'advance', label: 'Join the Advance Team', hint: 'Monthly giving from $35.', url: 'https://elevatebranson.app.neoncrm.com/forms/advance-team' },
  { id: 'business', label: 'Become a business partner', hint: 'Monthly business partnership.', url: 'https://elevatebranson.app.neoncrm.com/forms/business-partner' },
  { id: 'theos-heroes', label: "Become one of Theo's Heroes", hint: 'Support children and families.', url: 'https://elevatebranson.app.neoncrm.com/forms/theos-heroes' },
];

export const hostedGiveHosts = ['elevatebranson.z2systems.com', 'elevatebranson.app.neoncrm.com'];
