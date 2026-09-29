import { useEffect, useState, type FormEvent } from 'react'
import { api } from '../../api/client'

export function AdminSettingsPage() {
  const [calendar, setCalendar] = useState({ current_academic_week: 2, week_3_start_date: '2026-10-05', total_academic_weeks: 11 })
  const [retention, setRetention] = useState({ mode: '90', custom_days: 90 })

  useEffect(() => {
    api.get<{ academic_calendar: typeof calendar; data_retention: typeof retention }>('/api/admin/settings').then((d) => {
      setCalendar(d.academic_calendar)
      setRetention(d.data_retention)
    })
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await api.put('/api/admin/settings', {
      current_academic_week: calendar.current_academic_week,
      week_3_start_date: calendar.week_3_start_date,
      total_academic_weeks: calendar.total_academic_weeks,
      data_retention_mode: retention.mode,
      data_retention_days: retention.custom_days,
    })
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg space-y-4">
      <label className="block text-sm">
        Current academic week
        <input type="number" className="mt-1 w-full rounded border px-2 py-1" value={calendar.current_academic_week} onChange={(e) => setCalendar({ ...calendar, current_academic_week: +e.target.value })} />
      </label>
      <label className="block text-sm">
        Week 3 start date
        <input type="date" className="mt-1 w-full rounded border px-2 py-1" value={calendar.week_3_start_date} onChange={(e) => setCalendar({ ...calendar, week_3_start_date: e.target.value })} />
      </label>
      <label className="block text-sm">
        Total academic weeks
        <input type="number" className="mt-1 w-full rounded border px-2 py-1" value={calendar.total_academic_weeks} onChange={(e) => setCalendar({ ...calendar, total_academic_weeks: +e.target.value })} />
      </label>
      <label className="block text-sm">
        Data retention (days mode)
        <select className="mt-1 w-full rounded border px-2 py-1" value={retention.mode} onChange={(e) => setRetention({ ...retention, mode: e.target.value })}>
          <option value="30">30 days</option>
          <option value="90">90 days</option>
          <option value="180">180 days</option>
          <option value="custom">Custom</option>
        </select>
      </label>
      {retention.mode === 'custom' && (
        <input type="number" className="w-full rounded border px-2 py-1" value={retention.custom_days} onChange={(e) => setRetention({ ...retention, custom_days: +e.target.value })} />
      )}
      <button type="submit" className="rounded bg-brand-600 px-4 py-2 text-white">
        Save settings
      </button>
    </form>
  )
}
