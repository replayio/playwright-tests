const { assertElement, assertNotElement, assertNotText, assertText, faker, logInToFacebook } = require("./helpers");

(async () => {
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://codepen.io');
  
  // log in
  await page.click('[data-test-id="login-button"]');
  await page.fill("#login-email-field", "replay+codepen@qawolf.email");
  await page.fill("#login-password-field", process.env.DEFAULT_PASSWORD);
  await page.click("#log-in-button");
  
  // assert log in
  await assertElement(page, '[data-test-id="user-avatar"]');
  
  // create new pen
  await page.click('a[href="/pen/"]');
  
  // add HTML
  await page.waitForSelector("#box-html")
  await assertElement(page, "#box-html");
  await page.waitForTimeout(1000);
  await page.type("#box-html", `
  <html>
    <body>
      <h1>Welcome to Replay!</h1>
    </body>
  </html>
  `);
  
  // assert HTML
  await page.waitForTimeout(4000);
  var frame = page.frame({ name: "CodePen" });
  const output = await frame.$('h1');
  assert(await output.innerText() === "Welcome to Replay!");
  
  // add CSS
  await page.click("#box-css");
  await assertElement(page, "#box-css");
  await page.type("#box-css", `
  h1 {
    color: red;
    font-size: 14px;
  `);
  
  // get styles
  await page.waitForTimeout(3000);
  var frame = page.frame({ name: "CodePen" });
  var style = await frame.evaluate(() => {
    const h1 = document.querySelector('h1');
    return window.getComputedStyle(h1);
  });
  
  // assert CSS
  assert(style.color === "rgb(255, 0, 0)"); // red
  assert(style.fontSize === "14px");
  
  // add JS
  await page.click('#box-js');
  await assertElement(page, "#box-js")
  await page.type("#box-js", `
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('h1').textContent = "Updated by JS";
  `);
  
  // assert JS
  await page.waitForTimeout(4000);
  var frame = page.frame({ name: "CodePen" });
  const output = await frame.$('h1');
  assert(await output.innerText() === "Updated by JS");

  process.exit();
});