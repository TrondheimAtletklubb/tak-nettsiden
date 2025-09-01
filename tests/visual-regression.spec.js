import { test, expect } from "@playwright/test";

test.describe("Visual Regression Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("homepage should look correct", async ({ page }) => {
    await expect(page).toHaveScreenshot("homepage.png");
  });

  test("hero section should look correct", async ({ page }) => {
    const hero = page.locator('[class*="hero"]').first();
    await expect(hero).toHaveScreenshot("hero-section.png");
  });

  test("navigation should look correct", async ({ page }) => {
    const nav = page.locator('[class*="navigation"]').first();
    await expect(nav).toHaveScreenshot("navigation.png");
  });

  test("pricing section should look correct", async ({ page }) => {
    const pricing = page.locator("#priser");
    await page.evaluate(
      (element) => element.scrollIntoView(),
      await pricing.elementHandle()
    );
    await expect(pricing).toHaveScreenshot("pricing-section.png");
  });

  test("mobile navigation should work", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const burgerButton = page.locator('[class*="navigation__burger"]');

    await expect(
      page.locator('[class*="navigation"]').first()
    ).toHaveScreenshot("mobile-nav-closed.png");

    await burgerButton.click();
    await expect(
      page.locator('[class*="navigation"]').first()
    ).toHaveScreenshot("mobile-nav-open.png");
  });

  test("buttons should look correct", async ({ page }) => {
    const buttons = page.locator('[class*="button"]');
    await expect(buttons.first()).toHaveScreenshot("button-primary.png");
  });

  test("theme toggle should work", async ({ page }) => {
    await expect(page).toHaveScreenshot("light-theme.png");

    const themeToggle = page.locator('[class*="theme-toggle"]');
    await themeToggle.click();
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot("dark-theme.png");
  });
});
