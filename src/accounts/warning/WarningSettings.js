import * as React from "react";
import LayoutHome from "../layout/LayoutHome";
import {
  List,
  TableCell,
  TableRow,
  TableBody,
  ListItemText,
  ListItem,
  Container,
  Pagination,
  Divider,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function WarningSettings() {
  const [value, setValue] = React.useState(0);

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box style={{ marginLeft: 80, marginTop: 70 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange1}
            aria-label="basic tabs example"
          >
            <Tab
              label="Item One"
              {...a11yProps(0)}
              component={Link}
              to="/Warning"
            />
            <Tab
              label="Item Two"
              {...a11yProps(1)}
              component={Link}
              to="/Warning/Settings"
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
      <LayoutHome />
    </div>
  );
}
