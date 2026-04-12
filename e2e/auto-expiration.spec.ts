import { test, expect } from "@playwright/test";

// C34: Verify auto-expiration (create group with short deadline, verify closed)
// Note: This test requires pg_cron to be enabled in Supabase.
// If pg_cron is not enabled, the auto-expiration must be tested manually.

const TEST_EMAIL = `expire_test_${Date.now()}@barnard.edu`;
const TEST_PASSWORD = "testpass123";

test.describe("Group Auto-Expiration", () => {
  test.skip(
    !process.env.TEST_AUTO_EXPIRE,
    "Skipped: set TEST_AUTO_EXPIRE=1 to run (requires pg_cron and ~2min wait)"
  );

  test("should auto-close group when deadline passes", async ({ page }) => {
    // Sign up
    await page.goto("/signup");
    await page.fill('input[id="displayName"]', "Expire Tester");
    await page.fill('input[id="email"]', TEST_EMAIL);
    await page.fill('input[id="password"]', TEST_PASSWORD);
    await page.fill('input[id="confirmPassword"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL("**/groups", { timeout: 10000 });

    // Create a group with a 2-minute deadline
    await page.goto("/groups/new");
    await page.fill('input[id="name"]', "Expiring Group");
    const restaurantSelect = page.locator('select[id="restaurant"]');
    await restaurantSelect.selectOption({ index: 1 });
    await page.fill('input[id="maxMembers"]', "5");

    // Set deadline to 2 minutes from now
    const deadline = new Date(Date.now() + 2 * 60 * 1000);
    const deadlineStr = deadline.toISOString().slice(0, 16);
    await page.fill('input[id="orderDeadline"]', deadlineStr);
    await page.click('button[type="submit"]');
    await page.waitForURL("**/groups/**", { timeout: 10000 });

    // Verify group is open
    await expect(page.locator("text=open")).toBeVisible();

    // Wait for the deadline to pass + pg_cron interval (runs every minute)
    // Total wait: ~2.5 minutes
    await page.waitForTimeout(150000);

    // Reload to check status
    await page.reload();

    // Group should now be closed
    await expect(page.locator("text=closed")).toBeVisible({ timeout: 10000 });

    // Chat input should be disabled
    const messageInput = page.locator("textarea");
    await expect(messageInput).toBeDisabled();
  });
});

test.describe("Group Deadline Display", () => {
  test("should show time remaining on group cards", async ({ page }) => {
    await page.goto("/groups");

    // If there are any open groups, they should show time remaining
    const groupCards = page.locator("[data-slot='card']");
    const count = await groupCards.count();

    if (count > 0) {
      // Each card should have some time indicator (e.g., "23m left" or "Expired")
      const firstCard = groupCards.first();
      const cardText = await firstCard.textContent();
      expect(
        cardText?.includes("left") || cardText?.includes("Expired")
      ).toBeTruthy();
    }
  });

  test("should not allow creating a group with past deadline", async ({
    page,
  }) => {
    await page.goto("/groups/new");

    await page.fill('input[id="name"]', "Past Deadline Group");
    const restaurantSelect = page.locator('select[id="restaurant"]');
    await restaurantSelect.selectOption({ index: 1 });

    // Set deadline to 1 hour in the past
    const pastDeadline = new Date(Date.now() - 60 * 60 * 1000);
    const deadlineStr = pastDeadline.toISOString().slice(0, 16);
    await page.fill('input[id="orderDeadline"]', deadlineStr);
    await page.click('button[type="submit"]');

    // Should show validation error
    await expect(
      page.locator("text=Deadline must be in the future")
    ).toBeVisible();
  });
});
