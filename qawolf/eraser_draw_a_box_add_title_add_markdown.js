const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // open Eraser
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://app.tryeraser.com');
  
  // draw a box
  await page.click('[data-testid="whiteboard-container"] >> text=R');
  const whiteboard = await getBoundingClientRect('[data-testid="whiteboard-container"]')(page);
  await page.mouse.move(whiteboard.left + 100, whiteboard.top + 100);
  await page.mouse.down();
  await page.mouse.move(whiteboard.left + 200, whiteboard.top + 200, { steps: 20 });
  await page.mouse.up();
  
  // add title
  await page.click('[data-testid="header-editable-workspace-title"]');
  await page.type('[data-testid="header-editable-workspace-title"]', "Replay Example");
  
  // add markdown
  const markdown = `## Here is some markdown
  > does it work?
  It _definitely_ does!`;
  await page.type('#note-body-editor [contenteditable="true"]', markdown);

  process.exit();
})();