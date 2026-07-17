import { test, expect } from "@playwright/test";

// Visual-regression baselines are OS-dependent (font rendering differs between
// macOS and CI Linux), so these are tagged @visual and excluded from CI.
// Maintain baselines locally with: npm run test:e2e -- --update-snapshots

const WIDTHS = [320, 768, 1024, 1440];
const PATHS = ["/", "/en", "/ur"];

// Force reveal-on-scroll elements visible and freeze animations so screenshots
// are deterministic regardless of scroll position or timing.
const freezeStyles = `
  .reveal { opacity: 1 !important; transform: none !important; }
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
  }
`;

for (const path of PATHS) {
  for (const width of WIDTHS) {
    test(`@visual full page ${path} @ ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await page.addStyleTag({ content: freezeStyles });
      await page.waitForLoadState("networkidle");

      const name = `${path === "/" ? "home" : path.slice(1)}-${width}.png`;
      await expect(page).toHaveScreenshot(name, {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.02,
      });
    });
  }
}
