import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { WrapPlusProvider } from './context/WrapPlusContext.tsx'
import { WatchlistProvider } from './context/WatchlistContext.tsx'
import { VoicesFollowProvider } from './context/VoicesFollowContext.tsx'
import { VendorAlertProvider } from './context/VendorAlertContext.tsx'
import { CompareProvider } from './context/CompareContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <WrapPlusProvider>
        <WatchlistProvider>
          <VoicesFollowProvider>
            <VendorAlertProvider>
              <CompareProvider>
                <App />
              </CompareProvider>
            </VendorAlertProvider>
          </VoicesFollowProvider>
        </WatchlistProvider>
      </WrapPlusProvider>
    </HelmetProvider>
  </StrictMode>,
)
