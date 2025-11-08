import { useState, FormEvent } from 'react'
import { Select, Label } from 'flowbite-react'
import { HiUser, HiIdentification, HiCalendar, HiPhone, HiUserGroup } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { FormData, ValidationErrors } from '@/types/form'
import {
  validateIsraeliID,
  validateName,
  validatePhone,
  validateBirthDate,
  calculateAge
} from '@/utils/validation'
import { buildJotformURL, generateSessionToken } from '@/utils/redirect'

// Custom Input with Icon component - MUST be outside RegistrationForm to prevent re-creation on render
interface InputWithIconProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  id: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  maxLength?: number
  pattern?: string
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'url' | 'search' | 'none' | 'decimal'
  error?: string
  isRTL: boolean
}

const InputWithIcon = ({
  icon: Icon,
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  maxLength,
  pattern,
  inputMode,
  error,
  isRTL
}: InputWithIconProps) => {
  // For date inputs, hide the native calendar icon using CSS
  const isDateInput = type === 'date'

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={id}>{label}</Label>
      </div>
      <div className="relative">
        {/* FIXED: Icon on RIGHT in RTL (Hebrew), LEFT in LTR (English) */}
        <div className={`absolute inset-y-0 flex items-center pointer-events-none ${
          isRTL
            ? 'right-0 pr-3'  // RIGHT side in Hebrew (RTL)
            : 'left-0 pl-3'   // LEFT side in English (LTR)
        }`}>
          <Icon className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type={type}
          id={id}
          className={`
            bg-gray-50 border ${error ? 'border-red-500' : 'border-[#c7bfbb]'}
            text-[#644e43] text-sm rounded-lg
            focus:ring-[#31b6d8] focus:border-[#31b6d8] block w-full py-2.5
            transition-all duration-200
            ${isRTL ? 'pr-10 pl-2.5' : 'pl-10 pr-2.5'}
            ${isDateInput ? '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer' : ''}
          `}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          maxLength={maxLength}
          pattern={pattern}
          inputMode={inputMode}
          max={type === 'date' ? '2015-07-14' : undefined}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default function RegistrationForm() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'he'

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    idNumber: '',
    birthDate: '', // Empty initially, will default to 2010-07-14 on focus
    gender: '',
    phone: '',
    countryCode: '+972'
  })

  const [errors, setErrors] = useState<ValidationErrors>({})

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field in errors) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field as keyof ValidationErrors]
        return newErrors
      })
    }
  }

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('errors.required')
    } else if (!validateName(formData.firstName)) {
      if (formData.firstName.trim().length < 2) {
        newErrors.firstName = t('errors.nameTooShort')
      } else if (formData.firstName.trim().length > 50) {
        newErrors.firstName = t('errors.nameTooLong')
      } else {
        newErrors.firstName = t('errors.invalidName')
      }
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('errors.required')
    } else if (!validateName(formData.lastName)) {
      if (formData.lastName.trim().length < 2) {
        newErrors.lastName = t('errors.nameTooShort')
      } else if (formData.lastName.trim().length > 50) {
        newErrors.lastName = t('errors.nameTooLong')
      } else {
        newErrors.lastName = t('errors.invalidName')
      }
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = t('errors.required')
    } else if (!/^\d{9}$/.test(formData.idNumber)) {
      newErrors.idNumber = t('errors.idLength')
    } else if (!validateIsraeliID(formData.idNumber)) {
      newErrors.idNumber = t('errors.invalidId')
    }

    if (!formData.birthDate) {
      newErrors.birthDate = t('errors.required')
    } else if (!validateBirthDate(formData.birthDate)) {
      const age = calculateAge(formData.birthDate)
      if (age < 10) {
        newErrors.birthDate = t('errors.ageTooYoung')
      } else if (age > 120) {
        newErrors.birthDate = t('errors.ageTooOld')
      } else {
        newErrors.birthDate = t('errors.invalidDate')
      }
    }

    if (!formData.gender) {
      newErrors.gender = t('errors.invalidGender')
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('errors.required')
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t('errors.invalidPhone')
    }

    return newErrors
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const age = calculateAge(formData.birthDate)
    const isMinor = age < 18
    const sessionToken = generateSessionToken()

    const jotformUrl = buildJotformURL({
      ...formData,
      age,
      isMinor,
      sessionToken,
      language: i18n.language
    })

    window.location.href = jotformUrl
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg transition-all duration-300">
      {/* Logo and Language Switcher on same level */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 flex justify-center">
          <img src="/assets/paradive-logo.png" alt="Paradive Logo" className="h-12 sm:h-16 w-auto" />
        </div>
        <button
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'he' : 'en')}
          className="flex items-center gap-1.5 text-[#644e43] hover:text-[#31b6d8] cursor-pointer transition-colors"
          type="button"
        >
          <span className="text-base sm:text-lg">{i18n.language === 'en' ? '🇬🇧' : '🇮🇱'}</span>
          <span className="text-sm font-medium">{i18n.language === 'en' ? 'EN' : 'HE'}</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="text-center mb-4 sm:mb-6 transition-all duration-300">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 text-[#644e43]">{t('title')}</h1>
        <p className="text-sm sm:text-base text-[#9e9089]">{t('subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 transition-all duration-300">
        {/* First Name */}
        <InputWithIcon
          icon={HiUser}
          label={t('firstName')}
          id="firstName"
          placeholder={t('firstNamePlaceholder')}
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          error={errors.firstName}
          isRTL={isRTL}
        />

        {/* Last Name */}
        <InputWithIcon
          icon={HiUser}
          label={t('lastName')}
          id="lastName"
          placeholder={t('lastNamePlaceholder')}
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          error={errors.lastName}
          isRTL={isRTL}
        />

        {/* ID Number */}
        <InputWithIcon
          icon={HiIdentification}
          label={t('idNumber')}
          id="idNumber"
          placeholder={t('idNumberPlaceholder')}
          value={formData.idNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '')
            if (value.length <= 9) {
              handleChange('idNumber', value)
            }
          }}
          maxLength={9}
          pattern="[0-9]{9}"
          inputMode="numeric"
          error={errors.idNumber}
          isRTL={isRTL}
        />

        {/* Birth Date */}
        <InputWithIcon
          icon={HiCalendar}
          label={t('birthDate')}
          id="birthDate"
          type="date"
          placeholder={t('birthDatePlaceholder')}
          value={formData.birthDate}
          onChange={(e) => handleChange('birthDate', e.target.value)}
          onFocus={() => {
            // Set default date on first focus if empty
            if (!formData.birthDate) {
              handleChange('birthDate', '2010-07-14')
            }
          }}
          error={errors.birthDate}
          isRTL={isRTL}
        />

        {/* Gender */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="gender">{t('gender')}</Label>
          </div>
          <div className="relative">
            {/* Gender icon */}
            <div className={`absolute inset-y-0 flex items-center pointer-events-none z-10 ${
              isRTL
                ? 'right-0 pr-3'  // RIGHT side in Hebrew (RTL)
                : 'left-0 pl-3'   // LEFT side in English (LTR)
            }`}>
              <HiUserGroup className="w-5 h-5 text-gray-500" />
            </div>
            <Select
              id="gender"
              required
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value as 'male' | 'female' | '')}
              color={errors.gender ? 'failure' : undefined}
              style={isRTL ? { paddingRight: '2.5rem' } : { paddingLeft: '2.5rem' }}
              theme={{
                field: {
                  select: {
                    colors: {
                      gray: `bg-gray-50 border-[#c7bfbb] text-[#644e43] focus:border-[#31b6d8] focus:ring-[#31b6d8]`,
                      failure: `bg-gray-50 border-red-500 text-[#644e43] focus:border-red-500 focus:ring-red-500`
                    },
                    sizes: {
                      md: 'p-2.5 text-sm'
                    }
                  }
                }
              }}
            >
              <option value="">{t('genderPlaceholder')}</option>
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
            </Select>
          </div>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>

        {/* Phone - Always inline layout */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone">{t('phone')}</Label>
          </div>
          <div className="flex flex-row gap-2">
            {/* Country code - fixed width for mobile and desktop */}
            <div className="w-32 sm:w-36">
              <Select
                id="countryCode"
                value={formData.countryCode}
                onChange={(e) => handleChange('countryCode', e.target.value)}
                theme={{
                  field: {
                    select: {
                      colors: {
                        gray: `bg-gray-50 border-[#c7bfbb] text-[#644e43] focus:border-[#31b6d8] focus:ring-[#31b6d8]`
                      },
                      sizes: {
                        md: 'p-2.5 text-sm'
                      }
                    }
                  }
                }}
              >
                <option value="+972">🇮🇱 +972</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+49">🇩🇪 +49</option>
              </Select>
            </div>

            {/* Phone input with icon - FIXED RTL positioning */}
            <div className="relative flex-1">
              <div className={`absolute inset-y-0 flex items-center pointer-events-none ${
                isRTL
                  ? 'right-0 pr-3'  // RIGHT side in Hebrew (RTL)
                  : 'left-0 pl-3'   // LEFT side in English (LTR)
              }`}>
                <HiPhone className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="tel"
                id="phone"
                className={`
                  bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-[#c7bfbb]'}
                  text-[#644e43] text-sm rounded-lg
                  focus:ring-[#31b6d8] focus:border-[#31b6d8] block w-full py-2.5
                  transition-all duration-200
                  ${isRTL ? 'pr-10 pl-2.5' : 'pl-10 pr-2.5'}
                `}
                placeholder={t('phonePlaceholder')}
                required
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white bg-[#31b6d8] hover:bg-[#b18616] focus:ring-4 focus:ring-[#31b6d8]/30 font-medium rounded-lg text-base px-5 py-3 transition-colors duration-200"
        >
          {t('submit')}
        </button>
      </form>
    </div>
  )
}
