import React, { FC, Fragment, useEffect } from "react";
import { IProduct } from "../../@types/product";
import { Box, Divider, Grid, Typography } from "@mui/material";
import ProductTamplateComponent from "../productRelatedComponents/ProductTamplateComponent";
import { ISelected } from "../../pages/businessRelatedPages/BusinessPage";
import { useAppSelector } from "../../REDUX/bigPie";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};
interface Props {
  category: string;
  products: IProduct[] | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ISelected | null>>;
  selectedProduct: ISelected | null;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}
const CategoryComponent: FC<Props> = ({
  category,
  products,
  setSelectedProduct,
  selectedProduct,
  setActiveSection,
}) => {
  const user = useAppSelector((bigPie) => bigPie.authReducer);
  const { ref: categoryRef, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(category);
    }
  }, [inView]);

  return (
    <div ref={categoryRef} style={{ width: "100%" }} id={category}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mr: 4,
          p: 1,
        }}
      >
        <Typography variant="h5" sx={{ color: "text.primary" }}>
          {category}
        </Typography>{" "}
      </Grid>
      <Grid container spacing={4} sx={{ p: 4 }}>
        {products?.length &&
          products.map((product) => {
            const thisCategory = product.categories.includes(category);
            if (thisCategory) {
              if (
                selectedProduct?.productId === product._id &&
                category === selectedProduct?.category
              ) {
                return (
                  <Fragment key={product._id}>
                    <Grid container item md={4} sm={6}>
                      <Box sx={{ width: "10em", height: "9em" }}></Box>
                    </Grid>
                  </Fragment>
                );
              }
              return (
                <Fragment key={product._id}>
                  <Grid
                    container
                    item
                    sm={6}
                    md={4}
                    sx={{ position: "relative" }}
                  >
                    <motion.div
                      style={{ width: "90%", height: "9em" }}
                      initial="hidden"
                      animate="visible"
                      variants={variants}
                      transition={{ duration: 0.5 }}
                    >
                      <ProductTamplateComponent
                        category={category}
                        product={product}
                        setSelectedProduct={setSelectedProduct}
                      />
                    </motion.div>
                  </Grid>
                </Fragment>
              );
            }
          })}
      </Grid>
      <Divider />
    </div>
  );
};

export default CategoryComponent;
