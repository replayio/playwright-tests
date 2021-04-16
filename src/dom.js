function getBoundingClientRect(selector) {
  return async (page) => {
    const el = await page.waitForSelector(selector);
    return await page.evaluate((e) => e.getBoundingClientRect().toJSON(), el);
  };
}

async function waitForTitleChange(page) {
  const title = await page.evaluate(() => document.title);
  await page.waitForFunction((prevTitle) => document.title != prevTitle, title);
}

module.exports = {
  getBoundingClientRect,
  waitForTitleChange,
};
