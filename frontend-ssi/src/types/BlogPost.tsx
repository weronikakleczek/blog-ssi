import { BlogCategory } from "./BlogCategory";
import { uuid } from "./uuid";

export interface BlogPost {
  blogPostId: uuid;
  authorId: uuid;
  title: string;
  content: string;
  category: BlogCategory;
  date: Date;
}


