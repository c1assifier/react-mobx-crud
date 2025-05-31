import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useStores } from "@/store/StoreContext";
import type { FormData, Props } from "@/types/userForm";
import { userSchema } from "@/validation/userSchema";
import styles from "./UserForm.module.css";

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
    resolver: yupResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      age: 0,
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

      await userStore.createUser(newUser);

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
            <input
              {...register("name")}
              placeholder="Имя"
              autoComplete="name"
              aria-invalid={!!errors.name}
              required
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}

            <input
              {...register("email")}
              placeholder="Email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              required
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}

            <input
              {...register("age", { valueAsNumber: true })}
              placeholder="Возраст"
              type="number"
              min={14}
              max={120}
              aria-invalid={!!errors.age}
              required
            />
            {errors.age && (
              <span className={styles.error}>{errors.age.message}</span>
            )}

            <input
              {...register("phone")}
              placeholder="Телефон"
              type="tel"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              required
            />
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
