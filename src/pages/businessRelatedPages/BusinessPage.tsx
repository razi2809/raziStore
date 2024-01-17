import { useCallback, useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { IBusiness } from "../../@types/business";
import { IProduct } from "../../@types/product";
import { Box, Grid, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../REDUX/bigPie";
import { orderActions } from "../../REDUX/orderSlice";
import ProductTamplateDisplay from "../../components/productRelatedComponents/ProductTamplateDisplay";
import CategoryComponent from "../../components/businessRelatedComponents/CategoryComponent";
import { Link } from "react-router-dom";
import GoogleMapToView from "../../layout/layoutRelatedComponents/maps/GoogleMapToView";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import useFetch from "../../hooks/useFetch";
import ShareIcon from "@mui/icons-material/Share";
import { ROUTER } from "../../Router/ROUTER";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import useBusinessOpen from "../../hooks/useBusinessOpen";
import SelectFilterProducts from "../../components/searchFilters/productsRelatedSelect/SelectFilterProducts";
import CustomSpeedDial from "../../layout/layoutRelatedComponents/CustomSpeedDial";
import notify from "../../services/toastService";
export interface ISelected {
  productId: string | null;
  category: string | null;
}
const actions: { icon: JSX.Element; name: "add product" | "edit" | "Share" }[] =
  [
    { icon: <AddIcon />, name: "add product" },
    { icon: <EditIcon />, name: "edit" },
    { icon: <ShareIcon />, name: "Share" },
  ];
const BusinessPage = () => {
  const dispatch = useAppDispatch();
  const { BusinessId } = useParams();
  const location = useLocation();
  const user = useAppSelector((bigPie) => bigPie.authReducer);
  const [activeSection, setActiveSection] = useState("sale");
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("item");
  const category = searchParams.get("category");
  const [selectedProduct, setSelectedProduct] = useState<ISelected | null>({
    category,
    productId,
  });
  const { pathname } = location;
  const navigate = useNavigate();
  const { data, error, loading } = useFetch(`/business/${BusinessId}`);
  // const business = data.business as IBusiness;
  // const products = data.products as IProduct[];
  const [business, setBusiness] = useState<IBusiness | null>(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const isOpen = useBusinessOpen(business);
  useEffect(() => {
    // Check if there's an error after fetching data.
    if (error) {
      // Handle the error, e.g., by setting an error message in the state,
      //or showing a toast notification to the user.
      notify.error(error.message);
    } else if (data) {
      // If there's no error and data is present, update the businesses state.
      setBusiness(data.business);
      setProducts(data.products);
    }
  }, [data, error]);
  useEffect(() => {
    if (!location.hash.substring(1)) return;
    const element = document.getElementById(location.hash.substring(1));
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 200,
        behavior: "smooth",
      });
    }
  }, [location]);

  useEffect(() => {
    if (!selectedProduct?.category || !selectedProduct?.productId) {
      navigate(`${pathname}`);
      return;
    }
    navigate(
      `${pathname}?item=${selectedProduct.productId}&category=${selectedProduct.category}`
    );
  }, [selectedProduct, navigate, pathname]);

  const updateOrder = useCallback(
    (product: IProduct, quantity: number) => {
      if (!business) return;
      dispatch(orderActions.updateOrder({ product, quantity, business }));
    },
    [business, dispatch]
  );
  const handleActionClick = (actionName: "Share" | "add product" | "edit") => {
    if (!business) return;
    switch (actionName) {
      case "Share":
        handleShare();
        break;
      case "add product":
        navigate(`${ROUTER.BUSINESS}/${business._id}/addNewProduct`);
        break;
      case "edit":
        navigate(`${ROUTER.BUSINESS}/${business._id}/BusinessDetails`);
        break;
    }
  };
  const handleShare = () => {
    if (!business) return;

    if (navigator.share) {
      navigator.share({
        title: `${business.businessName}`,
        text: "Check out my awesome business",
        url: `https://razi2809.github.io/raziStore${ROUTER.BUSINESS}/${business._id}`,
      });
    } else {
      console.log("Web Share API is not supported in your browser");
    }
  };

  if (business && products) {
    return (
      <Grid>
        <Box
          sx={{
            height: "40vh",
            backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.4), rgba(128, 128, 128, 0.5)), url(${business?.businessImage.url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          {" "}
          <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
            <CustomSpeedDial
              actions={actions}
              onActionClick={handleActionClick}
              canEdit={user.user?.isBusiness ? user.user.isBusiness : false}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              height: "80%",
              ml: 10,
              display: "flex",
              alignItems: "flex-end",
              zIndex: 2,
            }}
          >
            <Typography variant="h5" sx={{ color: "text.primary" }}>
              {business?.businessName} | {business?.businessDescription}
            </Typography>
          </Box>{" "}
        </Box>
        <Box
          sx={{
            bgcolor: "secondary.main",
            borderBottom: "1px solid rgba(32, 33, 37, 0.12)",
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            position: "sticky",
            top: "4em",
            zIndex: 3,
          }}
        >
          <Box
            sx={{
              width: 350,
              zIndex: 3,
              display: {
                md: "flex",
                sm: "flex",
                xs: "none",
              },
              alignItems: "center",
              ml: 3,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <SelectFilterProducts
                data={products}
                setSelectedProduct={setSelectedProduct}
              />
            </Box>
          </Box>
          <Box
            sx={{
              mr: 4,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {business?.categories &&
              business?.categories.length > 0 &&
              business?.categories.map((category) => (
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
                          layoutId="activeSection"
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
              ))}
          </Box>{" "}
        </Box>
        <Grid container sx={{ bgcolor: "divider" }}>
          {business?.categories &&
            business?.categories.length > 0 &&
            business?.categories.map((category) => (
              <CategoryComponent
                key={category}
                setActiveSection={setActiveSection}
                category={category}
                products={products}
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
              />
            ))}
        </Grid>
        <Box
          sx={{
            height: "20vh",
            mt: 2,
            p: 1,
            bgcolor: "divider",
            position: "relative",
          }}
        >
          <GoogleMapToView
            address={business?.address}
            theme={user.user?.theme ? user.user.theme : "light"}
          />
          <Box
            sx={{
              position: "absolute",
              bgcolor: "divider",
              inset: 0,
              height: "50%",
              width: "100%",
              top: 4,
              borderRadius: 3,
              zIndex: 1,
              background: user.user?.theme
                ? user.user.theme === "dark"
                  ? "linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))"
                  : "linear-gradient(rgb(246, 246, 246) 0%, rgba(246, 246, 246, 0) 100%)"
                : "linear-gradient(rgb(246, 246, 246) 0%, rgba(246, 246, 246, 0) 100%)",
              //
            }}
          ></Box>
        </Box>
        <AnimatePresence>
          {selectedProduct &&
            products &&
            products.map((product) => {
              if (product._id === selectedProduct.productId) {
                return (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      zIndex: 1000,
                    }}
                    onClick={() => setSelectedProduct(null)}
                  >
                    <ProductTamplateDisplay
                      canOrder={isOpen}
                      product={product}
                      category={selectedProduct.category}
                      updateOrder={updateOrder}
                    />
                  </motion.div>
                );
              } else {
                return null;
              }
            })}
        </AnimatePresence>
      </Grid>
    );
  } else if (loading) {
    <LoaderComponent />;
  }
  return null;
};

export default BusinessPage;
