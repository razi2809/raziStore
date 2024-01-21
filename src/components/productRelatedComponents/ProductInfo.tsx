import { FC } from "react";
import { Iuser } from "../../@types/user";
import { Box, Grid, Typography } from "@mui/material";
import UserWhomLikeComponent from "../userRelatedComponents/UserWhomLikeComponent";
import { IProduct } from "../../@types/product";

interface Props {
  product: IProduct;
  userWhomLiked: Iuser[] | null;
}
const ProductInfo: FC<Props> = ({ product, userWhomLiked }) => {
  return (
    <Grid>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: {
              md: "flex",
              sm: "flex",
              xs: "block",
            },
            p: 1,
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "text.primary", textAlign: "start" }}
              >
                {product.productName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ mr: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  price
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", textAlign: "center" }}
                >
                  {product.price}
                </Typography>
              </Box>
              <Box sx={{ mr: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  quantity
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", textAlign: "center" }}
                >
                  {product.productQuantity}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  product description
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", textAlign: "center" }}
                >
                  {product.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <UserWhomLikeComponent usersData={userWhomLiked} />
        <Box
          sx={{
            height: "20vh",
            mt: 2,
            p: 1,
            bgcolor: "divider",
            position: "relative",
          }}
        ></Box>
      </Box>
    </Grid>
  );
};

export default ProductInfo;
