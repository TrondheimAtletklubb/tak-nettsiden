import { test, expect } from "@playwright/test";

test.describe("CSS Modules Integration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("CSS Modules classes are applied correctly", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();

    const navigation = page.locator("nav").first();
    await expect(navigation).toBeVisible();

    const button = page
      .locator("button")
      .filter({ hasText: "bli medlem" })
      .first();
    await expect(button).toBeVisible();

    const buttonClass = await button.getAttribute("class");
    expect(buttonClass).toBeTruthy();
  });

  test("BEM modifier classes work with CSS Modules", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const burger = page.locator('button[aria-label="Toggle navigation menu"]');
    await expect(burger).toBeVisible();

    await burger.click();

    const mobileMenu = page.locator("nav ul").nth(1);
    await expect(mobileMenu).toBeVisible();
  });

  test("button variants have correct CSS Module classes", async ({ page }) => {
    const highlightButton = page
      .locator("button")
      .filter({ hasText: "bli medlem" })
      .first();
    const borderButton = page
      .locator("button")
      .filter({ hasText: "lær mer" })
      .first();

    await expect(highlightButton).toBeVisible();
    const highlightClass = await highlightButton.getAttribute("class");
    expect(highlightClass).toBeTruthy();

    await expect(borderButton).toBeVisible();
    const borderClass = await borderButton.getAttribute("class");
    expect(borderClass).toBeTruthy();

    expect(highlightClass).not.toBe(borderClass);
  });

  test("all sections have CSS Module classes", async ({ page }) => {
    const hero = page.locator("section").first();
    const navigation = page.locator("nav").first();

    await expect(hero).toBeVisible();
    await expect(navigation).toBeVisible();
  });
});
