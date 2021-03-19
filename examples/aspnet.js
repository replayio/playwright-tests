const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false,
    slowMo:1000
  });
  const context = await browser.newContext();
  
  

  // Open new page
  const page = await context.newPage();

  // Go to https://demo.aspnetawesome.com/
  await page.goto('https://demo.aspnetawesome.com/');

//   const window= page.waitForFunction('window.innerwidth < 100');
//   await window;

  // Click [placeholder="try o"]
  await page.click('[placeholder="try o"]');

  // Press CapsLock
  await page.press('[placeholder="try o"]', 'CapsLock');

  // Fill [placeholder="try o"]
  await page.fill('[placeholder="try o"]', 'A');

  // Press CapsLock
  await page.press('[placeholder="try o"]', 'CapsLock');

  // Fill [placeholder="try o"]
  await page.fill('[placeholder="try o"]', 'Apple');

  // Press Tab
  await page.press('[placeholder="try o"]', 'Tab');

  // Click button:has-text("Mango")
  await page.click('button:has-text("Mango")');

  // Click #AllMeals-dropmenu >> text=Apple
  await page.click('#AllMeals-dropmenu >> text=Apple');

  // Click text=Fruits
  await page.click('text=Fruits');

  // Click text=Autocomplete DatePicker Textbox (numeric) >> button
  await page.click('text=Autocomplete DatePicker Textbox (numeric) >> button');

  // Click #Date1-awepw >> text=17
  await page.click('#Date1-awepw >> text=17');

  // Click text=Odropdown Apple Combobox Odropdown remote search please select >> :nth-match(button, 2)
  await page.click('text=Odropdown Apple Combobox Odropdown remote search please select >> :nth-match(button, 2)');
  // Click #AllMealsCombo-dropmenu >> text=Potato
  await page.click('#AllMealsCombo-dropmenu >> text=Potato');

  // Select 165
  await page.selectOption('select', '165');

  // Click text=Autocomplete DatePicker Textbox (numeric) >> :nth-match(button, 2)
  await page.click('text=Autocomplete DatePicker Textbox (numeric) >> :nth-match(button, 2)');

  // Click text=Autocomplete DatePicker Textbox (numeric) >> :nth-match(button, 2)
  await page.click('text=Autocomplete DatePicker Textbox (numeric) >> :nth-match(button, 2)');

  // Click text=Autocomplete DatePicker Textbox (numeric) >> :nth-match(button, 2)
  await page.click('text=Autocomplete DatePicker Textbox (numeric) >> :nth-match(button, 2)');

  // Triple click text=Autocomplete DatePicker Textbox (numeric) >> :nth-match(button, 2)
  await page.click('text=Autocomplete DatePicker Textbox (numeric) >> :nth-match(button, 2)', {
    clickCount: 3
  });

  // Click button:has-text("please select")
  await page.click('button:has-text("please select")');

  // Click #RemoteSearchOdropdown-dropmenu [placeholder="Search..."]
  await page.click('#RemoteSearchOdropdown-dropmenu [placeholder="Search..."]');

  // Fill #RemoteSearchOdropdown-dropmenu [placeholder="Search..."]
  await page.fill('#RemoteSearchOdropdown-dropmenu [placeholder="Search..."]', 'apple');

  // Press Tab
  await page.press('#RemoteSearchOdropdown-dropmenu [placeholder="Search..."]', 'Tab');

  // Click #RmtLazyTree-awed
  await page.click('#RmtLazyTree-awed');

  // Click text=node 2757 >> i
  await page.click('text=node 2757 >> i');

  // Click text=Apple 2759
  await page.click('text=Apple 2759');

  // Click .o-chk.o-chked .o-chkc .o-chkico
  await page.click('.o-chk.o-chked .o-chkc .o-chkico');

  // Click .o-chk.o-chked .o-chkc .o-chkico
  await page.click('.o-chk.o-chked .o-chkc .o-chkico');

  // Click label div
  await page.click('label div');

  // Click li:nth-child(2) .awe-label .o-chk .o-chkc .o-chkico
  await page.click('li:nth-child(2) .awe-label .o-chk .o-chkc .o-chkico');
  
  await page.waitForTimeout(2000);
  await context.close();
  await browser.close();
})();