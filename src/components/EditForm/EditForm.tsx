import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import styles from "./EditForm.module.css";
import type { EditFormData, EditFormProps } from "@/types/editForm";

const schema = yup.object({
  name: yup.string().required("Имя обязательно").min(2, "Слишком короткое имя"),
  email: yup.string().required("Email обязателен").email("Некорректный email"),
  age: yup
    .number()
    .typeError("Возраст должен быть числом")
    .required("Возраст обязателен")
    .min(0, "Возраст не может быть отрицательным")
    .max(120, "Слишком большой возраст"),
  phone: yup.string().required("Телефон обязателен"),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Некорректный статус")
    .required("Статус обязателен"),
});

export const EditForm = ({ user, onSubmit }: EditFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<EditFormData>({
    resolver: yupResolver(schema),
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
      setValue("age", user.age ?? 0);
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

      <input type="number" {...register("age")} placeholder="Возраст" />
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
