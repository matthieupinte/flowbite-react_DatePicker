import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const fr =
{
  "weekDaysAbbreviations": {
    "friday": "Ven",
    "monday": "Lun",
    "saturday": "Sam",
    "sunday": "Dim",
    "thursday": "Jeu",
    "tuesday": "Mar",
    "wednesday": "Mer"
  }
}


export const locales = {
  fr: { translation: fr },
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'fr',
  resources: locales,
  react: {
    useSuspense: false,
  },
})

export default i18n
