const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Basic_scissoring');
  
  // grab frame
  var frame = await(await page.waitForSelector("#frame_Clearing_the_drawing_buffer_when_scissoring_applies")).contentFrame();
  
  // assert viewing correct frame
  await assertText(frame, "Result of scissoring.", { selector: "body > p" });
  
  // go to Clearing by clicking
  await page.goto('https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Clearing_by_clicking');
  
  // grab frame
  var frame = await(await page.waitForSelector("#frame_Clearing_the_rendering_context_with_random_colors")).contentFrame();
  
  // change color
  await frame.click("#color-switcher");
  
  // goto scissor animation
  await page.goto('https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Scissor_animation');
  
  // grab frame
  var frame = await(await page.waitForSelector("#frame_Animation_with_scissoring")).contentFrame();
  
  // assert animation stop
  await assertText(frame, "start", { selector: "#animation-onoff" });
  
  // start animation
  await frame.click("#animation-onoff");
  
  // assert animation start
  await assertText(frame, "stop", { selector: "#animation-onoff" });
  
  // goto texture from code
  await page.goto('https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Textures_from_code')

  process.exit();
})();