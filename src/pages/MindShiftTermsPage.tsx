import { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface MindShiftTermsPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function MindShiftTermsPage({ theme, onToggleTheme }: MindShiftTermsPageProps) {
  useEffect(() => {
    document.title = 'Terms & Conditions — MindShift'
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
          Terms &amp; Conditions
        </h1>
        <p className="text-sm mb-12" style={{ color: 'var(--text-muted)' }}>
          Last updated: March {year}
        </p>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {/* Agreement */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              1. Agreement to Terms
            </h2>
            <p>
              By downloading, installing, or using the MindShift mobile application (the "App") from the{' '}
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-400 underline underline-offset-2"
              >
                Google Play Store
              </a>
              , you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of
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
              on a compatible Android device for your personal, non-commercial use, subject to these Terms.
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
              All personal data (preferences, schedules, activity suggestions) is stored locally on your device. We
              collect anonymized crash reports and debug analytics to improve the App. Please refer to our Privacy
              Policy for full details.
            </p>
          </section>

          {/* Subscriptions */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              6. Subscriptions and Purchases (Future)
            </h2>
            <p>
              MindShift may offer premium features through in-app subscriptions in the future. If subscriptions are
              introduced:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>
                Subscriptions will be processed through{' '}
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:text-teal-400 underline underline-offset-2"
                >
                  Google Play
                </a>{' '}
                and managed via RevenueCat.
              </li>
              <li>
                Payment will be charged to your Google Play account upon confirmation of purchase.
              </li>
              <li>
                Subscriptions will automatically renew unless canceled at least 24 hours before the end of the current
                billing period.
              </li>
              <li>
                You can manage or cancel subscriptions through Google Play Store settings.
              </li>
              <li>
                Refunds are subject to Google Play's refund policies.
              </li>
            </ul>
            <p className="mt-3">
              We will update these Terms before introducing any paid features or subscriptions.
            </p>
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
              Upon termination, all locally stored data can be removed by clearing the app data or uninstalling the App.
            </p>
          </section>

          {/* Google Play */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              11. Google Play Store Terms
            </h2>
            <p>
              In addition to these Terms, your use of the App is subject to the{' '}
              <a
                href="https://play.google.com/intl/en_us/about/play-terms/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-400 underline underline-offset-2"
              >
                Google Play Terms of Service
              </a>
              . You acknowledge that Google is not responsible for the App or its content, and Google has no obligation
              to provide maintenance or support services for the App.
            </p>
            <p className="mt-3">
              In the event of a conflict between these Terms and the Google Play Terms of Service, the Google Play
              Terms of Service shall prevail with respect to your use of Google Play.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              12. Governing Law
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
              13. Severability
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
              14. Changes to These Terms
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
              15. Contact Us
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
          <div className="flex items-center gap-6">
            <Link
              to="/mindshift/privacy"
              className="text-xs hover:text-teal-500 transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
            >
              Privacy Policy
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
