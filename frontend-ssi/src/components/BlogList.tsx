import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { BlogPost } from "../types/BlogPost";
import BlogCard from "./BlogCard";

interface Props {
  blogs: BlogPost[];
}

const BlogList: FC<Props> = ({ blogs }) => {
  return (
    <Box>
      {blogs && blogs.map((blog: BlogPost) => <BlogCard blog={blog} />)}
    </Box>
  );
};

export default BlogList;
