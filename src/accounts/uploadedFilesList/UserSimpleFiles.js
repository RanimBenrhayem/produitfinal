import React from "react";
import LayoutHome from "../layout/LayoutHome";
import { FcComboChart } from "react-icons/fc";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Typography } from "@material-ui/core";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { VscFile, VscFiles, VscTasklist, VscChecklist } from "react-icons/vsc";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { UserSimpleFiles } from "./SimpleFilesToUpload";

export default function UploadedSimpleFiles() {
  return (
    <div>
      <LayoutHome />
      <div style={{ marginLeft: 100, marginTop: 30 }}>
        <FcComboChart style={{ fontSize: 30 }} />
        <Typography
          variant="h6"
          component="h4"
          style={{ color: "grey", marginLeft: 37, marginTop: -35 }}
        >
          Data And Charts
          <ArrowRightIcon
            style={{
              fontSize: 30,
              fontSize: 30,
              marginBottom: -6.25,
              color: "#026aa4",
            }}
          />{" "}
          &nbsp;
          <ArrowRightIcon
            style={{
              fontSize: 30,
              fontSize: 30,
              marginBottom: -7.5,
              marginLeft: 195,
              color: "#026aa4",
            }}
          />
          <div style={{ marginLeft: 170, marginTop: -32 }}>
            &nbsp;
            <FormatListBulletedIcon
              style={{
                fontSize: 30,
                color: "#ff5722",
              }}
            />
          </div>
          <div style={{ marginLeft: 400, marginTop: -40 }}>
            &nbsp;
            <VscTasklist
              style={{
                fontSize: 30,
                color: "#795548",
              }}
            />
          </div>
          <div style={{ marginLeft: 210, marginTop: -39 }}>
            Uploaded Files List
          </div>
          <div style={{ marginLeft: 445, marginTop: -33 }}>
            Simple Files List
          </div>
        </Typography>
      </div>
      <UserSimpleFiles />
    </div>
  );
}
