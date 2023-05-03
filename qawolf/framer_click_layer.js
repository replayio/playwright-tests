const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // test helper
  const { email, waitForMessage } = getInbox({ id: "framer" });
  const after = new Date();
  
  // got to page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://framer.com/projects/f0oJdIOO8ZLQ1iAkKfGX-hvjz5?node=JBLVglfFu-page');
  
  // assert page loaded
  await assertText(page, 'Welcome to Framer');
  
  // sign in
  await page.click("text=Sign in with email instead");
  await page.type('[placeholder="Email"]', email, { delay: 100 });
  await page.click("text=Sign in");
  const { subject, urls } = await waitForMessage({ after });
  
  // assert subject
  assert(subject === 'Your activation link for Framer');
  
  // go to link
  await page.goto(urls[1]);
  
  // assert page loaded
  await assertText(page, 'Layers');
  await assertText(page, 'Modal');
  const drawerButton = page.locator("//*[@id='root']/div[1]/div/div/div/div/div[2]/div/div[2]/div/div[1]/div[3]/div/div/div/div[4]/div/div");
  await expect(drawerButton).toBeVisible();
  const drawerClassNotSelected = await drawerButton.getAttribute('class');
  expect(drawerClassNotSelected.includes('rowSelected_')).toBeFalsy();
  
  // click on drawer layer
  await drawerButton.click();
  const drawerClassSelected = await drawerButton.getAttribute('class');
  expect(drawerClassSelected.includes('rowSelected_')).toBeTruthy();

  process.exit();
})();