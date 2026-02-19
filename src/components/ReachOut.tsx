import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react'

interface FormData {
  name: string
  company: string
  email: string
  description: string
  budget: string
}

interface FormErrors {
  name?: string
  company?: string
  email?: string
  description?: string
  budget?: string
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const budgetOptions = [
  { value: '', label: 'Select budget range' },
  { value: '10k-50k', label: '$10k – $50k' },
  { value: '50k-200k', label: '$50k – $200k' },
  { value: '200k+', label: '$200k+' },
]

const INITIAL_FORM: FormData = {
  name: '',
  company: '',
  email: '',
  description: '',
  budget: '',
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!data.company.trim()) errors.company = 'Company is required'
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!data.description.trim()) errors.description = 'Project description is required'
  if (data.description.trim().length < 20) errors.description = 'Please provide at least 20 characters'
  if (!data.budget) errors.budget = 'Please select a budget range'
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
    setTouched({ name: true, company: true, email: true, description: true, budget: true })
    const newErrors = validate(formData)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setFormState('submitting')
    // Simulate async submission (replace with FormSpree or your backend)
    setTimeout(() => {
      setFormState('success')
      setFormData(INITIAL_FORM)
      setTouched({})
      setErrors({})
    }, 1500)
  }

  const fieldClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl bg-[#1a1a24] border text-cream text-sm placeholder-cream-muted/40 transition-all duration-200 focus:bg-[#22222f] ${
      touched[field] && errors[field]
        ? 'border-red-500/50 focus:border-red-500/70'
        : 'border-white/8 focus:border-amber-500/50'
    }`

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 bg-[#0d0d14] relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-amber-500/5 bottom-0 right-0" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Copy */}
          <div>
            <div className="animate-on-scroll delay-100">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-6 tracking-wide uppercase">
                Get Started
              </span>
            </div>
            <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight text-cream mb-6 leading-tight">
              Ready to ship{' '}
              <span className="text-gradient">something great?</span>
            </h2>
            <p className="animate-on-scroll delay-300 text-cream-muted text-lg leading-relaxed mb-10">
              Tell us about your project and we'll get back to you within 24 hours
              with a tailored proposal. No sales fluff — just honest, expert advice.
            </p>

            {/* Features list */}
            <ul className="animate-on-scroll delay-400 flex flex-col gap-4" role="list">
              {[
                'Response within 24 hours',
                'Dedicated project manager from day one',
                'Flexible engagement models — fixed price or retainer',
                'NDA available upon request',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-cream-muted">
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
            <div className="relative p-8 rounded-2xl border border-white/8 bg-[#111118]">
              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-2">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-cream">Message sent!</h3>
                  <p className="text-cream-muted text-sm max-w-xs">
                    Thanks for reaching out. We'll get back to you within 24 hours with next steps.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-4 px-5 py-2.5 text-sm font-medium rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-colors duration-200"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-cream-muted mb-1.5 uppercase tracking-wide">
                        Full Name <span className="text-amber-500">*</span>
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
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={touched.name && !!errors.name}
                      />
                      {touched.name && errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-400" role="alert">{errors.name}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-xs font-medium text-cream-muted mb-1.5 uppercase tracking-wide">
                        Company <span className="text-amber-500">*</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Acme Corp"
                        className={fieldClass('company')}
                        aria-describedby={errors.company ? 'company-error' : undefined}
                        aria-invalid={touched.company && !!errors.company}
                      />
                      {touched.company && errors.company && (
                        <p id="company-error" className="mt-1 text-xs text-red-400" role="alert">{errors.company}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-xs font-medium text-cream-muted mb-1.5 uppercase tracking-wide">
                      Work Email <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="jane@acme.com"
                      className={fieldClass('email')}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      aria-invalid={touched.email && !!errors.email}
                    />
                    {touched.email && errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">{errors.email}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-xs font-medium text-cream-muted mb-1.5 uppercase tracking-wide">
                      Project Description <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us about what you're building, current challenges, and your timeline..."
                      className={`${fieldClass('description')} resize-none`}
                      aria-describedby={errors.description ? 'description-error' : undefined}
                      aria-invalid={touched.description && !!errors.description}
                    />
                    {touched.description && errors.description && (
                      <p id="description-error" className="mt-1 text-xs text-red-400" role="alert">{errors.description}</p>
                    )}
                  </div>

                  {/* Budget */}
                  <div className="mb-6">
                    <label htmlFor="budget" className="block text-xs font-medium text-cream-muted mb-1.5 uppercase tracking-wide">
                      Budget Range <span className="text-amber-500">*</span>
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${fieldClass('budget')} cursor-pointer`}
                      aria-describedby={errors.budget ? 'budget-error' : undefined}
                      aria-invalid={touched.budget && !!errors.budget}
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {touched.budget && errors.budget && (
                      <p id="budget-error" className="mt-1 text-xs text-red-400" role="alert">{errors.budget}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-amber-500 text-[#0a0a0f] hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2"
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

                  <p className="mt-4 text-xs text-cream-muted text-center">
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
