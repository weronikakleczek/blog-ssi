import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { FC } from "react";
import { BlogPost } from "../types/BlogPost";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

interface Props {
  blogs: BlogPost[];
}

const BlogList: FC<Props> = ({ blogs }) => {
  useEffect(() => {
    console.log("IM HERE", blogs);
  }, []);

  return (
    <Box>
      {blogs.map((blog: BlogPost) => (
        <Link
          to={`/blog-post/${blog.blogPostId.$oid}`}
          style={{ textDecoration: "none" }}
        >
          <BlogCard blog={blog} />
        </Link>
      ))}
    </Box>
  );
};

export default BlogList;
