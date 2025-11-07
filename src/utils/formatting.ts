/**
 * Formats phone number with country code
 * @param phone - Phone number
 * @param countryCode - Country dial code (e.g., "+972")
 * @returns Formatted phone number (e.g., "+972-54-1234567")
 */
export function formatPhoneNumber(phone: string, countryCode: string): string {
  // Remove all non-digit characters from phone
  const cleaned = phone.replace(/\D/g, '')

  // For Israeli numbers (972)
  if (countryCode === '+972') {
    // Remove leading 0 if present
    const number = cleaned.startsWith('0') ? cleaned.substring(1) : cleaned

    if (number.length === 9) {
      // Format: +972-XX-XXXXXXX
      return `${countryCode}-${number.substring(0, 2)}-${number.substring(2)}`
    }
  }

  // Default format: +country-number
  return `${countryCode}-${cleaned}`
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
 * Cleans phone number to digits only
 * @param phone - Phone number with possible formatting
 * @returns Digits only
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '')
}
