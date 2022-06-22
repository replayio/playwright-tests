const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://markojs.com/try-online/');
  
  // assert page load
  await assertText(page, '"Frank"');
  
  // clear input
  await page.click('.monaco-editor');
  await page.press('.monaco-editor textarea.inputarea', "Control+A");
  await page.press('.monaco-editor textarea.inputarea', "Backspace");
  
  // assert input cleared
  await assertNotText(page, '"Frank"');
  
  var text = `
  <div class="container">
      <h1>Here is new code</h1> 
    </div>
  `
  
  // add input
  for (let line of text.trim().split("\n")) {
    await page.type('.monaco-editor textarea.inputarea', line);
  
    // clear any auto-complete dialogs
    await page.press('.monaco-editor textarea.inputarea', "Escape");
    await page.press('.monaco-editor textarea.inputarea', "Enter");
  
    // Clear any auto-inserted content
    await page.press('.monaco-editor textarea.inputarea', "Control+Shift+ArrowRight");
    await page.press('.monaco-editor textarea.inputarea', "Delete");
  
    await page.waitForTimeout(100);
  }
  
  // assert new code
  await assertText(page, "Here is new code", { selector: ".preview-output h1" });

  process.exit();
})();