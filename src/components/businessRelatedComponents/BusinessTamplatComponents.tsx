import React, { FC, useState } from "react";
import { IBusiness } from "../../@types/business";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useAppSelector } from "../../REDUX/bigPie";
import axios from "axios";
interface Props {
  business: IBusiness;
}
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const BusinessTamplatComponents: FC<Props> = ({ business }) => {
  const user = useAppSelector((bigPie) => bigPie.authReducer);
  const [like, setLike] = useState(business.likes.includes(user.user?._id));
  const handleBusinessLike = () => {
    axios
      .patch(`/business/${business._id}`)
      .then((response) => {
        setLike(!like);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Card sx={{ bgcolor: "divider" }}>
      {/* <CardActionArea> */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={{ width: "100%", height: "200px" }}
          component="img"
          image={business.businessImage.url}
          alt={business.businessImage.alt}
        ></CardMedia>
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          {user && user.isLoggedIn && (
            <Checkbox
              {...label}
              checked={like}
              onChange={handleBusinessLike}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          )}
          <IconButton>
            <ShareOutlinedIcon />{" "}
          </IconButton>
          {/* <Checkbox
            {...label}
            icon={}
            checkedIcon={<ShareOutlinedIcon />}
          /> */}
        </div>
      </Box>

      {/* <CardHeader title={business.businessName} /> */}
      <CardContent sx={{ p: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5">
            {business.businessName} | {business.address.street}
          </Typography>
          <Typography variant="h6">{business.businessDescription}</Typography>
        </Box>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
};

export default BusinessTamplatComponents;
