import type { IUser } from "./user";

export type FormData = {
  name: string;
  email: string;
  age: number;
  phone: string;
  status: "active" | "inactive";
};

export type Props = {
  onUserCreated?: (user: IUser) => void;
};
//*   _________
//   //* ___ *\\
//*  \\ |___| //
//*   \\_____//
//*
