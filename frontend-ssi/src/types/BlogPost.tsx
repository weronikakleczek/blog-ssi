import { BlogCategory } from "./BlogCategory";

export interface BlogPost {
  blogPostId: string;
  title: string;
  content: string;
  category: BlogCategory;
  date: Date;
}
