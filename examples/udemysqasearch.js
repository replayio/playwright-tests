const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({
    headless: false
  });

  const context = await browser.newContext();
  // Open new page 
  const page = await context.newPage();

  // Go to https://www.udemy.com/
  await page.goto('https://www.udemy.com/');

  // Click [placeholder="Search for anything"]
  await page.click('[placeholder="Search for anything"]');

  // Fill [placeholder="Search for anything"]
  await page.fill('[placeholder="Search for anything"]', 'sqa');

  // Press Enter
  await page.press('[placeholder="Search for anything"]', 'Enter');

  // assert.equal(page.url(), 'https://www.udemy.com/courses/search/?src=ukw&q=sqa');
  // Click text=Essentials of Software Testing and Quality Assurance
  await page.click('text=Essentials of Software Testing and Quality Assurance');

  // assert.equal(page.url(), 'https://www.udemy.com/course/essentials-of-software-testing-and-quality-assurance/');
  // Click button:has-text("Enroll now")
  await page.click('button:has-text("Enroll now")');

  // assert.equal(page.url(), 'https://www.udemy.com/join/signup-popup/?next=%2Fcourse%2Fsubscribe%2F%3FcourseId%3D3771430');
  // Click [placeholder="Full Name"]
  await page.click('[placeholder="Full Name"]');

  // Fill [placeholder="Full Name"]
  await page.fill('[placeholder="Full Name"]', 'ok');

  // Press Tab
  await page.press('[placeholder="Full Name"]', 'Tab');

  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', 'ok');

  // Press Tab
  await page.press('[placeholder="Email"]', 'Tab');

  // Fill input[name="password"]
  await page.fill('input[name="password"]', 'ok');
  await context.close();
  await browser.close();
})();