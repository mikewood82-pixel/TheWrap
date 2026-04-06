import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import NewsletterPage from './pages/NewsletterPage'
import ShowPage from './pages/ShowPage'
import VendorIntelPage from './pages/VendorIntelPage'
import VendorDeepDivePage from './pages/VendorDeepDivePage'
import LaborMarketPage from './pages/LaborMarketPage'
import CandidateSpotlightPage from './pages/CandidateSpotlightPage'
import SubscribePage from './pages/SubscribePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="newsletter" element={<NewsletterPage />} />
          <Route path="show" element={<ShowPage />} />
          <Route path="vendors" element={<VendorIntelPage />} />
          <Route path="vendors/:slug" element={<VendorDeepDivePage />} />
          <Route path="labor-market" element={<LaborMarketPage />} />
          <Route path="candidate-spotlight" element={<CandidateSpotlightPage />} />
          <Route path="subscribe" element={<SubscribePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
