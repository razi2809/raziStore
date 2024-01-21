import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
import BusinessSettings from "../../components/businessRelatedComponents/BusinessSettings";
import type { changeType } from "../../@types/generic";
import CategoriesDisplayForBusiness from "../../components/businessRelatedComponents/categoriesDisplayForBusiness";
import { AxiosError } from "axios";
import sendData from "../../hooks/useSendData";

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

  useEffect(() => {
    //  error handling and data setting.
    // Check for each specific error and notfify the user
    if (businessError) {
      notify.error(businessError.message);
      setBusinessProducts(null);
      setBusinessData(null);
    } else {
      setBusinessData(business?.business);
      setBusinessProducts(business?.products);
    }
    if (userWhomLikedError) {
      notify.info(userWhomLikedError.message);
      setBusinessLikes(null);
    } else {
      setBusinessLikes(userWhomLiked?.users);
    }
    if (ordersError) {
      notify.info(ordersError.message);
      setOrders(null);
    } else {
      setOrders(businessOrders?.orders);
    }
  }, [
    businessError,
    userWhomLikedError,
    ordersError,
    business,
    userWhomLiked,
    businessOrders,
  ]);

  const addTemporarilyUserBusinessChange = useCallback(
    async (whatChange: changeType, data: any) => {
      if (!business) return;
      switch (whatChange) {
        case "name":
          setBusinessData((prevBusinessData) => {
            if (!prevBusinessData) return null;
            return {
              ...prevBusinessData,
              businessName: data.businessName,
            };
          });

          break;
        case "email":
          setBusinessData((prevBusinessData) => {
            if (!prevBusinessData) return null;
            return {
              ...prevBusinessData,
              businessEmail: data.businessEmail,
            };
          });
          break;
        case "phoneNumber":
          setBusinessData((prevBusinessData) => {
            if (!prevBusinessData) return null;
            return {
              ...prevBusinessData,
              businessPhoneNumber: data.businessPhoneNumber,
            };
          });
          break;
        case "businessDescription":
          setBusinessData((prevBusinessData) => {
            if (!prevBusinessData) return null;
            return {
              ...prevBusinessData,
              businessDescription: data.businessDescription,
            };
          });
          break;
        case "image":
          await updateImageInDataBase(data);
          setBusinessData((prevBusinessData) => {
            if (!prevBusinessData) return null;
            return {
              ...prevBusinessData,
              businessImage: { url: data },
            };
          });
          break;
      }
    },
    [business]
  );
  const updateImageInDataBase = async (url: string) => {
    try {
      const res = await sendData({
        url: `/business/image/${BusinessId}`,
        data: { url },
        method: "patch",
      });
      notify.success(res.message);
    } catch (e) {
      if (e instanceof AxiosError) {
        notify.error(e.message);
      } else {
        notify.error("An unknown error occurred");
      }
    }
  };
  if (businessData) {
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
        <CategoriesDisplayForBusiness
          Orders={businessOrders}
          businessProducts={businessProducts}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          categories={categories}
        />
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
        {activeSection === "settings" && businessData && (
          <BusinessSettings
            business={businessData}
            updateCallBack={addTemporarilyUserBusinessChange}
          />
        )}
      </Grid>
    );
  }
  if (isLoading) return <LoaderComponent />;
  else return null;
};

export default BusinessDetails;
