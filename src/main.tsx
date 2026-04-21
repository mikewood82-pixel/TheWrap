import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { WrapPlusProvider } from './context/WrapPlusContext.tsx'
import { WatchlistProvider } from './context/WatchlistContext.tsx'
import { VoicesFollowProvider } from './context/VoicesFollowContext.tsx'
import { VendorAlertProvider } from './context/VendorAlertContext.tsx'
import { CompareProvider } from './context/CompareContext.tsx'

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
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
      </ClerkProvider>
    </HelmetProvider>
  </StrictMode>,
)
