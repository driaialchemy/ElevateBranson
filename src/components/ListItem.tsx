import Ionicons from '@expo/vector-icons/Ionicons';

import { ListRow } from '@/components/ListRow';

export function ListItem({
  label,
  detail,
  href,
  icon,
}: {
  label: string;
  detail?: string;
  href: string;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return <ListRow detail={detail} href={href} icon={icon} label={label} />;
}
