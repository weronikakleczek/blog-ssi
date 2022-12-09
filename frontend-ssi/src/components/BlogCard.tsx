import {Avatar, Button, Card, CardContent, CardHeader, Typography,} from "@mui/material";
import React, {FC, useContext, useEffect, useState} from "react";
import colors from "../types/BlogCategory";
import {BlogPost} from "../types/BlogPost";
import {Link} from "react-router-dom";
import UserContext from "../UserContext";
import {User} from "../types/User";
import axios from "axios";
import authHeader from "../auth/AuthHeader";

interface Props {
    blog: BlogPost;
    deletePostFun: Function
    deleteUserFun: Function
}

const BlogCard: FC<Props> = ({blog, deletePostFun, deleteUserFun}) => {

    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {

        axios
            .get(`http://localhost:9000/users/auth/me`, {
                headers: authHeader(),
            })
            .then((responseAuthor) => {
                const user: string = JSON.stringify(
                    responseAuthor.data
                );
                const userObject: User = JSON.parse(user);
                setUser(userObject);
            });
    }, [])

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
                textDecoration: "none"
            }}
        >
            <Link
                to={`/blog-post/${blog.blogPostId.$oid}`}
                style={{textDecoration: "none", color: "black"}}
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
                    </div> : ""}
        </Card>
    );
};

export default BlogCard;
