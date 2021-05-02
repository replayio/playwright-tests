const { example } = require("../src/helpers");

example(
  `Checkly :: Log in, create an API check, run the API check`,
  async (page, { action }) => {
    await page.setViewportSize({ width: 1280, height: 694 });
    await page.goto("https://app.checklyhq.com?utm_source=monitoring", {
      waitUntil: "domcontentloaded",
    });

    // Wait for Auth0 Universal Login to load
    await action("Login to checkly", async () => {
      await page.waitForSelector(".auth0-lock-submit");
      await page.waitForSelector('input[type="email"]', {
        visible: true,
      });
      await page.waitForSelector('input[type="password"]', {
        visible: true,
      });

      // Login to Auth0
      await page.fill('input[type="email"]', "info+replay@checklyhq.com");
      await page.fill('input[type="password"]', process.env.CHECKLY_PASSWORD);

      await page.click('button[type="submit"]');
    });

    // Wait to get back to Checkly
    await action("Create an API check for google.com", async () => {
      await page.waitForNavigation({ waitUntil: "domcontentloaded" });

      // We are back in Checkly
      await page.waitForSelector(".home-dash-table");

      // Click the new button on the dash
      await page.waitForSelector("#create-check-button__BV_button_");
      await page.click("#create-check-button__BV_button_");

      await page.waitForSelector(".add-api-check-button");
      await page.click(".add-api-check-button");
      await page.waitForSelector(".api-check");

      // Add a URL and run adhoc check
      await page.waitForSelector(".type-ahead-variables");
      await page.click(".type-ahead-variables");
      await page.type(
        ".type-ahead-variables > input.form-control",
        "https://google.com"
      );
    });

    await action("Rn the api check", async () => {
      await page.waitForSelector("#run-request-button");
      await page.click("#run-request-button");

      // Wait for response and close modal
      await page.waitForSelector(".response-body");
      await page.click(
        ".modal-content > #run-check-modal__BV_body_ > div > div > .btn"
      );
    });
  }
);
