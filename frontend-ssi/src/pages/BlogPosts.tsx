import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogList from "../components/BlogList";
import { BlogCategory } from "../types/BlogCategory";
import { BlogPost } from "../types/BlogPost";
import { User } from "../types/User";

const BlogPosts = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);
  const fistBlog: BlogPost = {
    blogPostId: "abc",
    title: "First blog",
    content:
      "This is a first blog's content with a long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long content",
    category: BlogCategory.TECH,
    date: new Date(),
  };

  const secondBlog: BlogPost = {
    blogPostId: "def",
    title: "Second blog",
    content: "This is a second blog's content",
    category: BlogCategory.FASHION,
    date: new Date(),
  };

  const thirdBlog: BlogPost = {
    blogPostId: "ghi",
    title: "Third blog",
    content: "This is a third blog's content",
    category: BlogCategory.BOOKS,
    date: new Date(),
  };

  const fourthBlog: BlogPost = {
    blogPostId: "jkl",
    title: "Fourth blog",
    content: "This is a fourth blog's content",
    category: BlogCategory.CARS,
    date: new Date(),
  };

  const fifthBlog: BlogPost = {
    blogPostId: "mno",
    title: "Fifth blog",
    content: "This is a fifth blog's content",
    category: BlogCategory.OTHER,
    date: new Date(),
  };

  const tempBlogList: BlogPost[] = [
    fistBlog,
    secondBlog,
    thirdBlog,
    fourthBlog,
    fifthBlog,
  ];

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
        Blogs of user with ID {id}{" "}
      </Typography>
      <BlogList blogs={tempBlogList} />
    </Box>
  );
};

export default BlogPosts;
