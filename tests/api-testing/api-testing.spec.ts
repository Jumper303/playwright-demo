import { expect, test } from "@playwright/test";

type UserPayload = {
  name: string;
  email: string;
};

test("Verify users API", async ({ request }) => {
  const response = await test.step("Get users list", async () => {
    const res = await request.get("/users");
    await expect(res).toBeOK();
    return res;
  });

  const users = await test.step("Parse users list", async () => {
    // simple schema validation. In a real-world scenario, we would use a more robust schema validation library such as zod.
    const usersList = (await response.json()) as UserPayload[];
    expect(usersList.length).toBeGreaterThan(0);

    /*
    for (const user of usersList) {
      console.log(`${user.name} - ${user.email}`);
    }
    */

    return usersList;
  });

  await test.step("Verify the first user email contains @", () => {
    expect(users[0]!.email).toContain("@");
  });
});
