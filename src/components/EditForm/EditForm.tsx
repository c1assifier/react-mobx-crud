import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { userSchema } from "@/validation/userSchema";
import styles from "./EditForm.module.css";
import type { EditFormData, EditFormProps } from "@/types/editForm";

export const EditForm = ({ user, onSubmit }: EditFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<EditFormData>({
    resolver: yupResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      age: user?.age ?? 0,
      phone: user?.phone || "",
      status: user?.status || "active",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("age", user.age);
      setValue("phone", user.phone);
      setValue("status", user.status);
    }
  }, [user, setValue]);

  const status = watch("status");
  const isActive = status === "active";

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Имя" />
      {errors.name && (
        <span className={styles.error}>{errors.name.message}</span>
      )}

      <input {...register("email")} placeholder="Email" />
      {errors.email && (
        <span className={styles.error}>{errors.email.message}</span>
      )}

      <input
        {...register("age", { valueAsNumber: true })}
        type="number"
        placeholder="Возраст"
        min={14}
        max={120}
      />
      {errors.age && <span className={styles.error}>{errors.age.message}</span>}

      <input {...register("phone")} placeholder="Телефон" />
      {errors.phone && (
        <span className={styles.error}>{errors.phone.message}</span>
      )}

      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) =>
            setValue("status", e.target.checked ? "active" : "inactive")
          }
        />
        <span>{isActive ? "Активен" : "Неактивен"}</span>
      </label>

      <button type="submit" disabled={!isValid}>
        {user ? "Сохранить изменения" : "Создать пользователя"}
      </button>
    </form>
  );
};
