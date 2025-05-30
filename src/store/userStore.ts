import { makeAutoObservable, runInAction } from "mobx";
import type { IUser } from "@/types/User";
import { API_URL } from "@/config/endpoints";
import { mockUsers } from "@/mocks/users";

const isGithubPages =
  typeof window !== "undefined" &&
  window.location.hostname.includes("github.io");
export class UserStore {
  users: IUser[] = [];
  isLoading = false;
  page = 1;
  hasMore = true;
  isUsingMock = isGithubPages;

  constructor() {
    makeAutoObservable(this);
  }

  fetchAllUsers = async () => {
    if (this.isUsingMock) {
      runInAction(() => {
        this.users = mockUsers;
        this.hasMore = false;
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}`);
      const data: IUser[] = await response.json();

      runInAction(() => {
        this.users = data;
        this.hasMore = false;
      });
    } catch (error) {
      console.error("Ошибка при загрузке всех пользователей:", error);
    }
  };

  fetchMoreUsers = async () => {
    if (this.isLoading || !this.hasMore) return;

    this.isLoading = true;

    if (this.isUsingMock) {
      runInAction(() => {
        const newUsers = mockUsers.slice((this.page - 1) * 12, this.page * 12);
        this.users = [...this.users, ...newUsers];
        if (newUsers.length < 12) {
          this.hasMore = false;
        } else {
          this.page += 1;
        }
        this.isLoading = false;
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}?_limit=12&_page=${this.page}`);
      if (!response.ok) throw new Error();

      const data: IUser[] = await response.json();

      runInAction(() => {
        const newUsers = data.filter(
          (u) => !this.users.some((existing) => existing.id === u.id),
        );
        this.users = [...this.users, ...newUsers];
        if (data.length < 12 || newUsers.length === 0) {
          this.hasMore = false;
        } else {
          this.page += 1;
        }
      });
    } catch {
      console.warn("Переход на mockUsers из-за ошибки API");
      runInAction(() => {
        this.users = mockUsers;
        this.hasMore = false;
        this.isUsingMock = true;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  createUser = async (newUser: Omit<IUser, "id" | "registered">) => {
    const nextId = this.getNextUserId();
    const registered = new Date().toISOString().split("T")[0];

    const createdUser: IUser = {
      ...newUser,
      id: nextId,
      registered,
    };

    if (this.isUsingMock) {
      runInAction(() => {
        this.users = [createdUser, ...this.users];
      });
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createdUser),
      });

      if (!response.ok) throw new Error();

      const result: IUser = await response.json();
      runInAction(() => {
        this.users = [result, ...this.users];
      });
    } catch (error) {
      console.error("Ошибка создания пользователя:", error);
    }
  };

  updateUser = async (updatedUser: IUser) => {
    if (this.isUsingMock) {
      runInAction(() => {
        this.users = this.users.map((u) =>
          u.id === updatedUser.id ? updatedUser : u,
        );
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${updatedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error();

      const result: IUser = await response.json();
      runInAction(() => {
        this.users = this.users.map((u) => (u.id === result.id ? result : u));
      });
    } catch (error) {
      console.error("Ошибка обновления пользователя:", error);
    }
  };

  deleteUser = async (id: number) => {
    if (this.isUsingMock) {
      runInAction(() => {
        this.users = this.users.filter((user) => user.id !== id);
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      runInAction(() => {
        this.users = this.users.filter((user) => user.id !== id);
      });
    } catch (error) {
      console.error("Ошибка удаления пользователя:", error);
    }
  };

  private getNextUserId = () => {
    const maxId = this.users.reduce((max, user) => Math.max(max, user.id), 0);
    return maxId + 1;
  };
}

export const userStore = new UserStore();
