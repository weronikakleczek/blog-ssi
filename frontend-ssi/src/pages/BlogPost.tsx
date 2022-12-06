import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import authHeader from "../auth/AuthHeader";
import colors from "../types/BlogCategory";
import { BlogPost } from "../types/BlogPost";
import { User } from "../types/User";

const SingleBlogPost = () => {
  const { id } = useParams();

  const [blogPost, setBlogPost] = useState<BlogPost>();
  const [blogPostAuthor, setBlogPostAuthor] = useState<User>();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/blog-post/${id}`, { headers: authHeader() })
      .then((responseBlogPost) => {
        const blogPostString: string = JSON.stringify(responseBlogPost.data);
        const blogPostObject: BlogPost = JSON.parse(blogPostString);
        setBlogPost(blogPostObject);
        axios
          .get(`http://localhost:9000/users/${blogPostObject.authorId.$oid}`, {
            headers: authHeader(),
          })
          .then((responseAuthor) => {
            const blogPostAuthorString: string = JSON.stringify(
              responseAuthor.data
            );
            const blogPostAuthorObject: User = JSON.parse(blogPostAuthorString);
            setBlogPostAuthor(blogPostAuthorObject);
          });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {blogPost ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            minHeight: "100%",
            width: "80vw",
            p: "4rem",
          }}
        >
          {blogPostAuthor && (
            <Box
              flexGrow="1"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  minHeight: "5rem",
                }}
              >
                Written by
                <Typography
                  variant="h6"
                  sx={{ borderBottom: "1px solid #bbb" }}
                >
                  <Link
                    to={`/users/${blogPostAuthor.userId.$oid}`}
                    style={{ textDecoration: "none", color: "#555" }}
                  >
                    {blogPostAuthor.username}
                  </Link>
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                bgcolor={colors[blogPost.category]}
                sx={{
                  justifyContent: "center",
                  borderRadius: "5px",
                  p: "8px",
                }}
              >
                {blogPost.category}
              </Typography>
            </Box>
          )}

          <Typography
            variant="h1"
            flexGrow="4"
            sx={{ m: "4rem 0", borderBottom: "2px solid #999" }}
          >
            {blogPost.title}
          </Typography>
          <Box
            sx={{
              flexGrow: "2",
              display: "flex",
              alignItems: "center",
              width: "20%",
            }}
          ></Box>
          <Box sx={{ flexGrow: "10", mt: "2rem" }}>{blogPost.content}</Box>
        </Box>
      ) : (
        <Typography>Couldn't load blog post.</Typography>
      )}
    </Box>
  );
};

export default SingleBlogPost;
