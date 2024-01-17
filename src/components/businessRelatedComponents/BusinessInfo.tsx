import { FC } from "react";
import { Iuser } from "../../@types/user";
import { Box, Grid, Typography } from "@mui/material";
import { IBusiness } from "../../@types/business";
import { IOrderData } from "../../@types/order";
import { useAppSelector } from "../../REDUX/bigPie";
import OrderComponents from "../orderRelatedComponents/OrderComponents";
import UserWhomLikeComponent from "./UserWhomLikeComponent";
import GoogleMapToView from "../../layout/layoutRelatedComponents/maps/GoogleMapToView";

interface Props {
  business: IBusiness;
  userWhomLiked: Iuser[] | null;
  ordersData: IOrderData[] | null;
}
const BusinessInfo: FC<Props> = ({ business, userWhomLiked, ordersData }) => {
  const user = useAppSelector((bigPie) => bigPie.authReducer.user);
  /* const dispatch = useAppDispatch(); */
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
                {business.businessName}
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
                  {business.businessEmail}
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
                  {business.businessPhoneNumber}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <UserWhomLikeComponent usersData={userWhomLiked} />
        <OrderComponents ordersdata={ordersData} />
        <Box
          sx={{
            height: "20vh",
            mt: 2,
            p: 1,
            bgcolor: "divider",
            position: "relative",
          }}
        >
          <GoogleMapToView
            address={business?.address}
            theme={user?.theme ? user.theme : "light"}
          />
          <Box
            sx={{
              position: "absolute",
              bgcolor: "divider",
              inset: 0,
              height: "50%",
              width: "100%",
              top: 4,
              borderRadius: 3,
              zIndex: 1,
              background: user?.theme
                ? user.theme === "dark"
                  ? "linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))"
                  : "linear-gradient(rgb(246, 246, 246) 0%, rgba(246, 246, 246, 0) 100%)"
                : "linear-gradient(rgb(246, 246, 246) 0%, rgba(246, 246, 246, 0) 100%)",
              //
            }}
          ></Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default BusinessInfo;
