import {Box, Typography} from "@mui/material";
import React from "react";
import BlogList from "../components/BlogList";

const Home = () => {

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
            <BlogList/>
        </Box>
    );
};

export default Home;
