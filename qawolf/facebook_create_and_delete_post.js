const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook();
  
  // view profile
  await page.click('[aria-label="Your profile"]');
  await page.click('[href="/me/"]');
  
  // wait for profile to load
  await assertText(page, "Posts");
  await page.waitForTimeout(5 * 1000);
  
  // Clear existing posts
  const post = page.locator('[role="article"]');
  const savePost = page.locator(':has-text("first post")');
  const moreOptions = page.locator('[aria-label="Actions for this post"]');
  
  //comment on save post is considered 1 
  //occasionally Facebook decides that it should be this selector, 
  //  [[await page.click("text=Delete post");]], instead of anything 
  //  trash-related.
  while ((await post.count()) > 3) {
    if (post.first() !== savePost) {
      await moreOptions.first().click();
  
      try {
        await page.click("text=Move to trash");
        await page.waitForSelector("text=Move to Your Trash?");
        await page.click('[aria-label="Move"]');
      } catch {
        await page.click(':text("Delete post")');
        await page.click('[aria-label="Delete"]');
      }
      
      await page.waitForTimeout(1000);
      await page.mouse.click(0,0);
    }
  }
  
  // create post
  const postContent = `${faker.commerce.productDescription()} ${Date.now()}`;
  await page.click("text=What's on your mind?");
  await page.waitForSelector("text=Create post");
  await page.fill(`[aria-label="What's on your mind?"]`, postContent);
  await page.click('[aria-label="Post"]');
  
  // assert post created
  await assertText(page, postContent);
  
  // delete post
  await page.click('[aria-label="Actions for this post"]');
  await page.click(':text("Move to trash")');
  await page.waitForSelector("text=Move to your trash?");
  await page.click('[aria-label="Move"]');
  
  // assert post deleted
  await assertNotText(page, postContent);
  

  process.exit();
})();