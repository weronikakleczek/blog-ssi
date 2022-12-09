import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authHeader from "../auth/AuthHeader";
import { Comment } from "../types/Comment";
import { User } from "../types/User";

interface Props {
  comment: Comment;
}

const CommentCard: FC<Props> = ({ comment }) => {
  const [authorName, setAuthorName] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://localhost:9000/users/${comment.authorId.$oid}`, {
        headers: authHeader(),
      })
      .then((response) => {
        const user: User = JSON.parse(JSON.stringify(response.data));
        setAuthorName(user.username);
      })
      .catch((e) => {
        console.log("Error getting an user: ", e);
      });
  }, []);

  return (
    <Card variant="outlined" sx={{ p: "2rem", m: "1rem" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "1rem" }}
      >
        <Typography sx={{ fontSize: "14px" }}>
          <Link
            to={`/user/${comment.authorId.$oid}/blog-post`}
            style={{ textDecoration: "none", color: "#555" }}
          >
            {authorName}
          </Link>
        </Typography>
        <Typography>
          {new Date(parseInt(comment.date.$date.toString())).toLocaleString()}
        </Typography>
      </Box>
      <Box flexGrow={8} sx={{ fontSize: "2rem" }}>
        {comment.content}
      </Box>
    </Card>
  );
};

export default CommentCard;
