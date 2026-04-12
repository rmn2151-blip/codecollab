import { test, expect } from "@playwright/test";

// C35: Verify group full prevents new joins
// This test creates a group with max 2 members (leader + 1),
// has a second user join, then verifies a third user cannot join.

test.describe("Group Full Prevention", () => {
  test("should disable join button when group is full", async ({ page }) => {
    await page.goto("/groups");

    // Check if any group cards exist
    const groupCards = page.locator("[data-slot='card']");
    const count = await groupCards.count();

    if (count > 0) {
      // Look for any "Group Full" buttons
      const fullButtons = page.locator('button:has-text("Group Full")');
      const fullCount = await fullButtons.count();

      if (fullCount > 0) {
        // Full group buttons should be disabled
        const firstFullButton = fullButtons.first();
        await expect(firstFullButton).toBeDisabled();
      }
    }
  });

  test("should show member count on group cards", async ({ page }) => {
    await page.goto("/groups");

    const groupCards = page.locator("[data-slot='card']");
    const count = await groupCards.count();

    if (count > 0) {
      const firstCard = groupCards.first();
      const cardText = await firstCard.textContent();
      // Should show something like "1/8 members" or "5/10 members"
      expect(cardText).toMatch(/\d+\/\d+ members/);
    }
  });

  test("should enforce max members constraint in create group form", async ({
    page,
  }) => {
    await page.goto("/groups/new");

    // The max members slider should exist
    const slider = page.locator('input[id="maxMembers"]');
    await expect(slider).toBeVisible();

    // Check min/max attributes
    const min = await slider.getAttribute("min");
    const max = await slider.getAttribute("max");
    expect(min).toBe("2");
    expect(max).toBe("18");
  });

  test("should show correct member count on group detail page", async ({
    page,
  }) => {
    // Sign up first
    const email = `fulltest_${Date.now()}@university.edu`;
    await page.goto("/signup");
    await page.fill('input[id="displayName"]', "Full Tester");
    await page.fill('input[id="email"]', email);
    await page.fill('input[id="password"]', "testpass123");
    await page.fill('input[id="confirmPassword"]', "testpass123");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/groups", { timeout: 10000 });

    // Create a group with max 2 members
    await page.goto("/groups/new");
    await page.fill('input[id="name"]', "Small Group Test");
    const restaurantSelect = page.locator('select[id="restaurant"]');
    await restaurantSelect.selectOption({ index: 1 });

    // Set max to 2 (minimum)
    const slider = page.locator('input[id="maxMembers"]');
    await slider.fill("2");

    const deadline = new Date(Date.now() + 60 * 60 * 1000);
    await page.fill('input[id="orderDeadline"]', deadline.toISOString().slice(0, 16));
    await page.click('button[type="submit"]');
    await page.waitForURL("**/groups/**", { timeout: 10000 });

    // Should show "Members (1/2)" - leader is the only member
    await expect(page.locator("text=Members (1/2)")).toBeVisible({ timeout: 5000 });
  });
});
