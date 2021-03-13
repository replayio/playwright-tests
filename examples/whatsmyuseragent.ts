import { it, expect } from "@playwright/test";

it("Visit whatsmyuseragent", async ({ page }) => {
  await page.goto("http://whatsmyuseragent.org/");
  await page.waitForNavigation();
});
