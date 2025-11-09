import { JotformParams } from '@/types/form'
import { formatPhoneNumber } from './formatting'

/**
 * Formats gender value based on language
 * @param gender - Gender value ('male' or 'female')
 * @param language - Language code ('he' or 'en')
 * @returns Formatted gender string
 */
function formatGender(gender: string, language: string): string {
  if (language === 'he') {
    return gender === 'male' ? 'זכר' : 'נקבה'
  }
  return gender
}

/**
 * Builds Jotform URL with all form parameters
 * @param params - All form and calculated data
 * @returns Complete Jotform URL with query parameters
 */
export function buildJotformURL(params: JotformParams): string {
  const baseUrl = 'https://form.jotform.com/253104766327457'

  // Parse birth date into separate day, month, year components
  const [year, month, day] = params.birthDate.split('-')

  // Build query parameters (excluding birth date which needs special handling)
  const queryParams = new URLSearchParams({
    firstName: params.firstName,
    lastName: params.lastName,
    idNumber: params.idNumber,
    gender: formatGender(params.gender, params.language), // Hebrew or English
    phone: formatPhoneNumber(params.phone, params.countryCode), // Digits only
    age: params.age.toString(),
    isMinor: params.isMinor.toString(),
    sessionToken: params.sessionToken,
    language: params.language
  })

  // Manually append birth date parameters with bracket notation
  // URLSearchParams doesn't handle brackets well, so we append them manually
  const url = `${baseUrl}?${queryParams.toString()}&birthDate[day]=${day}&birthDate[month]=${month}&birthDate[year]=${year}`

  return url
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
