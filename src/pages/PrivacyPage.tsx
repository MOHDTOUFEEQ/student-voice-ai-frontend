import { useLocale } from '../contexts/LocaleContext'

export function PrivacyPage() {
  const { t } = useLocale()
  const p = t.privacy

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
      <h1>{p.title}</h1>
      <section className="space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
        <p>
          <strong className="text-[var(--color-text)]">{p.introStrong}</strong> {p.intro}
        </p>
        <h2 className="text-base font-semibold text-[var(--color-text)]">{p.collectTitle}</h2>
        <p>{p.collectBody}</p>
        <h2 className="text-base font-semibold text-[var(--color-text)]">{p.notCollectTitle}</h2>
        <p>{p.notCollectBody}</p>
        <h2 className="text-base font-semibold text-[var(--color-text)]">{p.useTitle}</h2>
        <p>{p.useBody}</p>
        <h2 className="text-base font-semibold text-[var(--color-text)]">{p.aiTitle}</h2>
        <p>{p.aiBody}</p>
        <h2 className="text-base font-semibold text-[var(--color-text)]">{p.retentionTitle}</h2>
        <p>{p.retentionBody}</p>
        <h2 className="text-base font-semibold text-[var(--color-text)]">{p.adminTitle}</h2>
        <p>{p.adminBody}</p>
        <h2 className="text-base font-semibold text-[var(--color-text)]">{p.sensitiveTitle}</h2>
        <p>{p.sensitiveBody}</p>
      </section>
    </article>
  )
}
