async function loginToGoogle(email, password, { step, page }) {
  await step("logging into google", async () => {
    await page.click(
      ':is(button:has-text("Sign in with Google"), button:has-text("Continue with Google"))'
    );

    await page.fill('input[aria-label="Email or phone"]', email);
    await page.click("//button[normalize-space(.)='Next']/div[2]");
    await page.press('input[aria-label="Enter your password"]', "Enter");
    await page.fill('input[aria-label="Enter your password"]', password);
    await page.click("//button[normalize-space(.)='Next']/div[2]");
  });
}

module.exports = { loginToGoogle };
