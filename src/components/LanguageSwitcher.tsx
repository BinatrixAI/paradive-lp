import { useTranslation } from 'react-i18next'
import { Button } from 'flowbite-react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const otherLang = i18n.language === 'he' ? 'en' : 'he'
  const otherLangLabel = i18n.language === 'he' ? '🇬🇧 English' : '🇮🇱 עברית'

  return (
    <div className="flex justify-end mb-6">
      <Button
        size="sm"
        color="gray"
        onClick={() => changeLanguage(otherLang)}
      >
        {otherLangLabel}
      </Button>
    </div>
  )
}
