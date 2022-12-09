import React, {FC} from "react";
import {Box} from "@mui/system";
import {BlogPost} from "../types/BlogPost";
import BlogCard from "./BlogCard";
import axios from "axios";
import authHeader from "../auth/AuthHeader";
import {uuid} from "../types/uuid";

interface Props {
    blogList: BlogPost[];
    setBlogList: React.Dispatch<React.SetStateAction<BlogPost[] | undefined>>;
}

const BlogList: FC<Props> = ({blogList, setBlogList}) => {

    const getBlogs = () => {
        axios
            .get(`http://localhost:9000/blog-post`, {headers: authHeader()})
            .then((responseBlogPosts) => {
                const blogPostsString: string = JSON.stringify(responseBlogPosts.data);
                const blogPostsObject: BlogPost[] = JSON.parse(blogPostsString);
                setBlogList(blogPostsObject);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }

    const deletePostCallback = (blogId: uuid) => {
        axios.delete(`http://localhost:9000/blog-post/` + blogId.$oid, {headers: authHeader()})
            .then((response) => {return true})
            .catch((error) => {
                console.log("Error: ", error);
            })
        getBlogs()
    }

    const deleteUserCallback = (userId: uuid) => {
        axios.delete(`http://localhost:9000/users/` + userId.$oid, {headers: authHeader()})
            .then((response) => {return true})
            .catch((error) => {
                console.log("Error: ", error);
            })

        axios.delete(`http://localhost:9000/blog-post/user/` + userId.$oid, {headers: authHeader()})
            .then((response) => {return true})
            .catch((error) => {
                console.log("Error: ", error);
            })

        getBlogs()
    }


    return (
        <Box>
            {blogList !== undefined && blogList.map((blog: BlogPost) => (
                <BlogCard blog={blog} deletePostFun={deletePostCallback} deleteUserFun={deleteUserCallback}/>
            ))}
        </Box>
    );
};

export default BlogList;
