import type { IUser } from "./User";

export type FormData = {
  name: string;
  email: string;
  age: string;
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
