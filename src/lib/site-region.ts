export type SiteRegionKey = 'india' | 'dubai';

export const SITE_REGION_COOKIE_NAME = 'site_region';
export const SITE_REGION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export function getRegionRoute(region: SiteRegionKey) {
  return region === 'dubai' ? '/dubai' : '/india';
}

export function getRegionKeyFromPathname(pathname: string): SiteRegionKey {
  if (pathname.startsWith('/dubai')) {
    return 'dubai';
  }

  if (pathname.startsWith('/india')) {
    return 'india';
  }

  return readPersistedRegion() ?? 'india';
}

export function persistSiteRegion(region: SiteRegionKey) {
  document.cookie = `${SITE_REGION_COOKIE_NAME}=${region}; Max-Age=${SITE_REGION_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
}

export function readPersistedRegion(): SiteRegionKey | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookieEntry = document.cookie
    .split(';')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${SITE_REGION_COOKIE_NAME}=`));

  const value = cookieEntry?.split('=')[1];
  return value === 'dubai' || value === 'india' ? value : null;
}
