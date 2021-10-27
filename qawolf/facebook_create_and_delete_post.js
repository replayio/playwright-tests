const { assertElement, assertNotElement, assertNotText, assertText, faker, logInToFacebook } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook();

  // view profile
  await page.click('[href="/me/"]');

  // create post
  const postContent = faker.commerce.productDescription();
  await page.click("text=What's on your mind?");
  await assertText(page, "Create Post");
  await page.fill(`[aria-label="What's on your mind?"]`, postContent);
  await page.click('[aria-label="Post"]');

  // assert post created
  await assertText(page, "Just now");
  await assertText(page, postContent);

  // delete post
  await page.click('[aria-label="Actions for this post"]');
  await page.click("text=Move to trash");
  await assertText(page, "Move to Your Trash?");
  await page.click('[aria-label="Move"]');

  // assert post deleted
  await assertNotText(page, postContent);

  process.exit();
})();
