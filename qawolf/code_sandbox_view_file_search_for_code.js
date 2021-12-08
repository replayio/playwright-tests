const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://codesandbox.io/s/0d68e?file=/src/App.js', {timeout: 45 * 1000});
  
  // navigate to index.js
  await page.click("text=index.js");
  
  // assert index.js
  await assertNotText(page, 'import { motion } from "framer-motion"')
  await assertText(page, 'const rootElement = document.getElementById("root");');
  
  // search for useState
  await page.click('[aria-label="Search"]');
  await page.fill('[placeholder="Search"]', "useState");
  
  // assert search
  await assertText(page, 'App.js\nimport { useState } from "react";\nconst [isOn, setIsOn] = useState(false);');

  process.exit();
})();