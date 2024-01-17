import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { authActions } from "../../REDUX/authSlice";
import { Button, Drawer } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LinksComponent from "../layoutRelatedComponents/linksRelated/LinksComponent";
import { useAppDispatch, useAppSelector } from "../../REDUX/bigPie";
import ThemeSwitcher from "../layoutRelatedComponents/ThemeSwitcher";
import { ROUTER } from "../../Router/ROUTER";
import OrderComponents from "./OrderComponents";
import UserCardTemplate from "../../components/userRelatedComponents/UserCardTemplate";
import notify from "../../services/toastService";

function Header() {
  const orders = useAppSelector((bigPie) => bigPie.orderReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((bigPie) => bigPie.authReducer);
  const loggedin = auth.isLoggedIn;
  const userInfo = auth.user;
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<
    null | (EventTarget & HTMLElement)
  >(null);
  const { pathname } = useLocation();

  const handleLogOut = () => {
    setAnchorElUser(null);
    dispatch(authActions.logout());
    // navigate("/cards");
  };
  const handleOpenNavMenu = () => {
    setAnchorElNav(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!loggedin) {
      notify.warning("you need to log in first");
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handeleUserNameClick = () => {
    navigate(ROUTER.HOME);
  };

  //TODO: sidebar order view
  return (
    <AppBar sx={{ height: "4em", width: "100%", zIndex: 99 }}>
      <Box sx={{ width: "100%", maxWidth: "100%" }}>
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <Box
            sx={{
              // flexGrow: 1,
              display: {
                xs: "flex",
                md: "none",
                justifyContent: "space-between",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={"left"}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 0.4,
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignContent: "space-around",
                }}
                onClick={handleCloseNavMenu}
              >
                <LinksComponent loggedin={loggedin} userInfo={userInfo} />
              </Box>
            </Drawer>
          </Box>
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "flex",
                alignItems: "center",
              },
            }}
          >
            {userInfo && (
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  onClick={handeleUserNameClick}
                  sx={{
                    mr: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {userInfo.name.firstName}
                </Typography>{" "}
                <ThemeSwitcher />
              </Box>
            )}
          </Box>
          {orders[1]?.products.length > 0 &&
            !pathname.includes("/order/neworder") && (
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "none",
                    xl: "block",
                  },
                  flexGrow: 0.4,
                  height: "100%",
                }}
              >
                <OrderComponents />{" "}
              </Box>
            )}
          <Box
            sx={{
              flexGrow: 0,
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <LinksComponent loggedin={loggedin} userInfo={userInfo} />
          </Box>{" "}
          <Box sx={{ flexGrow: 0, position: "relative" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ position: "static", zIndex: 3 }}
                  alt="Remy Sharp"
                  src={
                    userInfo
                      ? userInfo.image.url
                      : "/static/images/avatar/2.jpg"
                  }
                />
              </IconButton>
            </Tooltip>

            {userInfo && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                sx={{
                  top: 15,
                  // position: "relative",
                  ".MuiPaper-root": {
                    backgroundColor: "divider", // Change this to your desired color
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  },
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box
                  sx={{
                    flexDirection: "column",
                    display: "flex",
                    p: 1,
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  {" "}
                  <UserCardTemplate
                    user={userInfo}
                    close={handleCloseUserMenu}
                  />
                  <Button
                    variant="contained"
                    onClick={handleLogOut}
                    sx={{
                      color: "text.primary",
                      boxShadow: "none",
                      bgcolor: "divider",
                    }}
                  >
                    logout
                  </Button>
                </Box>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
export default Header;
