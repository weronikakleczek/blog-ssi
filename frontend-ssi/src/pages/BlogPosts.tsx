import {Box, Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import authHeader from "../auth/AuthHeader";
import BlogList from "../components/BlogList";
import {BlogPost} from "../types/BlogPost";
import {User} from "../types/User";

const BlogPosts = () => {
    const {id} = useParams();
    const [blogs, setBlogs] = useState<BlogPost[] | undefined>();
    const [author, setAuthor] = useState<User | undefined>();

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
                setAuthor(userObject);
            });


        axios
            .get(`http://localhost:9000/users/${id}/blog-post`, {headers: authHeader()})
            .then((responseBlogPosts) => {
                const blogPostsString: string = JSON.stringify(responseBlogPosts.data);
                const blogPostsObject: BlogPost[] = JSON.parse(blogPostsString);
                setBlogs(blogPostsObject);
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
                {author ? `Posts of ${author.username}` : "Couldn't load author"}
            </Typography>
            {blogs !== undefined && <BlogList blogList={blogs} setBlogList={setBlogs}/>}
        </Box>
    );
};

export default BlogPosts;
