const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook(process.env.FACEBOOK_EMAIL_2, process.env.FACEBOOK_PASSWORD_2);
  
  // open messenger
  await page.click('[aria-label="Messenger"]');
  await assertText(page, "See all in Messenger");
  await assertElement(page, '[aria-label="Search Messenger"]');
  
  // view all in messenger
  await page.click("text=See all in Messenger");
  await assertText(page, "Customize chat");
  
  // view chat conversations
  await assertText(page, "Elizabeth");
  
  // send message
  const message = faker.hacker.phrase();
  await page.fill('[aria-label="Message"]', message);
  await page.click('[aria-label="Press enter to send"]');
  // react to message with emoji
  await page.hover(`[data-testid="message-container"] >> text=${message}`);
  await page.click('[data-testid="message-container"] [aria-label="React"]');
  await page.click('[aria-label="Messages reactions"] img');
  await assertText(page, "1", { selector: '[data-testid="message-container"] [aria-label="1 reaction, see who reacted to this"]' });

  process.exit();
})();