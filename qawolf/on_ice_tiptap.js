const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://tiptap.dev/examples/default');
  
  // assert page loaded
  await assertText(page, "Documentation");
  await page.waitForTimeout(3000); // give frames time to load
  
  // grab frames
  const frame1 = page.locator("id=iFrameResizer0");
  const frame2 = page.locator("id=iFrameResizer2");
  const reactButton = page.locator(`${frame1} button >> text=REACT`)
  console.log(reactButton)
  
  // ensure on React tab
  await page.click(reactButton);
  
  // select text
  await frame2.dblclick('p:has-text("this is a ")');
  
  // select more text
  // await page.keyboard.down("Control");
  // await page.keyboard.down("Shift");
  // for(let i = 0; i < 5; i++) {
  // await page.keyboard.press("ArrowRight");
  // }

  process.exit();
})();