import React, { Fragment, useEffect, useState } from "react";
import { IBusiness } from "../../@types/business";
import axios from "axios";
import { motion } from "framer-motion";
import { Box, Grid, Typography } from "@mui/material";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import BusinessTamplatComponents from "../../components/businessRelatedComponents/BusinessTamplatComponents";
type sections = "resturants" | "venues";
const HomePage = () => {
  const [businesses, setBusinesses] = useState<IBusiness[] | null>(null);
  const [activeSection, setSections] = useState<sections>("resturants");
  const sectionOptions = ["resturants", "venues"];
  useEffect(() => {
    try {
      axios
        .get("/business")
        .then((response) => {
          setBusinesses(response.data.businesses);
        })
        .catch((error) => {});
    } catch (err) {}
  }, []);
  if (businesses) {
    return (
      <Box>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            mb: 4,
          }}
        >
          {sectionOptions.map((section) => (
            <Grid key={section} sx={{ mr: 2, position: "relative" }}>
              <Typography sx={{ p: 1, color: "textPrimary" }} variant="body1">
                {section}
              </Typography>

              {section === activeSection && (
                <motion.span
                  style={{
                    backgroundColor: "rgba(128, 128, 128, 0.5)",
                    borderRadius: 50,
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                  }}
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                >
                  {" "}
                </motion.span>
              )}
            </Grid>
          ))}
        </Box> */}
        <Box>
          <Grid
            container
            item
            xs={12}
            sx={{ mt: 1, justifyContent: "flex-start", mb: 4 }}
          >
            <Typography variant="h3" sx={{ ml: 4, color: "text.primary" }}>
              all resturants{" "}
            </Typography>
          </Grid>
        </Box>
        <Grid>
          <Grid container spacing={4} sx={{ pl: 4, pr: 4 }}>
            {businesses?.length > 0 &&
              businesses.map((business) => (
                <Grid
                  item
                  md={4}
                  sm={6}
                  xs={12}
                  key={business._id}
                  sx={{ pr: 1 }}
                >
                  <BusinessTamplatComponents business={business} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Box>
    );
  }
  return <LoaderComponent />;
};

export default HomePage;
