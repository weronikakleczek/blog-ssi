import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import {
  amber,
  brown,
  grey,
  lightBlue,
  lightGreen,
  red,
  teal,
} from "@mui/material/colors";
import React, { FC } from "react";
import { BlogCategory } from "../types/BlogCategory";
import { BlogPost } from "../types/BlogPost";

interface Props {
  blog: BlogPost;
}

const BlogCard: FC<Props> = ({ blog }) => {
  const colors: Record<string, string> = {
    TECH: grey[700],
    SPORT: lightGreen[500],
    FASHION: amber[300],
    LIFESTYLE: teal[100],
    BOOKS: brown[200],
    CARS: red[600],
    TUTORIAL: lightBlue[400],
    OTHER: grey[100],
  };

  const getBlogContent = (content: string) => {
    return content.length >= 250
      ? content.slice(0, 250) + "..."
      : content.slice(0, 250);
  };

  return (
    <Card
      elevation={2}
      sx={{
        width: "40vw",
        minHeight: "20vh",
        m: "2vh 0",
        bgcolor: "secondary.main",
      }}
    >
      <CardHeader
        title={blog.title}
        titleTypographyProps={{
          fontSize: 32,
          fontFamily: "Oswald",
        }}
        avatar={
          <Avatar
            sx={{
              backgroundColor: colors[BlogCategory[blog.category]],
            }}
          >
            {BlogCategory[blog.category][0]}
          </Avatar>
        }
      />
      <CardContent>
        <Typography>{getBlogContent(blog.content)}</Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
