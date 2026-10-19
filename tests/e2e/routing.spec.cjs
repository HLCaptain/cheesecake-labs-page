const { readFileSync } = require('node:fs')
const { test: base, expect } = require('@playwright/test')
const historyMode = process.env.CF_PAGES === '1'
const entry = path => historyMode ? path : '/#' + path
const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.route('**/*', route => new URL(route.request().url()).origin === new URL(baseURL).origin ? route.continue() : route.abort())
    await use(page)
    expect(errors).toEqual([])
  },
})

for (const path of ['/mindshift', '/mindshift/privacy', '/mindshift/terms', '/cheesecake']) {
  test(`direct entry, refresh and metadata: ${path}`, async ({ page }) => {
    await page.goto(entry(path))
    await expect(page.locator('h1').first()).toBeVisible()
    await page.reload()
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://cheesecakelabs.dev' + path)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://cheesecakelabs.dev' + path)
  })
}

test('legacy links retain destination and query', async ({ page }) => {
  await page.goto('/?utm_source=contract#/mindshift/privacy')
  await expect(page.locator('h1').first()).toBeVisible()
  const url = new URL(page.url())
  expect(url.search).toBe('?utm_source=contract')
  expect(historyMode ? url.pathname : url.hash).toBe(historyMode ? '/mindshift/privacy' : '#/mindshift/privacy')
})

test('navigation stays same-document through back and forward', async ({ page }) => {
  await page.goto(entry('/mindshift'))
  await expect(page.locator('h1').first()).toBeVisible()
  await page.evaluate(() => { window.__routingMarker = true })
  await page.locator(`a[href="${historyMode ? '/cheesecake' : '#/cheesecake'}"]`).first().click()
  await page.waitForURL(url => historyMode ? url.pathname === '/cheesecake' : url.hash === '#/cheesecake')
  await page.goBack()
  await page.waitForURL(url => historyMode ? url.pathname === '/mindshift' : url.hash === '#/mindshift')
  await page.goForward()
  await page.waitForURL(url => historyMode ? url.pathname === '/cheesecake' : url.hash === '#/cheesecake')
  expect(await page.evaluate(() => window.__routingMarker)).toBe(true)
})

test('unavailable storage does not prevent rendering', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Storage unavailable', 'SecurityError') } })
  })
  await page.goto(entry('/mindshift'))
  await expect(page.locator('h1').first()).toBeVisible()
})

test('legacy external targets never navigate off-site', async ({ page, baseURL }) => {
  await page.goto('/#//example.invalid/mindshift')
  await expect(page.locator('h1').first()).toBeVisible()
  expect(new URL(page.url()).origin).toBe(new URL(baseURL).origin)
})

test('crawler files and homepage canonical are built', () => {
  expect(readFileSync('dist/robots.txt', 'utf8')).toBe('User-agent: *\nAllow: /\n\nSitemap: https://cheesecakelabs.dev/sitemap.xml\n')
  expect(readFileSync('dist/sitemap.xml', 'utf8')).toContain('<loc>https://cheesecakelabs.dev/</loc>')
  expect(readFileSync('dist/index.html', 'utf8').match(/rel="canonical"/g)).toHaveLength(1)
})
