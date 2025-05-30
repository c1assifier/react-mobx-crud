import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import styles from "./EditForm.module.css";
import type { EditFormData, EditFormProps } from "@/types/editForm";

const noLinksRegex =
  /^(?!.*(http:\/\/|https:\/\/|www\.|javascript:|data:|<|>)).*$/i;

const schema = yup.object({
  name: yup
    .string()
    .required("Имя обязательно")
    .min(2, "Слишком короткое имя")
    .matches(/^[A-Za-zА-Яа-яЁё\s'-]+$/, "Имя должно содержать только буквы")
    .matches(noLinksRegex, "Имя не должно содержать ссылки или скрипты"),
  email: yup
    .string()
    .required("Email обязателен")
    .email("Некорректный email")
    .matches(noLinksRegex, "Email не должен содержать ссылки или скрипты"),
  age: yup
    .string()
    .required("Возраст обязателен")
    .matches(/^\d+$/, "Возраст должен быть целым числом"),
  phone: yup
    .string()
    .required("Телефон обязателен")
    .matches(/^[\d\s()+-]{7,20}$/, "Некорректный формат телефона")
    .matches(noLinksRegex, "Телефон не должен содержать ссылок"),
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
      age: user?.age?.toString() ?? "",
      phone: user?.phone || "",
      status: user?.status || "active",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("age", user.age.toString());
      setValue("phone", user.phone);
      setValue("status", user.status);
    }
  }, [user, setValue]);

  const status = watch("status");
  const isActive = status === "active";

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((formData) => {
        onSubmit({
          ...formData,
          age: formData.age.toString(),
        });
      })}
    >
      <input {...register("name")} placeholder="Имя" />
      {errors.name && (
        <span className={styles.error}>{errors.name.message}</span>
      )}

      <input {...register("email")} placeholder="Email" />
      {errors.email && (
        <span className={styles.error}>{errors.email.message}</span>
      )}

      <input {...register("age")} placeholder="Возраст" />
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
