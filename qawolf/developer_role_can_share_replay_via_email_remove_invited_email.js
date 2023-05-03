const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // helper
  const { email, waitForMessage } = getInbox({ new: true });
  
  // log in
  const { browser, page } = await logIn({ userId: 10 });
  await assertText(page, "Library");
  
  // go to replay
  await page.click("text=Time Travel QA8");
  
  // assert replay loaded
  await expect(page.locator(':text("Time Travel QA8")')).toBeVisible();
  await assertText(page, "DevTools");
  
  // go to share settings
  await page.click("text=ios_shareShare");
  
  // assert share settings loaded
  await assertText(page, "Add People");
  await assertText(page, "Copy Link");
  
  // delete invitees
  const collaborator = page.locator("text=replay+");
  while (await collaborator.count()) {
    await collaborator.first().hover();
    await page.click(".delete");
    await page.waitForTimeout(1000);
  }
  
  // invite collaborator
  await page.fill('[placeholder="Email address"]', email);
  await page.click("form button");
  await assertText(page, "Invited");
  const { subject, urls } = await waitForMessage({ timeout: 5 * 60 * 1000 });
  
  // assert email in people list
  const invitedEmail = page.locator(email);
  await assertText(page, email);
  await assertText(page, "Collaborator");
  
  // assert email arrived
  expect(subject).toEqual("You've been invited to view Time Travel QA8");
  
  /* 
    The encrypted invite link shows up in a random spot in the email urls array.
    The rest of the test is handled by a loop that opens a new page using each encrypted url
    and asserts text to find the replay name and "DevTools". Once it passes the text assertions,
    it breaks the for loop.
  */
  // assert invite link works
  let pageNumber = 2;
  let newPage = `page${pageNumber}`;
  for (let i = 4; i < urls.length; i++) {
    const newPageNumber = await browser.newPage();
    await newPageNumber.goto(urls[i]);
    pageNumber += 1;
  
    try {
      await assertText(newPageNumber, "Time Travel QA8", { timeout: 7 * 1000 });
      await assertText(newPageNumber, "DevTools", { timeout: 7 * 1000 });
  
      // found the correct page - time to break the loop
      return;
    } catch {
      if (newPage === `page${urls.length - 1}`) {
        throw new Error();
      } else {
        continue;
      }
    }
  }
  

  process.exit();
})();