import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { en } from '../i18n/en'
import type { LocaleDictionary } from '../i18n/types'

type LocaleContextValue = {
  locale: 'en'
  t: LocaleDictionary
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = 'en'
    document.title = `${en.brand.title} | ${en.brand.subtitle}`
  }, [])

  const value = useMemo(
    () => ({
      locale: 'en' as const,
      t: en,
    }),
    [],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale outside LocaleProvider')
  return ctx
}
