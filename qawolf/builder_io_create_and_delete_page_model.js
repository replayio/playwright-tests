const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();
  
  // Navigate to https://builder.io/login
  await page.goto("https://builder.io/login");
  
  // REQ Log into Builder.io
  // Fill the Work Email input with BUILDERIO_EMAIL
  await page.fill('[data-test-id="login-email-input"] [placeholder="stephanie@mycompany.com"]', "jabersami+replay@gmail.com");
  
  // Fill the Password input with BUILDERIO_PASSWORD
  await page.fill('[data-test-id="login-password-input"] [placeholder="••••••••••"]', "v2ajdbguH23XUnLR");
  
  // Click the 'Submit' button
  await page.click('[data-test-id="login-submit-button"]');
  
  // Assert Able to log into builder.io
  await expect(page.locator('[src="https://cdn.builder.io/static/media/builder-logo.bff0faae.png"]')).toBeVisible();
  
  
  
  // REQ Create a page model
  // Navigate to existing space
  await page.click('[data-test-id="router-container"] :text("Sami Jaber Space")');
  await page.waitForTimeout(2000);
  
  // Hover over Sidebar and click 'Models'
  await page.hover('[src="https://cdn.builder.io/static/media/builder-logo.bff0faae.png"]');
  await page.click(':text("Models")');
  
  // Click the 'Create Model' button
  await page.click('[data-test-id="router-container"] :text("+ Create Model")');
  
  // Click the 'Page' option
  await page.click('[src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F7fbab3d5fa85495c9579710337e3b86b"]');
  
  // Fill the 'Name' input with model name
  const modelName = Date.now() + " Model " + faker.random.alpha(5);
  console.log(modelName);
  await page.fill('[placeholder="e.g. header ad, landing page, homepage"]', modelName);
  
  // Fill the 'Description' input with model description
  await page.fill('[placeholder="e.g. Marketing pages for X domain"]', "Tree Description");
  
  // Assert Model is created with correct name and description
  await page.click('[type="submit"]');
  await expect(page.locator('[data-test-id="router-container"] [type="text"] >> nth=0')).toHaveValue(`${modelName}`);
  await expect(page.locator('[data-test-id="router-container"] [type="text"] >> nth=1')).toHaveValue("Tree Description");
  
  
  
  // REQ Create a new field
  // Click the 'New Field' button
  await page.click('[data-test-id="router-container"] :text("+ New field")');
  
  // Fill the 'Name' input with new Name
  await page.fill('[data-test-id="router-container"] [data-react-beautiful-dnd-draggable="0"] [type="text"]', "newTreeField");
  
  // Select a 'Type' option
  await page.fill('[data-test-id="router-container"] #downshift-0-input', "Text");
  await page.click('[data-test-id="router-container"] #downshift-0-item-0');
  
  // Select a 'Required' option
  await page.click('[data-test-id="router-container"] div:nth-of-type(3) [tabindex="0"][role="button"]');
  await page.click('[data-value="no"]');
  
  // Click the 'Save' button
  await page.click('[data-test-id="router-container"] :text("Save")');
  await page.waitForTimeout(2000);
  
  // Assert Fields save after refresh
  await page.reload();
  await expect(page.locator('text=New tree field')).toBeVisible();
  
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();