import React, { FC, Fragment, useState } from "react";
import { IAddress } from "../../@types/user";
import { Box, Button, Grid, Typography } from "@mui/material";
import AddressTamplate from "../addressRelatedComponents/AddressTamplate";
import AddAnAddress from "../addressRelatedComponents/AddAnAddress";
import { motion } from "framer-motion";
import { useAppSelector } from "../../REDUX/bigPie";

const AddressInfo = () => {
  const addresses = useAppSelector(
    (bigPie) => bigPie.authReducer.user?.address
  );
  const [addAddress, setAddAddress] = useState(false);
  return (
    <Grid sx={{ mt: 2, p: 2 }}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              variant="h4"
              sx={{ color: "text.primary", textAlign: "start" }}
            >
              user address
            </Typography>
          </Box>
        </Box>{" "}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container sx={{ width: "100%", justifyContent: "center" }}>
          {addresses &&
            addresses.length >= 0 &&
            addresses.map((address) => (
              <Fragment key={address.id}>
                <Grid item md={2} xs={0}></Grid>
                <Grid item md={8} xs={10} sx={{ p: 1, mb: 1 }}>
                  <AddressTamplate address={address} />
                </Grid>
                <Grid item md={2} xs={0}></Grid>
              </Fragment>
            ))}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => setAddAddress(true)}>
              add an address
            </Button>
            {addAddress && (
              <motion.div
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
                onClick={() => setAddAddress(false)}
              >
                <AddAnAddress />
              </motion.div>
            )}
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default AddressInfo;
