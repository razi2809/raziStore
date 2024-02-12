import { useState } from "react";
import { AppBar, Box, Container, Grid, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../REDUX/bigPie";
import LinksComponent from "../layoutRelatedComponents/linksRelated/LinksComponent";
import { Navigation } from "../headerRelatedComponent/Navigation";
import { links } from "../layoutRelatedComponents/linksRelated/links";
import { BottomNavigation } from "./ButtomNavigation";
const {
  alwaysLinks,
  loggedinLinks,
  loggedoutLinks,
  adminType,
  businessType,
  contectMe,
} = links;
const FooterComponent = () => {
  const navigate = useNavigate();

  const auth = useAppSelector((bigPie) => bigPie.authReducer);
  const loggedin = auth.isLoggedIn;
  const userInfo = auth.user;
  const userLinks = userInfo
    ? userInfo.isAdmin
      ? [...loggedinLinks, ...adminType]
      : loggedinLinks
    : loggedoutLinks;
  return (
    <AppBar
      sx={{
        position: "static",
        bottom: 0,
        left: 0,
        right: 0,
        height: "auto",
        mt: 4,
        width: "auto",
      }}
    >
      <Box>
        <Container maxWidth="xl">
          <Grid
            container
            sx={{
              justifyContent: "space-around",
              display: "flex",
            }}
          >
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  links
                </Typography>
                <BottomNavigation links={userLinks} closeMenu={(e) => {}} />
              </Box>
            </Grid>
            <Grid item xs={false} sm={6} md={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  about me
                </Typography>
                <p style={{ textAlign: "center" }}>
                  hey my name is razi
                  <br />
                  i'm a fullstack developer
                  <br />
                  this page is created using <br />
                  some of the relevent technologies
                  <br />
                  like react, redux, material ui
                </p>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  about the page
                </Typography>
                <p style={{ textAlign: "center" }}>
                  this page is powerd to show
                  <br />
                  the business in the database
                  <br />
                  you should log in to use all the features
                  <br />
                  like edit profile, delete profile, edit business.
                  <br />
                  also you can create a new business and products
                  <br />
                  or make an order
                </p>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {" "}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  learn more
                </Typography>

                {/* <NavLinkComponent to={"/about"} key={"/about"}> */}
                <BottomNavigation links={contectMe} closeMenu={(e) => {}} />
                {/* </NavLinkComponent> */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppBar>
  );
};

export default FooterComponent;
/*     <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={NavigateToFavorite}/>{" "}
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation> */
