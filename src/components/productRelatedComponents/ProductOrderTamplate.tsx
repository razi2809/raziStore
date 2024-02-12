import React, { FC, useEffect, useState } from "react";
import { IProductOrder, IProductToOrder } from "../../@types/order";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import CountStateComponents from "../../layout/layoutRelatedComponents/CountStateComponents";
import { useAppDispatch } from "../../REDUX/bigPie";
import { orderActions } from "../../REDUX/orderSlice";
interface Props {
  productInOrder: IProductToOrder | null;
  product: IProductOrder | null;
}
const ProductOrderTamplate: FC<Props> = ({ productInOrder, product }) => {
  const dispatch = useAppDispatch();

  const [count, setCount] = useState<number | null>(
    productInOrder ? productInOrder.quantity : null
  );

  useEffect(() => {
    if (!productInOrder || !count) return;
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
      {productInOrder && (
        <CardMedia
          sx={{ width: "30%" }}
          component="img"
          src={productInOrder.product.productImage.url}
          alt={productInOrder.product.productImage.alt}
        />
      )}
      {product && (
        <CardMedia
          sx={{ width: "30%" }}
          component="img"
          src={product.productImage.url}
          alt={product.productImage.alt}
        />
      )}
      <CardContent
        sx={{
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
            {productInOrder
              ? productInOrder.product.productName
              : product?.productName}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">x{product?.productQuantity}</Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "primary.main",
          }}
        >
          {count && productInOrder && setCount && (
            <CountStateComponents
              quantity={productInOrder.product.productQuantity}
              count={count}
              setCount={setCount}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductOrderTamplate;
