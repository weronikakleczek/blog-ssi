import { styled } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import Topbar from "./Topbar";

interface Props {
  children: JSX.Element;
}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const topbarHeight: number = 80;

const Layout: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar topbarHeight={topbarHeight} />
      <Box sx={{ height: `calc(100vh - ${topbarHeight}px)` }}>
        <Offset />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
