import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserStore } from "../userStore";
import type { IUser } from "@/types/User";

describe("UserStore", () => {
  let store: UserStore;

  beforeEach(() => {
    store = new UserStore();
  });

  it("должен загружать пользователей с API", async () => {
    const mockUsers: IUser[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        age: 30,
        phone: "+123456789",
        status: "active",
        registered: "2023-06-08",
      },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      }),
    ) as unknown as typeof fetch; //! Убрал ошибку с any

    await store.fetchMoreUsers();

    expect(store.users.length).toBe(1);
    expect(store.users[0].name).toBe("John Doe");
  });
});
