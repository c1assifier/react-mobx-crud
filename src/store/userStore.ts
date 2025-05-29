import { makeAutoObservable } from "mobx";

class UserStore {
  users = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchUsers = async () => {
    this.isLoading = true;
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      this.users = data;
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    } finally {
      this.isLoading = false;
    }
  };
}

export const userStore = new UserStore();
