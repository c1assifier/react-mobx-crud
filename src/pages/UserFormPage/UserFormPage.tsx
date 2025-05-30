import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { UserForm } from "@/components/UserForm/UserForm";
import type { IUser } from "@/types/User";
import styles from "./UserFormPage.module.css";
import { FaCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ThemeToggle } from "@/components/ThemeToggle.tsx";

export const UserFormPage = () => {
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  const [createdUsers, setCreatedUsers] = useState<IUser[]>(() => {
    const saved = localStorage.getItem("createdU sers");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("createdUsers", JSON.stringify(createdUsers));
  }, [createdUsers]);

  return (
    <div className={styles.page}>
      <ThemeToggle />
      <h1 className={styles.title}>Создание пользователя</h1>

      <UserForm
        onUserCreated={(user) => setCreatedUsers((prev) => [user, ...prev])}
      />

      <button className={styles.backButton} onClick={() => navigate("/")}>
        <IoMdArrowRoundBack /> На главную
      </button>

      {!showHistory && (
        <button
          className={styles.iconButtonFixed}
          onClick={() => setShowHistory(true)}
          aria-label="Открыть историю"
        >
          <FaHistory />
        </button>
      )}

      {showHistory && (
        <div className={styles.historyPanel}>
          <div className={styles.historyHeader}>
            <h3>История пользователей</h3>
            <button
              className={styles.iconButton}
              onClick={() => setShowHistory(false)}
              aria-label="Закрыть"
            >
              <FaHistory />
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Возраст</th>
                <th>Статус</th>
                <th>Телефон</th>
              </tr>
            </thead>
            <tbody>
              {createdUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <FaCircle
                      color={user.status === "active" ? "#00e676" : "#888"}
                      size={12}
                      title={user.status}
                    />
                  </td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
