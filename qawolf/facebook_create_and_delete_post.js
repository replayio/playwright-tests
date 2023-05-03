const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // log in to Facebook
  // const { page } = await logInToFacebook(
  //   process.env.FACEBOOK_EMAIL_5,
  //   process.env.FACEBOOK_PASSWORD_5,
  //   context
  // );
  
  // constants for facebook signup
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = "replay" + "+" + "fb" + faker.random.alphaNumeric(5) +  "@qawolf.email";
  const emailId = email.split('+')[1].split('@')[0];
  console.log(emailId);
  console.log(firstName, lastName, email);
  const password = "Password123!";
  
  // sign up for facebook account
  const page = await context.newPage();
  await page.goto('https://www.facebook.com/r.php?locale=en_GB&display=page');
  
  await page.fill('[aria-label="First name"]', firstName);
  await page.fill('[aria-label="Surname"]', lastName);
  await page.click('[aria-label="Mobile number or email address"]');
  await page.keyboard.type(email);
  await page.waitForTimeout(1000);
  await page.click('[aria-label="Re-enter email address"]');
  await page.keyboard.type(email);
  await page.waitForTimeout(1000);
  await page.fill('[aria-label="New password"]', password);
  await page.selectOption('select#year', '1997'); // choose 1999
  await page.click('[name="sex"][value="2"]'); // male
  let after = new Date();
  await page.click('[type="submit"]');
  
  // get email
  const { waitForMessage } = getInbox({ id: emailId });
  const { subject } = await waitForMessage({ after });
  console.log(subject);
  
  
  
  // view profile
  await page.click('[aria-label="Your profile"]');
  await page.click('[href="/me/"]');
  
  // wait for profile to load
  await assertText(page, "Posts");
  await page.waitForTimeout(5 * 1000);
  
  // Clear existing posts
  const post = page.locator('h3:has-text("Ruth Algdbcegijggi Gree")');
  const savePost = page.locator(':has-text("first post")');
  const moreOptions = page.locator('[aria-label="Actions for this post"]');
  
  while ((await moreOptions.count()) > 1) {
    await moreOptions.last().click();
    try {
      await page.click(':text("Move to trash")');
      await page.click('[aria-label="Move"]');
    } catch {
      await page.click(':text("Delete post")');
      await page.click('[aria-label="Delete"]');
    }
    await page.waitForTimeout(5000);
  }
  
  // create post
  const postContent = `${faker.commerce.productDescription()} ${Date.now()}`;
  await page.click("text=What's on your mind?");
  await page.waitForSelector("text=Create post");
  await page.fill(`[aria-label="What's on your mind?"]`, postContent);
  await page.click('[aria-label="Post"]');
  
  // assert post created
  await assertText(page, postContent);
  await page.waitForTimeout(2000);
  // delete post
  await page.mouse.click(0, 0);
  await page.click('[aria-label="Actions for this post"]');
  await page.click("text=Move to archive");
  
  // assert post deleted
  await expect(page.locator(`:text("${postContent}")`)).not.toBeVisible();
  
  // list and upload the replay
  await uploadReplay();
  

  process.exit();
})();