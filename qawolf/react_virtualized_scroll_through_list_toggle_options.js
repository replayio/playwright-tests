const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // helpers 
  const selectors = {
    scrollContainer: ".ReactVirtualized__Grid__innerScrollContainer",
    dynamicHeightLabel: "text='Use dynamic row heights?'",
    scrollPlaceholderLabel: "text='Show scrolling placeholder?'",
  };
  
  const scrollThroughList = async (page) => {
    await page.click(`${selectors.scrollContainer} > div`);
  
    await page.press(selectors.scrollContainer, "Home");
  
    for (let i = 0; i < 10; i++) {
      await page.press(selectors.scrollContainer, "PageDown");
      await page.waitForTimeout(200);
    }
  };
  
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://bvaughn.github.io/react-virtualized/#/components/List');
  
  // scroll through list
  await scrollThroughList(page);
  
  // toggle use dynamic row height
  await page.click(selectors.dynamicHeightLabel);
  
  // toggle show scrolling placehodler
  await page.click(selectors.scrollPlaceholderLabel);
  
  // assert dynamic row toggle
  await assertText(page, "It has a 3rd row.");
  
  // scroll through list
  await page.click(`${selectors.scrollContainer} > div`);
  
  await page.press(selectors.scrollContainer, "Home");
  
  // assert scroll placeholder is toggled
  for (let i = 0; i < 10; i++) {
    await page.press(selectors.scrollContainer, "PageDown");
    await assertText(page, "Scrolling");
    await page.waitForTimeout(200);
  }

  process.exit();
})();