import type { IUser } from "./user.ts";

export type EditFormData = {
  name: string;
  email: string;
  age: number;
  phone: string;
  status: "active" | "inactive";
};

export type EditFormProps = {
  user?: IUser;
  onSubmit: (data: EditFormData) => void;
  onSuccess?: () => void;
};
