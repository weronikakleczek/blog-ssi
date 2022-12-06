import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import authHeader from "../auth/AuthHeader";
import BlogList from "../components/BlogList";
import { BlogCategory } from "../types/BlogCategory";
import { BlogPost } from "../types/BlogPost";

const Home = () => {
  const [blogs, setBlogs] = useState<BlogPost[] | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/blog-post`, { headers: authHeader() })
      .then((responseBlogPosts) => {
        const blogPostsString: string = JSON.stringify(responseBlogPosts.data);
        const blogPostsObject: BlogPost[] = JSON.parse(blogPostsString);
        setBlogs(blogPostsObject);
        console.log("Retrieved blogs: ", blogPostsObject);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

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
      {blogs !== undefined && <BlogList blogs={blogs} />}
    </Box>
  );
};

export default Home;
