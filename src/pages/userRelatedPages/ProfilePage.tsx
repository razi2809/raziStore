import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PersonalInfo from "../../components/userRelatedComponents/PersonalInfo";
import useFetch from "../../hooks/useFetch";
import { Iuser } from "../../@types/user";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import { IBusiness } from "../../@types/business";
import { IOrderData } from "../../@types/order";
import OrderHistoryInfo from "../../components/orderRelatedComponents/OrdersInfo";
import AddressInfo from "../../components/userRelatedComponents/AddressInfo";
import notify from "../../services/toastService";
import UserSettings from "../../components/userRelatedComponents/UserSettings";
import type { changeType } from "../../@types/generic";
import CategoryDisplayForUser from "../../components/userRelatedComponents/CategoryDisplayForUser";
import ProfilePageTemplate from "../templateLoadingPages/ProfilePageTemplate";

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

  useEffect(() => {
    //  error handling and data setting.
    // Check for each specific error and and notify the user
    if (userError) {
      notify.error(userError.message);

      setUserData(null);
    } else {
      setUserData(user?.user);
    }
    if (likedPlacesError) {
      notify.info(likedPlacesError.message);
      setUserLikedPlaces(null);
    } else {
      setUserLikedPlaces(likedPlaces?.likedPlaces);
    }
    if (orderHistoryError) {
      notify.info(orderHistoryError.message);
      setUserOrderHistory(null);
    } else {
      setUserOrderHistory(orderHistory?.orderHistory);
    }
  }, [
    userError,
    likedPlacesError,
    orderHistoryError,
    user,
    orderHistory,
    likedPlaces,
  ]);

  const addTemporarilyUserDataChange = useCallback(
    (whatChange: changeType, data: any) => {
      if (!userData) return;
      switch (whatChange) {
        case "name":
          setUserData((prevUserData) => {
            if (!prevUserData) return null;
            return {
              ...prevUserData,
              name: data.name,
            };
          });

          break;
        case "email":
          setUserData((prevUserData) => {
            if (!prevUserData) return null;
            return {
              ...prevUserData,
              email: data.email,
            };
          });
          break;
        case "phoneNumber":
          setUserData((prevUserData) => {
            if (!prevUserData) return null;
            return {
              ...prevUserData,
              phoneNumber: data.phoneNumber,
            };
          });
          break;
      }
    },
    [userData]
  );
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

        <CategoryDisplayForUser
          userOrderHistory={userOrderHistory}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          categories={categories}
        />

        {activeSection === "personal-information" && (
          <PersonalInfo
            user={userData}
            userLikedPlaces={userLikedPlaces}
            orderHistory={userOrderHistory ?? []}
          />
        )}
        {activeSection === "order-history" && userOrderHistory && (
          <OrderHistoryInfo orders={userOrderHistory} />
        )}
        {activeSection === "my-address" && (
          <AddressInfo askedUserAddresses={userData.address} />
        )}
        {activeSection === "settings" && (
          <UserSettings
            user={userData}
            updateUser={addTemporarilyUserDataChange}
          />
        )}
      </Grid>
    );
  } else return <ProfilePageTemplate />;
};

export default ProfilePage;
