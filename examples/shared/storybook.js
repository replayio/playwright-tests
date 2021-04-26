const selectors = {
  toolbarButtonByTitle: function (title) {
    return `button[title="${title}"]`;
  },
  tabByTitle: function (title) {
    return `button[role="tab"]:text("${title}")`;
  },
  storyByPath: function (path) {
    const parts = path.toLowerCase().split("/");

    if (path[0] === "/") parts.shift();

    const story = parts.pop();
    return this.storyByItemId(
      story ? `${parts.join("-")}--${story}` : parts.join("-")
    );
  },
  storyByItemId: function (id) {
    return `[data-item-id="${id}"]`;
  },
};

// Navigates to either a story or a folder (if the path includes a trailing slash).
// A leading slash is optional.
const openStory = (path, callback) => async (page, ...rest) => {
  await page.click(selectors.storyByPath(path));
  await page.waitForTimeout(500);

  if (callback) {
    await callback(page, ...rest);
  }
};

module.exports = {
  selectors,
  openStory,
};
