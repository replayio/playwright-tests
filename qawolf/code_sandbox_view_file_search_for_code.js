const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup,
  runCommand
} = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://codesandbox.io/s/0d68e?file=/src/App.js", {
    timeout: 45 * 1000,
  });
  
  // navigate to index.js
  await page.click("text=index.js");
  
  // assert index.js
  await expect(page.locator(':text("import { motion } from ")')).not.toBeVisible()
  await assertText(page, 'const rootElement = document.getElementById("root");');
  
  // search for useState
  await page.click('[aria-label="Search"]');
  await page.fill('[placeholder="Search"]', "useState");
  
  // assert search
  await assertText(
    page,
    'App.js\nimport { useState } from "react";\nconst [isOn, setIsOn] = useState(false);'
  );
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();