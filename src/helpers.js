const playwright = require("playwright");

const browserName = "firefox";
const launchOptions = {
  headless: false,
};

async function example(name, cbk) {
  try {
    const browser = await playwright[browserName].launch(launchOptions);
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log(`Starting ${name}`);
    await cbk(page);
    console.log(`Finishing ${name}`);

    await page.close();
    await context.close();
    await browser.close();
  } catch (e) {
    console.error(e);
  }
}

async function action(name, cbk) {
  console.log(name);
  await cbk();
}

module.exports = {
  example,
  action,
};
