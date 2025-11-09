import { JotformParams } from '@/types/form'
import { formatPhoneNumber } from './formatting'

/**
 * Builds Jotform URL with all form parameters
 * @param params - All form and calculated data
 * @returns Complete Jotform URL with query parameters
 */
export function buildJotformURL(params: JotformParams): string {
  const baseUrl = 'https://form.jotform.com/253104766327457'

  const queryParams = new URLSearchParams({
    firstName: params.firstName,
    lastName: params.lastName,
    idNumber: params.idNumber,
    birthDate: params.birthDate,
    gender: params.gender,
    phone: formatPhoneNumber(params.phone, params.countryCode),
    age: params.age.toString(),
    isMinor: params.isMinor.toString(),
    sessionToken: params.sessionToken,
    language: params.language
  })

  return `${baseUrl}?${queryParams.toString()}`
}

/**
 * Generates a unique session token
 * @returns UUID v4 session token
 */
export function generateSessionToken(): string {
  // Try modern crypto.randomUUID() first (not supported on mobile Safari)
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  // Fallback: Manual UUID v4 generation using crypto.getRandomValues() (better browser support)
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (crypto.getRandomValues(new Uint8Array(1))[0] % 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  // Last resort fallback: Use Math.random() (less secure but works everywhere)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
