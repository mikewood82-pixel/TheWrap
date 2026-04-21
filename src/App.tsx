import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import NewsletterPage from './pages/NewsletterPage'
import NewsletterDetailPage from './pages/NewsletterDetailPage'
import ShowPage from './pages/ShowPage'
import VendorIntelPage from './pages/VendorIntelPage'
import VendorDeepDivePage from './pages/VendorDeepDivePage'
import LaborMarketPage from './pages/LaborMarketPage'
import SubscribePage from './pages/SubscribePage'
import AboutPage from './pages/AboutPage'
import SponsorshipPage from './pages/SponsorshipPage'
import ReferralPage from './pages/ReferralPage'
import AssistantPage from './pages/AssistantPage'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import SavedJobsPage from './pages/SavedJobsPage'
import AlertsPage from './pages/AlertsPage'
import VendorAlertsPage from './pages/VendorAlertsPage'
import VoicesPage from './pages/VoicesPage'
import VoiceSourcePage from './pages/VoiceSourcePage'
import VoicesFollowingPage from './pages/VoicesFollowingPage'
import { FEATURES } from './config/features'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="newsletter" element={<NewsletterPage />} />
          <Route path="newsletter/:slug" element={<NewsletterDetailPage />} />
          <Route path="show" element={<ShowPage />} />
          {FEATURES.PLUS_ENABLED ? (
            <>
              <Route path="vendors" element={<VendorIntelPage />} />
              <Route path="vendors/:slug" element={<VendorDeepDivePage />} />
              <Route path="subscribe" element={<SubscribePage />} />
            </>
          ) : (
            <>
              <Route path="vendors" element={<Navigate to="/" replace />} />
              <Route path="vendors/:slug" element={<Navigate to="/" replace />} />
              <Route path="subscribe" element={<Navigate to="/" replace />} />
            </>
          )}
          <Route path="sponsorship" element={<SponsorshipPage />} />
          <Route path="referral" element={<ReferralPage />} />
          <Route path="assistant" element={<AssistantPage />} />
          <Route path="labor-market" element={<LaborMarketPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/saved" element={<SavedJobsPage />} />
          <Route path="jobs/alerts" element={<AlertsPage />} />
          <Route path="jobs/vendor-alerts" element={<VendorAlertsPage />} />
          <Route path="jobs/:id/:slug" element={<JobDetailPage />} />
          <Route path="jobs/:id" element={<JobDetailPage />} />
          {FEATURES.VOICES_ENABLED ? (
            <>
              <Route path="voices" element={<VoicesPage />} />
              <Route path="voices/following" element={<VoicesFollowingPage />} />
              <Route path="voices/:slug" element={<VoiceSourcePage />} />
            </>
          ) : (
            <>
              <Route path="voices" element={<Navigate to="/" replace />} />
              <Route path="voices/:slug" element={<Navigate to="/" replace />} />
            </>
          )}
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
