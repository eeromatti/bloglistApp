import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {

  test('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:3001')
    await expect(page.getByRole('button', { name: 'log in' })).toBeVisible();
  })

  test.describe('Login', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3001')
    })
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click();
      await page.getByRole('textbox').first().fill('michael');
      await page.getByRole('textbox').last().fill('nakki');
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText('Michael Scott logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click();
      await page.getByRole('textbox').first().fill('michael');
      await page.getByRole('textbox').last().fill('makkara');
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText('Wrong username or password')).toBeVisible();
    });
  });

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3001');
      await page.getByRole('button', { name: 'log in' }).click();
      await page.getByRole('textbox').first().fill('michael');
      await page.getByRole('textbox').last().fill('nakki');
      await page.getByRole('button', { name: 'login' }).click();
    });

    test('A new blog can be created', async ({ page, request }) => {
      await request.post('http://localhost:3001/api/testing/reset');
      await page.goto('http://localhost:3001');
      await page.getByRole('button', { name: 'new blog' }).click();
      const textboxes = await page.getByRole('textbox').all();
      await textboxes[0].fill('Michael Scottin johtamisoppi');
      await textboxes[1].fill('Michael Scott');
      await textboxes[2].fill('ms.fi');
      await page.getByRole('button', { name: 'create' }).click();
      await expect(page.getByText('Michael Scottin johtamisoppi')).toBeVisible();
    });

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click();
      await expect(page.getByText('likes 0')).toBeVisible();
      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.getByText('likes 1')).toBeVisible();
    });


    test('a blog can be removed by the user', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Poistetaanko blogi Michael Scottin johtamisoppi ?');
        await dialog.accept();
      })
      await page.getByRole('button', { name: 'view' }).click();
      await page.getByRole('button', { name: 'remove' }).click();
      await expect(page.getByText('Michael Scottin johtamisoppi')).not.toBeVisible();
    });
  });
});