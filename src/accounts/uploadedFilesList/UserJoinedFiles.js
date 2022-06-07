import React from "react";
import LayoutHome from "../layout/LayoutHome";
import { JoinedFilesToUpload } from "../uploadedFilesList/JoinedFilesToUpload";
import { FcComboChart } from "react-icons/fc";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Typography } from "@material-ui/core";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { VscChecklist, VscFiles } from "react-icons/vsc";

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

              marginBottom: -6.25,
              color: "#026aa4",
            }}
          />{" "}
          &nbsp;
          <ArrowRightIcon
            style={{
              fontSize: 30,
              marginLeft: 195,
              marginBottom: -7,
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
          <div style={{ marginLeft: 405, marginTop: -40 }}>
            &nbsp;
            <VscChecklist
              style={{
                fontSize: 30,
                color: "#D2691E",
              }}
            />
          </div>
          <div style={{ marginLeft: 210, marginTop: -39 }}>
            Uploaded Files List
          </div>
          <div style={{ marginLeft: 445, marginTop: -32 }}>
            Joined Files List
          </div>
        </Typography>
      </div>
      <JoinedFilesToUpload />
    </div>
  );
}
