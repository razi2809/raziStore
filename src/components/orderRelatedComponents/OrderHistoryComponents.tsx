import { FC, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../Router/ROUTER";
import { IOrderData } from "../../@types/order";
interface Props {
  order: IOrderData;
}
const OrderHistoryComponents: FC<Props> = ({ order }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const navigetToBusiness = () => {
    navigate(`${ROUTER.BUSINESS}/${order.business.businessId}`);
  };
  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={navigetToBusiness}
      sx={{ bgcolor: "divider" }}
      style={{
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.5s ease",
        boxShadow:
          " rgba(0, 0, 0, 0.06) 0px 0px 0.125rem 0px, rgba(0, 0, 0, 0.12) 0px 0.125rem 0.125rem 0px",
        transform: hover ? "scale(1.02)" : "",
        height: "100%",
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          sx={{
            width: "50",
            height: "50",
            transition: "transform 0.5s ease",
            transform: hover ? "scale(1.05)" : "",
          }}
          component="img"
          image={order.business.businessImage.url}
          alt={order.business.businessImage.alt}
        ></CardMedia>
      </Box>
      <CardContent sx={{ p: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5">{order.business.businessName}</Typography>
          <Typography variant="h6" sx={{ textAlign: "end", width: "100%" }}>
            price:{order.price}$
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default OrderHistoryComponents;
