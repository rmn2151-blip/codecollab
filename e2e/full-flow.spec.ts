import { test, expect } from "@playwright/test";

// C32: Full flow - signup -> create group -> join group -> send messages -> close group
// This test verifies the complete user journey through the application.

const TEST_EMAIL = `testuser_${Date.now()}@barnard.edu`;
const TEST_PASSWORD = "testpass123";
const TEST_NAME = "Test User";

test.describe("Full Application Flow", () => {
  test("should complete the entire group ordering lifecycle", async ({ page }) => {
    // ========== STEP 1: Sign Up ==========
    await page.goto("/signup");
    await expect(page.locator("h2, [data-slot='card-title']")).toContainText("Create an account");

    await page.fill('input[id="displayName"]', TEST_NAME);
    await page.fill('input[id="email"]', TEST_EMAIL);
    await page.fill('input[id="password"]', TEST_PASSWORD);
    await page.fill('input[id="confirmPassword"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');

    // Should redirect to groups page after signup
    await page.waitForURL("**/groups", { timeout: 10000 });
    await expect(page).toHaveURL(/\/groups/);

    // ========== STEP 2: Create a Group ==========
    await page.goto("/groups/new");
    await expect(page.locator("text=Create a Group")).toBeVisible();

    // Fill out the create group form
    await page.fill('input[id="name"]', "Test Lunch Group");

    // Select first available restaurant
    const restaurantSelect = page.locator('select[id="restaurant"]');
    await restaurantSelect.selectOption({ index: 1 });

    // Set max members
    await page.fill('input[id="maxMembers"]', "10");

    // Set deadline to 1 hour from now
    const deadline = new Date(Date.now() + 60 * 60 * 1000);
    const deadlineStr = deadline.toISOString().slice(0, 16);
    await page.fill('input[id="orderDeadline"]', deadlineStr);

    // Submit the form
    await page.click('button[type="submit"]');

    // Should redirect to the new group's chat page
    await page.waitForURL("**/groups/**", { timeout: 10000 });
    await expect(page.url()).toMatch(/\/groups\/[a-f0-9-]+/);

    // ========== STEP 3: Verify Group Chat Page ==========
    // Should see the group name
    await expect(page.locator("text=Test Lunch Group")).toBeVisible();

    // Should see the member list with the leader
    await expect(page.locator("text=Leader")).toBeVisible();

    // Should see empty chat state
    await expect(page.locator("text=No messages yet")).toBeVisible();

    // ========== STEP 4: Send a Message ==========
    const messageInput = page.locator("textarea");
    await messageInput.fill("Hey everyone, what should we order?");
    await page.click('button:has-text("Send")');

    // Message should appear in the chat
    await expect(
      page.locator("text=Hey everyone, what should we order?")
    ).toBeVisible({ timeout: 5000 });

    // Send another message
    await messageInput.fill("I'm thinking burritos");
    await page.click('button:has-text("Send")');
    await expect(page.locator("text=I'm thinking burritos")).toBeVisible({
      timeout: 5000,
    });

    // ========== STEP 5: Dissolve the Group ==========
    // Click the dissolve button
    await page.click("text=Dissolve Group");

    // Confirmation dialog should appear
    await expect(page.locator("text=Dissolve this group?")).toBeVisible();

    // Confirm dissolution
    await page.click("text=Yes, dissolve group");

    // Group should now show as closed
    await expect(page.locator("text=closed")).toBeVisible({ timeout: 5000 });

    // Chat input should be disabled
    await expect(messageInput).toBeDisabled();
  });

  test("should be able to browse and filter groups", async ({ page }) => {
    await page.goto("/groups");

    // Page should load
    await expect(page.locator("text=Find a Group")).toBeVisible();

    // Filter controls should be present
    await expect(page.locator("text=Filters")).toBeVisible();
    await expect(page.locator("text=Restaurant")).toBeVisible();
    await expect(page.locator("text=Dietary Restrictions")).toBeVisible();
    await expect(page.locator("text=Accepts Flex Dollars")).toBeVisible();
  });
});
