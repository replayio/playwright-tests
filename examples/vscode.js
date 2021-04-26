const { example } = require("../src/helpers");

const { selectors: monacoSelectors } = require("./shared/monaco");

const selectors = {
  activityBar: {
    root: ".activitybar",
    menu: {
      get root() {
        return `${selectors.activityBar.root} [role="menubar"]`;
      },
      get button() {
        return `${this.root} .menubar-menu-button[aria-label = "Application Menu"]`;
      },
      itemByLabel(label) {
        return `.monaco-menu li.action-item [aria-label = "${label}"]`;
      },
    },
    get items() {
      return `${this.root} li.action-item`;
    },
    itemByTitle(title) {
      return `${this.items}[title *= "${title}"]`;
    },
  },
  sideBar: {
    root: ".sidebar",
    get explorer() {
      return `*css=${this.root} >> h2:text("Explorer")`;
    },
    get listItems() {
      return `${this.root} [role="treeitem"]`;
    },
    get selectedListItems() {
      return `${this.listItems}.selected`;
    },
    listItemByTitle(title) {
      return `${this.listItems} [title *= "${title}"]`;
    },
  },
  editor: {
    root: ".editor",
    get tabs() {
      return `${this.root} [role="tablist"] [role="tab"]`;
    },
    tabByTitle(title) {
      return `${this.tabs}[title *= "${title}"]`;
    },
  },
  search: {
    root: ".search-view",
    get input() {
      return `${this.root} .search-container textarea`;
    },
    get replace() {
      return `${this.root} .replace-container textarea`;
    },
  },
  quickInput: {
    root: ".quick-input-widget",
    get save() {
      return `${this.root} .quick-input-action >> text="OK"`;
    },
  },
};

const selectFile = async (path, page, doubleClick = false) => {
  await page[doubleClick ? "dblclick" : "click"](
    selectors.sideBar.listItemByTitle(path)
  );
  await page.waitForSelector(selectors.editor.tabByTitle(path));
  // TODO: occasionallly, the wrong file is selected so we wait a bit to mitigate this
  await page.waitForTimeout(250);
};

example("Visual Studio Code", async (page, { action, step }) => {
  await step("Open Editor", async () => {
    await page.goto("https://vscode-web-test-playground.azurewebsites.net/");

    await page.click('text="Click to Continue"');

    await Promise.all([
      page.waitForSelector(".monaco-workbench"),
      page.waitForSelector(selectors.sideBar.selectedListItems),
      page.waitForSelector(selectors.editor.tabByTitle("large.ts")),
    ]);
  });

  await step("Open files", async () => {
    await selectFile("~/sample-folder/file.css", page);
    await selectFile("~/sample-folder/file.html", page);
    await selectFile("~/sample-folder/file.js", page, true);
    await selectFile("~/sample-folder/file.md", page, true);
  });

  await step("Search files", async () => {
    await page.click(selectors.activityBar.itemByTitle("Search"));
    await page.click(selectors.search.input);
    await page.fill(selectors.search.input, "store");

    await page.click(selectors.sideBar.listItemByTitle("storeHouses"));
    await page.waitForSelector(selectors.editor.tabByTitle("large.ts"));
  });

  await action("Create new file", async () => {
    await page.click(selectors.activityBar.itemByTitle("Explorer"));
    await page.waitForSelector(selectors.sideBar.explorer);

    await page.click(selectors.activityBar.menu.button);
    await page.click(selectors.activityBar.menu.itemByLabel("File"));
    await page.click(selectors.activityBar.menu.itemByLabel("New File"));

    await step("Add content and save", async () => {
      await page.waitForSelector(selectors.editor.tabByTitle("Untitled"));
      await page.type(monacoSelectors.input, "Testing");
      await page.press(monacoSelectors.input, "Meta+s");

      await page.click(selectors.quickInput.save);
      await page.waitForSelector(selectors.sideBar.listItemByTitle("Testing"));
    });
  });
});
