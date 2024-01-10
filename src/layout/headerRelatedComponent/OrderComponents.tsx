import { Box, Card, CardMedia, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useAppSelector } from "../../REDUX/bigPie";
import BusinessOrderTamplate from "../../components/businessRelatedComponents/BusinessOrderTamplate";
import { useLocation } from "react-router-dom";

const OrderComponents = () => {
  const orders = useAppSelector((bigPie) => bigPie.orderReducer);
  const [hover, setHover] = useState(false);

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        bgcolor: "secondary.main",
        p: 2,
        borderRadius: 1,
        position: "relative",
        zIndex: 1000,
        width: "80%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Box>
        {orders.length <= 2 ? (
          <Typography variant="body1">view order</Typography>
        ) : (
          <Typography variant="body1">view orders</Typography>
        )}
      </Box>
      <Box>
        {orders.length <= 2 ? (
          <Typography variant="body1">view order</Typography>
        ) : (
          <Typography variant="body1">view orders</Typography>
        )}
      </Box>
      {hover && (
        <Box
          sx={{
            bgcolor: "secondary.main",
            p: 2,
            borderRadius: 1,
            position: "absolute",
            right: 0,
            top: 50,
            left: 0,
          }}
        >
          {orders.map((order) => {
            if (!order.business) return;
            return (
              <BusinessOrderTamplate
                key={order.business._id}
                order={order}
                ordersHover={setHover}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default OrderComponents;
