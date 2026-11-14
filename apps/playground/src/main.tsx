import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ui-sdk/core/web.css'
import '@hashti/tokens/tokens.css'
import '@hashti/react/styles.css'
import './index.css'
import App from './App.tsx'
import { agent } from './agent'

window.agent = agent

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)