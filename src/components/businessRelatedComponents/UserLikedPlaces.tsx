import { Box, Fab, Grid, Typography } from "@mui/material";
import { FC, Fragment, memo, useEffect, useState } from "react";
import LikedBusinessComponents from "./LikedBusinessComponents";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { IBusiness } from "../../@types/business";
interface Props {
  userLikedPlaces: IBusiness[] | null;
}
const UserLikedPlacesComponents: FC<Props> = ({ userLikedPlaces }) => {
  const [businessIndex, SetBusinessIndex] = useState(1);
  const TOTAL_PER_PAGE = 4;
  const [likedPlaces, setLikedPlaces] = useState<IBusiness[] | null>(
    userLikedPlaces
  );
  useEffect(() => {
    // handling liked businesses pagination
    if (!userLikedPlaces) return;
    const start = businessIndex - 1;
    const end = start + TOTAL_PER_PAGE;
    setLikedPlaces(userLikedPlaces.slice(start, end));
  }, [businessIndex, userLikedPlaces]);

  return (
    <Fragment>
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
                      businessIndex - 1 ===
                      userLikedPlaces.length - TOTAL_PER_PAGE
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
                  <Grid
                    item
                    md={3}
                    sm={6}
                    xs={12}
                    key={business._id}
                    sx={{ height: "20em" }}
                  >
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
    </Fragment>
  );
};

export default memo(UserLikedPlacesComponents);
