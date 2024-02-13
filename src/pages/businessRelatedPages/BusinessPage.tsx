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
import { useAppDispatch, useAppSelector } from "../../REDUX/bigPie";
import { orderActions } from "../../REDUX/orderSlice";
import CategoryComponent from "../../components/businessRelatedComponents/CategoryComponent";
import GoogleMapToView from "../../layout/layoutRelatedComponents/maps/GoogleMapToView";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import useFetch from "../../hooks/useFetch";
import ShareIcon from "@mui/icons-material/Share";
import { ROUTER } from "../../Router/ROUTER";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import useBusinessOpen from "../../hooks/useBusinessOpen";
import CustomSpeedDial from "../../layout/layoutRelatedComponents/CustomSpeedDial";
import notify from "../../services/toastService";
import CategoriseDisplayerWithSelection from "../../components/genericComponents/CategoriseDisplayerWithSelection";
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
  const [activeSection, setActiveSection] = useState("");
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

  const [business, setBusiness] = useState<IBusiness | null>(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const isOpen = useBusinessOpen(business);
  useEffect(() => {
    if (error) {
      // Handle the error, e.g., by setting an error message in the state,
      // showing a toast notification to the user.
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
      notify.error("Web Share API is not supported in your browser");
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
        <CategoriseDisplayerWithSelection
          products={products}
          business={business}
          setActiveSection={setActiveSection}
          activeSection={activeSection}
          setSelectedProduct={setSelectedProduct}
        />

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
                isOpen={isOpen}
                updateOrder={updateOrder}
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
      </Grid>
    );
  } else return <LoaderComponent />;
};

export default BusinessPage;
