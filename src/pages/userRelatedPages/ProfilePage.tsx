import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PersonalInfo from "../../components/userRelatedComponents/PersonalInfo";
import useFetch from "../../hooks/useFetch";
import { Iuser } from "../../@types/user";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import { IBusiness } from "../../@types/business";
import { IOrderData } from "../../@types/order";
import OrderHistoryInfo from "../../components/userRelatedComponents/OrderHistoryInfo";
import AddressInfo from "../../components/userRelatedComponents/AddressInfo";
// Define the possible categories for the profile page.

type Categories =
  | "personal-information"
  | "order-history"
  | "my-address"
  | "settings";
const categories: Categories[] = [
  "personal-information",
  "order-history",
  "my-address",
  "settings",
];
const ProfilePage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<Categories>(
    (location.hash.substring(1) as Categories) || "personal-information"
  );
  const { userId } = useParams();
  const {
    data: user,
    error: userError,
    loading: userLoading,
  } = useFetch(`/users/${userId}`);
  const {
    data: likedPlaces,
    error: likedPlacesError,
    loading: likedPlacesLoading,
  } = useFetch(`/users/likes/likedplaces/${userId}`);
  const {
    data: orderHistory,
    error: orderHistoryError,
    loading: orderHistoryLoading,
  } = useFetch(`/order/${userId}`);

  // Aggregate loading state to determine if any data is still being loaded.
  const isLoading = userLoading || likedPlacesLoading || orderHistoryLoading;
  // useState hooks for managing fetched data and errors.

  const [userData, setUserData] = useState<Iuser | null>(null);
  const [userOrderHistory, setUserOrderHistory] = useState<IOrderData[] | null>(
    null
  );
  const [userLikedPlaces, setUserLikedPlaces] = useState<IBusiness[] | null>(
    null
  );
  const [errorState, setErrorState] = useState<string[] | null>(null);

  useEffect(() => {
    //  error handling and data setting.

    // Initialize an array to collect error messages.
    let errors = [];

    // Check for each specific error and add an appropriate message to the array.
    if (userError) {
      errors.push("An error occurred while fetching user data.");
      setUserData(null);
    } else {
      setUserData(user?.user);
    }
    if (likedPlacesError) {
      errors.push("An error occurred while fetching liked places.");
      setUserLikedPlaces(null);
    } else {
      setUserLikedPlaces(likedPlaces?.likedPlaces);
    }
    if (orderHistoryError) {
      errors.push("An error occurred while fetching order history.");
      setUserOrderHistory(null);
    } else {
      setUserOrderHistory(orderHistory?.orderHistory);
    }

    // If there are any errors, update the errorMessages state.
    if (errors.length > 0) {
      setErrorState(errors);
    } else {
      setErrorState(null);
    }
  }, [
    userError,
    likedPlacesError,
    orderHistoryError,
    user,
    orderHistory,
    likedPlaces,
  ]);

  if (userData) {
    return (
      <Grid>
        <Box
          sx={{
            height: "20vh",
            p: 5,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h3" sx={{ color: "text.primary" }}>
            profile
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            bgcolor: "secondary.main",
            p: 2,
            position: "sticky",
            top: "7vh",
            zIndex: 3,
          }}
        >
          {" "}
          <Box
            sx={{
              ml: 4,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {categories.map((category) => {
              const isOrder =
                category === "order-history"
                  ? userOrderHistory
                    ? true
                    : false
                  : true;
              return (
                isOrder && (
                  <Box key={category} sx={{ display: "flex" }}>
                    <Link
                      to={`#${category}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        sx={{
                          mr: 2,
                          borderRadius: 20,
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                          cursor: "pointer",
                        }}
                        onClick={() => setActiveSection(category)}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "black",
                            p: 1,
                            ":hover": {
                              color: "white",
                            },
                          }}
                        >
                          {category}
                        </Typography>
                        {activeSection === category && (
                          <motion.span
                            style={{
                              position: "absolute",
                              top: 50,
                              height: "2px",
                              width: "100%",
                              backgroundColor: "black",
                            }}
                            layoutId="activeSectionProfilPage"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          >
                            {" "}
                          </motion.span>
                        )}
                      </Box>
                    </Link>
                  </Box>
                )
              );
            })}
          </Box>
        </Box>
        {activeSection === "personal-information" && (
          <PersonalInfo
            user={userData}
            userLikedPlaces={userLikedPlaces}
            orderHistory={userOrderHistory ?? []}
          />
        )}
        {activeSection === "order-history" && userOrderHistory && (
          <OrderHistoryInfo orderHistory={userOrderHistory} />
        )}
        {activeSection === "my-address" && <AddressInfo />}
      </Grid>
    );
  }
  if (isLoading) return <LoaderComponent />;
  if (errorState) return null;
  else return null;
};

export default ProfilePage;
