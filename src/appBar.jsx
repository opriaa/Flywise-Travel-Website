import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FlywiseLogo from "./assets/icon-fly.svg";
import "./appBar.css";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const browserHistory = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        style={{
          background: "transparent",
          boxShadow: "none",
          zIndex: 1000,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Button
              color="inherit"
              onClick={() => {
                browserHistory("/");
              }}
            >
              <img
                src={FlywiseLogo}
                className="appbar-logo-img"
                alt="Flywise Logo"
              />
            </Button>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div style={{ fontWeight: "800" }}>Flywise</div>
          </Typography>
          <Button color="inherit" onClick={() => browserHistory("/")}>
            <div style={{ fontWeight: "800" }}>Home</div>
          </Button>
          <Button color="inherit" onClick={() => browserHistory("/currency")}>
            <div style={{ fontWeight: "800" }}>Currency</div>
          </Button>
          <Button color="inherit" onClick={() => browserHistory("/weather")}>
            <div style={{ fontWeight: "800" }}>Weather</div>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
