import LoginIcon from "@mui/icons-material/Login";
import {
  Box,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { LoginRequest } from "../types/LoginRequest";
import authHeader from "../auth/AuthHeader";
import { useNavigate } from "react-router-dom";
import { config } from "process";
import UserContext from "../UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);


  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (login && password) {
      const loginRequest: LoginRequest = {
        username: login,
        password: password,
      };

      axios
        .post(
          "http://localhost:9000/auth/login",
          JSON.stringify(loginRequest),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          localStorage.setItem(
            "jwt",
            JSON.stringify(response.data).replace(/\"/g, "")
          );
          setUser(login);
          navigate("/");
        })
        .catch((e) => {
          //todo: display error
          console.log("Error logging in: " + e);
        });
    } else {
      //todo: display error
      console.log("Cannot log in, provide all credentials.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100vw"
      height="100%"
      pt="10vh"
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
        <Typography variant="h3">Login</Typography>
        <form>
          <FormControl sx={{ width: "40vw", mt: "5vh", gap: "1vh" }}>
            <TextField
              required
              label="Login"
              variant="outlined"
              sx={{ m: 2 }}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <TextField
              required
              label="Password"
              variant="outlined"
              type="password"
              sx={{ m: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IconButton
              onClick={handleLogin}
              color="primary"
              sx={{ margin: "0 auto", mt: "1rem" }}
            >
              <LoginIcon fontSize="large" />
            </IconButton>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
