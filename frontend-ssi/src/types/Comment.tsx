import { uuid } from "./uuid";

export interface Comment {
  commentId: uuid;
  authorId: uuid;
  blogPostId: uuid;
  content: string;
  date: dateFromBE;
}

interface dateFromBE {
  $date: Date;
}
