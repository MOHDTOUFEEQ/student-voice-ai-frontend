import { Outlet } from 'react-router-dom'
import { PublicHeader } from '../components/PublicHeader'
import { useLocale } from '../contexts/LocaleContext'

export function PublicLayout() {
  const { t } = useLocale()
  return (
    <div className="min-h-screen">
      <PublicHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-[var(--color-border)] py-6 text-center text-xs text-[var(--color-text-muted)]">
        {t.footer.credit}
      </footer>
    </div>
  )
}
