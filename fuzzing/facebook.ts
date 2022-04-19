import { Page } from "@recordreplay/playwright";
import { waitForTime, MsPerSecond, randomElement, randomString } from "../utils";
const { example } = require("../src/helpers");

// Credentials for a facebook test account need to be specified via the environment.
if (!process.env.FACEBOOK_FUZZ_USER || !process.env.FACEBOOK_FUZZ_PASSWORD) {
  throw new Error("Facebook credentials not specified");
}

example("Facebook", async (page: Page) => {
  await page.goto("https://facebook.com");
  await login(page);

  for (let i = 0; i < 4; i++) {
    const action = randomElement(Actions);
    console.log("FacebookAction", action.name);
    await Promise.race([action(page), waitForTime(MsPerSecond * 15)]);
  }

  await waitForTime(5000);
});

async function login(page: Page) {
  await page.fill("#email", process.env.FACEBOOK_FUZZ_USER || "");
  await page.fill("#pass", process.env.FACEBOOK_FUZZ_PASSWORD || "");
  await page.click('[type="submit"]');
}

const Actions = [visitSidebarPage, addPost, addComment, likeComment];

// Buttons in the sidebar after expanding.
const SidebarButtons = [
  "Find Friends",
  "Groups",
  "Marketplace",
  "Watch",
  "Events",
  "Memories",
  "Saved",
  "Pages",
  "Jobs",
  "Ads",
  "Crisis Response",
  "Friend Lists",
  "Fundraisers",
  "Games",
  "Gaming Video",
  "Live Videos",
  "Messenger",
  "Messenger Kids",
  "Most Recent",
  "Movies",
  "Oculus",
  "Offers",
  "Recent Ad Activity",
  "Town Hall",
  "Weather",
];

async function visitSidebarPage(page: Page) {
  await page.click("text=See More");

  const button = randomElement(SidebarButtons);
  await page.click(`text=${button}`);

  await waitForTime(MsPerSecond * 5);
  await page.goto("https://facebook.com");
}

async function addPost(page: Page) {
  await page.click("text=What's on your mind");
  await waitForTime(1000);
  await page.keyboard.type(randomString(40));

  const elements = await page.$$("text=Post");
  for (const elem of elements) {
    const text = await elem.innerText();
    if (text == "Post") {
      await elem.click();
    }
  }
}

async function addComment(page: Page) {
  while (true) {
    try {
      const elements = await page.$$("text=Write a comment");
      const elem = randomElement(elements);
      await elem.scrollIntoViewIfNeeded();
      await waitForTime(1000);

      const box = await elem.boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await page.keyboard.type(randomString(20));
        await page.keyboard.press("Enter");
        return;
      }
    } catch (e) {}
    await waitForTime(1000);
  }
}

async function likeComment(page: Page) {
  while (true) {
    try {
      const elements = await page.$$("text=Like");
      const elem = randomElement(elements);
      await elem.click();
      return;
    } catch (e) {}
  }
}
