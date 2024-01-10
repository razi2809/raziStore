import React, { FC, useEffect, useState } from "react";
import { Iuser } from "../../@types/user";
import { Avatar, Box, Button, Fab, Grid, Typography } from "@mui/material";
import { IBusiness } from "../../@types/business";
import LikedBusinessComponents from "../businessRelatedComponents/LikedBusinessComponents";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { IOrderData } from "../../@types/order";
import OrderHistoryComponents from "../orderRelatedComponents/OrderHistoryComponents";

interface Props {
  user: Iuser;
  userLikedPlaces: IBusiness[] | null;
  orderHistory: IOrderData[] | null;
}
const PersonalInfo: FC<Props> = ({ user, userLikedPlaces, orderHistory }) => {
  const [img, setImg] = useState<null | File>(null);
  const [likedPlaces, setLikedPlaces] = useState<IBusiness[] | null>(
    userLikedPlaces
  );

  const [orders, setOrders] = useState<IOrderData[] | null>(orderHistory);
  const [businessIndex, SetBusinessIndex] = useState(1);
  const [orderIndex, setOrderIndex] = useState(1);
  const TOTAL_PER_PAGE = 4;

  useEffect(() => {
    //  handling order history pagination
    if (!orderHistory) return;
    setOrders(orderHistory.slice(orderIndex - 1, TOTAL_PER_PAGE * orderIndex));
  }, [orderHistory, orderIndex]);
  useEffect(() => {
    // handling liked businesses pagination
    if (!userLikedPlaces) return;
    setLikedPlaces(
      userLikedPlaces.slice(businessIndex - 1, TOTAL_PER_PAGE * businessIndex)
    );
  }, [businessIndex, userLikedPlaces]);
  const handleSetPic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      setImg(inputElement.files[0]);
    } else {
      setImg(null);
    }
  };

  return (
    <Grid sx={{ pl: "10vw", pr: "10vw" }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mr: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Avatar
                sx={{ width: 75, height: 75, zIndex: 1 }}
                src={img ? URL.createObjectURL(img) : user.image.url}
                alt={user.image.alt || "User Profile Picture"}
              />
              <Box
                sx={{
                  position: "absolute",
                  width: "115%",
                  height: "115%",
                  borderRadius: 50,
                  // top: 0,
                  bgcolor: "white",
                  zIndex: 0,
                }}
              ></Box>
            </Box>{" "}
            <label htmlFor="file-input">
              <Button variant="contained" sx={{ mt: 2 }} component="span">
                edit
              </Button>
            </label>
            <input
              id="file-input"
              style={{ display: "none" }}
              className="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => handleSetPic(e)}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "text.primary", textAlign: "start" }}
              >
                {user.name.firstName} {user.name.lastName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ mr: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  mail
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  {user.email}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  phone
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  {user.phoneNumber}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {userLikedPlaces && userLikedPlaces.length > 0 && (
          <Grid sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "text.primary", textAlign: "start" }}
                  >
                    loved places
                  </Typography>
                </Box>
                {userLikedPlaces.length > 4 && (
                  <Box>
                    <Fab
                      sx={{
                        bgcolor: "secondary.main",
                        mr: 2,
                        height: 20,
                        width: 35,
                        zIndex: 1,
                      }}
                      disabled={businessIndex === 1}
                      aria-label="Go Back"
                      onClick={() => SetBusinessIndex(businessIndex - 1)}
                    >
                      <ArrowBackIcon />
                    </Fab>
                    <Fab
                      aria-label="Go forward"
                      sx={{
                        bgcolor: "secondary.main",
                        mr: 2,
                        height: 20,
                        width: 35,
                        zbusinessIndex: 1,
                      }}
                      disabled={
                        businessIndex ===
                        Math.ceil(userLikedPlaces.length / TOTAL_PER_PAGE)
                      }
                      onClick={() => SetBusinessIndex(businessIndex + 1)}
                    >
                      <ArrowForwardIcon />
                    </Fab>
                  </Box>
                )}
              </Box>{" "}
              <Grid
                container
                spacing={2}
                sx={{ mt: 1, justifyContent: "center" }}
              >
                {likedPlaces &&
                  likedPlaces.length > 0 &&
                  likedPlaces.map((business) => (
                    <Grid item md={3} sm={6} xs={12} key={business._id}>
                      {" "}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ height: "100%" }}
                      >
                        <LikedBusinessComponents business={business} />
                      </motion.div>
                    </Grid>
                  ))}
              </Grid>{" "}
            </Grid>
          </Grid>
        )}
        {orderHistory && orderHistory.length > 0 && (
          <Grid sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "text.primary", textAlign: "start" }}
                  >
                    orders
                  </Typography>
                </Box>
                {orderHistory.length > 4 && (
                  <Box>
                    <Fab
                      sx={{
                        bgcolor: "secondary.main",
                        mr: 2,
                        height: 20,
                        width: 35,
                        zIndex: 1,
                      }}
                      disabled={orderIndex === 1}
                      onClick={() => setOrderIndex(orderIndex - 1)}
                    >
                      <ArrowBackIcon />
                    </Fab>
                    <Fab
                      sx={{
                        bgcolor: "secondary.main",
                        mr: 2,
                        height: 20,
                        width: 35,
                        zIndex: 1,
                      }}
                      disabled={
                        businessIndex ===
                        Math.ceil(orderHistory.length / TOTAL_PER_PAGE)
                      }
                      onClick={() => setOrderIndex(businessIndex + 1)}
                    >
                      <ArrowForwardIcon />
                    </Fab>
                  </Box>
                )}
              </Box>{" "}
              <Grid
                container
                spacing={2}
                sx={{ mt: 1, justifyContent: "center" }}
              >
                {orders &&
                  orders.length > 0 &&
                  orders.map((order) => (
                    <Grid item md={3} sm={6} xs={12} key={order._id}>
                      {" "}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ height: "100%" }}
                      >
                        <OrderHistoryComponents order={order} />
                      </motion.div>
                    </Grid>
                  ))}
              </Grid>{" "}
            </Grid>
          </Grid>
        )}
      </Box>
    </Grid>
  );
};

export default PersonalInfo;
