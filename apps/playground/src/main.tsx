import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ui-sdk/core/web.css'
import '@hashti/tokens/tokens.css'
import '@hashti/react/styles.css'
import './index.css'
import App from './App.tsx'
import { createAgent } from '@hashti/agent'

declare global {
  interface Window {
    agent: ReturnType<typeof createAgent>
  }
}

window.agent = createAgent({ allow: () => window.confirm('Run this step?') })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)