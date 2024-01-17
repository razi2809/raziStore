import React, { FC } from "react";
import { IBusiness } from "../../../@types/business";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../../@types/product";
interface Props {
  product: IProduct;
}
const ProductSelectTamplate: FC<Props> = ({ product }) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        sx={{ width: "50%", height: "5em", mr: 1 }}
        component="img"
        src={product.productImage.url}
        alt={product.productImage.alt}
      />
      <Box>
        <Typography variant="h5">{product.productName}</Typography>
        {/* <Typography variant="h6">{business.businessDescription}</Typography> */}
      </Box>
    </Card>
  );
};

export default ProductSelectTamplate;
