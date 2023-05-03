const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // Open Replay Browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();
  
  // Navigate to https://wandb.ai/login
  await page.goto("https://wandb.ai/login");
  
  // REQ 01 Log into Wandb.ai
  // Fill the Email input with WANDB_EMAIL
  await page.fill('[aria-label="Email"]', process.env.WANDB_EMAIL);
  
  // Fill the Password input with WANDB_PASSWORD
  await page.fill('[aria-label="Password"]', process.env.WANDB_PASSWORD);
  
  // Click the 'Log In' button
  await page.click('[aria-label="Log In"]');
  
  // Assert Able to log into Wandb with Replay Browser
  await expect(page.locator('[data-test="home-get-started"] h1')).toBeVisible();
  
  // cleanup
  try {
    // check all project
    await page.click('[data-test="nav-profile"]');
    await page.click('[data-test="nav-profile-menu"] :text("Profile")');
    await page.click('[data-test="profile-page-tabs"] :text("Projects")');
    await expect(page.locator(':text-is("new Project")')).not.toBeVisible();
  } catch {
    // delete project
    await page.click('[data-test="profile-page-tabs"] .project-action-menu');
  
    // Select 'Delete Project' option
    await page.click(':text-is("Delete")');
  
    // Click the 'Delete project' button as confirmation
    await page.fill('[placeholder="new Project"]', "new Project");
    await page.click(".red");
  }
  
  // navigate back home
  await page.click('[data-test="compute-graph-provider"] a');
  
  // Act:
  // Click the 'New project' button
  await page.click('[data-test="home-create-project-link"]');
  
  // Fill the 'Project name' field with project name
  await page.fill(
    '[data-test="project-name-field"] [placeholder="gpt-5"]',
    "new Project"
  );
  
  // Click the 'Create project' button
  await page.click(
    '[data-test-num-shadow-server-requests-counter="0"] [data-test="create-project"]'
  );
  
  // Assert:
  // Project name on dashboard matchest name entered
  await expect(
    page.locator('[data-test="compute-graph-provider"] li:text("new Project")')
  ).toBeVisible();
  
  // navigate to projects
  await page.click('[data-test="compute-graph-provider"] :text("Projects")');
  
  // Act:
  // Click on the 'Settings' icon in the top right corner
  await page.click('[data-test="profile-page-tabs"] .project-action-menu');
  
  // Select 'Delete Project' option
  await page.click(':text-is("Delete")');
  
  // Click the 'Delete project' button as confirmation
  await page.fill('[placeholder="new Project"]', "new Project");
  await page.click(".red");
  
  // Assert:
  // Project is no longer listed on the project dashboard
  await expect(
    page.locator('[data-test="compute-graph-provider"] [role="alert"]')
  ).toBeVisible();
  await expect(
    page.locator('[data-test="compute-graph-provider"] [role="alert"]')
  ).not.toBeVisible();
  
  // upload replay
  await uploadReplay();
  

  process.exit();
})();