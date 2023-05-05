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
  // BUG - Video plays past focus region https://qa-wolf.monday.com/boards/2150171022/pulses/2783325259
  // Asked to revise test just waiting for clarificaiton- https://qawolfhq.slack.com/archives/C02GEJCC9JP/p1655232831364969?thread_ts=1654720063.333749&cid=C02GEJCC9JP
  
  // BUG - Replay icon not appearing at end of the replay
  // Asked again here - https://qa-wolf.monday.com/boards/2150171022/pulses/2859226183
  
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // navigate to replay
  await page.goto(
    buildUrl(
      "/recording/airtable-playwright-test--6847ab82-8b0a-4dc2-af73-eb6bf14918e7?point=12331705040172899620536796682649667&time=5072.277283660569&hasFrames=true"
    )
  );
  await page.waitForSelector(':text("Airtable: Playwright Test")', {
    timeout: 60 * 1000,
  });
  
  // enable focus mode
  await expect(page.locator('[title="Start focus edit mode"]')).toBeVisible();
  await page.click('[title="Start focus edit mode"]');
  
  // drag focus handles
  await setFocus({ handleLocation: "left", moveToX: 500, page });
  await setFocus({ handleLocation: "right", moveToX: 1050, page });
  await page.click(':text("Save")');
  await page.mouse.click(5, 50); //what is this?
  await page.waitForTimeout(2000);
  
  // ensure playbar is at start and replay has time to buffer
  if (await page.locator('[src="/images/playback-refresh.svg"]').count()) {
    await page.mouse.click(490, 685.5, { delay: 500 });
    await page.waitForTimeout(3000);
    await page.mouse.click(5, 50);
    expect(await getPlaybarTooltipValue(page)).toEqual("0:06");
  }
  
  // assert that pressing spacebar starts playback at begining of focus region
  await page.keyboard.press(" ");
  await page.waitForTimeout(2100);
  await page.keyboard.press(" ");
  expect(await getPlaybarTooltipValue(page)).toEqual("0:07");
  
  // assert that starting playback with spacebar ends at end of focus region
  await page.keyboard.press(" ");
  await page.waitForTimeout(10 * 1000);
  // expect(await getPlaybarTooltipValue(page)).toEqual("0:16");
  expect(await getPlaybarTooltipValue(page)).toEqual("0:16 (Unloaded)");
  
  // assert pressing spacebar at end of playback restarts and begining of focus area
  await expect(
    page.locator('[src="/images/playback-refresh.svg"]')
  ).toBeVisible();
  await page.keyboard.press(" ");
  await page.waitForTimeout(1000);
  await page.keyboard.press(" ");
  expect(await getPlaybarTooltipValue(page)).toEqual("0:07");
  
  // assert clicking on focus play bar jumps to that time
  await page.mouse.click(800, 685.5, { delay: 500 });
  expect(await getPlaybarTooltipValue(page)).toEqual("0:11");
  
  // assert clicking play button starts playback from focused area
  await page.waitForTimeout(1000);
  await page.click('button [src="/images/playback-play.svg"]', { delay: 500 });
  await page.waitForTimeout(3000);
  await page.click('button [src="/images/playback-pause.svg"]');
  expect(await getPlaybarTooltipValue(page)).toEqual("0:14");
  
  // assert playback ends at end of focus region
  await page.click('button [src="/images/playback-play.svg"]');
  await page.waitForTimeout(3000);
  await expect(
    page.locator('button [src="/images/playback-refresh.svg"]')
  ).toBeVisible();
  expect(await getPlaybarTooltipValue(page)).toEqual("0:15");
  
  // assert pressing play at end of playback restarts at beginning of focus area
  await page.click('button [src="/images/playback-refresh.svg"]');
  await page.click('[src="/images/playback-play.svg"]');
  await page.waitForTimeout(2000);
  await page.click('button [src="/images/playback-pause.svg"]');
  expect(await getPlaybarTooltipValue(page)).toEqual("0:08");
  

  process.exit();
})();