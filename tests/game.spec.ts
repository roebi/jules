import { test, expect } from '@playwright/test';

test.describe('Roebi Game Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page.getByText('Select Level')).toBeVisible({ timeout: 15000 });
    });

    test('should show level select and start a level', async ({ page }) => {
        const level1 = page.getByRole('button', { name: 'Level 1-1' });
        await expect(level1).toBeVisible();
        await level1.click();
        await expect(page.getByTestId('game-board')).toBeVisible();
        await expect(page.getByText('Back')).toBeVisible();
    });

    test('should play through a level and show completion', async ({ page }) => {
        await page.getByRole('button', { name: 'Level 1-1' }).click();
        for (let i = 0; i < 3; i++) {
            await page.locator('button.bg-yellow-200').first.click();
        }
        await expect(page.getByText('Level Complete!')).toBeVisible();
    });
});
