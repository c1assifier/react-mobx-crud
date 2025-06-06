export interface IUser {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  status: "active" | "inactive";
  registered: string;
}
