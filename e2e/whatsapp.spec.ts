import { test, expect } from "@playwright/test";

// Capture window.open calls so we can assert the wa.me deep link without
// actually navigating away to WhatsApp.
const stubWindowOpen = `
  window.__opened = [];
  window.open = (url) => { window.__opened.push(String(url)); return null; };
`;

test.describe("WhatsApp branch picker", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(stubWindowOpen);
  });

  test("hero CTA opens the picker and the doctor CTA builds a wa.me link", async ({ page }) => {
    await page.goto("/en");

    await page.getByRole("button", { name: /Book via WhatsApp/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Head-doctor button is first inside the dialog.
    await dialog.getByRole("button").filter({ hasText: /Dr\. Mohammed/i }).click();

    const opened = await page.evaluate(() => (window as unknown as { __opened: string[] }).__opened);
    expect(opened).toHaveLength(1);
    expect(opened[0]).toMatch(/^https:\/\/wa\.me\/968\d{8}$/);
  });

  test("a branch button builds a valid wa.me link", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: /Book via WhatsApp/i }).click();

    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button").filter({ hasText: /Sohar/i }).click();

    const opened = await page.evaluate(() => (window as unknown as { __opened: string[] }).__opened);
    expect(opened[0]).toBe("https://wa.me/96878110421");
  });

  test("Escape closes the picker", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: /Book via WhatsApp/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});
