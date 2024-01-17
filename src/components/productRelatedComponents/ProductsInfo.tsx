import { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { IProduct } from "../../@types/product";
import ProductTamplateComponent from "./ProductTamplateComponent";
interface Props {
  products: IProduct[] | null;
}
const ProductsInfo: FC<Props> = ({ products }) => {
  if (products) {
    return (
      <Grid sx={{ mt: 2, p: 2 }}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "text.primary", textAlign: "start" }}
              >
                products
              </Typography>
            </Box>
          </Box>{" "}
          <Grid container spacing={2} sx={{ mt: 1, justifyContent: "center" }}>
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <Grid item md={4} sm={6} xs={12} key={product._id}>
                  {" "}
                  <ProductTamplateComponent
                    product={product}
                    setSelectedProduct={null}
                    category={null}
                  />
                </Grid>
              ))}
          </Grid>{" "}
        </Grid>
      </Grid>
    );
  } else return null;
};

export default ProductsInfo;
