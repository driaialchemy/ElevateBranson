/** The DONATE NOW button shows on every screen except the Give hub itself. */
export function showDonateButton(pathname: string): boolean {
  return !/^\/(?:\(tabs\)\/)?get-involved\/give\/?$/.test(pathname);
}
