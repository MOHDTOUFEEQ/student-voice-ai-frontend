import { Link } from 'react-router-dom'
import { FeedbackForm } from '../components/FeedbackForm'
import { useLocale } from '../contexts/LocaleContext'

export function HomePage() {
  const { t } = useLocale()
  const s = t.home

  return (
    <div className="space-y-12">
      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm md:p-12">
        <p className="text-sm font-medium uppercase tracking-wide text-brand-600">{s.badge}</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">{s.headline}</h1>
        <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">{s.subhead}</p>
      </section>

      <FeedbackForm type="feedback" id="feedback" />

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
          <h2 className="text-lg font-semibold">{s.cardIssuesTitle}</h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">{s.cardIssuesSub}</p>
          <Link to="/weekly/issues" className="mt-5 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            {s.cardIssuesBtn}
          </Link>
        </article>
        <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
          <h2 className="text-lg font-semibold">{s.cardMeetingsTitle}</h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">{s.cardMeetingsSub}</p>
          <Link to="/weekly/updates" className="mt-5 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            {s.cardMeetingsBtn}
          </Link>
        </article>
      </section>
    </div>
  )
}
