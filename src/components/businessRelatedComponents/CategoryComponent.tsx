import React, { FC, memo, useEffect } from "react";
import { IProduct } from "../../@types/product";
import { Box, Grid, Typography } from "@mui/material";
import ProductTamplateComponent from "../productRelatedComponents/ProductTamplateComponent";
import { ISelected } from "../../pages/businessRelatedPages/BusinessPage";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductTamplateDisplay from "../productRelatedComponents/ProductTamplateDisplay";
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
  isOpen: boolean;
  updateOrder: (product: IProduct, quantity: number) => void;
}
const CategoryComponent: FC<Props> = ({
  category,
  products,
  setSelectedProduct,
  selectedProduct,
  setActiveSection,
  isOpen,
  updateOrder,
}) => {
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
                  <Grid container key={product._id} item md={4} sm={6}>
                    <Box sx={{ width: "10em", height: "9em" }}></Box>
                  </Grid>
                );
              }
              return (
                <Grid
                  key={product._id}
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
              );
            }
          })}
      </Grid>
      <AnimatePresence>
        {selectedProduct &&
          products &&
          products.map((product) => {
            if (product._id === selectedProduct.productId) {
              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1000,
                  }}
                  onClick={() => setSelectedProduct(null)}
                >
                  <ProductTamplateDisplay
                    canOrder={isOpen}
                    product={product}
                    category={selectedProduct.category}
                    updateOrder={updateOrder}
                  />
                </motion.div>
              );
            } else {
              return null;
            }
          })}
      </AnimatePresence>
    </div>
  );
};

export default memo(CategoryComponent);
