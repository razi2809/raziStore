import { Box, Fab, Grid, Typography } from "@mui/material";
import { FC, Fragment, memo, useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { IOrderData } from "../../@types/order";
import OrderCardComponents from "./OrderCardComponents";
interface Props {
  ordersdata: IOrderData[] | null;
}
const OrderComponents: FC<Props> = ({ ordersdata }) => {
  const TOTAL_PER_PAGE = 4;
  const [orders, setOrders] = useState<IOrderData[] | null>(ordersdata);
  const [orderIndex, setOrderIndex] = useState(1);

  useEffect(() => {
    //  handling order history pagination
    if (!ordersdata) return;
    const start = orderIndex - 1;
    const end = start + TOTAL_PER_PAGE;
    setOrders(ordersdata.slice(start, end));
  }, [ordersdata, orderIndex]);

  return (
    <Fragment>
      {ordersdata && ordersdata.length > 0 && (
        <Grid sx={{ mt: 2 }}>
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
              {ordersdata.length > 4 && (
                <Box>
                  <Fab
                    sx={{
                      bgcolor: "secondary.main",
                      mr: 2,
                      height: 20,
                      width: 35,
                      zIndex: 1,
                    }}
                    disabled={orderIndex === 1}
                    onClick={() => setOrderIndex(orderIndex - 1)}
                  >
                    <ArrowBackIcon />
                  </Fab>
                  <Fab
                    sx={{
                      bgcolor: "secondary.main",
                      mr: 2,
                      height: 20,
                      width: 35,
                      zIndex: 1,
                    }}
                    disabled={
                      orderIndex - 1 === ordersdata.length - TOTAL_PER_PAGE
                    }
                    onClick={() => setOrderIndex(orderIndex + 1)}
                  >
                    <ArrowForwardIcon />
                  </Fab>
                </Box>
              )}
            </Box>{" "}
            <Grid
              container
              spacing={2}
              sx={{ mt: 1, justifyContent: "center" }}
            >
              {orders &&
                orders.length > 0 &&
                orders.map((order) => (
                  <Grid item md={3} sm={6} xs={12} key={order._id}>
                    {" "}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ height: "100%" }}
                    >
                      <OrderCardComponents order={order} />
                    </motion.div>
                  </Grid>
                ))}
            </Grid>{" "}
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default memo(OrderComponents);
