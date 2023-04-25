const link_data = require('./app.js');//import value link_data from app.js
const { chromium } = require("playwright");
const { test, expect } = require('@playwright/test');

test('E2E eKYC Template 1', async () => {
  const browser = await chromium.launch({
    args: ["--ignore-certificate-errors"],
    headless: false,
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Setting Browser To Test
  const { url } = await link_data();
  await page.goto(url);
  await expect(page).toHaveTitle("การยืนยันตัวตนทางอิเล็กทรอนิกส์ e-KYC");
  await page.locator("#contained-button-file-frontCard").setInputFiles("./imageForOcr/Front.jpg"); //Front ID card for OCR
  await page.locator("#contained-button-file-backCard").setInputFiles("./imageForOcr/Back.jpg"); //Back ID card for OCR
  await page.locator("//*[@id='__next']/div[2]/div[2]/div[1]/div/div/div[4]/div").click();//Submit front card
  await page.locator("//*[@id='__next']/div[2]/div[2]/div[2]/div/div/div[4]/div/div/button").click();//Submit back card
  await page.locator("//*[@id='__next']/div[2]/div[3]/div/div/form/div[2]/button").click();//verify data
  await page.locator("#contained-button-file-selfie").setInputFiles("./imageForOcr/selfie.jpg"); //Selfie for face verify and compare
  await page.locator("#contained-button-file-selfieWithCard").setInputFiles("./imageForOcr/selfiewc.jpg")//Selfie with card for face verify and compare
  await page.locator("//*[@id='__next']/div[1]/div/div[4]/div/div/div[4]/div/div/button").click();//Submit selfie
  await page.locator("//*[@id='__next']/div[1]/div/div[5]/div/div/div[4]/div/div/button").click();//Submit selfie with card
  await page.locator("//*[@id='__next']/div[1]/div/div[6]/span/span[2]").click();//verify data
  const locator = page.locator('h6'); //Pointer at Message that have h6 tag
  await expect(locator).toHaveText("ขอบคุณสำหรับการยืนยันตัวตน");//Check wording successful page
  await page.close();//close browser

});
