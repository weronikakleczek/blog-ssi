import {Box, Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import authHeader from "../auth/AuthHeader";
import BlogList from "../components/BlogList";
import {BlogCategory} from "../types/BlogCategory";
import {BlogPost} from "../types/BlogPost";
import {User} from "../types/User";

const BlogPosts = () => {
    const {id} = useParams();
    const [blogs, setBlogs] = useState<BlogPost[] | undefined>(undefined);
    const [user, setUser] = useState<User | undefined>(undefined);

    const navigate = useNavigate();

    useEffect(() => {

        axios
            .get(`http://localhost:9000/users/${id}`, {
                headers: authHeader(),
            })
            .then((responseAuthor) => {
                const user: string = JSON.stringify(
                    responseAuthor.data
                );
                const userObject: User = JSON.parse(user);
                setUser(userObject);
            });


        axios
            .get(`http://localhost:9000/users/${id}/blog-post`, {headers: authHeader()})
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
                { user ? `Blogs of ${user.username}` : "Couldn't load user"}
            </Typography>
            {blogs !== undefined && <BlogList blogs={blogs}/>}
        </Box>
    );
};

export default BlogPosts;
