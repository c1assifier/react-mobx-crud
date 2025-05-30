import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserStore } from "../userStore";
import type { IUser } from "@/types/User";

describe("UserStore", () => {
  let store: UserStore;

  beforeEach(() => {
    store = new UserStore();
  });

  it("должен отправлять нового пользователя и добавлять его в store", async () => {
    const newUser: IUser = {
      id: 123,
      name: "Jane Smith",
      email: "jane@example.com",
      age: 28,
      phone: "+987654321",
      status: "active",
      registered: "2024-01-01",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(newUser),
      }),
    ) as unknown as typeof fetch;

    await store.createUser(newUser);

    expect(store.users.length).toBe(1);
    expect(store.users[0].email).toBe("jane@example.com");
    expect(store.users[0].name).toBe("Jane Smith");
  });
});
