import { test, expect } from "@playwright/test";

test.describe("SwiftCart Checkout Tests", () => {

  // Test 1: Successful checkout
  test("should complete checkout and display order confirmation", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /add to cart/i }).first().click();

    await page.getByLabel("Your name").fill("Test Customer");

    await page.getByRole("button", { name: /place order/i }).click();

    await expect(
      page.getByRole("heading", { name: "Order confirmed!" })
    ).toBeVisible();

    await expect(
      page.getByText("Test Customer", { exact: true })
    ).toBeVisible();

    await expect(
      page.getByTestId("order-reference")
    ).toHaveText(/^SC-\d{8}$/);
  });


  // Test 2: Missing required customer name
  test("should block checkout when customer name is missing", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /add to cart/i }).first().click();

    await page.getByRole("button", { name: /place order/i }).click();

    await expect(
      page.getByRole("alert")
    ).toHaveText("! Please enter your name to continue.");

    await expect(
      page.getByRole("heading", { name: "Order confirmed!" })
    ).not.toBeVisible();

    await expect(
      page.getByLabel("Your name")
    ).toHaveValue("");
  });


  // Test 3: Exact total after quantity change
  test("should calculate the exact order total when quantity changes", async ({ page }) => {
    await page.goto("/");

    // Add notebook: ₹299
    await page.getByRole("button", { name: /add to cart/i }).first().click();

    // Add mouse: ₹799
    await page.getByRole("button", { name: /add to cart/i }).nth(1).click();

    // Increase notebook quantity from 1 to 2
    await page.getByRole("button", {
      name: "Increase quantity for Classic Notebook"
    }).click();

    // Expected: (2 × 299) + (1 × 799) = ₹1,397
    await expect(
      page.getByTestId("line-total-1")
    ).toHaveText("₹598.00");

    await expect(
      page.getByTestId("order-total")
    ).toHaveText("₹1,397.00");
  });

});