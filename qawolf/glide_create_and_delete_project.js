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
  const { browser, context } = await launchReplay({ slowMo: 1000 });
  
  // Navigate to https://www.glideapps.com/
  const page = await context.newPage();
  await page.goto('https://www.glideapps.com/');
  
  // REQ Log into Glide
  // Click the 'Log in' button
  const [page2] = await Promise.all([
    context.waitForEvent('page'),
    page.locator(':text("Log In")').click() // Opens a new tab
  ])
  await page2.waitForLoadState();
  
  // Fill the Email input with GLIDE_EMAIL
  await page2.fill('[placeholder="you@example.com"]', process.env.GLIDE_EMAIL);
  
  // Click the 'Sign in with Email' button
  let after = new Date();
  await page2.click(':text("Sign in with Email")');
  
  const { waitForMessage } = getInbox({ id: 'glide' });
  const { subject, urls, text } = await waitForMessage({ after });
  console.log(subject, urls);
  const url = urls[10];
  console.log(urls[10]);
  
  // Sign in with link sent to email
  await page2.goto(url);
  
  // Assert Able to log into Glide with Replay Browser 
  await expect(page2.locator('text=QA Wolf Replay')).toBeVisible();
  
  
  const projectName = "QA Brunch Project";
  
  // clean up if projectName already exists
  try {
    await expect(page2.locator(`text=${projectName} >> nth=0`)).not.toBeVisible();
  } catch {
    // Hover over project
    await page2.hover('[name="QA Brunch Project"]');
  
    // Click on the kebab icon
    await page2.click('[name="QA Brunch Project"] button');
  
    // Click the 'Delete' button
    await page2.click('[data-testid="Delete"]');
  
    // Type project name in the confirmation prompt 
    await page2.fill('[type="text"]', `delete ${projectName} forever`);
  
    // Click the 'Delete' button on the confirmation prompt
    await page2.click('[data-testid="button-normal"]:has-text("Delete")');
    
    // Assert Project is deleted successfully 
    await expect(page2.locator(`text=${projectName} >> nth=0`)).not.toBeVisible();
  }
  
  // REQ Create Glide project
  // Click the 'New project' button 
  await page2.click('[name="New project"]');
  
  // Fill in project name
  await page2.fill('[placeholder="Project name"]', projectName);
  
  // Select template for the project
  await page2.click(':text("Large screen")');
  
  // Click COntinue
  await page2.click('[data-testid="button-normal"]:has-text("Continue")');
  
  // Select a source (GLide Tabled)
  await page2.click('[src="/images/glide-icon.svg"]');
  
  // CLick Create PRoject button
  await page2.click('[data-testid="button-normal"]:has-text("Create Project")');
  
  // Assert Able to create project
  await expect(page2.locator(`text=${projectName} >> nth=0`)).toBeVisible();
  
  // Click the 'Publish' button
  await page2.click('[data-testid="button-normal"]:has-text("Publish")');
  
  // Click the 'Publish' button on modal
  await page2.click('#portal [data-testid="button-normal"]:has-text("Publish")');
  
  // Assert Able to publish project
  await expect(page2.locator('[data-testid="button-normal"]:has-text("Copy app link")')).toBeVisible();
  
  // Assert 'Publish' button changes to 'Share' button
  await page2.mouse.click(0,0);
  await expect(page2.locator('[data-test="builder-wrapper"] [data-testid="button-normal"] >> nth=0')).toHaveText("Share");
  await expect(page2.locator('[data-test="builder-wrapper"] [data-testid="button-normal"] >> nth=0')).not.toHaveText("Publish");
  
  
  // Navigate to dashboard
  await page2.click('[data-cy="back-to-apps"]');
  
  // REQ Delete Glide project
  // Hover over project
  await page2.hover('[name="QA Brunch Project"]');
  
  // Click on the kebab icon
  await page2.click('[name="QA Brunch Project"] button');
  
  // Click the 'Delete' button
  await page2.click('[data-testid="Delete"]');
  
  // Type project name in the confirmation prompt 
  await page2.fill('[type="text"]', `delete ${projectName} forever`);
  
  // Click the 'Delete' button on the confirmation prompt
  await page2.click('[data-testid="button-normal"]:has-text("Delete")');
  
  // Assert Deleted project is no longer displayed on the dashboard
    await expect(page2.locator(`text=${projectName} >> nth=0`)).not.toBeVisible();
  
  // Call uploadReplay helper
  await uploadReplay();

  process.exit();
})();