import * as yup from "yup";

export const noLinksRegex =
  /^(?!.*(http:\/\/|https:\/\/|www\.|javascript:|data:|<|>)).*$/i;

export const userSchema = yup.object({
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
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(ru|com|org|net|edu|gov|info)$/i,
      "Email должен оканчиваться на .ru, .com и т.п.",
    )
    .matches(noLinksRegex, "Email не должен содержать ссылки или скрипты"),
  age: yup
    .number()
    .typeError("Возраст должен быть числом")
    .required("Возраст обязателен")
    .integer("Возраст должен быть целым числом")
    .min(14, "Минимальный возраст — 14 лет")
    .max(120, "Возраст не может быть больше 120"),
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

//! Вынес в отдельный блок, потому что был ранее конфликт. Не знаю, почему ранее не заметил ^_^
