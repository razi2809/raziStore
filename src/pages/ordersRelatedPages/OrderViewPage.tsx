import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { IOrderData } from "../../@types/order";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import { Box, Grid, Typography } from "@mui/material";
import notify from "../../services/toastService";
import ProductOrderTamplate from "../../components/productRelatedComponents/ProductOrderTamplate";
import GoogleMapToView from "../../layout/layoutRelatedComponents/maps/GoogleMapToView";
import { useAppSelector } from "../../REDUX/bigPie";
import OrderViewTemplatePage from "../templateLoadingPages/OrderViewTemplatePage";

const OrderViewPage = () => {
  const { orderId } = useParams();
  const { data, error } = useFetch(`/order/getOrder/${orderId}`);
  const user = useAppSelector((bigPie) => bigPie.authReducer.user);

  // const order = data.order as IOrderData;
  const [order, setOrder] = useState<IOrderData | null>(null);
  useEffect(() => {
    if (error) {
      // Handle the error, e.g., by setting an error message in the state,
      // logging the error, or showing a toast notification to the user.
      notify.error(error.message);
      // Optionally, you can set a state here to show an error message in the UI.
    } else if (data && data.order) {
      // If there's no error and data is present, update the businesses state.
      setOrder(data.order);
    }
  }, [data, error]);

  if (order) {
    return (
      <Grid>
        <Box
          sx={{
            height: "40vh",
            backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.4), rgba(128, 128, 128, 0.5)), url(${order.business.businessImage.url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              height: "80%",
              ml: 10,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              order from: {order.business.businessName}
            </Typography>
          </Box>{" "}
        </Box>
        <Grid container sx={{ width: "100%", mt: 2, ml: 0, p: 1 }} spacing={2}>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h3" sx={{ color: "text.primary" }}>
              order summery
            </Typography>
          </Box>{" "}
          <Grid item md={4} sm={6} xs={12}>
            <Box>
              <Box>
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                  products:
                </Typography>
              </Box>
              <Box sx={{ p: 1 }}>
                {order.products.map((product) => (
                  <ProductOrderTamplate
                    key={product.productId}
                    productInOrder={null}
                    product={product}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ color: "text.primary", textAlign: "center" }}
                >
                  address of the order: {order.address.addressName}
                </Typography>
                <Box sx={{ p: 1 }}>
                  <GoogleMapToView
                    theme={user?.theme ? user.theme : "light"}
                    address={order.address}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>{" "}
          <Grid
            item
            md={4}
            sm={6}
            xs={12}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Box>
              <Typography variant="h5" sx={{ color: "text.primary" }}>
                order summary:
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Box sx={{ p: 1 }}>
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                  product: {order.products.length}
                </Typography>
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                  venue: {order.business?.businessName}
                </Typography>
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                  price: {order.price}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
  } else return <OrderViewTemplatePage />;
};

export default OrderViewPage;
