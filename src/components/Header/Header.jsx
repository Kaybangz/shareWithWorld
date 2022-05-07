import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Logout from "@mui/icons-material/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import Logo from "./Logo/Logo";
import { Link } from "react-router-dom";
import { userAuthContext } from "../context/userAuthContext";

export const Header = () => {
  const { user, logOut } = useContext(userAuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/mainPage" style={{ textDecoration: "none" }}>
            <Logo />
          </Link>

          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {user.photoURL ? (
              <Avatar
                sx={{ width: 40, height: 40 }}
                src={user.photoURL}
              ></Avatar>
            ) : (
              <Avatar sx={{ width: 40, height: 40 }}></Avatar>
            )}
          </IconButton>
        </Box>
      </Container>

      <div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: 160,
              overflow: "visible",
              filter: "drop-shadow(0px 1px 3px #6cd3d3)",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link
            to="/mainPage"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem
              style={{
                fontFamily: "Manrope",
                fontWeight: "bold",
                padding: "1rem",
              }}
            >
              <HomeOutlinedIcon
                sx={{ mr: 1, fontSize: 31, ml: -0.6, color: "gray" }}
              />{" "}
              Home
            </MenuItem>
          </Link>

          <Divider />

          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem
              style={{
                fontFamily: "Manrope",
                fontWeight: "bold",
                padding: "1rem",
              }}
            >
              <Avatar src={user.photoURL} /> Profile
            </MenuItem>
          </Link>

          <Divider />

          <Link
            to="/about-us"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem
              style={{
                fontFamily: "Manrope",
                fontWeight: "bold",
                padding: "1rem",
              }}
            >
              <InfoOutlinedIcon
                sx={{ mr: 1, fontSize: 31, ml: -0.6, color: "gray" }}
              />
              About Us
            </MenuItem>
          </Link>

          <Divider />

          <MenuItem
            onClick={logOut}
            style={{
              fontFamily: "Manrope",
              fontWeight: "bold",
              color: "black",
              padding: "1rem",
            }}
          >
            <ListItemIcon>
              <Logout sx={{ mr: 1, fontSize: 30, ml: -0.6, color: "gray" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
