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
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // go to airtable replay
  await page.click(
    '[href="/recording/playwright-test-teams-airtable--69bdd408-b9bf-49a4-b914-608e92c026ce"]'
  );
  
  // enable focus mode
  await page.waitForTimeout(5000);
  await expect(page.locator('[title="Start focus edit mode"]')).toBeVisible();
  await page.click('[title="Start focus edit mode"]');
  
  // drag right handle
  const rightHandle = page.locator(".group .right-0 >> nth=1");
  await setFocus({ handleLocation: "right", moveToX: 1010, page });
  
  // drag left handle
  const leftHandle = page.locator(".group .left-0 >> nth=0");
  await setFocus({ handleLocation: "left", moveToX: 500, page });
  
  // assert new bounding x locations
  leftHandleLocation = await leftHandle.boundingBox();
  rightHandleLocation = await rightHandle.boundingBox();
  const leftCoordinate = leftHandleLocation.x.toString();
  const rightCoordinate = rightHandleLocation.x.toString();
  expect(leftCoordinate).toMatch(/492/);
  expect(rightCoordinate).toMatch(/1010/);
  

  process.exit();
})();