import { JotformParams } from '@/types/form'
import { formatPhoneNumber } from './formatting'

/**
 * Builds Jotform URL with all form parameters
 * @param params - All form and calculated data
 * @returns Complete Jotform URL with query parameters
 */
export function buildJotformURL(params: JotformParams): string {
  // TODO: Replace with actual Jotform URL when available
  const baseUrl = 'https://form.jotform.com/YOUR_FORM_ID'

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
  return crypto.randomUUID()
}
