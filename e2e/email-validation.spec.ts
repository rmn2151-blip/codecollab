import { test, expect } from "@playwright/test";

// C33: Verify non-.edu email signup is rejected

test.describe("Email Validation", () => {
  test("should reject non-.edu email on signup", async ({ page }) => {
    await page.goto("/signup");

    // Fill form with a non-.edu email
    await page.fill('input[id="displayName"]', "Bad User");
    await page.fill('input[id="email"]', "baduser@gmail.com");
    await page.fill('input[id="password"]', "password123");
    await page.fill('input[id="confirmPassword"]', "password123");

    // Submit
    await page.click('button[type="submit"]');

    // Should show .edu validation error
    await expect(
      page.locator("text=You must use a .edu email address")
    ).toBeVisible();

    // Should NOT redirect - still on signup page
    await expect(page).toHaveURL(/\/signup/);
  });

  test("should reject non-.edu email variations", async ({ page }) => {
    const invalidEmails = [
      "user@yahoo.com",
      "user@hotmail.com",
      "user@outlook.com",
      "user@school.com",
      "user@education.org",
    ];

    for (const email of invalidEmails) {
      await page.goto("/signup");
      await page.fill('input[id="displayName"]', "Test");
      await page.fill('input[id="email"]', email);
      await page.fill('input[id="password"]', "password123");
      await page.fill('input[id="confirmPassword"]', "password123");
      await page.click('button[type="submit"]');

      await expect(
        page.locator("text=You must use a .edu email address")
      ).toBeVisible();
    }
  });

  test("should accept .edu email format", async ({ page }) => {
    await page.goto("/signup");

    await page.fill('input[id="displayName"]', "Good User");
    await page.fill('input[id="email"]', `valid_${Date.now()}@university.edu`);
    await page.fill('input[id="password"]', "password123");
    await page.fill('input[id="confirmPassword"]', "password123");
    await page.click('button[type="submit"]');

    // Should NOT show the .edu error
    await expect(
      page.locator("text=You must use a .edu email address")
    ).not.toBeVisible({ timeout: 3000 });
  });

  test("should reject mismatched passwords", async ({ page }) => {
    await page.goto("/signup");

    await page.fill('input[id="displayName"]', "Test User");
    await page.fill('input[id="email"]', "test@university.edu");
    await page.fill('input[id="password"]', "password123");
    await page.fill('input[id="confirmPassword"]', "differentpassword");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Passwords don't match")).toBeVisible();
  });

  test("should reject short passwords", async ({ page }) => {
    await page.goto("/signup");

    await page.fill('input[id="displayName"]', "Test User");
    await page.fill('input[id="email"]', "test@university.edu");
    await page.fill('input[id="password"]', "abc");
    await page.fill('input[id="confirmPassword"]', "abc");
    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=Password must be at least 6 characters")
    ).toBeVisible();
  });

  test("should reject short display names", async ({ page }) => {
    await page.goto("/signup");

    await page.fill('input[id="displayName"]', "A");
    await page.fill('input[id="email"]', "test@university.edu");
    await page.fill('input[id="password"]', "password123");
    await page.fill('input[id="confirmPassword"]', "password123");
    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=Display name must be at least 2 characters")
    ).toBeVisible();
  });
});
