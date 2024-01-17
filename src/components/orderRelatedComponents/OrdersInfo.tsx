import { FC } from "react";
import { IOrderData } from "../../@types/order";
import OrderCardComponents from "./OrderCardComponents";
import { Box, Grid, Typography } from "@mui/material";
interface Props {
  orders: IOrderData[] | null;
}
const OrdersInfo: FC<Props> = ({ orders }) => {
  if (orders) {
    return (
      <Grid sx={{ mt: 2, p: 2 }}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "text.primary", textAlign: "start" }}
              >
                orders
              </Typography>
            </Box>
          </Box>{" "}
          <Grid container spacing={2} sx={{ mt: 1, justifyContent: "center" }}>
            {orders &&
              orders.length > 0 &&
              orders.map((order) => (
                <Grid item md={3} sm={6} xs={12} key={order._id}>
                  {" "}
                  <OrderCardComponents order={order} />
                </Grid>
              ))}
          </Grid>{" "}
        </Grid>
      </Grid>
    );
  } else return null;
};

export default OrdersInfo;
