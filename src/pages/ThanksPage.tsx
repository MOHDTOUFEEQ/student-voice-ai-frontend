import { Link } from 'react-router-dom'
import { useLocale } from '../contexts/LocaleContext'

export function ThanksPage() {
  const { t } = useLocale()
  const c = t.confirmation
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-sm">
      <h1 className="text-2xl font-semibold">{c.title}</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">{c.body}</p>
      <Link to="/" className="mt-6 inline-block text-sm font-medium text-brand-600 hover:underline">
        {c.backHome}
      </Link>
    </div>
  )
}
