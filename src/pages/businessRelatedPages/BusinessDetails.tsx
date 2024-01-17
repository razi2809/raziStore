import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "../../hooks/useFetch";
import { Iuser } from "../../@types/user";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import { IBusiness } from "../../@types/business";
import { IOrderData } from "../../@types/order";
import OrdersInfo from "../../components/orderRelatedComponents/OrdersInfo";
import notify from "../../services/toastService";
import { IProduct } from "../../@types/product";
import BusinessInfo from "../../components/businessRelatedComponents/BusinessInfo";
import ProductsInfo from "../../components/productRelatedComponents/ProductsInfo";
import SelectFilterProducts from "../../components/searchFilters/productsRelatedSelect/SelectFilterProducts";
import UserSettings from "../../components/userRelatedComponents/UserSettings";
import BusinessSettings from "../../components/businessRelatedComponents/BusinessSettings";

type Categories =
  | "business-information"
  | "business-orders"
  | "business-products"
  | "settings";
const categories: Categories[] = [
  "business-information",
  "business-orders",
  "business-products",
  "settings",
];

const BusinessDetails = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<Categories>(
    (location.hash.substring(1) as Categories) || "business-information"
  );
  const { BusinessId } = useParams();
  const {
    data: business,
    error: businessError,
    loading: businessLoading,
  } = useFetch(`/business/${BusinessId}`);
  const {
    data: userWhomLiked,
    error: userWhomLikedError,
    loading: userWhomLikedLoading,
  } = useFetch(`/business/userLikes/${BusinessId}`);
  const {
    data: businessOrders,
    error: ordersError,
    loading: ordersLoading,
  } = useFetch(`/business/purchases/${BusinessId}`);

  // Aggregate loading state to determine if any data is still being loaded.
  const isLoading = businessLoading || userWhomLikedLoading || ordersLoading;
  // useState hooks for managing fetched data and errors.

  const [businessData, setBusinessData] = useState<IBusiness | null>(null);
  const [businessProducts, setBusinessProducts] = useState<IProduct[] | null>(
    null
  );
  const [Orders, setOrders] = useState<IOrderData[] | null>(null);
  const [businessLikes, setBusinessLikes] = useState<Iuser[] | null>(null);
  const [errorState, setErrorState] = useState<string[] | null>(null);

  useEffect(() => {
    //  error handling and data setting.

    // Initialize an array to collect error messages.
    let errors = [];

    // Check for each specific error and add an appropriate message to the array.
    if (businessError) {
      errors.push("An error occurred while fetching user data.");
      notify.error(businessError.message);
      setBusinessProducts(null);
      setBusinessData(null);
    } else {
      setBusinessData(business?.business);
      setBusinessProducts(business?.products);
    }
    if (userWhomLikedError) {
      errors.push("An error occurred while fetching liked places.");
      notify.info(userWhomLikedError.message);
      setBusinessLikes(null);
    } else {
      setBusinessLikes(userWhomLiked?.users);
    }
    if (ordersError) {
      errors.push("An error occurred while fetching order history.");
      notify.info(ordersError.message);
      setOrders(null);
    } else {
      setOrders(businessOrders?.orders);
    }
    // If there are any errors, update the errorMessages state.
    if (errors.length > 0) {
      setErrorState(errors);
    } else {
      setErrorState(null);
    }
  }, [
    businessError,
    userWhomLikedError,
    ordersError,
    business,
    userWhomLiked,

    businessOrders,
  ]);

  const addTemporarilyUserDataChange = useCallback(
    (
      whatChange: "name" | "email" | "PhoneNumber" | "businessName",
      data: any
    ) => {
      if (!business) return;
      switch (whatChange) {
        case "name":
          setBusinessData((prevUserData) => {
            if (!prevUserData) return null;
            return {
              ...prevUserData,
              name: data.name,
            };
          });

          break;
        case "email":
          setBusinessData((prevUserData) => {
            if (!prevUserData) return null;
            return {
              ...prevUserData,
              businessEmail: data.businessEmail,
            };
          });
          break;
        case "PhoneNumber":
          setBusinessData((prevUserData) => {
            if (!prevUserData) return null;
            return {
              ...prevUserData,
              phoneNumber: data.phoneNumber,
            };
          });
          break;
      }
    },
    [businessData]
  );
  if (business) {
    return (
      <Grid>
        <Box
          sx={{
            p: 5,
            display: "flex",
            height: "40vh",
            backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.4), rgba(128, 128, 128, 0.5)), url(${businessData?.businessImage.url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            alignItems: "flex-end",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h3" sx={{ color: "text.primary" }}>
            business details
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "secondary.main",
            p: 2,
            position: "sticky",
            top: "4em",
            zIndex: 3,
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {categories.map((category) => {
              const isBusinessOrders = category === "business-orders";
              const hasOrder = isBusinessOrders ? !!Orders : true;
              const isBusinessProducts = category === "business-products";
              const hasProducts = isBusinessProducts
                ? businessProducts && businessProducts.length > 0
                : true;

              if (!hasOrder || !hasProducts) return null;
              return (
                <Box key={category} sx={{ display: "flex" }}>
                  <Link to={`#${category}`} style={{ textDecoration: "none" }}>
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
              );
            })}
          </Box>{" "}
          {businessProducts && activeSection === "business-products" && (
            <Box
              sx={{
                width: 350,
                alignItems: "center",
                display: {
                  sm: "flex",
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              <Box sx={{ width: "100%" }}>
                <SelectFilterProducts
                  setSelectedProduct={null}
                  data={businessProducts}
                />
              </Box>
            </Box>
          )}
        </Box>
        {activeSection === "business-information" && businessData && (
          <BusinessInfo
            business={businessData}
            userWhomLiked={businessLikes}
            ordersData={Orders ?? []}
          />
        )}

        {activeSection === "business-orders" && Orders && (
          <OrdersInfo orders={Orders} />
        )}
        {activeSection === "business-products" && businessProducts && (
          <ProductsInfo products={businessProducts} />
        )}
        {/*    {activeSection === "my-address" && (
          <AddressInfo askedUserAddresses={userData.address} />
        )}*/}
        {activeSection === "settings" && businessData && (
          <BusinessSettings
            business={businessData}
            updateCallBack={addTemporarilyUserDataChange}
          />
        )}
      </Grid>
    );
  }
  if (isLoading) return <LoaderComponent />;
  if (errorState) return null;
  else return null;
};

export default BusinessDetails;
