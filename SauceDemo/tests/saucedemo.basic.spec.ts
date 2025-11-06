import {test,expect} from '@playwright/test';

const URL = "https://www.saucedemo.com"
const USERNAME = "standard_user"
const PASSWORD = "secret_sauce"

test.beforeEach(async ({page}) =>
{
    await page.goto(URL);

    await page.getByPlaceholder("UserName").fill(USERNAME);
    await page.getByPlaceholder("Password").fill(PASSWORD);
    await page.getByText('login').click();

    await expect(page.getByText('Products')).toBeVisible();
})

test("add to cart", async ({page}) =>{
    const firtProduct = page.getByText("Add to cart").first()
    await firtProduct.click();

    const cartBadge = page.locator('.shopping_cart-badge')
    await expect(cartBadge).toHaveText("1");
})