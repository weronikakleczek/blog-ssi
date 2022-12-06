import { uuid } from "./uuid";

export interface Comment {
  commentId: uuid;
  content: string;
  date: Date;
}
