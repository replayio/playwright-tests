function getBoundingClientRect(selector) {
  return async (page) => {
    const el = await page.waitForSelector(selector);
    return await page.evaluate((e) => e.getBoundingClientRect().toJSON(), el);
  };
}

module.exports = {
  getBoundingClientRect,
};
