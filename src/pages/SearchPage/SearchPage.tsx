import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "@/store/StoreContext";
import styles from "./SearchPage.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { ThemeToggle } from "@/components/ThemeToggle.tsx";

type StatusFilter = "all" | "active" | "inactive";

export const SearchPage = () => {
  const { userStore } = useStores();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  //* Для посика сразу всех при поиске, иначе были только те, кто прогрузился на главной
  useEffect(() => {
    userStore.fetchAllUsers();
  }, [userStore]);

  const filteredUsers = userStore.users.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(query.toLowerCase());
    const statusMatch = statusFilter === "all" || user.status === statusFilter;
    return nameMatch && statusMatch;
  });

  return (
    <div className={styles.page}>
      <ThemeToggle />
      <h1 className={styles.title}>Поиск пользователей</h1>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Поиск по имени"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatusFilter(e.target.value as StatusFilter)
          }
        >
          <option value="all">Все</option>
          <option value="active">Активные</option>
          <option value="inactive">Неактивные</option>
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Возраст</th>
            <th>Телефон</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.phone}</td>
              <td>
                <FaCircle
                  color={user.status === "active" ? "#00e676" : "#888"}
                  size={12}
                  title={user.status}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.backButton} onClick={() => navigate("/")}>
        <IoMdArrowRoundBack /> На главную
      </button>
    </div>
  );
};
