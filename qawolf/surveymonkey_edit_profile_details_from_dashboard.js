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
  // REQ471 Surveymonkey: Login
  const { page } = await logInToSurveymonkey();
  
  // REQ478 Surveymonkey: Clicking username in dashboard opens profile details modal
  await page.click('[data-action-source="welcome_banner_name"]');
  await expect(page.locator('[aria-label="Modal"]')).toBeVisible();
  await expect(page.locator('text=Tell us about yourself so we can personalize your experience')).toBeVisible();
  
  // REQ477 Surveymonkey: Edit profile details
  let = fName = `QA ` + Date.now().toString().slice(-4);
  let = lName = `Wolf ` + Date.now().toString().slice(-4);
  let role = ["indiv_jf_consulting", "indiv_jf_educator", "indiv_jf_legal", "indiv_jf_healthcare", "indiv_jf_owner", "indiv_jf_sales",];
  let random = Math.floor(Math.random() * role.length);
  let randomRole = role[random];
  
  let level = ["indiv_jl_intern", "indiv_jl_director", "indiv_jl_c_level", "indiv_jl_ic", "indiv_jl_vp"];
  let random = Math.floor(Math.random() * level.length);
  let randomLevel = level[random];
  
  await page.fill("#first_name", fName);
  await page.fill("#last_name", lName);
  
  await page.waitForTimeout(1000);
  await page.selectOption("#job_function", randomRole);
  await page.selectOption("select#job_level", randomLevel);
  
  await page.click('[aria-label="Modal"] button');
  await page.waitForTimeout(1000);
  await page.click(':text("SAVE ”")');
  
  // assert details 
  await page.click('[data-action-source="welcome_banner_name"]');
  expect(await page.inputValue("#first_name")).toBe(fName);
  expect(await page.inputValue("#last_name")).toBe(lName);
  expect(await page.inputValue("#job_function")).toBe(randomRole);
  expect(await page.inputValue("#job_level")).toBe(randomLevel);
  
  // upload replay
  await uploadReplay();

  process.exit();
})();