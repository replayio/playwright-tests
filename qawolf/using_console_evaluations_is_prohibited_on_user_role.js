const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  //BUG: https://qa-wolf.monday.com/boards/2150171022/pulses/3013582019?term=potentially%20wrong%20team
  
  // log in
  const { page } = await logIn({ userId: 7 }); // User
  //const { page } = await logIn({ userId: 10 }); // Developer
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click(":text-is('Time Travel')");
  await page.click("text=ViewerDevTools");
  
  // enter console evaluation
  await assertNotText(
    page,
    "Evaluations are only available for Developers in the Team plan."
  );
  await page.click("pre");
  await page.keyboard.type('window.querySelectorAll("timeout")');
  await page.keyboard.press("Enter");
  
  // assert user can't use console evaluation
  await assertText(
    page,
    "Evaluations are only available for Developers in the Team plan."
  );
  
  await logOut(page);
  

  process.exit();
})();