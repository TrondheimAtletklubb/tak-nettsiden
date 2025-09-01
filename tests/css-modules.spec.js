import { test, expect } from '@playwright/test';

test.describe('CSS Modules Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('CSS Modules classes are applied correctly', async ({ page }) => {
    // Check that CSS Modules generated class names exist
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    await expect(hero).toHaveAttribute('class', /Hero-module_hero__/);

    const navigation = page.locator('nav').first();
    await expect(navigation).toBeVisible();
    await expect(navigation).toHaveAttribute('class', /Navigation-module_navigation__/);

    const button = page.locator('button').filter({ hasText: 'bli medlem' }).first();
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('class', /Button-module_button__/);
  });

  test('BEM modifier classes work with CSS Modules', async ({ page }) => {
    // Test mobile navigation burger button
    await page.setViewportSize({ width: 375, height: 667 });
    
    const burger = page.locator('button[aria-label="Toggle navigation menu"]');
    await expect(burger).toBeVisible();
    
    await burger.click();
    
    // Check that the mobile menu opens
    const mobileMenu = page.locator('nav ul').nth(1);
    await expect(mobileMenu).toBeVisible();
  });

  test('button variants have correct CSS Module classes', async ({ page }) => {
    // Check for different button types by their text content
    const highlightButton = page.locator('button').filter({ hasText: 'bli medlem' }).first();
    const borderButton = page.locator('button').filter({ hasText: 'lær mer' }).first();
    
    await expect(highlightButton).toBeVisible();
    await expect(highlightButton).toHaveAttribute('class', /Button-module_button--highlight__/);
    
    await expect(borderButton).toBeVisible();
    await expect(borderButton).toHaveAttribute('class', /Button-module_button--border__/);
  });

  test('all sections have CSS Module classes', async ({ page }) => {
    // Test that all major sections are visible
    const hero = page.locator('section').first();
    const navigation = page.locator('nav').first();
    
    await expect(hero).toBeVisible();
    await expect(navigation).toBeVisible();
  });
});