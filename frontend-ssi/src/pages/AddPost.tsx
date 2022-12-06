import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Box,
    FormControl,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authHeader from "../auth/AuthHeader";

import { AddPostRequest} from "../types/AddPostRequest";

const AddPost = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState(""); //login
    const [content, setContent] = useState(""); //aboutMe
    const [category, setCategory] = useState("");

    const handleAddPost = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (title && content && category) {
            const addPostRequest: AddPostRequest = {
                title: title,
                content: content,
                category: category
            };

            axios
                .post(
                    "http://localhost:9000/blog-post",
                    JSON.stringify(addPostRequest),
                    { headers: authHeader(), }
        )
                .then((response) => {
                    console.log("Added post succesfully. Response: ", response)
                    navigate("/");
                })
                .catch((e) => {
                    //todo: display error
                    console.log("Error adding post: " + e);
                });
        } else {
            //todo: display error
            console.log("Cannot add post, provide all credentials.");
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100vw"
            mt="10vh"
        >
            <Box
                sx={{
                    bgcolor: "secondary.main",
                    textAlign: "center",
                    boxShadow: 2,
                    p: "2rem",
                    borderRadius: "1rem",
                }}
            >
                <Typography variant="h3">New post</Typography>
                <form>
                    <FormControl sx={{ width: "40vw", mt: "5vh", gap: "1vh" }}>
                        <TextField
                            required
                            label="Title"
                            variant="outlined"
                            sx={{ m: 2 }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            required
                            label="Content"
                            variant="outlined"
                            sx={{ m: 2 }}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <TextField
                            required
                            label="Category"
                            variant="outlined"
                            sx={{ m: 2 }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <IconButton
                            onClick={handleAddPost}
                            color="primary"
                            sx={{ margin: "0 auto", mt: "1rem" }}
                        >
                            <PostAddIcon fontSize="large" />
                        </IconButton>
                    </FormControl>
                </form>
            </Box>
        </Box>
    );
};

export default AddPost;
