import { TextInput, Select } from 'flowbite-react'
import { HiPhone } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { CountryCode } from '@/types/form'

interface PhoneInputProps {
  phone: string
  countryCode: string
  onPhoneChange: (phone: string) => void
  onCountryCodeChange: (code: string) => void
  error?: string
}

const countryCodes: CountryCode[] = [
  { code: 'IL', name: 'Israel', flag: '🇮🇱', dialCode: '+972' },
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' }
]

export default function PhoneInput({
  phone,
  countryCode,
  onPhoneChange,
  onCountryCodeChange,
  error
}: PhoneInputProps) {
  const { t } = useTranslation()

  return (
    <div className="flex gap-2">
      <div className="w-40">
        <Select
          id="countryCode"
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value)}
          color={error ? 'failure' : 'gray'}
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.dialCode}>
              {country.flag} {country.dialCode}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex-1">
        <TextInput
          id="phone"
          type="tel"
          icon={HiPhone}
          placeholder={t('phonePlaceholder')}
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          color={error ? 'failure' : 'gray'}
          required
        />
      </div>
    </div>
  )
}
