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
  openPopup
} = require("./helpers");

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
  
  // clean up team-wolf if present
  try {
    await expect(page.locator('[data-test="team-link"]:has-text("team-wolf")')).not.toBeVisible();
  } catch {
  await page.click('[data-test="team-link"]:has-text("team-wolf")');
  await page.click('[data-test-num-shadow-server-requests-counter="0"] [data-test="team-settings-link"]');
  await page.click('[data-test="compute-graph-provider"] :text("Delete Team")');
  await page.fill('[placeholder="team-wolf"]', "team-wolf");
  await page.click(':text("Confirm")');
  await page.waitForTimeout(3000);
  await page.reload();
  await expect(page.locator(':text("team-wolf"):below(:text("Teams"))')).not.toBeVisible();
  await expect(page).toHaveURL('https://wandb.ai/home');
  }
  
  
  // REQ 02 Create wandb team
  // Click the 'Create a new team' button 
  await page.click('[data-test="create-team-link"]');
  
  // Fill the 'Team name' field with team name
  await page.fill('[data-test-num-shadow-server-requests-counter="0"] [data-test="team-name-input"]', "team-wolf");
  
  // Select options for your team 
  await page.click('[data-test="compute-graph-provider"] :text("Work")');
  
  // Click the 'Create team' button
  await page.click('[data-test="compute-graph-provider"] .button');
  
  await page.click('[data-test="compute-graph-provider"] :text("Finish")');
  await page.click(':text("Close")');
  
  // Assert Team is successfully created and displayed on dashboard
  await expect(page.locator('[data-test="compute-graph-provider"] #searchNav')).toContainText("team-wolf");
  
  // Select team you want to delete
  await page.click('[data-test-num-shadow-server-requests-counter="0"] [data-test="team-settings-link"]');
  
  // REQ 03 Delete wandb team
  // Select 'Delete Team'
  await page.click('[data-test="compute-graph-provider"] :text("Delete Team")');
  
  // Click the 'Delete team' button in dialog box
  await page.fill('[placeholder="team-wolf"]', "team-wolf");
  await page.click(':text("Confirm")');
  
  // Assert Team is no longer in dashboard and redirected to home page
  await page.waitForTimeout(3000);
  await page.reload();
  await expect(page.locator(':text("team-wolf"):below(:text("Teams"))')).not.toBeVisible();
  await expect(page).toHaveURL('https://wandb.ai/home');
  
  // Call uploadReplay helper
  await uploadReplay();

  process.exit();
})();