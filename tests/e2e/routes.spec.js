import { test, expect } from '@playwright/test'

const previewOrigin = 'http://127.0.0.1:4173'
const missingConfigOrigin = 'http://127.0.0.1:4174'

const routes = [
  {
    path: '/#/mindshift',
    title: 'MindShift — Digital Wellbeing',
    description: 'MindShift helps you interrupt distracting app use and replace it with intentional activities that fit your routine.',
    heading: /Your time,\s+your choice\./,
    favicon: './favicon-mindshift.svg',
  },
  {
    path: '/#/mindshift/privacy',
    title: 'Privacy Policy — MindShift',
    description: 'How MindShift handles device-local data, optional Pro sync, subscriptions, diagnostics, and account deletion.',
    heading: 'Privacy Policy',
    favicon: './favicon-mindshift.svg',
  },
  {
    path: '/#/mindshift/terms',
    title: 'Terms & Conditions — MindShift',
    description: 'Terms for using MindShift, including subscriptions, privacy, account deletion, and app-store responsibilities.',
    heading: 'Terms & Conditions',
    favicon: './favicon-mindshift.svg',
  },
  {
    path: '/#/mindshift/delete-account',
    title: 'Delete Account — MindShift',
    description: 'Request deletion of your MindShift account and learn what is removed, what remains on your device, and how store subscriptions are handled.',
    heading: 'Delete your MindShift account',
    favicon: './favicon-mindshift.svg',
  },
  {
    path: '/#/cheesecake',
    title: 'CheeseCake Labs — Next-Gen AI Development',
    description: 'CheeseCake Labs pairs AI agents with senior developers to build polished frontends, apps, and practical AI workflows.',
    heading: /Where AI meets\s+thoughtful design\./,
    favicon: './favicon.svg',
  },
]

for (const route of routes) {
  test(`${route.path} renders without broken first-party resources`, async ({ page }) => {
    const failedResources = []
    const browserErrors = []
    page.on('response', (response) => {
      const url = new URL(response.url())
      if (url.origin === previewOrigin && response.status() >= 400) {
        failedResources.push(`${response.status()} ${url.pathname}`)
      }
    })
    page.on('requestfailed', (request) => {
      const url = new URL(request.url())
      if (url.origin === previewOrigin) {
        failedResources.push(`${request.failure()?.errorText ?? 'failed'} ${url.pathname}`)
      }
    })
    page.on('pageerror', (error) => browserErrors.push(error.message))

    await page.goto(route.path, { waitUntil: 'networkidle' })

    await expect(page).toHaveTitle(route.title)
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', route.favicon)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', route.description)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', route.title)
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', route.description)
    if (route.path === '/#/mindshift/privacy' || route.path === '/#/mindshift/terms' || route.path === '/#/mindshift/delete-account') {
      const box = await page.getByRole('button', { name: /switch to (light|dark) mode/i }).boundingBox()
      expect(box?.width).toBeGreaterThanOrEqual(44)
      expect(box?.height).toBeGreaterThanOrEqual(44)
    }
    expect(failedResources).toEqual([])
    expect(browserErrors).toEqual([])
  })
}

test('root redirects to MindShift', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveURL(/#\/mindshift$/)
  await expect(page.getByRole('heading', { level: 1, name: /Your time,\s+your choice\./ })).toBeVisible()
})

test('MindShift footer links reach both legal routes', async ({ page }) => {
  await page.goto('/#/mindshift')

  await page.getByRole('contentinfo').getByRole('link', { name: 'Privacy Policy' }).click()
  await expect(page).toHaveURL(/#\/mindshift\/privacy$/)

  await page.getByRole('contentinfo').getByRole('link', { name: 'Terms & Conditions' }).click()
  await expect(page).toHaveURL(/#\/mindshift\/terms$/)
})

test('MindShift exposes a public account-deletion route', async ({ page }) => {
  await page.goto('/#/mindshift')

  await page.getByRole('contentinfo').getByRole('link', { name: 'Delete account' }).click()
  await expect(page).toHaveURL(/#\/mindshift\/delete-account$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Delete your MindShift account' })).toBeVisible()
  await expect(page.getByText('Never send us your password, provider authorization code, or internal user ID')).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Subscriptions are store-managed' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Apple subscription help' })).toHaveAttribute('href', 'https://support.apple.com/118428')
  await expect(page.getByRole('link', { name: 'Google Play subscription help' })).toHaveAttribute('href', 'https://support.google.com/googleplay/answer/7018481')
})

test('configured support deletion requests validate fields and submit no user id', async ({ page }) => {
  let submittedBody = null
  await page.route('https://formspree.io/f/**', async (route) => {
    submittedBody = route.request().postDataJSON()
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
  })
  await page.goto('/#/mindshift/delete-account')

  await page.getByLabel('MindShift account email').fill('not-an-email')
  await page.getByLabel('Sign-in provider').selectOption('google')
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: 'Request permanent deletion' }).click()
  await expect(page.getByText('Enter the email address used for your MindShift account.')).toBeVisible()
  expect(submittedBody).toBeNull()

  await page.getByLabel('MindShift account email').fill('person@example.com')
  await page.getByLabel('Sign-in provider').evaluate((select) => {
    const option = document.createElement('option')
    option.value = 'github'
    option.textContent = 'GitHub'
    select.append(option)
  })
  await page.getByLabel('Sign-in provider').selectOption('github')
  await page.getByRole('button', { name: 'Request permanent deletion' }).click()
  await expect(page.getByText('Select Google or Apple as your MindShift sign-in provider.')).toBeVisible()
  expect(submittedBody).toBeNull()

  await page.getByLabel('Sign-in provider').selectOption('google')
  await page.getByRole('button', { name: 'Request permanent deletion' }).click()
  await expect(page.getByText('Request sent')).toBeVisible()
  expect(submittedBody).toEqual({
    requestType: 'MindShift account deletion',
    email: 'person@example.com',
    signInProvider: 'google',
    message: 'Please verify ownership and permanently delete this MindShift account and its account-bound data.',
  })
  expect(submittedBody).not.toHaveProperty('userId')
})

test('missing Formspree configuration fails closed', async ({ page }) => {
  await page.goto(`${missingConfigOrigin}/#/mindshift/delete-account`)

  await page.getByLabel('MindShift account email').fill('person@example.com')
  await page.getByLabel('Sign-in provider').selectOption('apple')
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: 'Request permanent deletion' }).click()

  await expect(page.getByText('The support request could not be sent. Please try again later or use the in-app deletion flow.')).toBeVisible()
})

test('account-deletion controls expose required and disabled states', async ({ page }) => {
  await page.goto('/#/mindshift/delete-account')

  const email = page.getByLabel('MindShift account email')
  const provider = page.getByLabel('Sign-in provider')
  const confirmation = page.getByRole('checkbox')
  const submit = page.getByRole('button', { name: 'Request permanent deletion' })

  await expect(email).toHaveAttribute('required', '')
  await expect(provider).toHaveAttribute('required', '')
  await expect(confirmation).toHaveAttribute('required', '')
  await expect(submit).toBeDisabled()

  await email.fill('person@example.com')
  await provider.selectOption('google')
  await confirmation.check()
  await expect(submit).toBeEnabled()

  for (const linkName of ['Apple subscription help', 'Google Play subscription help', 'Sign in with Apple help']) {
    const box = await page.getByRole('link', { name: linkName }).boundingBox()
    expect(box?.height).toBeGreaterThanOrEqual(44)
  }
})

test('privacy and terms describe current account services and deletion', async ({ page }) => {
  await page.goto('/#/mindshift/privacy')

  await expect(page.getByRole('heading', { level: 3, name: '3.3 Optional Pro sync' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: '12. Account deletion' })).toBeVisible()
  await expect(page.getByText('Supabase Auth processes your account identifier')).toBeVisible()

  await page.goto('/#/mindshift/terms')
  await expect(page.getByRole('heading', { level: 2, name: '6. Subscriptions and purchases' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: '12. Account deletion' })).toBeVisible()
  await expect(page.getByText('Deleting your MindShift account does not cancel or refund a store subscription')).toBeVisible()
})

test('footer links navigate between both product pages', async ({ page }) => {
  await page.goto('/#/mindshift')

  await page.getByRole('contentinfo').getByRole('link', { name: 'CheeseCake Labs', exact: true }).click()
  await expect(page).toHaveURL(/#\/cheesecake$/)
  await expect(page.getByRole('heading', { level: 1, name: /Where AI meets\s+thoughtful design\./ })).toBeVisible()

  await page.getByRole('contentinfo').getByRole('link', { name: 'MindShift', exact: true }).click()
  await expect(page).toHaveURL(/#\/mindshift$/)
  await expect(page.getByRole('heading', { level: 1, name: /Your time,\s+your choice\./ })).toBeVisible()
})
