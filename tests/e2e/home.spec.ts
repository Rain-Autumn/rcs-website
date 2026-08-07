import { expect, test } from '@playwright/test';

test('welcome portal opens the language gate then the French RCS Core', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('WELCOME PORTAL', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'ENTER' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'SELECT SYSTEM LANGUAGE' })).toHaveCount(0);

  await page.getByRole('button', { name: 'ENTER' }).click();

  await expect(page.getByRole('heading', { name: 'SELECT SYSTEM LANGUAGE' })).toBeVisible();
  await expect(page.getByRole('button', { name: /FRANÇAIS/ })).toBeVisible();
  await page.getByRole('button', { name: /FRANÇAIS/ }).click();

  await expect(page).toHaveURL(/\/fr/);
  await expect(page.getByRole('heading', { name: /RAIJU CLOUD SYSTEM/i }).first()).toBeVisible();
  await expect(page.getByText('RCS CORE', { exact: true }).filter({ visible: true }).first()).toBeVisible();
  await expect(page.getByText('DEBIAN 13', { exact: true }).filter({ visible: true }).first()).toBeVisible();
  await expect(page.getByText('RAIJU EMBLEM / CORE MARK', { exact: true }).filter({ visible: true }).first()).toBeVisible();
});

test('English and Dutch routes render translated institutional copy', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByText('One structure. Multiple domains.', { exact: true })).toBeVisible();
  await page.goto('/nl');
  await expect(page.getByText('Eén structuur. Meerdere domeinen.', { exact: true })).toBeVisible();
});

test('mobile experience has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr');
  await page.locator('#intelligence').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: /DRAGON ONE/i })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBeFalsy();
});

test('mobile Research page has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr/research');
  await expect(page.getByRole('heading', { name: 'Recherche documentée. Résultats transparents.' })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBeFalsy();
});

test('team routes render Hugues Henrotte and certifications', async ({ page }) => {
  await page.goto('/fr/team');
  await expect(page.getByRole('heading', { name: 'Hugues Henrotte' })).toBeVisible();
  await expect(page.getByText('AWS Knowledge: Cloud Essentials - Training Badge')).toBeVisible();
  await expect(page.getByText('Microsoft Applied Skills : Migrer des charges de travail SQL Server vers Azure SQL Database')).toBeVisible();
});

test('mobile Team page has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr/team');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBeFalsy();
});

test('private identity is never rendered', async ({ page }) => {
  for (const route of ['/', '/fr', '/en', '/nl']) {
    await page.goto(route);
    await expect(page.locator('body')).not.toContainText(['Capitaine', 'Autumn'].join(' '));
  }
});
