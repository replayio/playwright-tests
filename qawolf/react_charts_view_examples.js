const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://react-charts.tanstack.com/docs/overview');
  
  // navigate to example
  await page.click("text=Simple");
  
  // grab frame
  var frame = await(await page.waitForSelector('[title="tannerlinsley/react-charts: simple"]')).contentFrame();
  
  // assert viewing frame
  await assertText(frame, "Line");

  process.exit();
})();