import React, {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {BlogPost} from "../types/BlogPost";
import BlogCard from "./BlogCard";
import axios from "axios";
import authHeader from "../auth/AuthHeader";
import {BlogCategory} from "../types/BlogCategory";
import {uuid} from "../types/uuid";

interface Props {
    blogs: BlogPost[];
}

const BlogList = () => {

    const getBlogs = () => {
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
    }

    useEffect(() => {
        //getBlogs()
    }, []);

    const [blogList, setBlogList] = useState([
        {
            blogPostId: {$oid: "1"},
            authorId: {$oid: "asfdssdfsd"},
            title: "First blog",
            content:
                "This is a first blog's content with a long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long content",
            category: BlogCategory.TECH,
            date: new Date(),
        },
        {
            blogPostId: {$oid: "2"},
            authorId: {$oid: "asfdssdfsd"},
            title: "Second blog",
            content: "This is a second blog's content",
            category: BlogCategory.FASHION,
            date: new Date(),
        },
        {
            blogPostId: {$oid: "3"},
            authorId: {$oid: "asfdssdfsd"},
            title: "Third blog",
            content: "This is a third blog's content",
            category: BlogCategory.CARS,
            date: new Date(),
        },
        {
            blogPostId: {$oid: "638f98956451c556dbada74e"},
            authorId: {$oid: "6390db8b0a1e5470c84667aa"},
            title: "Fourth blog",
            content: "This is a fourth blog's content",
            category: BlogCategory.CARS,
            date: new Date(),
        },
        {
            blogPostId: {$oid: "5"},
            authorId: {$oid: "638f98952986804ce88533c7"},
            title: "Fifth blog",
            content: "This is a fifth blog's content",
            category: BlogCategory.OTHER,
            date: new Date(),
        }
    ]);

    useEffect(() => {
        console.log("IM HERE", blogList);
    }, []);

    const deletePostCallback = (blogId: uuid) => {
        axios.delete(`http://localhost:9000/blog-post/` + blogId.$oid, {headers: authHeader()})
            .catch((error) => {
                console.log("Error: ", error);
            })
        getBlogs()
    }

    const deleteUserCallback = (userId: uuid) => {
        axios.delete(`http://localhost:9000/users/` + userId.$oid, {headers: authHeader()})
            .catch((error) => {
                console.log("Error: ", error);
            })

        axios.delete(`http://localhost:9000/blog-post/user/` + userId.$oid, {headers: authHeader()})
            .catch((error) => {
                console.log("Error: ", error);
            })

        getBlogs()
    }


    return (
        <Box>
            {blogList.map((blog: BlogPost) => (
                <BlogCard blog={blog} deletePostFun={deletePostCallback} deleteUserFun={deleteUserCallback}/>
            ))}
        </Box>
    );
};

export default BlogList;
