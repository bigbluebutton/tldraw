import test, { Page, expect } from '@playwright/test'
import { setupPage } from '../shared-e2e'

let page: Page

test.describe('Toolbar accessible names', () => {
	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage()
		await setupPage(page)
	})

	test('main toolbar tool buttons announce the translated title, not the raw key', async () => {
		const buttons = page.locator('.tlui-toolbar button[data-tool]')
		const count = await buttons.count()
		expect(count).toBeGreaterThan(0)

		for (let i = 0; i < count; i++) {
			const button = buttons.nth(i)
			const title = await button.getAttribute('title')
			await expect(button).not.toHaveAccessibleName(/^tool\./)
			await expect(button).toHaveAccessibleName(title!.trim())
		}
	})

	test('draw tool announces its translated label', async () => {
		await expect(page.getByTestId('tools.draw')).toHaveAccessibleName(/^Draw\b/)
	})

	test('overflow grid tool buttons announce the translated title, not the raw key', async () => {
		await page.getByTestId('tools.more').click()

		const buttons = page.locator('.tlui-buttons__grid button[data-tool]')
		const count = await buttons.count()
		expect(count).toBeGreaterThan(0)

		for (let i = 0; i < count; i++) {
			const button = buttons.nth(i)
			const title = await button.getAttribute('title')
			await expect(button).not.toHaveAccessibleName(/^tool\./)
			await expect(button).toHaveAccessibleName(title!.trim())
		}

		await page.getByTestId('tools.more').click()
	})
})
