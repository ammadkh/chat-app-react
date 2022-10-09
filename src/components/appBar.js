import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ForumIcon from "@mui/icons-material/Forum";

export default function ButtonAppBar({ name, imgUrl }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Avatar src={imgUrl}></Avatar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "black", pl: 2 }}>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
