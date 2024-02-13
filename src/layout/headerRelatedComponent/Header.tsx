import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { authActions } from "../../REDUX/authSlice";
import { Button, Fab } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LinksComponent from "../layoutRelatedComponents/linksRelated/LinksComponent";
import { useAppDispatch, useAppSelector } from "../../REDUX/bigPie";
import ThemeSwitcher from "../layoutRelatedComponents/ThemeSwitcher";
import { ROUTER } from "../../Router/ROUTER";
import OrderComponents from "../../components/orderRelatedComponents/OrderComponents";
import UserCardTemplate from "../../components/userRelatedComponents/UserCardTemplate";
import notify from "../../services/toastService";
import { Sidebar } from "./Sidebar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BusinessOrderTamplate from "../../components/businessRelatedComponents/BusinessOrderTamplate";
function Header() {
  const orders = useAppSelector((bigPie) => bigPie.orderReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((bigPie) => bigPie.authReducer);
  const loggedin = auth.isLoggedIn;
  const userInfo = auth.user;
  const [openSideMenu, setOpenSideMenu] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<
    null | (EventTarget & HTMLElement)
  >(null);
  const [anchorElOrder, setAnchorElOrder] = React.useState<
    null | (EventTarget & HTMLElement)
  >(null);
  const { pathname } = useLocation();

  const handleLogOut = () => {
    setAnchorElUser(null);
    dispatch(authActions.logout());
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!loggedin) {
      notify.warning("you need to log in first");
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleOpenOrderMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (orders[1]?.products.length === 0) {
      notify.warning("you need to make a purchase");
    } else {
      setAnchorElOrder(event.currentTarget);
    }
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
    setAnchorElOrder(null);
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
          sx={{
            justifyContent: "space-evenly",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
                sm: "none",
                xl: "none",
                justifyContent: "space-between",
                alignItems: "center",
              },
              width: "50px",
            }}
          >
            <Sidebar />
          </Box>
          {orders[1]?.products.length > 0 &&
            !pathname.includes("/order/neworder") && (
              <Box
                sx={{
                  display: {
                    xs: "flex",
                    md: "none",
                    sm: "none",
                    xl: "none",
                  },
                  alignItems: "center",
                }}
              >
                <IconButton onClick={handleOpenOrderMenu}>
                  <ShoppingCartIcon />{" "}
                </IconButton>
              </Box>
            )}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElOrder}
            sx={{
              top: 15,
              ".MuiPaper-root": {
                backgroundColor: "divider",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              },
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElOrder)}
            onClose={handleCloseMenu}
          >
            <Box onClick={handleCloseMenu}>
              {orders.map((order) => {
                if (!order.business) return;
                return (
                  <BusinessOrderTamplate
                    key={order.business._id}
                    order={order}
                    ordersHover={setOpenSideMenu}
                    canHover={false}
                  />
                );
              })}
            </Box>
          </Menu>
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
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  onClick={handeleUserNameClick}
                  sx={{
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
                sm: "flex",
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
                  ".MuiPaper-root": {
                    backgroundColor: "divider",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  },
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseMenu}
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
                  <UserCardTemplate user={userInfo} close={handleCloseMenu} />
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
