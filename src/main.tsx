import React from 'react'
import ReactDOM from 'react-dom/client'
import { PostHogProvider } from 'posthog-js/react'
import App from './App'
import { resolveLegacyHashRoute } from './routing'
import './index.css'

if (import.meta.env.VITE_ROUTER_MODE === 'history') {
  const target = resolveLegacyHashRoute(window.location.hash, window.location.search)
  if (target !== null) window.history.replaceState(window.history.state, '', target)
}

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST

const posthogOptions = {
  api_host: posthogHost || 'https://us.i.posthog.com',
  person_profiles: 'identified_only' as const,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {posthogKey ? (
      <PostHogProvider apiKey={posthogKey} options={posthogOptions}>
        <App />
      </PostHogProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>,
)
