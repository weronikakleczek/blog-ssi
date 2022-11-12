import LoginIcon from "@mui/icons-material/Login";
import {
  Box,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // implement
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
            <IconButton color="primary" sx={{ margin: "0 auto", mt: "1rem" }}>
              <LoginIcon fontSize="large" />
            </IconButton>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
