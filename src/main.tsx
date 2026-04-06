import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WrapPlusProvider } from './context/WrapPlusContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WrapPlusProvider>
      <App />
    </WrapPlusProvider>
  </StrictMode>,
)
