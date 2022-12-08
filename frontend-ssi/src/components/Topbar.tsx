import React, {useContext, useEffect, useState} from "react";
import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { FC } from "react";
import {Link, useNavigate} from "react-router-dom";
import UserContext from "../UserContext";
import {User} from "../types/User";
import axios from "axios";
import authHeader from "../auth/AuthHeader";

interface Props {
  topbarHeight: number;
}

const Topbar: FC<Props> = ({ topbarHeight }) => {
  const { user, setUser } = useContext(UserContext);

    const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);

    useEffect(() => {

        axios
            .get(`http://localhost:9000/users/auth/me`, {
                headers: authHeader(),
            })
            .then((responseAuthor) => {
                const user: string = JSON.stringify(
                    responseAuthor.data
                );
                const userObject: User = JSON.parse(user);
                console.log("user obj: ", userObject)
                setLoggedInUser(userObject);
            });
    },[])

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
              sx={{ display: "center", flexGrow: 1 }}
          >
              {user ? (
                  <Button
                      variant="outlined"
                      color="info"
                      component={Link}
                      to="/add-post"
                      sx={{
                          fontSize: 18,
                      }}
                  >
                      add post
                  </Button>
              ) : null}
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
                {
                    loggedInUser !== undefined ?
                        <Box> Hello, <Link to={`/user/${loggedInUser.userId.$oid}/blog-post`} style={{ textDecoration: "none", color: "#ddd" }}>{user}</Link></Box>
                    :
                        <Box>Hello, {user}</Box>
                }
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
