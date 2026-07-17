import { test, expect } from "@playwright/test";

test.describe("language routing", () => {
  test("/ serves Arabic (RTL) by default", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page).toHaveTitle(/مكة حجامة/);
  });

  test("/en serves English (LTR)", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page).toHaveTitle(/Mekka Hijama/);
  });

  test("/ur serves Urdu (RTL)", async ({ page }) => {
    await page.goto("/ur");
    await expect(page.locator("html")).toHaveAttribute("lang", "ur");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page).toHaveTitle(/مکہ حجامہ/);
  });

  test("legacy ?lang=en permanently redirects to /en", async ({ page }) => {
    const response = await page.goto("/?lang=en");
    expect(page.url()).toMatch(/\/en$/);
    expect(response?.status()).toBe(200); // after following the 308
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("switching language updates dir and pathname", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

    // The desktop language switcher exposes an EN button.
    await page.getByRole("button", { name: "EN", exact: true }).first().click();

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page).toHaveURL(/\/en$/);
  });

  test("English page has no leftover Arabic in the About badges", async ({ page }) => {
    await page.goto("/en");
    // These strings only appear if the i18n leak regressed.
    await expect(page.getByText("طبيعي 100٪")).toHaveCount(0);
    await expect(page.getByText("100% Natural").first()).toBeVisible();
  });
});
