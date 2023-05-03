const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay({ slowMo: 1000 });
  
  // constants for facebook signup
  // const firstName = faker.name.firstName();
  // const lastName = faker.name.lastName();
  // const email = "replay" + "+" + "fb" + faker.random.alphaNumeric(5) +  "@qawolf.email";
  // const emailId = email.split('+')[1].split('@')[0];
  // console.log(emailId);
  // console.log(firstName, lastName, email);
  // const password = "Password123!";
  
  // // sign up for facebook account
  // const page = await context.newPage();
  // await page.goto('https://www.facebook.com/r.php?locale=en_GB&display=page');
  
  // await page.fill('[aria-label="First name"]', firstName);
  // await page.fill('[aria-label="Surname"]', lastName);
  // await page.click('[aria-label="Mobile number or email address"]');
  // await page.keyboard.type(email);
  // await page.waitForTimeout(1000);
  // await page.click('[aria-label="Re-enter email address"]');
  // await page.keyboard.type(email);
  // await page.waitForTimeout(1000);
  // await page.fill('[aria-label="New password"]', password);
  // await page.selectOption('select#year', '1997'); // choose 1999
  // await page.click('[name="sex"][value="2"]'); // male
  // let after = new Date();
  // await page.click('[type="submit"]');
  
  // // get email
  // const { waitForMessage } = getInbox({ id: emailId });
  // const { subject } = await waitForMessage({ after });
  // console.log(subject);
  
  
  
  // log in to Facebook
  const { page } = await logInToFacebook(
    process.env.FACEBOOK_EMAIL_5,
    process.env.FACEBOOK_PASSWORD_5,
    context
  );
  await assertText(page, "James");
  
  // go to ads manager
  await page.goto("https://facebook.com/adsmanager/manage");
  
  // view campaigns
  await page.click("#CAMPAIGN_GROUP_AdsClassicTab");
  await assertText(page, "Test Campaign");
  
  // duplicate campaign
  await page.check('[role="presentation"] [type="checkbox"]');
  await page.click("#pe_toolbar >> text=Duplicate");
  await page.waitForSelector("text=Duplicate");
  await page.click("#pe_duplicate_create_button");
  
  // delete duplicate campaign
  await page.click('[aria-pressed="false"]');
  await page.click('[data-testid="campaign-structure-item-action-menu-delete"]');
  await assertText(page, "Do you want to delete the");
  await page.click("text=CancelDelete >> text=Delete");
  
  // navigate to campaigns
  await page.click('button:has-text("Close")');
  await page.click("text=ClosePublish draft items >> text=Close");
  
  // assert navigated to campaigns
  await assertText(page, "Campaigns");
  
  // list and upload the replay
  await uploadReplay();
  

  process.exit();
})();