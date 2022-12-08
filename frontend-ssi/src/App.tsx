import React, { useState } from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import Register from "./pages/Register";
import BlogPosts from "./pages/BlogPosts";
import useLocalStorage from "./Hooks";
import UserContext from "./UserContext";
import Logout from "./pages/Logout";
import SingleBlogPost from "./pages/BlogPost";

const App = () => {
  const [user, setUser] = useLocalStorage<string>("user", "");

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/user/:id/blog-post" element={<BlogPosts />} />
            <Route path="/blog-post/:id" element={<SingleBlogPost />} />
            <Route path="/add-post" element={<AddPost />} />
          </Routes>
        </Layout>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
