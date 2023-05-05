const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
} = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();

  const page = await context.newPage();
  await page.goto(
    "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Basic_scissoring"
  );

  // grab frame
  var frame = await (
    await page.waitForSelector(
      "#frame_clearing_the_drawing_buffer_when_scissoring_applies"
    )
  ).contentFrame();

  // assert viewing page
  await expect(page.locator(".code-example").first()).toContainText(
    "<p>Result of scissoring.</p>"
  );

  // go to Clearing by clicking
  await page.goto(
    "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Clearing_by_clicking"
  );

  // grab frame
  var frame = await (
    await page.waitForSelector(
      "#frame_clearing_the_rendering_context_with_random_colors"
    )
  ).contentFrame();

  // change color
  await frame.click("#color-switcher");

  // goto scissor animation
  await page.goto(
    "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Scissor_animation"
  );

  // grab frame
  var frame = await (
    await page.waitForSelector("#frame_animation_with_scissoring")
  ).contentFrame();

  // assert on scissor animation page
  await expect(page.locator("text=Scissor animation").first()).toBeVisible();

  // start animation
  await frame.click("#animation-onoff");

  // assert some text
  await expect(
    page.locator(
      "text=A simple WebGL example in which we have some animation fun using scissoring and clearing operations."
    )
  ).toBeVisible();

  // goto texture from code
  await page.goto(
    "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Textures_from_code"
  );

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
