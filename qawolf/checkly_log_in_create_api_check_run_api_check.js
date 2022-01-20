const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.checklyhq.com/');
  
  // log in
  await page.click("text=Log in");
  await page.fill('[aria-label="Email"]', "replay+checkly@qawolf.email");
  await page.fill('[aria-label="Password"]', process.env.DEFAULT_PASSWORD);
  await page.click('[aria-label="Log In"]');
  
  // assert log in
  await assertElement(page, "text=Your dashboard has been created!");
  await assertNotText(page, "Log in")
  
  // create new api check
  await page.click("text=Create new");
  await page.click("text=API check");
  await page.fill('[placeholder="https://api.example.com/products/"]', "https://google.com");
  await page.click("text=Run request");
  
  // assert new api check runs
  await assertElement(page, ".status-code");
  await assertText(page, "200", { selector: ".status-code" });
  await page.click('[aria-describedby="run-check-modal__BV_body_"] .btn-block');

  process.exit();
})();