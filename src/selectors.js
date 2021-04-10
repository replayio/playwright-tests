function nthMatch(selector, n) {
  return async (page) => {
    // waitForSelector seems to only return a single element but we need an
    // array
    await page.waitForSelector(selector);

    const elements = await page.$$(selector);
    return elements[n];
  };
}

module.exports = {
  nthMatch,
};
