import { makeAutoObservable, runInAction } from "mobx";
import type { IUser } from "@/types/User";
import { API_URL } from "@/config/endpoints";

class UserStore {
  users: IUser[] = [];
  isLoading = false;
  page = 1;
  hasMore = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchMoreUsers = async () => {
    if (this.isLoading || !this.hasMore) return;
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const response = await fetch(`${API_URL}?_limit=12&_page=${this.page}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data: IUser[] = await response.json();
      runInAction(() => {
        const newUsers = data.filter(
          (u) => !this.users.some((existing) => existing.id === u.id),
        );
        this.users = [...this.users, ...newUsers];
        if (data.length === 0 || data.length < 10 || newUsers.length === 0) {
          this.hasMore = false;
        } else {
          this.page += 1;
        }
      });
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}

export const userStore = new UserStore();
