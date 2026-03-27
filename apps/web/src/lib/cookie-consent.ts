/**
 * Cookie consent utilities.
 * Manages user preferences for cookie categories:
 *  - essential: always enabled (site functionality)
 *  - analytics: Vercel Analytics + Google Analytics tracking
 *  - marketing: Google Ads, future ad platforms
 */

export type CookieCategory = 'essential' | 'analytics' | 'marketing'

export interface CookiePreferences {
  essential: boolean   // always true
  analytics: boolean
  marketing: boolean
  timestamp: string    // ISO date when consent was given/updated
}

const CONSENT_KEY = 'dcs-cookie-consent'

/** Default preferences — only essential enabled */
export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: '',
}

/** Read saved preferences (returns null if none saved) */
export function getConsentPreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CookiePreferences
  } catch {
    return null
  }
}

/** Save preferences and dispatch event */
export function setConsentPreferences(prefs: CookiePreferences): void {
  if (typeof window === 'undefined') return
  const saved: CookiePreferences = {
    ...prefs,
    essential: true,
    timestamp: new Date().toISOString(),
  }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(saved))
  window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: saved }))
}

/** Accept all categories */
export function acceptAll(): CookiePreferences {
  const prefs: CookiePreferences = {
    essential: true,
    analytics: true,
    marketing: true,
    timestamp: new Date().toISOString(),
  }
  setConsentPreferences(prefs)
  return prefs
}

/** Accept only essential */
export function acceptEssentialOnly(): CookiePreferences {
  const prefs: CookiePreferences = {
    ...DEFAULT_PREFERENCES,
    timestamp: new Date().toISOString(),
  }
  setConsentPreferences(prefs)
  return prefs
}

/** Check if user has made a consent choice */
export function hasConsentChoice(): boolean {
  return getConsentPreferences() !== null
}

/** Check if a specific category is consented */
export function isCategoryConsented(category: CookieCategory): boolean {
  if (category === 'essential') return true
  const prefs = getConsentPreferences()
  if (!prefs) return false
  return prefs[category] ?? false
}
