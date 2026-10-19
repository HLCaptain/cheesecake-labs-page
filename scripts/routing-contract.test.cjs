const assert = require('node:assert/strict')
const { readFile } = require('node:fs/promises')
const { createServer } = require('node:http')
const { resolve, extname, sep } = require('node:path')
const { before, after, test } = require('node:test')
const { chromium } = require('@playwright/test')

// Serve the real build. Browser traffic outside this local server is blocked;
// tests do not submit forms or send telemetry to any production service.
const root = resolve(__dirname, '../dist')
const historyMode = process.env.CF_PAGES === '1'
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.woff2': 'font/woff2' }
let browser, server, origin
before(async () => {
  server = createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
      const file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`)
      if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return }
      let body, type
      try { body = await readFile(file); type = types[extname(file)] || 'application/octet-stream' }
      catch {
        if (extname(file)) { res.writeHead(404).end(); return }
        body = await readFile(resolve(root, 'index.html')); type = 'text/html'
      }
      res.writeHead(200, { 'Content-Type': type }); res.end(body)
    } catch { res.writeHead(500).end() }
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  origin = `http://127.0.0.1:${server.address().port}`
  browser = await chromium.launch()
})
after(async () => {
  await browser?.close()
  if (server) await new Promise(resolve => server.close(resolve))
})

async function withPage(run, storageBlocked = false) {
  const context = await browser.newContext({ serviceWorkers: 'block' })
  try {
    await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
    if (storageBlocked) await context.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Storage unavailable', 'SecurityError') } })
    })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await run(page)
    assert.deepEqual(errors, [], 'The built app raised an uncaught browser error')
  } finally { await context.close() }
}

for (const path of ['/mindshift', '/mindshift/privacy', '/mindshift/terms', '/cheesecake']) {
  test(`direct entry and refresh: ${path}`, () => withPage(async page => {
    await page.goto(origin + (historyMode ? path : '/#' + path))
    await page.locator('h1').first().waitFor({ state: 'visible' })
    await page.reload()
    await page.locator('h1').first().waitFor({ state: 'visible' })
    await page.waitForFunction(expected => document.querySelector('link[rel="canonical"]')?.href === expected, 'https://cheesecakelabs.dev' + path)
    assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'), 'https://cheesecakelabs.dev' + path)
  }))
}

test('legacy links retain their destination and query', () => withPage(async page => {
  await page.goto(origin + '/?utm_source=contract#/mindshift/privacy')
  await page.locator('h1').first().waitFor({ state: 'visible' })
  const url = new URL(page.url())
  assert.equal(url.search, '?utm_source=contract')
  assert.equal(historyMode ? url.pathname : url.hash, historyMode ? '/mindshift/privacy' : '#/mindshift/privacy')
}))

test('route changes remain same-document, including back and forward', () => withPage(async page => {
  await page.goto(origin + (historyMode ? '/mindshift' : '/#/mindshift'))
  await page.locator('h1').first().waitFor({ state: 'visible' })
  await page.evaluate(() => { window.__routingMarker = 'same-document' })
  const href = historyMode ? '/cheesecake' : '#/cheesecake'
  await page.locator(`a[href="${href}"]`).first().click()
  await page.waitForURL(url => historyMode ? url.pathname === '/cheesecake' : url.hash === '#/cheesecake')
  assert.equal(await page.evaluate(() => window.__routingMarker), 'same-document')
  await page.goBack()
  await page.waitForURL(url => historyMode ? url.pathname === '/mindshift' : url.hash === '#/mindshift')
  await page.goForward()
  await page.waitForURL(url => historyMode ? url.pathname === '/cheesecake' : url.hash === '#/cheesecake')
}))

test('disabled browser storage does not prevent rendering', () => withPage(async page => {
  await page.goto(origin + (historyMode ? '/mindshift' : '/#/mindshift'))
  await page.locator('h1').first().waitFor({ state: 'visible' })
}, true))

test('legacy normalization rejects external redirects, unknown routes and ordinary anchors', async () => {
  const { resolveLegacyHashRoute } = await import('../src/routing.ts')
  for (const hash of ['#ms-features', '#//example.com/mindshift', '#/unknown', '#/\\example.com/mindshift', '#https://example.com']) assert.equal(resolveLegacyHashRoute(hash), null)
  assert.equal(resolveLegacyHashRoute('#/mindshift/privacy', '?source=old'), '/mindshift/privacy?source=old')
  assert.equal(resolveLegacyHashRoute('#/cheesecake?source=inner#contact', '?source=outer'), '/cheesecake?source=inner#contact')
})

test('built crawler files and root canonical are real static assets', async () => {
  const [robots, sitemap, html] = await Promise.all(['robots.txt', 'sitemap.xml', 'index.html'].map(path => readFile(resolve(root, path), 'utf8')))
  assert(robots.includes('Sitemap: https://cheesecakelabs.dev/sitemap.xml'))
  assert(!robots.includes('<html'))
  assert(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'))
  assert(sitemap.includes('<loc>https://cheesecakelabs.dev/</loc>'))
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1)
})
