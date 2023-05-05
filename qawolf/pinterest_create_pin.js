const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
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
} = require("./helpers");

(async () => {
  // launch replay
  const { browser, context } = await launchReplay({ slowMo: 2000 });

  // login to pinterest
  const { page } = await logInToPinterest(context);

  // click on create pin
  await page.click(':text-is("Create")');
  await page.click(':text-is("Create Pin")');
  await expect(page.locator(':text("Drag and drop")')).toBeVisible();

  // upload pin and create
  page.once("filechooser", (chooser) =>
    chooser.setFiles("/root/files/large.jpg")
  );
  await page.click(':text("Drag and drop")', { force: true });
  await page.waitForTimeout(5000);

  // fill out pin creation form and submit
  let title = `${faker.name.findName()} ${Date.now().toString().slice(-4)}`;
  let description = faker.lorem.sentence();
  await page.fill(
    '[data-test-id="pin-builder-draft"] [placeholder="Add your title"]',
    title
  );
  await page.fill(
    '[data-test-id="editor-with-mentions"] [aria-label="Tell everyone what your Pin is about"]',
    description
  );
  await page.waitForTimeout(5000);

  // add alt text
  await page.click(':text("Add alt text")');
  await page.fill(
    '[data-test-id="pin-builder-draft"] [placeholder="Explain what people can see in the Pin"]',
    faker.lorem.sentence()
  );

  // repeat steps
  await page.reload();
  page.once("filechooser", (chooser) =>
    chooser.setFiles("/root/files/large.jpg")
  );
  await page.click(':text("Drag and drop")', { force: true });
  await page.waitForTimeout(5000);

  // fill out pin creation form and submit
  title = `${faker.name.findName()} ${Date.now().toString().slice(-4)}`;
  description = faker.lorem.sentence();
  await page.fill(
    '[data-test-id="pin-builder-draft"] [placeholder="Add your title"]',
    title
  );
  await page.fill(
    '[data-test-id="editor-with-mentions"] [aria-label="Tell everyone what your Pin is about"]',
    description
  );
  await page.waitForTimeout(5000);

  // add alt text
  await page.click(':text("Add alt text")');
  await page.fill(
    '[data-test-id="pin-builder-draft"] [placeholder="Explain what people can see in the Pin"]',
    faker.lorem.sentence()
  );

  // save
  await page.click(':text-is("Save")');

  // if we run into a modal close out
  try {
    await page.click('[aria-label="Close"]');
  } catch {}

  // navigate to profile and Test folder
  await page.click(
    '[data-test-id="button-container"] [aria-label="Accounts and more options"]'
  );
  await page.click('[data-test-id="HeaderAccountsOptionsMenuAccountRep"]');
  await page.click(':text-is("All Pins")');
  await page.waitForTimeout(5000);

  // assert pin appears on profile page with correct details
  await expect(page.locator(`:text("${title}")`)).toBeVisible();

  // delete pin
  await deletePin(page, title);

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
