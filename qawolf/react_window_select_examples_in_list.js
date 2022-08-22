const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://react-window.vercel.app/#/examples/list/memoized-list-items');
  
  // assert page loaded
  await assertText(page, "react-window");
  
  // navigate to example
  await page.click("text=Fixed Size List");
  
  // assert on fixed size list
  await assertText(page, "import { FixedSizeList as List } from 'react-window';");
  
  // navigate to example
  await page.click("text=Variable Size List");
  
  // assert on variable size list
  await assertText(page, "import { VariableSizeList as List } from 'react-window';");
  
  // navigate to example
  await page.click("text=Fixed Size Grid");
  
  // assert on fixed size grid
  await assertText(page, "import { FixedSizeGrid as Grid } from 'react-window';");
  
  // navigate to example
  await page.click("text=Variable Size Grid");
  
  // assert on variable size grid
  await assertText(page, "import { VariableSizeGrid as Grid } from 'react-window';");
  
  // navigate to example
  await page.click("text=Scrolling indicators");
  
  // assert on scrolling indicators
  await assertText(page, " {isScrolling ? 'Scrolling' : `Row ${index}`}");
  
  // navigate to example
  await page.click("text=Scrolling to an item");
  
  // assert on scrolling to an item
  await assertText(page, "// The List will scroll as little as possible to ensure the item is visible.");
  
  // navigate to example
  await page.click("text=Memoized List items");
  
  // assert on memoized list items
  await assertText(page, "import memoize from 'memoize-one';");
  
  // navigate to example
  await page.click("text=RTL layout");
  
  // assert on RTL layout
  await assertText(page, "<div style={style}>عمود {index}</div>");

  process.exit();
})();