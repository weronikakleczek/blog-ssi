import React, { FC, useContext } from "react";
import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

interface Props {
  topbarHeight: number;
}

const Topbar: FC<Props> = ({ topbarHeight }) => {
  const { user } = useContext(UserContext);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="primary"
      sx={{ height: topbarHeight }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Box sx={{ flexGrow: 2 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              color="info.main"
              sx={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 30,
                ml: 10,
              }}
            >
              blog-ssi
            </Typography>
          </Link>
        </Box>
        <Box
          sx={{ display: "flex", flexGrow: 1, justifyContent: "space-evenly" }}
        >
          {user ? (
            <Typography
              sx={{
                fontSize: 20,
                mt: "5px",
              }}
            >
              Hello, {user.username}
            </Typography>
          ) : (
            <Button
              variant="outlined"
              color="info"
              component={Link}
              to="/register"
              sx={{
                fontSize: 18,
              }}
            >
              register
            </Button>
          )}
          {user ? (
            <Button
              variant="outlined"
              color="info"
              component={Link}
              to="/logout"
              sx={{
                fontSize: 18,
              }}
            >
              logout
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="info"
              component={Link}
              to="/login"
              sx={{
                fontSize: 18,
              }}
            >
              login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
