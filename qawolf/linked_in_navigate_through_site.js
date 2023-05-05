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
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup,
  runCommand
} = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  // const { context, browser } = await launch();
  const page = await context.newPage();
  
  
  // REQ 01 Log into LinkedIn
  const { page } = await logInToLinkedin(context);
  
  // Assert able to log into linkedIn
  await expect(page.locator(':text("Start a post")')).toBeVisible();
  
  // Navigate to a Linkedin user's profile
  await page.fill('[aria-label="Search"]', "Ryan Roslansky");
  await page.click(':text("• 3rd+ • CEO at LinkedIn")');
  await page.click('text=View full profile');
  await expect(page.locator("h1")).toHaveText("Ryan Roslansky");
  await expect(page.locator(".text-body-medium")).toHaveText("CEO at LinkedIn")
  await expect(page.locator(".pvs-header__title >> nth=0")).toContainText("Featured");
  await expect(page.locator(".pvs-header__title >> nth=1")).toContainText("Activity");
  await expect(page.locator(".pvs-header__title >> nth=2")).toContainText("About");
  await expect(page.locator(".pvs-header__title >> nth=4")).toContainText("Experience");
  await page.waitForTimeout(5000);
  
  // Navigate to Linkedin Home
  await page.click('[data-test-app-aware-link=""]:has-text("Home")');
  await expect(page.locator(':text("Start a post")')).toBeVisible();
  await expect(page.locator(".feed-shared-social-actions").first()).toContainText("Like");
  await expect(page.locator(".feed-shared-social-actions").first()).toContainText("Comment");
  await expect(page.locator(".feed-shared-social-actions").first()).toContainText("Repost");
  await expect(page.locator(".feed-shared-social-actions").first()).toContainText("Send");
  await page.waitForTimeout(5000);
  
  // Navigate to my network
  await page.click('[data-test-app-aware-link=""]:has-text("My Network")');
  await expect(page.locator('text=Manage my network')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to 'Connections'
  await page.click('[type="people"]');
  await expect(page.locator('text=You don’t have any connections yet.')).toBeVisible();
  await expect(page.locator('text=Discover fresh ideas and jobs on LinkedIn through your connections and their networks. Find your first connection below.')).toBeVisible();
  await page.click('[data-test-app-aware-link=""]:has-text("My Network")');
  await expect(page.locator('text=Manage my network')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to 'Contacts'
  await page.click(':text("Contacts")');
  await expect(page.locator('text=0 Imported Contacts')).toBeVisible();
  await expect(page.locator('text=Connect with people you know, fast')).toBeVisible();
  await page.click('[data-test-app-aware-link=""]:has-text("My Network")');
  await expect(page.locator('text=Manage my network')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to 'Following & followers'
  await page.click(':text("Following & followers")');
  await expect(page.locator('text=You are not following anyone')).toBeVisible();
  await expect(page.locator('text=Follow creators based on your interest to see their latest news and updates.')).toBeVisible();
  await page.click('[data-test-app-aware-link=""]:has-text("My Network")');
  await expect(page.locator('text=Manage my network')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to 'Groups'
  await page.click('[type="group"]');
  await expect(page.locator('text=Discover groups')).toBeVisible();
  await expect(page.locator('text=Find other trusted communities that share and support your goals.')).toBeVisible();
  await page.click('[data-test-app-aware-link=""]:has-text("My Network")');
  await expect(page.locator('text=Manage my network')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to 'Pages'
  await page.click('[type="company"]');
  await expect(page.locator('text=6 Pages')).toBeVisible();
  await expect(page.locator('a >> text=LinkedIn').first()).toBeVisible();
  await expect(page.locator('a >> text=Salesforce')).toBeVisible();
  await expect(page.locator('a >> text=Google')).toBeVisible();
  await expect(page.locator('a >> text=Microsoft')).toBeVisible();
  await expect(page.locator('a >> text=LinkedIn News')).toBeVisible();
  await expect(page.locator('a >> text=Fake, Inc')).toBeVisible();
  await page.click('[data-test-app-aware-link=""]:has-text("My Network")');
  await expect(page.locator('text=Manage my network')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to 'Newsletter'
  await page.click('[type="newspaper"]');
  await expect(page.locator('text=1 newsletter')).toBeVisible();
  await expect(page.locator('text=In the Loop')).toBeVisible();
  await expect(page.locator('text=A Newsletter highlighting trending topics, conversations and tools to help navigate the changing world of work.')).toBeVisible();
  await page.click('[data-test-app-aware-link=""]:has-text("My Network")');
  await expect(page.locator('text=Manage my network')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to Linkedin Jobs
  await page.click('[data-test-app-aware-link=""]:has-text("Jobs")');
  await expect(page.locator(':text("Recommended for you"):visible')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to 'Job alerts'
  await page.click('[data-test-app-aware-link=""]:has-text("Job alerts")');
  await expect(page.locator('text=You have no job alerts yet')).toBeVisible();
  await expect(page.locator('text=Flip the switch on a job search page to create a new alert.')).toBeVisible();
  await page.click('[data-test-modal-close-btn=""]');
  await expect(page.locator(':text("Recommended for you"):visible')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to 'Demonstrate skills'
  await page.click('[data-test-app-aware-link=""]:has-text("Demonstrate skills")');
  await expect(page.locator('text=Considering a new career? Pick a role, then show your transferable skills through written or video responses for recruiters to consider.')).toBeVisible();
  await expect(page.locator('text=Take Skill Assessments')).toBeVisible();
  await page.click('[data-test-app-aware-link=""]:has-text("Jobs")');
  await expect(page.locator(':text("Recommended for you"):visible')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to 'Interview prep'
  await page.click('[data-test-app-aware-link=""]:has-text("Interview prep")');
  await expect(page.locator('text=Tell me about yourself.').first()).toBeVisible();
  await expect(page.locator('text=What is your greatest strength?')).toBeVisible();
  await expect(page.locator('text=What is your greatest weakness?')).toBeVisible();
  await page.click('[data-test-app-aware-link=""]:has-text("Jobs")');
  await expect(page.locator(':text("Recommended for you"):visible')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to 'Resume Builder'
  await page.click('[data-test-app-aware-link=""]:has-text("Resume Builder")');
  await expect(page.locator('text=Get insights for formatting issues, keywords, and more.')).toBeVisible();
  await expect(page.locator('text=Resumes you build on LinkedIn will appear here.')).toBeVisible();
  await page.click('[data-test-modal-close-btn=""]');
  await expect(page.locator(':text("Recommended for you"):visible')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Navigate to 'Job seeker guidance'
  await page.click('[data-test-app-aware-link=""]:has-text("Job seeker guidance")');
  await expect(page.locator("#tab_0")).toHaveText("I want to improve my resume");
  await expect(page.locator("#tab_1")).toHaveText("I want to improve my LinkedIn Profile page");
  await expect(page.locator("#tab_2")).toHaveText("I want to get a referral");
  await page.goBack()
  await expect(page.locator(':text("Recommended for you"):visible')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();