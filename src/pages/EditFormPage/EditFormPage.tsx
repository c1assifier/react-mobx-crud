import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStores } from "@/store/StoreContext";
import type { IUser } from "@/types/User";
import styles from "./EditFormPage.module.css";
import { EditForm } from "@/components/EditForm";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ThemeToggle } from "@/components/ThemeToggle.tsx";

export const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userStore } = useStores();

  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);

  useEffect(() => {
    const targetUser = userStore.users.find((u) => String(u.id) === id);
    if (targetUser) {
      setUserToEdit(targetUser);
    } else {
      navigate("/");
    }
  }, [id, userStore.users, navigate]);

  return (
    <div className={styles.page}>
      <ThemeToggle />
      <h1 className={styles.title}>Редактирование пользователя</h1>

      {userToEdit && (
        <EditForm
          user={userToEdit}
          onSubmit={(updatedData) => {
            userStore.updateUser({
              ...userToEdit,
              ...updatedData,
              age: Number(updatedData.age), //! строка в число
            });
            navigate("/");
          }}
        />
      )}

      <button className={styles.backButton} onClick={() => navigate("/")}>
        <IoMdArrowRoundBack /> На главную
      </button>
    </div>
  );
};
