import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { authActions } from "../../REDUX/authSlice";
import { Button, Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LinksComponent from "../layoutRelatedComponents/LinksComponent";
import { useAppDispatch, useAppSelector } from "../../REDUX/bigPie";
import ThemeSwitcher from "../layoutRelatedComponents/ThemeSwitcher";
import { ROUTER } from "../../Router/ROUTER";
import NavLinkComponent from "../layoutRelatedComponents/NavComponents";
function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((bigPie) => bigPie.authReducer);
  const loggedin = auth.isLoggedIn;
  const userInfo = auth.user;
  const [anchorElNav, setAnchorElNav] = React.useState<
    null | (EventTarget & HTMLElement)
  >(null);
  const [anchorElUser, setAnchorElUser] = React.useState<
    null | (EventTarget & HTMLElement)
  >(null);
  const handleLogOut = () => {
    setAnchorElUser(null);
    dispatch(authActions.logout());
    // navigate("/cards");
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!loggedin) {
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handeleUserNameClick = () => {
    navigate(ROUTER.HOME);
  };
  return (
    <AppBar position="sticky" sx={{ mb: 0, border: "1px solid transparent" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-evenly" }}>
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
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            {userInfo && (
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
              </Typography>
            )}
            {userInfo && <ThemeSwitcher />}
          </Box>
          <Box
            sx={{
              // flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <LinksComponent loggedin={loggedin} userInfo={userInfo} />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    userInfo
                      ? userInfo.image.url
                      : "/static/images/avatar/2.jpg"
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ flexDirection: "column", display: "flex" }}>
                {" "}
                <Button
                  onClick={() => {
                    navigate(`${ROUTER.PROFILE}/${userInfo?._id}`);
                    handleCloseUserMenu();
                  }}
                >
                  profile
                </Button>
                <Button onClick={handleLogOut}>logout</Button>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
