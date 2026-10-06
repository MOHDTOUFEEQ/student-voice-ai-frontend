import { Link, NavLink } from 'react-router-dom'
import { useLocale } from '../contexts/LocaleContext'
import { useTheme } from '../contexts/ThemeContext'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-brand-600 dark:text-brand-100' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`

export function PublicHeader() {
  const { t } = useLocale()
  const { theme, toggle } = useTheme()

  const navItems: [string, string][] = [
    ['/', t.nav.home],
    ['/weekly/issues', t.nav.weeklyIssues],
    ['/weekly/updates', t.nav.meetingUpdates],
    ['/privacy', t.nav.privacy],
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src="/logo.svg" alt="" className="h-10 w-10 shrink-0 rounded-lg shadow-sm" width="40" height="40" />
          <span className="min-w-0">
            <p className="text-lg font-semibold tracking-tight">{t.brand.title}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{t.brand.subtitle}</p>
          </span>
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} className={linkClass} end={to === '/'}>
              {label}
            </NavLink>
          ))}
          <Link to="/admin" className="text-xs text-[var(--color-text-muted)] hover:underline">
            {t.nav.admin}
          </Link>
          <button
            type="button"
            onClick={toggle}
            className="rounded-md border border-[var(--color-border)] px-2 py-1 text-xs"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </nav>
      </div>
      <nav className="flex items-center gap-3 overflow-x-auto border-t border-[var(--color-border)] px-4 py-2 md:hidden">
        {navItems.map(([to, label]) => (
          <Link key={to} to={to} className="whitespace-nowrap text-xs font-medium text-[var(--color-text-muted)]">
            {label}
          </Link>
        ))}
        <Link to="/admin" className="whitespace-nowrap text-xs text-[var(--color-text-muted)]">
          {t.nav.admin}
        </Link>
        <button
          type="button"
          onClick={toggle}
          className="whitespace-nowrap rounded-md border border-[var(--color-border)] px-2 py-0.5 text-xs"
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </nav>
    </header>
  )
}
