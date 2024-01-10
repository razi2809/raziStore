import React, { FC } from "react";
import { IOrderData } from "../../@types/order";
import OrderHistoryComponents from "../orderRelatedComponents/OrderHistoryComponents";
import { Box, Grid, Typography } from "@mui/material";
interface Props {
  orderHistory: IOrderData[] | null;
}
const OrderHistoryInfo: FC<Props> = ({ orderHistory }) => {
  if (orderHistory) {
    return (
      <Grid sx={{ mt: 2, p: 2 }}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "text.primary", textAlign: "start" }}
              >
                order history
              </Typography>
            </Box>
          </Box>{" "}
          <Grid container spacing={2} sx={{ mt: 1, justifyContent: "center" }}>
            {orderHistory &&
              orderHistory.length > 0 &&
              orderHistory.map((order) => (
                <Grid item md={3} sm={6} xs={12} key={order._id}>
                  {" "}
                  <OrderHistoryComponents order={order} />
                </Grid>
              ))}
          </Grid>{" "}
        </Grid>
      </Grid>
    );
  } else return null;
};

export default OrderHistoryInfo;
