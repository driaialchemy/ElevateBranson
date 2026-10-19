export const brandImages = {
  hero: require('../../assets/brand/hero.jpg'),
  facts: require('../../assets/brand/facts.jpg'),
  difference: require('../../assets/brand/difference.jpg'),
  role: require('../../assets/brand/role.jpg'),
  banner: require('../../assets/brand/banner.jpg'),
  'program-elevate-kids': require('../../assets/brand/program-elevate-kids.jpg'),
  'program-elevate-work': require('../../assets/brand/program-elevate-work.jpg'),
  'program-elevate-entrepreneurs': require('../../assets/brand/program-elevate-entrepreneurs.jpg'),
  'program-elevate-connections': require('../../assets/brand/program-elevate-connections.jpg'),
  'program-elevate-outreach': require('../../assets/brand/program-elevate-outreach.jpg'),
  'program-elevate-rides': require('../../assets/brand/program-elevate-rides.jpg'),
  'program-elevate-health': require('../../assets/brand/program-elevate-health.jpg'),
  'program-coffee': require('../../assets/brand/program-coffee.jpg'),
  'program-thrift': require('../../assets/brand/program-thrift.jpg'),
  'program-playground': require('../../assets/brand/program-playground.jpg'),
  'program-tiny-house': require('../../assets/brand/program-tiny-house.jpg'),
} as const;

export type BrandImageKey = keyof typeof brandImages;

export function brandImage(key: string | undefined) {
  if (!key || !(key in brandImages)) {
    return undefined;
  }
  return brandImages[key as BrandImageKey];
}
