const { expect, chromium } = require('@playwright/test');

let page

step("Go to the online store's login page <url>", async (url) => {
    let browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(url);
});

step("Login to the user <username>", async (username) => {
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
});

step("Verify the presence of a error message <text>", async (text) => {
    await expect(page.locator('[data-test="error"]')).toContainText(text);
});

step("Verify successful login by checking the page title <text>", async (text) => {
    await expect(page.locator('[data-test="title"]')).toContainText(text);
});

step("Add product <productName> to the cart", async (productName) => {
    await page.locator(`[data-test="add-to-cart-sauce-labs-${productName}"]`).click()
});

step("Go to the shopping cart page", async () => {
    await page.locator('[data-test="shopping-cart-link"]').click()
});

step("Verify number <text> of products added to the cart", async (text) => {
    let number = parseInt(text)
    expect(await page.locator('[data-test="inventory-item"]').count()).toBe(number);
});

step("Click on the <text> button", async (text) => {
    await page.locator(`[data-test="${text}"]`).click()
});

step("Fill in the required shipping details <firstName>, <lastName>, <postalCode>", async (firstName, lastName, postalCode) => {
    await page.locator('[data-test="firstName"]').fill(firstName);
    await page.locator('[data-test="lastName"]').fill(lastName);
    await page.locator('[data-test="postalCode"]').fill(postalCode);
});

step("Verify order confirmation <text>", async (text) => {
    expect(await page.locator('[data-test="complete-header"]')).toContainText(text)
});

step("Remove product <productName> from the cart", async (productName) => {
    await page.locator(`[data-test="remove-sauce-labs-${productName}"]`).click();
});