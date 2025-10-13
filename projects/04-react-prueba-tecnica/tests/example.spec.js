import { test, expect } from '@playwright/test'
import { CAT_PREFIX_IMAGE_URL } from '../src/services/cats.js'

const APP_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(APP_URL)

  const text = page.locator('p') // assuming your paragraph is a <p>
  const textContent = await text.textContent()
  console.log(textContent)
  await expect(textContent?.length).toBeGreaterThan(0)

  const image = page.locator('img') // select the image element
  await image.waitFor({ state: 'visible' }) // ensure it has loaded
  const imageSrc = await image.getAttribute('src')
  console.log('imageSrc:', imageSrc)

  await expect(imageSrc).toBeTruthy()
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBe(true)
})
