import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Tooltip
        title={
          <Typography style={{ fontSize: 15 }}>
            Home : Upload Simple Files
          </Typography>
        }
      >
        <IconButton color="inherit" component={Link} to={"/CsvUploader"}>
          <HomeIcon
            style={{ color: "#ffab91", fontSize: 30, marginLeft: 50 }}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
}
