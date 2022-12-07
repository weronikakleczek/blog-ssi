import {Box, Typography} from "@mui/material";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BlogList from "../components/BlogList";
import {User} from "../types/User";

const BlogPosts = () => {
    const {id} = useParams();

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
                Blogs of user with ID {id}{" "}
            </Typography>
            <BlogList/>
        </Box>
    );
};

export default BlogPosts;
