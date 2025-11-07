import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import RegistrationForm from './components/RegistrationForm'

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Set document direction and language based on current language
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9e9e1] to-[#d9c48e] py-4 sm:py-8 md:py-12 px-4">
      <div className="container mx-auto">
        <RegistrationForm />
      </div>
    </div>
  )
}
