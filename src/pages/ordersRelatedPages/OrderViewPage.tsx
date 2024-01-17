import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { IOrderData } from "../../@types/order";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import { Box, Grid, Typography } from "@mui/material";
import notify from "../../services/toastService";

const OrderViewPage = () => {
  const { orderId } = useParams();
  const { data, error } = useFetch(`/order/getOrder/${orderId}`);
  // const order = data.order as IOrderData;
  const [order, setOrder] = useState<IOrderData | null>(null);
  useEffect(() => {
    if (error) {
      // Handle the error, e.g., by setting an error message in the state,
      // logging the error, or showing a toast notification to the user.
      console.error("An error occurred while fetching businesses:", error);
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
      </Grid>
    );
  } else return <LoaderComponent />;
};

export default OrderViewPage;
