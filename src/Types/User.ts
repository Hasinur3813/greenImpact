export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "volunteer" | "donor";
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
