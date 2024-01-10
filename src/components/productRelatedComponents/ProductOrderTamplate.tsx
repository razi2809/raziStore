import React, { FC, useEffect, useState } from "react";
import { IProductToOrder } from "../../@types/order";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import CountStateComponents from "../../layout/layoutRelatedComponents/CountStateComponents";
import { useAppDispatch } from "../../REDUX/bigPie";
import { orderActions } from "../../REDUX/orderSlice";
interface Props {
  productInOrder: IProductToOrder;
}
const ProductOrderTamplate: FC<Props> = ({ productInOrder }) => {
  const dispatch = useAppDispatch();

  const [count, setCount] = useState(productInOrder.quantity);

  useEffect(() => {
    dispatch(
      orderActions.updateProductQuanity({
        product: productInOrder.product,
        quantity: count,
      })
    );
  }, [count]);
  return (
    <Card
      sx={{
        width: "100%",
        mb: 1,
        display: "flex",
        height: "4em",
      }}
    >
      <CardMedia
        sx={{ width: "30%" }}
        component="img"
        src={productInOrder.product.productImage.url}
        alt={productInOrder.product.productImage.alt}
      />
      <CardContent
        sx={{
          // mr: 2,
          width: "65%",
          flexGrow: 1,
          display: "flex",
          bgcolor: "primary.main",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            ml: 1,
            flexGrow: 1,
          }}
        >
          <Typography variant="body1">
            {productInOrder.product.productName}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "primary.main",
          }}
        >
          <CountStateComponents
            quantity={productInOrder.product.productQuantity}
            count={count}
            setCount={setCount}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductOrderTamplate;
