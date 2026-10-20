import { test, expect } from '@playwright/test'

const pages = [
  { path: '/#/cheesecake', brand: 'CheeseCake Labs — Home' },
  { path: '/#/mindshift', brand: 'MindShift — Home' },
]

for (const pageDef of pages) {
  test(`${pageDef.path} keeps mobile header controls reachable without overlap`, async ({ page }) => {
    await page.goto(pageDef.path)

    const navigation = page.getByRole('navigation')
    const brand = navigation.getByRole('link', { name: pageDef.brand })
    const themeToggle = navigation.getByRole('button', { name: /switch to (light|dark) mode/i })
    const menuToggle = navigation.getByRole('button', { name: /open menu/i })

    await expect(brand).toBeVisible()
    await expect(themeToggle).toBeVisible()
    await expect(menuToggle).toBeVisible()

    for (const control of [themeToggle, menuToggle]) {
      const box = await control.boundingBox()
      expect(box?.width).toBeGreaterThanOrEqual(44)
      expect(box?.height).toBeGreaterThanOrEqual(44)
    }

    const brandBox = await brand.boundingBox()
    const themeBox = await themeToggle.boundingBox()
    const menuBox = await menuToggle.boundingBox()

    expect(brandBox && themeBox && brandBox.x + brandBox.width <= themeBox.x).toBeTruthy()
    expect(themeBox && menuBox && themeBox.x + themeBox.width <= menuBox.x).toBeTruthy()
  })
}
