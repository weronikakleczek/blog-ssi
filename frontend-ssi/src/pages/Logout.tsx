import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import UserContext from "../UserContext";

const Logout = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2">You have been logged out.</Typography>
    </Box>
  );
};

export default Logout;
