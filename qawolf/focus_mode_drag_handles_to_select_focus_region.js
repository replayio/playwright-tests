const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // navigate to replay
  await page.goto(
    buildUrl(
      "/recording/airtable-playwright-test--6847ab82-8b0a-4dc2-af73-eb6bf14918e7?point=12331705040172899620536796682649667&time=5072.277283660569&hasFrames=true"
    )
  );
  
  // enable focus mode
  await expect(page.locator('[title="Start focus edit mode"]')).toBeVisible();
  await page.click('[title="Start focus edit mode"]');
  
  // drag left handle
  const leftHandle = page.locator(".group .left-0 >> nth=0");
  let leftHandleLocation = await leftHandle.boundingBox();
  expect(Math.floor(leftHandleLocation.x)).toBe(268);
  await setFocus({ handleLocation: "left", moveToX: 500, page });
  
  // drag right handle
  const rightHandle = page.locator(".group .right-0 >> nth=1");
  let rightHandleLocation = await rightHandle.boundingBox();
  expect(Math.floor(rightHandleLocation.x)).toBe(485);
  await setFocus({ handleLocation: "right", moveToX: 1010, page });
  
  // assert new bounding x locations
  leftHandleLocation = await leftHandle.boundingBox();
  rightHandleLocation = await rightHandle.boundingBox();
  const leftCoordinate = leftHandleLocation.x.toString();
  const rightCoordinate = rightHandleLocation.x.toString();
  expect(leftCoordinate).toMatch(/477/);
  expect(rightCoordinate).toMatch(/1009/);

  process.exit();
})();