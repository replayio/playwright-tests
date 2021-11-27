const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // open Excalidraw
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://excalidraw.com');
  
  // calculate center
  const canvas = await getBoundingClientRect('canvas')(page);
  const center = { x: canvas.x + canvas.width / 2, y: canvas.y + canvas.height / 2 };
  
  // draw a rectangle
  await page.click('[title="Rectangle — R or 2"]');
  await page.mouse.move(center.x, center.y);
  await page.mouse.down();
  await page.mouse.move(center.x + 100, center.y + 100, { steps: 10 });
  await page.mouse.up();
  
  // draw a circle
  await page.click('[title="Ellipse — E or 4"]');
  await page.mouse.move(center.x + 250, center.y);;
  await page.mouse.down();
  await page.mouse.move(center.x + 350, center.y + 100, { steps: 10 });
  await page.mouse.up();
  
  // connect shapes
  await page.click('[title="Arrow — A or 5"]');
  await page.mouse.move(center.x + 100, center.y + 50);;
  await page.mouse.down();
  await page.mouse.move(center.x + 250, center.y + 50, { steps: 10 });
  await page.mouse.up();
  
  // select all shapes
  await page.click('[title="Selection — V or 1"]');
  await page.keyboard.press("Control+A");
  
  // move shapes
  await page.mouse.move(center.x + 250, center.y + 50);
  await page.mouse.down();
  await page.mouse.move(center.x + 100, center.y + 50, { steps: 10 });;
  await page.mouse.up();

  process.exit();
})();