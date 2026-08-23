import { type FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setRouteMetadata } from '../routeMetadata'

interface MindShiftDeleteAccountPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const appleSubscriptionHelp = 'https://support.apple.com/118428'
const appleSignInHelp = 'https://support.apple.com/102571'
const googleSubscriptionHelp = 'https://support.google.com/googleplay/answer/7018481'

export default function MindShiftDeleteAccountPage({ theme, onToggleTheme }: MindShiftDeleteAccountPageProps) {
  const [email, setEmail] = useState('')
  const [provider, setProvider] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [providerError, setProviderError] = useState<string | null>(null)
  const [formState, setFormState] = useState<FormState>('idle')

  useEffect(() => {
    setRouteMetadata({
      title: 'Delete Account — MindShift',
      description: 'Request deletion of your MindShift account and learn what is removed, what remains on your device, and how store subscriptions are handled.',
      favicon: `${import.meta.env.BASE_URL}favicon-mindshift.svg`,
    })
  }, [])

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedEmail = email.trim()
    if (normalizedEmail.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setEmailError('Enter the email address used for your MindShift account.')
      return
    }
    setEmailError(null)
    if (provider !== 'google' && provider !== 'apple') {
      setProviderError('Select Google or Apple as your MindShift sign-in provider.')
      return
    }
    setProviderError(null)

    const formspreeId = import.meta.env.VITE_FORMSPREE_MINDSHIFT_ID
    if (!formspreeId) {
      console.warn('VITE_FORMSPREE_MINDSHIFT_ID is not set. Account-deletion requests are disabled.')
      setFormState('error')
      return
    }

    setFormState('submitting')
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          requestType: 'MindShift account deletion',
          email: normalizedEmail,
          signInProvider: provider,
          message: 'Please verify ownership and permanently delete this MindShift account and its account-bound data.',
        }),
      })
      setFormState(response.ok ? 'success' : 'error')
    } catch (error) {
      console.error('Account-deletion request failed:', error)
      setFormState('error')
    }
  }

  const year = new Date().getFullYear()

  return (
    <>
      <header
        className="sticky top-0 z-50 backdrop-blur-lg border-b"
        style={{ backgroundColor: 'rgba(var(--bg-primary-rgb, 10, 10, 15), 0.85)', borderColor: 'var(--border-soft)' }}
      >
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/mindshift" className="inline-flex items-center gap-2 group" aria-label="MindShift — Home">
            <span className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-sm" aria-hidden="true">
              🧠
            </span>
            <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Mind<span className="text-teal-500">Shift</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onToggleTheme}
            className="w-11 h-11 rounded-lg flex items-center justify-center hover:bg-teal-500/10 transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.95l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/mindshift" className="inline-flex text-sm text-teal-500 hover:text-teal-400 mb-8">
          ← Back to MindShift
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Delete your MindShift account
        </h1>
        <p className="leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
          Use the secure in-app flow when possible. If you no longer have access to the App, submit a support request
          below. Never send us your password, provider authorization code, or internal user ID.
        </p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          <section className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Delete in MindShift</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Open MindShift and go to Settings → Delete account.</li>
              <li>Read the deletion summary, reauthenticate if requested, and confirm permanent deletion.</li>
              <li>If Apple revocation needs manual follow-up, use your Apple Account's Sign in with Apple settings.</li>
            </ol>
            <p className="mt-4">
              The App sends an authenticated deletion request. The service identifies the account from that session
              and never trusts a caller-supplied user ID.
            </p>
          </section>

          <section className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>What deletion removes</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your Supabase sign-in account and active sessions.</li>
              <li>Synced block rules, interception history, usage statistics, and the server entitlement snapshot.</li>
              <li>Your RevenueCat customer record used for subscription access and restore.</li>
            </ul>
            <p className="mt-4">
              Device-only goals, activities, journal entries, preferences, and anonymous usage data are not stored in
              your account and cannot be erased by this website. Remove them in the App, clear the App's data, or
              uninstall MindShift on each device.
            </p>
          </section>

          <section className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Subscriptions are store-managed</h2>
            <p>
              Deleting your MindShift account does not cancel, refund, or change an App Store or Google Play
              subscription. Cancel it separately with the store account that made the purchase.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href={appleSubscriptionHelp} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center px-4 py-2 rounded-lg text-teal-500 border" style={{ borderColor: 'var(--border-soft)' }}>
                Apple subscription help
              </a>
              <a href={googleSubscriptionHelp} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center px-4 py-2 rounded-lg text-teal-500 border" style={{ borderColor: 'var(--border-soft)' }}>
                Google Play subscription help
              </a>
              <a href={appleSignInHelp} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center px-4 py-2 rounded-lg text-teal-500 border" style={{ borderColor: 'var(--border-soft)' }}>
                Sign in with Apple help
              </a>
            </div>
          </section>

          <section className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Request deletion without the App</h2>
            {formState === 'success' ? (
              <div role="status" className="rounded-xl p-4 border border-teal-500/40 bg-teal-500/10">
                <p className="font-semibold text-teal-400">Request sent</p>
                <p className="mt-1">Support will contact the submitted email address to verify account ownership before deletion.</p>
              </div>
            ) : (
              <form onSubmit={submitRequest} noValidate aria-label="Account deletion request" className="space-y-4">
                <div>
                  <label htmlFor="deletion-email" className="block text-xs font-medium mb-1.5 uppercase tracking-wide">
                    MindShift account email <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="deletion-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={320}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={{ backgroundColor: 'var(--bg-surface-hover)', color: 'var(--text-primary)', border: '1px solid var(--border-soft)' }}
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={emailError ? 'deletion-email-error' : 'deletion-email-help'}
                  />
                  <p id="deletion-email-help" className="mt-1 text-xs">Use the email returned by the same Google or Apple account used in MindShift.</p>
                  {emailError && <p id="deletion-email-error" className="mt-1 text-xs text-red-400" role="alert">{emailError}</p>}
                </div>

                <div>
                  <label htmlFor="deletion-provider" className="block text-xs font-medium mb-1.5 uppercase tracking-wide">
                    Sign-in provider <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="deletion-provider"
                    name="provider"
                    required
                    value={provider}
                    onChange={(event) => {
                      setProvider(event.target.value)
                      setProviderError(null)
                    }}
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={{ backgroundColor: 'var(--bg-surface-hover)', color: 'var(--text-primary)', border: '1px solid var(--border-soft)' }}
                    aria-invalid={Boolean(providerError)}
                    aria-describedby={providerError ? 'deletion-provider-error' : undefined}
                  >
                    <option value="" disabled>Select Google or Apple</option>
                    <option value="google">Google</option>
                    <option value="apple">Apple</option>
                  </select>
                  {providerError && <p id="deletion-provider-error" className="mt-1 text-xs text-red-400" role="alert">{providerError}</p>}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(event) => setConfirmed(event.target.checked)}
                    className="mt-1 h-4 w-4 accent-red-500"
                    required
                  />
                  <span>
                    I request permanent account deletion and consent to support using this email only to verify and
                    complete the request. I understand that store subscriptions and device-only data are separate.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!provider || !confirmed || formState === 'submitting'}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-busy={formState === 'submitting'}
                >
                  {formState === 'submitting' ? 'Sending request…' : 'Request permanent deletion'}
                </button>

                {formState === 'error' && (
                  <p role="alert" className="text-red-400">
                    The support request could not be sent. Please try again later or use the in-app deletion flow.
                  </p>
                )}
              </form>
            )}
          </section>

          <p>
            Read the{' '}
            <Link to="/mindshift/privacy" className="text-teal-500 underline underline-offset-2">Privacy Policy</Link>
            {' '}and{' '}
            <Link to="/mindshift/terms" className="text-teal-500 underline underline-offset-2">Terms &amp; Conditions</Link>
            {' '}for the full data and account terms.
          </p>
        </div>
      </main>

      <footer className="border-t" style={{ borderColor: 'var(--border-soft)' }}>
        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>&copy; {year} MindShift. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/mindshift/privacy" className="text-xs hover:text-teal-500" style={{ color: 'var(--text-muted)' }}>Privacy</Link>
            <Link to="/mindshift/terms" className="text-xs hover:text-teal-500" style={{ color: 'var(--text-muted)' }}>Terms</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
