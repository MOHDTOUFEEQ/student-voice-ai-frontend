import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { t } from '../i18n'

const nav = [
  ['', 'Overview'],
  ['feedback', 'Feedback'],
  ['analytics', 'Analytics'],
  ['weekly', 'Weekly Insights'],
  ['issues', 'Issues'],
  ['meeting-updates', 'Meeting Updates'],
  ['ai', 'AI Assistant'],
  ['reports', 'Reports'],
  ['settings', 'Settings'],
]

export function AdminLayout() {
  const { token, displayName, role, logout } = useAuth()
  const strings = t()

  if (!token) return <Navigate to="/admin/login" replace />

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-r border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <p className="font-semibold">{strings.brand.title}</p>
        <nav className="mt-6 space-y-1">
          {nav.map(([path, label]) => (
            <NavLink
              key={path}
              to={path ? `/admin/${path}` : '/admin'}
              end={!path}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-700/20 dark:text-brand-100' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div>
        <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
          <p className="text-sm text-[var(--color-text-muted)]">Admin dashboard</p>
          <div className="text-right text-sm">
            <p className="font-medium">{displayName}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{role}</p>
            <button type="button" onClick={() => logout()} className="mt-1 text-xs text-brand-600 hover:underline">
              Log out
            </button>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
