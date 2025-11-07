/**
 * Validates Israeli ID number using Luhn algorithm
 * @param id - 9-digit Israeli ID number
 * @returns true if valid, false otherwise
 */
export function validateIsraeliID(id: string): boolean {
  // Must be exactly 9 digits
  if (!/^\d{9}$/.test(id)) {
    return false
  }

  // Luhn algorithm weights: alternating 1 and 2
  const weights = [1, 2, 1, 2, 1, 2, 1, 2, 1]
  let sum = 0

  for (let i = 0; i < 9; i++) {
    let digit = parseInt(id[i])
    let weighted = digit * weights[i]

    // If weighted value is > 9, sum its digits (e.g., 14 -> 1+4=5)
    if (weighted > 9) {
      weighted = Math.floor(weighted / 10) + (weighted % 10)
    }

    sum += weighted
  }

  // Valid if sum is divisible by 10
  return sum % 10 === 0
}

/**
 * Validates name (Hebrew or English letters only)
 * @param name - First or last name
 * @returns true if valid, false otherwise
 */
export function validateName(name: string): boolean {
  // Hebrew letters: \u0590-\u05FF
  // English letters: a-zA-Z
  // Also allow spaces and hyphens
  const nameRegex = /^[\u0590-\u05FFa-zA-Z\s-]+$/
  return nameRegex.test(name) && name.trim().length >= 2 && name.trim().length <= 50
}

/**
 * Calculates age from birth date
 * @param birthDate - Birth date string (YYYY-MM-DD)
 * @returns Age in years
 */
export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  // Adjust if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

/**
 * Validates phone number (basic validation)
 * @param phone - Phone number string
 * @returns true if valid, false otherwise
 */
export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  // Must have at least 7 digits
  return cleaned.length >= 7 && cleaned.length <= 15
}

/**
 * Validates birth date
 * @param birthDate - Birth date string (YYYY-MM-DD)
 * @returns true if valid, false otherwise
 */
export function validateBirthDate(birthDate: string): boolean {
  if (!birthDate) return false

  const date = new Date(birthDate)
  const today = new Date()

  // Check if date is valid
  if (isNaN(date.getTime())) return false

  // Check if date is not in the future
  if (date > today) return false

  // Check age range (10-120 years)
  const age = calculateAge(birthDate)
  return age >= 10 && age <= 120
}
