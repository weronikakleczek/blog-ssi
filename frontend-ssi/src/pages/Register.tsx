import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Box,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAmoutMe] = useState("");

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
        <Typography variant="h3">Register</Typography>
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
            <TextField
              required
              label="First Name"
              variant="outlined"
              sx={{ m: 2 }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              required
              label="Last Name"
              variant="outlined"
              sx={{ m: 2 }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              required
              label="About me"
              variant="outlined"
              sx={{ m: 2 }}
              value={aboutMe}
              onChange={(e) => setAmoutMe(e.target.value)}
            />
            <IconButton color="primary" sx={{ margin: "0 auto", mt: "1rem" }}>
              <PersonAddIcon fontSize="large" />
            </IconButton>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
