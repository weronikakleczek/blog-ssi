import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authHeader from "../auth/AuthHeader";
import BlogList from "../components/BlogList";
import { BlogCategory } from "../types/BlogCategory";
import { BlogPost } from "../types/BlogPost";
import { User } from "../types/User";

const BlogPosts = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const tempBlogList: BlogPost[] = [];

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
