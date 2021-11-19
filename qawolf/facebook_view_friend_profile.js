const { assertElement, assertNotElement, assertNotText, assertText, faker, logInToFacebook } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook();
  
  // view friends list
  await page.click('[aria-label="Friends"]');
  await assertText(page, "When you have friend requests or suggestions, you'll see them here.");
  await page.click("text=All Friends");
  
  // assert friends are listed
  await page.waitForSelector("text=2 Friends");
  await assertText(page, "Mike Algdbbidiajhg Martinazzison");
  
  // view friend profile
  await page.click("text=Mike Algdbbidiajhg Martinazzison");
  await assertText(page, "Intro");
  await page.evaluate(() => window.scrollTo(0, 500)); // scroll down
  await assertText(page, "See All Friends");
  
  // view post image
  await page.click('[alt="May be an image of animal and nature"]');
  await assertElement(page, '[aria-label="Photo Viewer"]');
  await assertElement(page, '[aria-label="Zoom In"]');
  await page.click('[aria-label="Close"]');
  
  // view user photos
  await assertText(page, "Find Friends");
  await page.click("text=See All Photos");
  await assertText(page, "Mike's Photos");
  await page.evaluate(() => window.scrollTo(0, 200)); // scroll down
  
  // view individual photo
  await page.click('[alt="May be an image of animal and nature"]');
  await assertElement(page, '[aria-label="Photo Viewer"]');

  process.exit();
});