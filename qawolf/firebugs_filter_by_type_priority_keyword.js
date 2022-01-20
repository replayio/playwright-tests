const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://firebugs.dev/', { timeout: 120 * 1000 });
  
  // assert data loaded
  await assertNotText(page, "No results found");
  
  await page.fill(".search-field input", "break");
  await page.fill('[placeholder="Search..."]', "break");
  
  // filter bugs
  await page.click('.filters >> text="Type"');
  await page.click('[role=menu] >> text="Bug"');
  
  // get styles
  var style = await page.evaluate(() => {
    const bugItem = document.querySelector('td.type-defect');
    return window.getComputedStyle(bugItem);
  });
  
  // assert filter bugs
  assert(style.borderLeft === "2px solid rgb(234, 60, 61)");
  
  // disable bugs filter
  await page.click('button:has-text("Bug")');
  
  // filter priority
  await page.click('.filters >> text="Priority"');
  await page.click('[role=menu] >> text="P3"');
  
  // assert filter priority
  await assertText(page, "P3", { selector: ".priority" });
  
  // disable priority filter
  await page.click('button:has-text("P3")');
  
  // filter keyword
  await page.click('.filters >> text="Keyword"');
  await page.click('[role=menu] >> text="Good First Bugs"');
  
  // assert filter keyword
  await assertNotText(page, "Browser toolbox breakpoints are not respected when removed in Form Autofill components", { selector: "a.bugSummary" });

  process.exit();
})();