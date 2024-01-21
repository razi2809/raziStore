import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import SelectFilterProducts from "../searchFilters/productsRelatedSelect/SelectFilterProducts";
import { Link } from "react-router-dom";
import { IProduct } from "../../@types/product";
import { IBusiness } from "../../@types/business";
import { motion } from "framer-motion";

import { ISelected } from "../../pages/businessRelatedPages/BusinessPage";
interface Props {
  products: IProduct[];
  setSelectedProduct: React.Dispatch<React.SetStateAction<ISelected | null>>;
  business: IBusiness;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  activeSection: string;
}
const CategorizeDisplayerWithSelection: FC<Props> = ({
  products,
  setSelectedProduct,
  business,
  setActiveSection,
  activeSection,
}) => {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        borderBottom: "1px solid rgba(32, 33, 37, 0.12)",
        display: "flex",
        justifyContent: "space-between",
        p: 1,
        position: "sticky",
        top: "4em",
        zIndex: 3,
      }}
    >
      <Box
        sx={{
          width: 350,
          zIndex: 3,
          display: {
            md: "flex",
            sm: "flex",
            xs: "none",
          },
          alignItems: "center",
          ml: 3,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <SelectFilterProducts
            data={products}
            setSelectedProduct={setSelectedProduct}
          />
        </Box>
      </Box>
      <Box
        sx={{
          mr: 4,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {business?.categories &&
          business?.categories.length > 0 &&
          business?.categories.map((category) => (
            <Box key={category} sx={{ display: "flex" }}>
              <Link to={`#${category}`} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    mr: 2,
                    borderRadius: 20,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveSection(category)}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "black",
                      p: 1,
                      ":hover": {
                        color: "white",
                      },
                    }}
                  >
                    {category}
                  </Typography>
                  {activeSection === category && (
                    <motion.span
                      style={{
                        position: "absolute",
                        top: 50,
                        height: "2px",
                        width: "100%",
                        backgroundColor: "black",
                      }}
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    >
                      {" "}
                    </motion.span>
                  )}
                </Box>
              </Link>
            </Box>
          ))}
      </Box>{" "}
    </Box>
  );
};

export default CategorizeDisplayerWithSelection;
