import { expect, test } from "@playwright/test";
import { Logger } from "tslog";

const logger = new Logger();

type UserPayload = {
  name: string;
  email: string;
};

test("Verify users API", async ({ request }) => {
  const response = await test.step("Get users list", async () => {
    const res = await request.get("/users");
    expect(res.status()).toBe(200);
    return res;
  });

  const users = await test.step("Parse users list", async () => {
    const usersList: unknown = JSON.parse(await response.text());
    const parsed = usersList as UserPayload[];
    expect(parsed.length).toBeGreaterThan(0);

    for (const user of parsed) {
      logger.info(`${user.name} - ${user.email}`);
    }

    return parsed;
  });

  await test.step("Verify users list", () => {
    expect(users[0]?.email).toContain("@");
  });
});
