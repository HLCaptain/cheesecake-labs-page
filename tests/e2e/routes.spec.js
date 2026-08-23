import { test, expect } from '@playwright/test'

const previewOrigin = 'http://127.0.0.1:4173'

const routes = [
  {
    path: '/#/mindshift',
    title: 'MindShift — Digital Wellbeing',
    heading: /Your time,\s+your choice\./,
    favicon: './favicon-mindshift.svg',
  },
  {
    path: '/#/mindshift/privacy',
    title: 'Privacy Policy — MindShift',
    heading: 'Privacy Policy',
    favicon: './favicon-mindshift.svg',
  },
  {
    path: '/#/mindshift/terms',
    title: 'Terms & Conditions — MindShift',
    heading: 'Terms & Conditions',
    favicon: './favicon-mindshift.svg',
  },
  {
    path: '/#/cheesecake',
    title: 'CheeseCake Labs — Next-Gen AI Development',
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

test('footer links navigate between both product pages', async ({ page }) => {
  await page.goto('/#/mindshift')

  await page.getByRole('contentinfo').getByRole('link', { name: 'CheeseCake Labs', exact: true }).click()
  await expect(page).toHaveURL(/#\/cheesecake$/)
  await expect(page.getByRole('heading', { level: 1, name: /Where AI meets\s+thoughtful design\./ })).toBeVisible()

  await page.getByRole('contentinfo').getByRole('link', { name: 'MindShift', exact: true }).click()
  await expect(page).toHaveURL(/#\/mindshift$/)
  await expect(page.getByRole('heading', { level: 1, name: /Your time,\s+your choice\./ })).toBeVisible()
})
