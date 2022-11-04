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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      width="100vw"
      pt="10vh"
    >
      <Typography variant="h3" mb="4vh">
        Recent blog posts
      </Typography>
      {blogs && blogs.map((blog: BlogPost) => <BlogCard blog={blog} />)}
    </Box>
  );
};

export default BlogList;
