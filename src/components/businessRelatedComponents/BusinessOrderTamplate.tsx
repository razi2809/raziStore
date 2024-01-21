import React, { FC, useState } from "react";
import { IOrder } from "../../@types/order";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import ProductOrderTamplate from "../productRelatedComponents/ProductOrderTamplate";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../Router/ROUTER";
import { useAppDispatch } from "../../REDUX/bigPie";
import { orderActions } from "../../REDUX/orderSlice";
interface Props {
  order: IOrder;
  ordersHover: React.Dispatch<React.SetStateAction<boolean>>;
  canHover: Boolean;
}
const BusinessOrderTamplate: FC<Props> = ({ order, ordersHover, canHover }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const placeAnOrder = () => {
    navigate(`${ROUTER.ORDER}/neworder/${order.business?._id}`);
    ordersHover(false);
  };
  const deleteAnOrder = () => {
    dispatch(orderActions.deleteOrder({ BusinessId: order.business?._id }));
    ordersHover(false);
  };
  if (order.business) {
    return (
      <Box
        sx={{
          height: "4em",
          position: "relative",
          mb: 2,
          cursor: canHover ? "auto" : "pointer",
        }}
        onMouseEnter={() => (canHover ? setHover(true) : null)}
        onMouseLeave={() => (canHover ? setHover(false) : null)}
        onClick={() => (canHover ? null : placeAnOrder())}
      >
        <Card
          sx={{
            display: "flex",
            height: "4em",
          }}
        >
          <CardMedia
            sx={{ width: "35%" }}
            component="img"
            src={order.business.businessImage.url}
            alt={order.business.businessImage.alt}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              p: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="h4">{order.business.businessName}</Typography>

            <Typography variant="body1">{order.price}</Typography>
          </CardContent>
        </Card>

        {hover && (
          <Box
            sx={{
              position: "absolute",
              left: "100%",
              top: 0,
              bgcolor: "secondary.main",
              width: "75%",
              borderRadius: 1,
              p: 1,
              zIndex: 99,
              // height: "100%",
            }}
          >
            {order.products.map((product) => (
              <ProductOrderTamplate
                key={product.product._id}
                productInOrder={product}
              />
            ))}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title="remove order">
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  onClick={deleteAnOrder}
                >
                  <RemoveShoppingCartIcon />
                </Button>
              </Tooltip>
              <Tooltip title="place an order">
                <Button variant="contained" onClick={placeAnOrder}>
                  <ShoppingCartIcon />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        )}
      </Box>
    );
  } else return null;
};

export default BusinessOrderTamplate;
