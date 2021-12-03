const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook();
  
  // view profile
  await page.click('[href="/me/"]');
  
  // wait for profile to load
  await assertText(page, "Posts");
  await page.waitForTimeout(20000);
  
  const posts = await page.$$('[role="article"]');
  
  for (post of posts) {
    const postText = await post.innerText();
    console.log(postText)
  
    // delete all posts except first one
    if (postText.includes("This is my first comment")) {
      break
    }
    else if (!postText.includes("This is my first post!")) {
      const deleteHandle = await post.$('[aria-label="Actions for this post"]');
      await deleteHandle.click();
      await page.click("text=Move to trash");
      await page.waitForSelector("text=Move to Your Trash?");
      await page.click('[aria-label="Move"]');
    }
  }
  
  // create post
  const postContent = `${faker.commerce.productDescription()} ${Date.now()}`;
  await page.click("text=What's on your mind?");
  await page.waitForSelector("text=Create post");
  await page.fill(`[aria-label="What's on your mind?"]`, postContent);
  await page.click('[aria-label="Post"]');
  
  // assert post created
  await assertElement(page, '[aria-label="Just now"]');
  await assertText(page, postContent);
  
  // delete post
  await page.click('[aria-label="Actions for this post"]');
  await page.click("text=Move to trash");
  await page.waitForSelector("text=Move to Your Trash?");
  await page.click('[aria-label="Move"]');
  
  // assert post deleted
  await assertNotText(page, postContent);

  process.exit();
})();