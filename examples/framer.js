const { firefox } = require("playwright");
const browserSession = require("./framer-session.json");

async function login(page) {
  await Promise.all([
    //await page.waitForTimeout(1000),
    //await page.waitForNavigation(/*{ url: 'https://accounts.google.com/o/oauth2/v2/auth/identifier?client_id=494526493439-djlkk2cal7r0lijnrd6en51c9vo4icgp.apps.googleusercontent.com&scope=openid email profile&response_type=code&redirect_uri=https://api.framer.com/auth/google/callback&state=5ed433be-07e7-497e-86d9-04205e0a9a8e&failureRedirect=https://login.framer.com?error=Could%20not%20complete%20authentication&source=framer-web&failureFlash=true&flowName=GeneralOAuthFlow' }*/),
    // goto was missing //
    await page.goto("https://framer.com/projects/f0oJdIOO8ZLQ1iAkKfGX-hvjz5?node=JBLVglfFu-page"),
    await page.waitForTimeout(1000),
    await page.click('text="Continue with Google"'),
  ]);

  await page.fill('input[aria-label="Email or phone"]', "test@replay.io");
  await page.click("//button[normalize-space(.)='Next']/div[2]");
  
  //security text check // 
  await page.press('input[aria-label="Enter your password"]', "Enter");
  await page.fill('input[aria-label="Enter your password"]', "ReplayTest123");
  await page.click("//button[normalize-space(.)='Next']/div[2]");
}

(async () => {
  const browser = await firefox.launch({
    headless:false
  });
  const context = await browser.newContext({ storageState: browserSession });
  const page = await context.newPage();

  if (true) {
    await login(page);
  }
  

  await Promise.all([
    //await page.waitForNavigation({ url: 'https://accounts.google.com/signin/v2/challenge/iap?client_id=494526493439-djlkk2cal7r0lijnrd6en51c9vo4icgp.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fapi.framer.com%2Fauth%2Fgoogle%2Fcallback&state=2f3b546d-74b7-4f4f-9d5d-a1c8b7aeae69&failureRedirect=https%3A%2F%2Flogin.framer.com%3Ferror%3DCould%2520not%2520complete%2520authentication%26source%3Dframer-web&failureFlash=true&flowName=GeneralOAuthFlow&cid=5&TL=AM3QAYakKsf9hB6b2AiKxluA9l5Lrrs5D6cqvPhedW6CWUfTd4sPf3ttPkb2ZQx3&navigationDirection=forward' }),
    
    //selector issue was here// 
    await page.click('text="Next"'),
  ]);

  await context.storageState({ path: "./framer-session.json" });

  await page.waitForTimeout(10000);

  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();
