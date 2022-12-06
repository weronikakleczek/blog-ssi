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
import React, { FC, useEffect } from "react";
import colors, { BlogCategory } from "../types/BlogCategory";
import { BlogPost } from "../types/BlogPost";

interface Props {
  blog: BlogPost;
}

const BlogCard: FC<Props> = ({ blog }) => {

  const getBlogContent = (content: string) => {
    return content.length >= 250
      ? content.slice(0, 250) + "..."
      : content.slice(0, 250);
  };

  useEffect(() => {
    console.log(colors["TECH"]);
  }, []);

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
              backgroundColor: colors[blog.category],
            }}
          >
            {blog.category.toString().charAt(0)}
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
