export function isBrowserLink(url: string): boolean {
  return /^https?:\/\//i.test(url.trim());
}

export function callUrl(phone: string): string | null {
  const digits = phone.replace(/[^\d+]/g, '');
  if (digits.replace('+', '').length < 7) {
    return null;
  }
  return `tel:${digits}`;
}

export function mapUrl(address: string, platform: 'ios' | 'android' | 'default'): string {
  const query = encodeURIComponent(address.trim());
  if (platform === 'ios') {
    return `https://maps.apple.com/?q=${query}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
