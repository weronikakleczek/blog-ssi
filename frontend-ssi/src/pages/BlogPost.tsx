import {
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import authHeader from "../auth/AuthHeader";
import CommentCard from "../components/CommentCard";
import { AddCommentRequest } from "../types/AddCommentRequest";
import colors from "../types/BlogCategory";
import { BlogPost } from "../types/BlogPost";
import { Comment } from "../types/Comment";
import { User } from "../types/User";
import { uuid } from "../types/uuid";

const SingleBlogPost = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const [blogPost, setBlogPost] = useState<BlogPost>();
  const [blogPostAuthor, setBlogPostAuthor] = useState<User>();
  const [comments, setComments] = useState<Comment[]>();
  const [commentToAdd, setCommentToAdd] = useState<string>("");

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

    axios
      .get(`http://localhost:9000/blog-post/${id}/comment`, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log("Comments!: ", response.data);
        setComments(response.data);
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  }, []);

  const handleAddComment = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (commentToAdd) {
      const blogPostUUID: uuid = {
        $oid: id == undefined ? "" : id,
      };

      const addCommentRequest = {
        content: commentToAdd,
        blogPostId: id,
      };

      console.log("sending: ", JSON.stringify(addCommentRequest));

      axios
        .post(
          "http://localhost:9000/comment/add",
          JSON.stringify(addCommentRequest),
          { headers: authHeader() }
        )
        .then((response) => {
          console.log("Added comment succesfully. Response: ", response);
          axios
            .get(`http://localhost:9000/blog-post/${id}/comment`, {
              headers: authHeader(),
            })
            .then((response) => {
              console.log("Comments!: ", response.data);
              setComments(response.data);
            })
            .catch((e) => {
              console.log("Error: ", e);
            });
        })
        .catch((e) => {
          //todo: display error
          console.log("Error registering: " + e);
        });
    }
  };

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
          <Box sx={{ flexGrow: "8", mt: "2rem", minHeight: "50vh" }}>
            {blogPost.content}
          </Box>
          <Box sx={{ flexGrow: "2", mt: "2rem" }}>
            <Typography
              variant="h3"
              sx={{ borderTop: "2px solid #888", p: "2rem 0" }}
            >
              Comments
            </Typography>
            <form>
              <FormControl fullWidth>
                <TextField
                  id="outlined-multiline-static"
                  label="Add a comment"
                  multiline
                  value={commentToAdd}
                  onChange={(e) => setCommentToAdd(e.target.value)}
                  fullWidth
                  rows={4}
                />
                <IconButton
                  onClick={handleAddComment}
                  color="primary"
                  sx={{ margin: "0 auto", mt: "1rem" }}
                >
                  <Button variant="outlined">Add</Button>
                </IconButton>
              </FormControl>
            </form>
            <Box>
              {comments &&
                comments.map((comment: Comment) => (
                  <CommentCard key={comment.commentId.$oid} comment={comment} />
                ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography>Couldn't load blog post.</Typography>
      )}
    </Box>
  );
};

export default SingleBlogPost;
