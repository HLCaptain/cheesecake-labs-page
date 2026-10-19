const legacyOrigin = 'https://legacy-route.invalid'
const knownRoutes = new Set([
  '/',
  '/mindshift',
  '/mindshift/privacy',
  '/mindshift/terms',
  '/cheesecake',
])

/** Convert only known legacy routes; anchors and external targets are not redirects. */
export function resolveLegacyHashRoute(hash: string, search = ''): string | null {
  if (!hash.startsWith('#/')) return null
  try {
    const target = new URL(hash.slice(1), legacyOrigin)
    if (target.origin !== legacyOrigin || !knownRoutes.has(target.pathname)) return null
    return `${target.pathname}${target.search || search}${target.hash}`
  } catch {
    return null
  }
}
