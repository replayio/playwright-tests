// playwright-cli unable to maximize browser //

const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.primevideo.com/region/eu
  await page.goto('https://www.primevideo.com/region/eu');

  // Click label:has-text("EN")
  await page.click('label:has-text("EN")');

  // Click text=Deutsch
  await page.click('text=Deutsch');

  // assert.equal(page.url(), 'https://www.primevideo.com/region/eu/gp/video/offers/nonprimehomepage/ref=atv_nb_lcl_de_DE');
  // Click label:has-text("DE")
  await page.click('label:has-text("DE")');

  // Click text=العربية
  await page.click('text=العربية');

  // assert.equal(page.url(), 'https://www.primevideo.com/region/eu/gp/video/offers/nonprimehomepage/ref=atv_nb_lcl_ar_AE');
  // Click text=مساعدة
  await page.click('text=مساعدة');

  // assert.equal(page.url(), 'https://www.primevideo.com/region/eu/help/ref=dvm_MLP_EU_help');
  // Click text=المشكلات المتعلقة بالخطأ 2063 لبرايم فيديو
  await page.click('text=المشكلات المتعلقة بالخطأ 2063 لبرايم فيديو');

  // assert.equal(page.url(), 'https://www.primevideo.com/region/eu/help/ref=atv_hp_nd_cnt?nodeId=G67ZXAW3XXV42YPB');
  // Click text=استكشاف مشكلات الاتصال بالإنترنت وإصلاحها في جهازك المتصل
  await page.click('text=استكشاف مشكلات الاتصال بالإنترنت وإصلاحها في جهازك المتصل');

  // assert.equal(page.url(), 'https://www.primevideo.com/region/eu/help/ref=atv_hp_nd_nav?nodeId=GL8WMKLCYL8NU5FS');
  // Click text=المشكلات المتعلقة بالخطأ 5004 لبرايم فيديو
  await page.click('text=المشكلات المتعلقة بالخطأ 5004 لبرايم فيديو');

  // assert.equal(page.url(), 'https://www.primevideo.com/region/eu/help/ref=atv_hp_nd_nav?nodeId=GHXU2LF9RGW8VV68');
 
  // ---------------------
  await context.close();
  await browser.close();
})();