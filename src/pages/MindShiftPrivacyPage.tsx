import { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface MindShiftPrivacyPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function MindShiftPrivacyPage({ theme, onToggleTheme }: MindShiftPrivacyPageProps) {
  useEffect(() => {
    document.title = 'Privacy Policy — MindShift'
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null
    if (link) link.href = '/favicon-mindshift.svg'
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
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-teal-500/10 transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.95l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          Last updated: March {year}
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
              (the "App"), available on the{' '}
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-400 underline underline-offset-2"
              >
                Google Play Store
              </a>
              .
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
              3.1 Locally Stored Data
            </h3>
            <p>
              MindShift stores all your personal preferences, app blocking schedules, activity suggestions, and usage
              data <strong style={{ color: 'var(--text-primary)' }}>locally on your device</strong>. This data never
              leaves your device and is not transmitted to our servers or any third parties. This includes:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>App blocking configurations and schedules</li>
              <li>Activity preferences and suggestions</li>
              <li>Usage statistics and habit tracking data</li>
              <li>App settings and customization preferences</li>
            </ul>

            <h3 className="text-base font-medium mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              3.2 Crash and Debug Analytics
            </h3>
            <p>
              To improve the stability and performance of MindShift, we collect anonymized crash reports and debug
              analytics. This data may include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Device type and operating system version</li>
              <li>App version and build number</li>
              <li>Crash logs and error stack traces</li>
              <li>General usage patterns (e.g., which features are used most frequently)</li>
            </ul>
            <p className="mt-2">
              This data is collected in an anonymized form and cannot be used to personally identify you. The legal
              basis for this processing under GDPR is our <strong style={{ color: 'var(--text-primary)' }}>legitimate interest</strong> (Article
              6(1)(f) GDPR) in maintaining and improving the App.
            </p>

            <h3 className="text-base font-medium mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              3.3 Subscription Data (Future)
            </h3>
            <p>
              In the future, MindShift may offer subscription-based features managed through RevenueCat. If
              subscriptions are introduced, RevenueCat may process:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>An anonymous user identifier for subscription management</li>
              <li>Purchase history and subscription status</li>
              <li>Transaction receipts (processed through Google Play)</li>
            </ul>
            <p className="mt-2">
              RevenueCat acts as a data processor on our behalf. You can review RevenueCat's privacy policy at{' '}
              <a
                href="https://www.revenuecat.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-400 underline underline-offset-2"
              >
                revenuecat.com/privacy
              </a>
              . We will update this Privacy Policy before introducing subscription features.
            </p>
          </section>

          {/* How We Use Your Data */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              4. How We Use Your Data
            </h2>
            <p>We use the limited data we collect for the following purposes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>App improvement:</strong> Analyzing crash reports and
                debug analytics to identify and fix bugs, improve performance, and enhance user experience.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Service delivery:</strong> Processing subscription
                purchases and managing access to premium features (when available).
              </li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              5. Data Sharing and Third Parties
            </h2>
            <p>
              We do not sell, trade, or rent your personal data. We may share limited anonymized data with the
              following third-party services:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Crash and analytics providers:</strong> To receive
                anonymized crash reports and usage analytics for app improvement.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>RevenueCat</strong> (future): To manage subscription
                purchases and entitlements.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Google Play:</strong> For app distribution,
                updates, and purchase processing.
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
                your personal data. Since most data is stored locally, you can delete it by clearing the app data or
                uninstalling the App.
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
              Locally stored data remains on your device until you clear the app data or uninstall MindShift.
              Anonymized crash and analytics data is retained only for as long as necessary to fulfill the purposes
              described in this policy, typically no longer than 24 months.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              8. Data Security
            </h2>
            <p>
              We take appropriate technical and organizational measures to protect your data. Since most of your data
              is stored locally on your device, it benefits from your device's built-in security features (e.g.,
              device encryption, screen lock). Anonymized analytics data is transmitted using industry-standard
              encryption (TLS/SSL).
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
              Anonymized crash and analytics data may be processed in countries outside the EEA. Where such transfers
              occur, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs)
              approved by the European Commission, to protect your data in accordance with GDPR requirements.
            </p>
          </section>

          {/* Google Play */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              11. Google Play Store
            </h2>
            <p>
              MindShift is distributed through the{' '}
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-400 underline underline-offset-2"
              >
                Google Play Store
              </a>
              . By downloading the App, you also agree to Google Play's{' '}
              <a
                href="https://play.google.com/intl/en_us/about/play-terms/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-400 underline underline-offset-2"
              >
                Terms of Service
              </a>
              . Google may collect certain data as described in{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-400 underline underline-offset-2"
              >
                Google's Privacy Policy
              </a>
              .
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              12. Changes to This Privacy Policy
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
              13. Contact Us
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
          <div className="flex items-center gap-6">
            <Link
              to="/mindshift/terms"
              className="text-xs hover:text-teal-500 transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
            >
              Terms &amp; Conditions
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
