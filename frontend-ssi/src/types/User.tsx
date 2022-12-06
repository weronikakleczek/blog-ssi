import { uuid } from "./uuid";

export interface User {
  userId: uuid;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  aboutMe: string;
  createdAt: Date;
}
