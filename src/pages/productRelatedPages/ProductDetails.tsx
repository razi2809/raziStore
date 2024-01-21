import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Iuser } from "../../@types/user";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import notify from "../../services/toastService";
import { IProduct } from "../../@types/product";
import type { changeType } from "../../@types/generic";
import { AxiosError } from "axios";
import sendData from "../../hooks/useSendData";
import CategoriesDisplayForProduct from "../../components/productRelatedComponents/CategoriesDisplayForProduct";
import ProductInfo from "../../components/productRelatedComponents/ProductInfo";
import ProductSettings from "../../components/productRelatedComponents/ProductSettings";

type Categories = "product-information" | "settings";
const categories: Categories[] = ["product-information", "settings"];

const ProductDetails = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<Categories>(
    (location.hash.substring(1) as Categories) || "product-information"
  );
  const { productId } = useParams();
  const {
    data: product,
    error: productError,
    loading: productLoading,
  } = useFetch(`/product/${productId}`);
  const {
    data: userWhomLiked,
    error: userWhomLikedError,
    loading: userWhomLikedLoading,
  } = useFetch(`/product/userLikes/${productId}`);
  // Aggregate loading state to determine if any data is still being loaded.
  const isLoading = productLoading || userWhomLikedLoading;
  // useState hooks for managing fetched data and errors.
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [productLikes, setProductLikes] = useState<Iuser[] | null>(null);

  useEffect(() => {
    //  error handling and data setting.
    // Check for each specific error and notfify the user
    if (productError) {
      notify.error(productError.message);
      setProductData(null);
      setProductLikes(null);
    } else {
      setProductData(product?.product);
    }
    if (userWhomLikedError) {
      notify.info(userWhomLikedError.message);
      setProductLikes(null);
    } else {
      setProductLikes(userWhomLiked?.users);
    }
  }, [productError, userWhomLikedError, product, userWhomLiked]);

  const addTemporarilyUserBusinessChange = useCallback(
    async (whatChange: changeType, data: any) => {
      if (!productData) return;
      switch (whatChange) {
        case "name":
          setProductData((prevProductData) => {
            if (!prevProductData) return null;
            return {
              ...prevProductData,
              productName: data.productName,
            };
          });

          break;

        case "productQuantity":
          setProductData((prevProductData) => {
            if (!prevProductData) return null;
            return {
              ...prevProductData,
              productQuantity: data.productQuantity,
            };
          });
          break;
        case "productDescription":
          setProductData((prevProductData) => {
            if (!prevProductData) return null;
            return {
              ...prevProductData,
              description: data.productDescription,
            };
          });
          break;
        case "image":
          await updateImageInDataBase(data);
          setProductData((prevProductData) => {
            if (!prevProductData) return null;
            return {
              ...prevProductData,
              productImage: { url: data },
            };
          });
          break;
      }
    },
    [product]
  );
  const updateImageInDataBase = async (url: string) => {
    try {
      const res = await sendData({
        url: `/product/image/${productId}`,
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
  if (productData) {
    return (
      <Grid>
        <Box
          sx={{
            p: 5,
            display: "flex",
            height: "40vh",
            backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.4), rgba(128, 128, 128, 0.5)), url(${productData?.productImage.url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            alignItems: "flex-end",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h3" sx={{ color: "text.primary" }}>
            product details
          </Typography>
        </Box>
        <CategoriesDisplayForProduct
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          categories={categories}
        />
        {activeSection === "product-information" && productData && (
          <ProductInfo product={productData} userWhomLiked={productLikes} />
        )}
        {/* 
        {activeSection === "business-orders" && Orders && (
          <OrdersInfo orders={Orders} />
        )}
        {activeSection === "business-products" && businessProducts && (
          <ProductsInfo products={businessProducts} />
        )} */}
        {activeSection === "settings" && productData && (
          <ProductSettings
            product={productData}
            updateCallBack={addTemporarilyUserBusinessChange}
          />
        )}
      </Grid>
    );
  }
  if (isLoading) return <LoaderComponent />;
  else return null;
};

export default ProductDetails;
