import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setRouteMetadata } from '../routeMetadata'

interface MindShiftTermsPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function MindShiftTermsPage({ theme, onToggleTheme }: MindShiftTermsPageProps) {
  useEffect(() => {
    setRouteMetadata({
      title: 'Terms & Conditions — MindShift',
      description: 'Terms for using MindShift, including subscriptions, privacy, account deletion, and app-store responsibilities.',
      favicon: `${import.meta.env.BASE_URL}favicon-mindshift.svg`,
    })
  }, [])

  const year = new Date().getFullYear()

  return (
    <>
      {/* Minimal nav */}
      <header
        className="sticky top-0 z-50 backdrop-blur-lg border-b"
        style={{ backgroundColor: 'rgba(var(--bg-primary-rgb, 10, 10, 15), 0.85)', borderColor: 'var(--border-soft)' }}
      >
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/mindshift" className="inline-flex items-center gap-2 group">
            <span className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-sm">
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

      <main className="max-w-4xl mx-auto px-6 py-16">
        <Link
          to="/mindshift"
          className="inline-flex items-center gap-1.5 text-sm text-teal-500 hover:text-teal-400 transition-colors duration-200 mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to MindShift
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Terms &amp; Conditions
        </h1>
        <p className="text-sm mb-12" style={{ color: 'var(--text-muted)' }}>
          Last updated: August 23, 2026
        </p>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {/* Agreement */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              1. Agreement to Terms
            </h2>
            <p>
              By downloading, installing, or using the MindShift mobile application (the "App") on Android or iOS,
              you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of
              these Terms, you must not use the App.
            </p>
            <p className="mt-3">
              These Terms constitute a legally binding agreement between you ("User", "you") and the developer of
              MindShift ("we", "our", "us"). We reserve the right to update these Terms at any time. Continued use of
              the App after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              2. Description of the App
            </h2>
            <p>
              MindShift is a digital wellbeing application designed to help users build healthier habits by providing:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Customizable app blocking to limit social media and other app usage</li>
              <li>Smart activity prompts as alternatives to blocked apps</li>
              <li>Scheduled activity suggestions based on personal preferences</li>
              <li>Usage tracking and habit-building tools</li>
            </ul>
            <p className="mt-3">
              The App is provided as a tool to assist with digital wellbeing. Results may vary depending on individual
              usage patterns and commitment.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              3. Eligibility
            </h2>
            <p>
              You must be at least 13 years old (or 16 in certain EEA jurisdictions) to use MindShift. By using the
              App, you represent and warrant that you meet the minimum age requirement. If you are under the age of
              majority in your jurisdiction, you must have the consent of a parent or legal guardian.
            </p>
          </section>

          {/* License */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              4. License and Usage Rights
            </h2>
            <p>
              We grant you a limited, non-exclusive, non-transferable, revocable license to download and use the App
              on a compatible Android or iOS device for your personal, non-commercial use, subject to these Terms.
            </p>
            <p className="mt-3">You agree <strong style={{ color: 'var(--text-primary)' }}>not</strong> to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Copy, modify, distribute, or create derivative works of the App</li>
              <li>Reverse engineer, decompile, or disassemble the App</li>
              <li>Attempt to extract the source code of the App</li>
              <li>Remove or alter any proprietary notices or labels on the App</li>
              <li>Use the App for any unlawful or unauthorized purpose</li>
              <li>Interfere with or disrupt the integrity or performance of the App</li>
            </ul>
          </section>

          {/* User Data */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              5. User Data and Privacy
            </h2>
            <p>
              Your use of the App is also governed by our{' '}
              <Link
                to="/mindshift/privacy"
                className="text-teal-500 hover:text-teal-400 underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference. By using the App, you consent to the data
              practices described in the Privacy Policy.
            </p>
            <p className="mt-3">
              Most planning and journal data remains device-local. Account identity, subscription status, optional
              Pro sync data, and consent-controlled diagnostics may be processed by the services described in the
              Privacy Policy. Cloud sync remains off until you explicitly enable it.
            </p>
          </section>

          {/* Subscriptions */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              6. Subscriptions and purchases
            </h2>
            <p>
              MindShift offers Pro features through subscriptions processed by Apple or Google and managed in the App
              through RevenueCat:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>
                The store shows the price, billing period, trial or introductory terms, and effective timing before
                you confirm a purchase or plan change.
              </li>
              <li>
                Recurring subscriptions renew unless you cancel them through the store account that made the purchase.
              </li>
              <li>
                Cancellation, refunds, payment methods, billing history, renewal, grace periods, and plan-change timing
                remain controlled by Apple or Google under their terms.
              </li>
              <li>
                Deleting your MindShift account does not cancel or refund a store subscription. Cancel it separately
                before deletion if you do not want it to renew.
              </li>
              <li>
                Pro access follows the entitlement currently reported by the store through RevenueCat. Restore is
                available only while signed in to the matching MindShift and store accounts.
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              7. Intellectual Property
            </h2>
            <p>
              The App and its original content, features, and functionality are owned by the developer of MindShift
              and are protected by international copyright, trademark, and other intellectual property laws. The
              MindShift name, logo, and all related names, logos, product and service names, designs, and slogans are
              our trademarks or trade dress.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              8. Disclaimers
            </h2>
            <p>
              The App is provided on an <strong style={{ color: 'var(--text-primary)' }}>"as is"</strong> and{' '}
              <strong style={{ color: 'var(--text-primary)' }}>"as available"</strong> basis without warranties of any
              kind, whether express or implied, including but not limited to implied warranties of merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>
            <p className="mt-3">We do not warrant that:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>The App will function uninterrupted, securely, or error-free</li>
              <li>The results obtained from the App will be accurate or reliable</li>
              <li>Any defects in the App will be corrected</li>
              <li>The App will be compatible with all devices or operating system versions</li>
            </ul>
            <p className="mt-3">
              MindShift is not a medical or mental health tool. It is not intended to diagnose, treat, cure, or
              prevent any condition. If you are experiencing mental health difficulties, please seek help from a
              qualified professional.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              9. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, the developer of MindShift shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data,
              use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Your access to, use of, or inability to use the App</li>
              <li>Any unauthorized access to or alteration of your data</li>
              <li>Any third-party content or conduct in connection with the App</li>
              <li>Any loss of data stored on your device</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              10. Termination
            </h2>
            <p>
              You may stop using the App at any time by uninstalling it from your device. We may terminate or suspend
              your access to the App at any time, without prior notice, for conduct that we believe violates these
              Terms or is harmful to other users, us, or third parties, or for any other reason at our sole
              discretion.
            </p>
            <p className="mt-3">
              Ending use, uninstalling the App, deleting a MindShift account, and cancelling a store subscription are
              separate actions. Use the account-deletion flow for account-bound data, remove device-only data on each
              device, and manage billing with Apple or Google.
            </p>
          </section>

          {/* Store terms */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              11. App store terms
            </h2>
            <p>
              Your download, purchase, subscription, refund, and use of the store are also subject to the applicable
              Apple App Store or Google Play terms. Apple and Google are not responsible for MindShift support or its
              content except where their terms or applicable law provide otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              12. Account deletion
            </h2>
            <p>
              You may permanently delete your MindShift account through the App or start a support-assisted request on the{' '}
              <Link to="/mindshift/delete-account" className="text-teal-500 hover:text-teal-400 underline underline-offset-2">
              public account-deletion page
              </Link>. Support verifies account ownership before fulfilling a web request. Successful deletion removes
              the account and account-bound data described in the Privacy Policy. It does not cancel a store
              subscription or remotely erase data stored only on your devices. If Sign in with Apple cannot be revoked
              automatically, you must stop using MindShift in your Apple Account settings.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              13. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws. For users in the
              European Economic Area (EEA), nothing in these Terms affects your statutory rights as a consumer under
              the applicable consumer protection laws in your country of residence.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              14. Severability
            </h2>
            <p>
              If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining
              provisions shall continue in full force and effect. The invalid provision shall be modified to the
              minimum extent necessary to make it valid and enforceable.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              15. Changes to These Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material changes by
              updating the "Last updated" date at the top of this page. Your continued use of the App after changes
              are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              16. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please reach out to us through the{' '}
              <Link
                to="/mindshift"
                className="text-teal-500 hover:text-teal-400 underline underline-offset-2"
              >
                contact form
              </Link>{' '}
              on our website.
            </p>
          </section>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t" style={{ borderColor: 'var(--border-soft)' }}>
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            &copy; {year} MindShift. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              to="/mindshift/privacy"
              className="text-xs hover:text-teal-500 transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/mindshift/delete-account"
              className="text-xs hover:text-teal-500 transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
            >
              Delete account
            </Link>
            <Link
              to="/mindshift"
              className="text-xs hover:text-teal-500 transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
            >
              Back to MindShift
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
