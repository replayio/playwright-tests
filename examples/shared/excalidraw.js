const { getBoundingClientRect } = require("../../src/dom");

const shortcuts = {
  select: "1",
  box: "2",
  circle: "4",
  arrow: "5",
};

class Excalidraw {
  constructor(selector) {
    this.selector = selector;
    this.getCanvasBounds = getBoundingClientRect(this.selector);
  }

  async center(page) {
    const bounds = await this.getCanvasBounds(page);

    return {
      x: Math.round(bounds.left + bounds.width / 2),
      y: Math.round(bounds.top + bounds.height / 2),
    };
  }

  drag(x1, y1, x2, y2, hoverDuration) {
    return (page) => this._drag(page, x1, y1, x2, y2, hoverDuration);
  }

  async _drag(page, x1, y1, x2, y2, hoverDuration = 0) {
    await page.mouse.move(x1, y1);
    if (hoverDuration) await page.waitForTimeout(hoverDuration);
    await page.mouse.down();
    await page.mouse.move(x2, y2);
    if (hoverDuration) await page.waitForTimeout(hoverDuration);
    await page.mouse.up();
  }

  box(x, y, h, w) {
    return async (page) => {
      await page.press(this.selector, shortcuts.box);
      await this._drag(page, x, y, x + w, y + h);
    };
  }

  circle(x, y, r) {
    return async (page) => {
      const d = r / 2;
      await page.press(this.selector, shortcuts.circle);
      await this._drag(page, x - d, y - d, x + d, y + d);
    };
  }

  arrow(x1, y1, x2, y2) {
    return async (page) => {
      await page.press(this.selector, shortcuts.arrow);
      await this._drag(page, x1, y1, x2, y2, 250);
    };
  }
}

module.exports = {
  shortcuts,
  Excalidraw,
};
