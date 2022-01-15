const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // selectors
  const selectors = {
    search: {
      root: "[role=combobox]",
      get input() {
        return `${this.root} input`;
      },
      button: "button >> text=Search",
      get option() {
        return `${this.root} [role=listbox] li`;
      },
      optionByText(text) {
        return `${this.option} >> text=${text}`;
      },
    },
    results: {
      filter: {
        // Site includes 2 nav bars for different screen resolutions so the test finds
        // the visible one for a wide screen
        open: "[class*=InlineDialogContainer] + button >> text=Filter",
        dialog: "[role=dialog]",
        get slider() {
          return `${this.dialog} h6 + * .rc-slider`;
        },
        get search() {
          return `text="Search"`;
        },
      },
      item: "[class*=ReactVirtualized] a",
    },
  };
  
  const getSliderBounds = getBoundingClientRect(selectors.results.filter.slider);
  
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.tablecheck.com/en/japan');
  
  // search for Tokyo
  await page.click(selectors.search.input);
  await page.type(selectors.search.input, "tokyo");
  await page.click(selectors.search.optionByText("Tokyo"));
  await page.click(selectors.search.button);
  
  // select Tokyo
  await page.click(selectors.results.filter.open);
  await page.waitForTimeout(1000); // animation timeout
  
  // get slider bounds
  var bounds = await getSliderBounds(page);
  var center = bounds.top + bounds.height / 2;
  
  // set starting price
  await page.mouse.click(
    bounds.left + Math.round(bounds.width * 0.25),
    center
  );
  
  // set ending price
  await page.mouse.click(
    bounds.left + Math.round(bounds.width * 0.75),
    center)
  
  // give time for filter to be set
  await page.waitForTimeout(3 * 1000);
  
  // search for restaurants
  await page.click("text=Search");
  
  // assert no restaurant found
  await assertText(page, "Sorry, we couldn't find any venue in this area.");

  process.exit();
})();