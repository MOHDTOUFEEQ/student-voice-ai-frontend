import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en } from '../i18n/en'
import type { LocaleDictionary } from '../i18n/types'
import { ja } from '../i18n/ja'
import { zhCN } from '../i18n/zh-CN'
import { zhTW } from '../i18n/zh-TW'

export type LocaleCode = 'en' | 'zh-CN' | 'zh-TW' | 'ja'

const STORAGE_KEY = 'sv_locale'

const locales: Record<LocaleCode, LocaleDictionary> = {
  en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  ja,
}

export const localeOptions: { code: LocaleCode; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'zh-CN', label: '中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'ja', label: '日本語' },
]

type LocaleContextValue = {
  locale: LocaleCode
  t: LocaleDictionary
  setLocale: (code: LocaleCode) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readStoredLocale(): LocaleCode {
  const stored = localStorage.getItem(STORAGE_KEY) as LocaleCode | null
  if (stored && locales[stored]) return stored
  return 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(readStoredLocale)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
    document.title = `${locales[locale].brand.title} | ${locales[locale].brand.subtitle}`
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      t: locales[locale],
      setLocale: (code: LocaleCode) => setLocaleState(code),
    }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale outside LocaleProvider')
  return ctx
}

export function getStoredLocale(): LocaleCode {
  return readStoredLocale()
}
