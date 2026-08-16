import { expect, test } from "@playwright/test";

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
    const usersList = JSON.parse(await response.text()) as UserPayload[];
    expect(usersList.length).toBeGreaterThan(0);

    /*
    for (const user of usersList) {
      console.log(`${user.name} - ${user.email}`);
    }
    */

    return usersList;
  });

  await test.step("Verify users list", () => {
    expect(users[0]!.email).toContain("@");
  });
});
