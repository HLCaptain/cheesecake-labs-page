import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react'

interface FormData {
  name: string
  email: string
  interest: string
  description: string
}

interface FormErrors {
  name?: string
  email?: string
  interest?: string
  description?: string
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const interestOptions = [
  { value: '', label: 'What are you interested in?' },
  { value: 'app-development', label: 'App Development' },
  { value: 'ai-consulting', label: 'AI Workflow Consulting' },
  { value: 'general', label: 'General Inquiry' },
]

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  interest: '',
  description: '',
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!data.interest) errors.interest = 'Please select an option'
  const trimmedDescription = data.description.trim()
  if (!trimmedDescription) {
    errors.description = 'Tell us a bit about your project'
  } else if (trimmedDescription.length < 20) {
    errors.description = 'Please provide at least 20 characters'
  }
  return errors
}

export default function ReachOut() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [formState, setFormState] = useState<FormState>('idle')

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el) => {
              el.classList.add('visible')
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name as keyof FormData]) {
      const newErrors = validate({ ...formData, [name]: value })
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const newErrors = validate(formData)
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched({ name: true, email: true, interest: true, description: true })
    const newErrors = validate(formData)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setFormState('submitting')
    setTimeout(() => {
      setFormState('success')
      setFormData(INITIAL_FORM)
      setTouched({})
      setErrors({})
    }, 1500)
  }

  const fieldStyle = {
    backgroundColor: 'var(--bg-surface-hover)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-soft)',
  }

  const fieldClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
      touched[field] && errors[field]
        ? 'ring-1 ring-red-500/50'
        : ''
    }`

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 px-6 relative"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Copy */}
          <div>
            <div className="animate-on-scroll delay-100">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-6 tracking-wide uppercase">
                Let's Talk
              </span>
            </div>
            <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
              Curious?{' '}
              <span className="text-gradient">Let's chat.</span>
            </h2>
            <p className="animate-on-scroll delay-300 text-lg leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
              We're an early-stage studio eager to prove ourselves. Tell us what you're
              working on and we'll share how we might help — no pressure, no sales pitch.
            </p>

            {/* Features list */}
            <ul className="animate-on-scroll delay-400 flex flex-col gap-4" role="list">
              {[
                'Quick response time',
                'Free initial consultation',
                'NDA available upon request',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span
                    className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <svg className="w-2.5 h-2.5 text-amber-500" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Form */}
          <div className="animate-on-scroll delay-300">
            <div
              className="relative p-8 rounded-2xl"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}
            >
              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-2">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Message sent!</h3>
                  <p className="text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
                    Thanks for reaching out. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-4 px-5 py-2.5 text-sm font-medium rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500/20 transition-colors duration-200"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                        Name <span className="text-amber-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Jane Smith"
                        className={fieldClass('name')}
                        style={fieldStyle}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={touched.name && !!errors.name}
                      />
                      {touched.name && errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-400" role="alert">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                        Email <span className="text-amber-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="jane@example.com"
                        className={fieldClass('email')}
                        style={fieldStyle}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={touched.email && !!errors.email}
                      />
                      {touched.email && errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Interest */}
                  <div className="mb-4">
                    <label htmlFor="interest" className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                      What are you interested in? <span className="text-amber-500">*</span>
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${fieldClass('interest')} cursor-pointer`}
                      style={fieldStyle}
                      aria-describedby={errors.interest ? 'interest-error' : undefined}
                      aria-invalid={touched.interest && !!errors.interest}
                    >
                      {interestOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {touched.interest && errors.interest && (
                      <p id="interest-error" className="mt-1 text-xs text-red-400" role="alert">{errors.interest}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                      Tell us more <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="What are you building? What challenges are you facing?"
                      className={`${fieldClass('description')} resize-none`}
                      style={fieldStyle}
                      aria-describedby={errors.description ? 'description-error' : undefined}
                      aria-invalid={touched.description && !!errors.description}
                    />
                    {touched.description && errors.description && (
                      <p id="description-error" className="mt-1 text-xs text-red-400" role="alert">{errors.description}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-amber-500 text-[#0a0a0f] hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                    aria-busy={formState === 'submitting'}
                  >
                    {formState === 'submitting' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>

                  <p className="mt-4 text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                    By submitting, you agree to our{' '}
                    <a href="#" className="text-amber-500/70 hover:text-amber-500 transition-colors">Privacy Policy</a>.
                    No spam — ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
