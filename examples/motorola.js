const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false,
    //slowMo:1000
  });
  const wait={waitUntil:'load'};
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();
  // Go to http://motorola-mobility-en-xp.custhelp.com/app/home
  await page.goto('http://motorola-mobility-en-xp.custhelp.com/app/home');
  await page.wait;
  // Click text=Motorola one macro >> img
  await page.click('div.popular_device:nth-child(1) > div:nth-child(3) > a:nth-child(1)');
 
  // Click text=Motorola one macro >> img
  //await page.click('text=Motorola one macro"');
 
  // assert.equal(page.url(), 'http://motorola-mobility-en-xp.custhelp.com/app/product_page/faqs/p/30,10766,10792/session/L3RpbWUvMTYxNTk3NzI0OC9zaWQvbUk2OXM4NnA%3D#/how_do_i');
  // Click span:has-text("Support")
  await page.click('span:has-text("Support")');
  // assert.equal(page.url(), 'http://motorola-mobility-en-xp.custhelp.com/app/home/');
  // Click text=Moto Mods
  await page.click('text=Moto Mods');
  // Click text=Moto 360 Camera
  await page.click('text=Moto 360 Camera');
  // Click #cs_McpDeviceCategoryDrillDown_7 div div:has-text("Moto 360 Camera")
  await page.click('#cs_McpDeviceCategoryDrillDown_7 div div:has-text("Moto 360 Camera")');

  
  // Go to http://motorola-mobility-en-xp.custhelp.com/app/product_page/faqs/p/9827,10304
  //await page.goto('http://motorola-mobility-en-xp.custhelp.com/app/product_page/faqs/p/9827,10304');
  //await page.waitForTimeout(20000);
  
  // Click text=Visit Now
  await page.click('text=Visit Now');
  // assert.equal(page.url(), 'https://forums.lenovo.com/t5/Motorola-Community/ct-p/MotorolaCommunity');
  // Click .prev.prevStop
  await page.click('.prev.prevStop');
  // Click text=Featured >> i
  await page.click('text=Featured >> i');
  // Click text=See Full Board List >> i
  await page.click('text=See Full Board List >> i');
  // Click text=Soak Test participation
  await page.click('text=Soak Test participation');
  // assert.equal(page.url(), 'https://forums.lenovo.com/t5/motorola-one-fusion/Soak-Test-participation/m-p/5071137');
  // Click :nth-match(:text("Reply"), 2)
  await page.click(':nth-match(:text("Reply"), 2)');
  // assert.equal(page.url(), 'https://passport.lenovo.com/wauthen5/preLogin?lenovoid.action=uilogin&lenovoid.realm=forums.lenovo.com&lenovoid.ctx=aHR0cCUzQSUyRiUyRmZvcnVtcy5sZW5vdm8uY29tJTJGdG9waWMlMkZuZXclMkYxNTAzOSUyRjUwNzExMzclMkY1MjgzNzg0&lenovoid.lang=en_US&lenovoid.uinfo=username&lenovoid.cb=https://forums.lenovo.com/user/authcb&lenovoid.vp=null&lenovoid.display=null&lenovoid_idp=null&lenovoid.source=forums.lenovo.com&lenovoid.thirdname=null&lenovoid.idreinfo=null&lenovoid.autologinname=null&lenovoid.userType=null&lenovoid.sdk=null&lenovoid.oauthstate=null&lenovoid.options=null&lenovoid.hidesocial=null');
  // ---------------------
  await context.close();
  await browser.close();
})();