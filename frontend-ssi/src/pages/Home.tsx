import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import BlogList from "../components/BlogList";
import axios from "axios";
import authHeader from "../auth/AuthHeader";
import {BlogPost} from "../types/BlogPost";

const Home = () => {


    const [blogList, setBlogList] = useState<BlogPost[]>()


    useEffect(() => {
        axios
            .get(`http://localhost:9000/blog-post`, {headers: authHeader()})
            .then((responseBlogPosts) => {
                const blogPostsString: string = JSON.stringify(responseBlogPosts.data);
                const blogPostsObject: BlogPost[] = JSON.parse(blogPostsString);
                setBlogList(blogPostsObject);
                console.log("Retrieved blogs: ", blogPostsObject);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }, [])

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
                Recent blog posts
            </Typography>
            {blogList !== undefined &&
                <BlogList blogList={blogList} setBlogList={setBlogList}/>
            }
        </Box>
    );
};

export default Home;
