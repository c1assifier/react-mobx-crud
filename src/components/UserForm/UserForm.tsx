import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useStores } from "@/store/StoreContext";
import type { FormData, Props } from "@/types/userForm";
import styles from "./UserForm.module.css";

const noLinksRegex =
  /^(?!.*(http:\/\/|https:\/\/|www\.|javascript:|data:|<|>)).*$/i;

const schema = yup.object({
  name: yup
    .string()
    .required("Имя обязательно")
    .min(2, "Слишком короткое имя")
    .matches(noLinksRegex, "Имя не должно содержать ссылки или скрипты"),
  email: yup
    .string()
    .required("Email обязателен")
    .email("Некорректный email")
    .matches(noLinksRegex, "Email не должен содержать ссылки или скрипты"),
  age: yup
    .number()
    .typeError("Возраст должен быть числом")
    .required("Возраст обязателен")
    .positive("Возраст должен быть положительным")
    .integer("Возраст должен быть целым"),
  phone: yup
    .string()
    .required("Телефон обязателен")
    .matches(/^[\d+\-\s()x]+$/, "Некорректный формат телефона")
    .matches(noLinksRegex, "Телефон не должен содержать ссылок"),
  status: yup
    .string()
    .oneOf(["active", "inactive"])
    .required("Статус обязателен"),
});

export const UserForm = ({ onUserCreated }: Props) => {
  const { userStore } = useStores();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      age: undefined,
      phone: "",
      status: "active",
    },
  });

  const status = watch("status");

  const toggleStatus = () => {
    setValue("status", status === "active" ? "inactive" : "active");
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const newUser = {
        ...data,
        id: Date.now(),
        registered: new Date().toISOString(),
      };

      await userStore.createUser(data);
      onUserCreated?.(newUser);
      reset();
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.formContainer}>
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
            {errors.age && (
              <span className={styles.error}>{errors.age.message}</span>
            )}

            <input {...register("phone")} placeholder="Телефон" />
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}

            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={status === "active"}
                onChange={toggleStatus}
              />
              <span>{status === "active" ? "Активен" : "Неактивен"}</span>
            </label>

            <button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Создание..." : "Создать"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
