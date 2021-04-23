// Utility method that clicks the return value of an async function (e.g. nthMatch)
const asyncClick = (cbk) => (...args) => cbk(...args).then((m) => m.click());

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

function waitForFrameNavigated(url) {
  return (page) =>
    new Promise((resolve) => {
      const fn = async (frame) => {
        const frameUrl = await frame.url();
        if (
          url instanceof RegExp ? url.test(frameUrl) : frameUrl.includes(url)
        ) {
          page.off("framenavigated", fn);
          resolve(frame);
        }
      };

      page.on("framenavigated", fn);
    });
}

module.exports = {
  asyncClick,
  getBoundingClientRect,
  waitForTitleChange,
  waitForFrameNavigated,
};
