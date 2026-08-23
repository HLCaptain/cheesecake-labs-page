import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setRouteMetadata } from '../routeMetadata'

interface MindShiftPrivacyPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function MindShiftPrivacyPage({ theme, onToggleTheme }: MindShiftPrivacyPageProps) {
  useEffect(() => {
    setRouteMetadata({
      title: 'Privacy Policy — MindShift',
      description: 'How MindShift handles device-local data, optional Pro sync, subscriptions, diagnostics, and account deletion.',
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
          Privacy Policy
        </h1>
        <p className="text-sm mb-12" style={{ color: 'var(--text-muted)' }}>
          Last updated: August 23, 2026
        </p>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {/* Introduction */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              1. Introduction
            </h2>
            <p>
              MindShift ("we", "our", or "us") is a digital wellbeing application designed to help you build healthier
              habits through customizable app blocking and personalized activity suggestions. This Privacy Policy
              explains how we collect, use, and protect your information when you use the MindShift mobile application
              (the "App") on Android or iOS and the MindShift pages on this website.
            </p>
            <p className="mt-3">
              We are committed to protecting your privacy and complying with the General Data Protection Regulation
              (GDPR) and other applicable data protection laws. Please read this policy carefully to understand how
              we handle your data.
            </p>
          </section>

          {/* Data Controller */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              2. Data Controller
            </h2>
            <p>
              The data controller responsible for your personal data is the developer of MindShift. For any
              privacy-related inquiries, please use the contact form on our{' '}
              <Link to="/mindshift" className="text-teal-500 hover:text-teal-400 underline underline-offset-2">
                website
              </Link>
              .
            </p>
          </section>

          {/* Data We Collect */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              3. Data We Collect
            </h2>

            <h3 className="text-base font-medium mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              3.1 Account and sign-in data
            </h3>
            <p>
              When you sign in with Google or Apple, Supabase Auth processes your account identifier, provider
              identity, email address when the provider supplies it, session data, and a MindShift account UUID. We
              use that UUID to keep account-bound data separated and to connect subscription access to the right
              account.
            </p>

            <h3 className="text-base font-medium mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              3.2 Device-local data
            </h3>
            <p>MindShift keeps the following data on your device:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Goals, habits, tasks, routines, activity suggestions, completions, and journal entries.</li>
              <li>App preferences, onboarding state, diagnostics consent, and sync preference.</li>
              <li>Device-owned blocking and usage history.</li>
              <li>Block rules, interception events, and usage statistics unless you explicitly enable Pro sync.</li>
            </ul>

            <h3 className="text-base font-medium mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              3.3 Optional Pro sync
            </h3>
            <p>
              Cloud sync is off by default and requires a signed-in account, active Pro access, and your explicit
              opt-in. When enabled, Supabase stores your block rules, block-interception events, and app-usage
              statistics under your account UUID. Disabling sync stops automatic synchronization; use account
              deletion to remove the account-bound cloud copy.
            </p>

            <h3 className="text-base font-medium mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              3.4 Subscriptions
            </h3>
            <p>
              Apple or Google processes purchases and payment details. RevenueCat processes your MindShift account
              UUID, receipts, purchase history, subscription status, entitlements, and limited diagnostics needed to
              provide and restore Pro access. Optional subscriber attributes are sent only while Diagnostics is
              enabled. RevenueCat's privacy policy is available at{' '}
              <a href="https://www.revenuecat.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-400 underline underline-offset-2">
                revenuecat.com/privacy
              </a>.
            </p>

            <h3 className="text-base font-medium mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              3.5 Diagnostics
            </h3>
            <p>
              When Diagnostics is enabled, Firebase Analytics, Firebase Crashlytics, and Kotzilla may process an app
              instance or rotated client identifier, app version, platform and device information, feature events,
              crash logs, and error details. MindShift does not intentionally put journal text, activity text, email
              addresses, or selected-app identifiers into analytics events. You can change the Diagnostics preference
              in the App.
            </p>

            <h3 className="text-base font-medium mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              3.6 Website data
            </h3>
            <p>
              When configured, the website sends contact-form submissions to Formspree and uses PostHog for
              landing-page analytics. Do not put sensitive health, journal, or account information in the contact
              form. The public account-deletion page can send your account email, sign-in provider, and deletion
              request to Formspree so support can verify ownership and fulfill the request.
            </p>
          </section>

          {/* How We Use Your Data */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              4. How We Use Your Data
            </h2>
            <p>We process data only as needed for the following purposes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li><strong style={{ color: 'var(--text-primary)' }}>Account access:</strong> Authenticating you and keeping account data separated.</li>
              <li><strong style={{ color: 'var(--text-primary)' }}>Optional sync:</strong> Synchronizing the supported data only after you opt in.</li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>App improvement:</strong> Analyzing crash reports and
                diagnostics to identify and fix bugs, improve performance, and understand feature reliability.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Service delivery:</strong> Processing subscription
                status, restoring purchases, and managing access to Pro features.
              </li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              5. Data Sharing and Third Parties
            </h2>
            <p>
              We do not sell or rent your personal data. The following processors or independent store providers may
              receive the data needed for their role:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Supabase:</strong> Authentication and optional Pro sync.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>RevenueCat:</strong> Subscription status, entitlements,
                restore, and account-bound subscription diagnostics.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Firebase and Kotzilla:</strong> Diagnostics while your
                Diagnostics preference is enabled.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Apple and Google:</strong> Sign-in, distribution,
                purchases, subscription management, and refunds under their own terms.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Formspree and PostHog:</strong> Website contact and
                analytics when those services are configured.
              </li>
            </ul>
          </section>

          {/* GDPR Rights */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              6. Your Rights Under GDPR
            </h2>
            <p>
              If you are located in the European Economic Area (EEA), you have the following rights regarding your
              personal data:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Right of access:</strong> You can request a copy of
                the personal data we hold about you.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Right to rectification:</strong> You can request
                correction of inaccurate personal data.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Right to erasure:</strong> You can request deletion of
                your account-bound personal data through the App or the public{' '}
                <Link to="/mindshift/delete-account" className="text-teal-500 hover:text-teal-400 underline underline-offset-2">
                  account-deletion page
                </Link>. Device-only data must be removed separately on each device.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Right to restrict processing:</strong> You can request
                that we limit how we use your data.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Right to data portability:</strong> You can request
                your data in a structured, machine-readable format.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Right to object:</strong> You can object to the
                processing of your data based on our legitimate interests.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Right to withdraw consent:</strong> Where processing
                is based on consent, you may withdraw it at any time.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us through the contact form on our website. We will
              respond to your request within 30 days as required by GDPR.
            </p>
            <p className="mt-2">
              You also have the right to lodge a complaint with your local data protection supervisory authority if
              you believe your rights have been violated.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              7. Data Retention
            </h2>
            <p>
              Device-local data remains until you remove it in the App, clear app data, or uninstall MindShift.
              Account and synced data remains while your account exists and is removed through account deletion.
              RevenueCat customer data is deleted as part of that flow, but store transaction records and diagnostics
              remain subject to Apple, Google, Firebase, Kotzilla, and applicable legal retention obligations.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              8. Data Security
            </h2>
            <p>
              We use device security controls, authenticated sessions, account ownership checks, row-level access
              controls, and encrypted network transport. No service-role, Apple, or RevenueCat secret is placed in the
              App or this website. No system can be guaranteed completely secure.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              9. Children's Privacy
            </h2>
            <p>
              MindShift is not directed at children under the age of 13 (or 16 in certain EEA jurisdictions). We do
              not knowingly collect personal data from children. If you believe a child has provided us with personal
              data, please contact us and we will take steps to delete such information.
            </p>
          </section>

          {/* International Data Transfers */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              10. International Data Transfers
            </h2>
            <p>
              Our service providers may process data outside your country or the EEA. Where applicable, transfers are
              handled under the provider's contractual and legal transfer safeguards.
            </p>
          </section>

          {/* App stores */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              11. App stores
            </h2>
            <p>
              Apple and Google process store accounts, downloads, purchases, receipts, refunds, and subscriptions
              under their own terms and privacy policies. Deleting MindShift does not itself cancel a store
              subscription.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              12. Account deletion
            </h2>
            <p>
              You can permanently delete your account in MindShift or start a support-assisted request on the{' '}
              <Link to="/mindshift/delete-account" className="text-teal-500 hover:text-teal-400 underline underline-offset-2">
              public deletion page
              </Link>. The in-app flow authenticates directly; support verifies ownership before fulfilling a web
              request. Successful deletion removes the Supabase account, account-bound synced rows, the server
              entitlement snapshot, and the RevenueCat customer record. It does not cancel a store subscription or
              remotely erase device-only data. Apple-linked accounts may also need to stop using MindShift in Sign in
              with Apple settings if automatic revocation is unavailable.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              13. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal
              requirements. We will notify you of any material changes by updating the "Last updated" date at the top
              of this page. We encourage you to review this policy periodically. Continued use of the App after
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              14. Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, or if you wish to exercise your GDPR
              rights, please reach out to us through the{' '}
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
              to="/mindshift/terms"
              className="text-xs hover:text-teal-500 transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
            >
              Terms &amp; Conditions
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
