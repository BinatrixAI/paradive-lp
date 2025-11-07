export interface FormData {
  firstName: string
  lastName: string
  idNumber: string
  birthDate: string // YYYY-MM-DD format
  gender: 'male' | 'female' | ''
  phone: string
  countryCode: string
}

export interface CalculatedData {
  age: number
  isMinor: boolean
  sessionToken: string
}

export interface ValidationErrors {
  firstName?: string
  lastName?: string
  idNumber?: string
  birthDate?: string
  gender?: string
  phone?: string
}

export interface JotformParams extends FormData, CalculatedData {
  language: string
}

export interface CountryCode {
  code: string
  name: string
  flag: string
  dialCode: string
}
