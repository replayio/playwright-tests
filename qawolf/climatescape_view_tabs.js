const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://climatescape.org/');
  
  // navigate to organizations
  await page.click("text=Organizations");
  
  // assert on organizations page
  await assertNotText(page, "Discover the organizations solving climate change");
  await assertText(page, "All Organizations");
  
  // navigate to buildings & cities
  await page.click('[href="/categories/buildings-and-cities"]');
  
  // assert on buildings & cities page
  await assertText(page, "Buildings & Cities", { selector: "h2" });
  
  // filter location
  await page.click("text=HQ Location");
  await page.click("text='Australia'");
  
  // assert filtered location
  await assertNotText(page, "Smappee")
  await assertText(page, "CIM");
  
  // navigate to compnay page
  await page.click('text=/.*It uses the Internet of Things.*/');
  
  // assert navigate to compnay page
  await assertText(page, "Developer of a machine learning platform designed to improve building performance.");
  assert(page.url() === "https://climatescape.org/organizations/cim")
  
  // navigate to energy efficiency
  await page.click("text=Energy Efficiency");
  
  // assert on energy efficiency page
  await assertText(page, "Energy Efficiency", { selector: "h2" });

  process.exit();
})();