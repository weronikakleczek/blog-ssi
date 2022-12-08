import {Avatar, Button, Card, CardContent, CardHeader, Typography,} from "@mui/material";
import React, {FC, useContext, useEffect} from "react";
import colors from "../types/BlogCategory";
import {BlogPost} from "../types/BlogPost";
import {Link} from "react-router-dom";
import UserContext from "../UserContext";

interface Props {
    blog: BlogPost;
    deletePostFun: Function
    deleteUserFun: Function
}

const BlogCard: FC<Props> = ({blog, deletePostFun, deleteUserFun}) => {

    const { user } = useContext(UserContext);

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
                textDecoration: "none"
            }}
        >
            <Link
                to={`/blog-post/${blog.blogPostId.$oid}`}
                style={{textDecoration: "none"}}
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
            </Link>
            {
                user ?
                <div style={{margin: "0.5rem"}}>
                    {(user.entitlements == "admin") || user.userId.$oid == blog.authorId.$oid ?
                        <Button sx={{margin: "0.3rem"}} variant="contained" onClick={() => {
                            deletePostFun(blog.blogPostId)
                        }}>Delete post</Button> : ""}
                    {user.entitlements == "admin" ?
                        <Button sx={{margin: "0.3rem"}} variant="contained" onClick={() => {
                            deleteUserFun(blog.authorId)
                        }}>Delete user</Button> :
                        ""}
                </div> : "" }
        </Card>
    );
};

export default BlogCard;
