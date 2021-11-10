const { assertElement, assertNotElement, assertNotText, assertText, faker, logInToFacebook } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook();
  
  // view friend profile
  await page.goto("https://www.facebook.com/profile.php?id=100074229491087");
  await assertText(page, "Mike Algdbbidiajhg Martinazzison");
  
  // ensure post is not liked
  const unlikeButton = await page.$('[aria-label="Remove Like"]');
  if (unlikeButton) unlikeButton.click();
  
  // like post
  await page.click('[aria-label="Like"]');
  await assertElement(page, '[aria-label="Like: 1 person"]');
  
  // unlike post
  await page.click('[aria-label="Remove Like"]');
  await assertElement(page, '[aria-label="Like"]');
  
  // comment on post
  const comment = faker.hacker.phrase();
  await page.fill('[aria-label="Write a comment"]', comment);
  await page.keyboard.press("Enter");
  
  // assert comment saved
  await page.waitForFunction(() => {
    const commentInput = document.querySelector('[aria-label="Write a comment"]');
    return commentInput && commentInput.innerText.length <= 1;
  });
  await assertText(page, comment);
  
  // delete comment on post
  await page.hover(`text=${comment}`);
  await page.click('[aria-label="Edit or delete this"]');
  await page.click("[role='menu'] >> text=Delete");
  await assertText(page, "Are you sure");
  await page.click('[aria-label="Delete"]');
  await assertNotText(page, comment);

  process.exit();
});