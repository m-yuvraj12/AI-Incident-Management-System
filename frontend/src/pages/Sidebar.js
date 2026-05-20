import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemText, Divider } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "250px",
        height: "100vh",
        backgroundColor: "#2c3e50",
        color: "white",
        paddingTop: 2,
        paddingLeft: 2,
        zIndex: 9999, // Keeps sidebar on top
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Dashboard Sidebar</h2>
      <List>
        <ListItem button>
          <Link
            to="/dashboard"
            style={{
              color: "white",
              textDecoration: "none",
              display: "block",
              width: "100%",
            }}
          >
            <ListItemText primary="Dashboard" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem button>
          <Link
            to="/incidents"
            style={{
              color: "white",
              textDecoration: "none",
              display: "block",
              width: "100%",
            }}
          >
            <ListItemText primary="Incidents" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem button>
          <Link
            to="/create-incident"
            style={{
              color: "white",
              textDecoration: "none",
              display: "block",
              width: "100%",
            }}
          >
            <ListItemText primary="Create Incident" />
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
