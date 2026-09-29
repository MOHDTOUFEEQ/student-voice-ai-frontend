import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LocaleProvider } from './contexts/LocaleContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { AdminLayout } from './layouts/AdminLayout'
import { PublicLayout } from './layouts/PublicLayout'
import { HomePage } from './pages/HomePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { ThanksPage } from './pages/ThanksPage'
import { WeeklyIssuesPage } from './pages/WeeklyIssuesPage'
import { WeeklyUpdatesPage } from './pages/WeeklyUpdatesPage'
import { RedirectHomeSection } from './pages/RedirectHomeSection'
import { AdminAIPage } from './pages/admin/AdminAIPage'
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage'
import { AdminFeedbackPage } from './pages/admin/AdminFeedbackPage'
import { AdminIssuesPage } from './pages/admin/AdminIssuesPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminMeetingUpdatesPage } from './pages/admin/AdminMeetingUpdatesPage'
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage'
import { AdminReportsPage } from './pages/admin/AdminReportsPage'
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage'
import { AdminWeeklyPage } from './pages/admin/AdminWeeklyPage'

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="feedback" element={<RedirectHomeSection hash="#feedback" />} />
              <Route path="suggest" element={<RedirectHomeSection hash="#suggest" />} />
              <Route path="feedback/thanks" element={<ThanksPage />} />
              <Route path="suggest/thanks" element={<ThanksPage />} />
              <Route path="weekly/issues" element={<WeeklyIssuesPage />} />
              <Route path="weekly/updates" element={<WeeklyUpdatesPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
            </Route>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverviewPage />} />
              <Route path="feedback" element={<AdminFeedbackPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
              <Route path="weekly" element={<AdminWeeklyPage />} />
              <Route path="issues" element={<AdminIssuesPage />} />
              <Route path="meeting-updates" element={<AdminMeetingUpdatesPage />} />
              <Route path="ai" element={<AdminAIPage />} />
              <Route path="reports" element={<AdminReportsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
