export function shouldOfferPush(path: string, meaningful: boolean, decided: boolean): boolean {
  if (decided || path === '/more/notifications') {
    return false;
  }
  if (path === '/' || path === '') {
    return false;
  }
  return meaningful;
}

export function countsAsUse(path: string): boolean {
  return path !== '/' && path !== '' && path !== '/more/notifications';
}
