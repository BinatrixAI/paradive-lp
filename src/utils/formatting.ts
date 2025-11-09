/**
 * Formats phone number with country code for Jotform (digits only, no dashes)
 * @param phone - Phone number
 * @param countryCode - Country dial code (e.g., "+972")
 * @returns Formatted phone number (e.g., "972541234567")
 */
export function formatPhoneNumber(phone: string, countryCode: string): string {
  // Remove all non-digit characters from phone
  const cleaned = phone.replace(/\D/g, '')

  // Remove leading 0 if present (common in Israeli numbers)
  const number = cleaned.startsWith('0') ? cleaned.substring(1) : cleaned

  // Remove + from country code and concatenate with number (digits only)
  const countryDigits = countryCode.replace(/\D/g, '')

  return `${countryDigits}${number}`
}

/**
 * Formats date to YYYY-MM-DD
 * @param date - Date object or string
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Formats date to DD-MM-YYYY for Jotform
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string in DD-MM-YYYY format
 */
export function formatDateForJotform(dateString: string): string {
  const [year, month, day] = dateString.split('-')
  return `${day}-${month}-${year}`
}

/**
 * Cleans phone number to digits only
 * @param phone - Phone number with possible formatting
 * @returns Digits only
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '')
}
