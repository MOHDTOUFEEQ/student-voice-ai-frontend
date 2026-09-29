import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { api } from '../../api/client'

export function AdminAnalyticsPage() {
  const [volume, setVolume] = useState<{ week: number; count: number }[]>([])
  const [categories, setCategories] = useState<{ category: string; count: number }[]>([])

  useEffect(() => {
    api.get<{ volume_by_week: { week: number; count: number }[]; by_category: { category: string; count: number }[] }>(
      '/api/admin/analytics',
    ).then((d) => {
      setVolume(d.volume_by_week)
      setCategories(d.by_category.slice(0, 8))
    })
  }, [])

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="h-72 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <h2 className="mb-2 font-semibold">Feedback volume by week</h2>
        {volume.every((v) => v.count === 0) ? (
          <p className="text-sm text-[var(--color-text-muted)]">No data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={volume}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="h-72 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <h2 className="mb-2 font-semibold">Feedback by category</h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={categories} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="category" width={120} />
            <Tooltip />
            <Bar dataKey="count" fill="#1d4ed8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
