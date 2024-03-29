import React, { FC, useState } from "react";
import { IBusiness } from "../../@types/business";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useAppSelector } from "../../REDUX/bigPie";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../Router/ROUTER";
import sendData from "../../hooks/useSendData";
import useBusinessOpen from "../../hooks/useBusinessOpen";
import notify from "../../services/toastService";
import { AxiosError } from "axios";
interface Props {
  business: IBusiness;
  setBusinessLike: (like: boolean, businessId: string) => void;
}
const BusinessTemplateComponent: FC<Props> = ({
  business,
  setBusinessLike,
}) => {
  const user = useAppSelector((bigPie) => bigPie.authReducer);
  const [like, setLike] = useState(business.likes.includes(user.user?._id));
  const [hover, setHover] = useState(false);
  const isOpen = useBusinessOpen(business);

  const navigate = useNavigate();
  const handleBusinessLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      const res = await sendData({
        url: `/business/${business._id}`,
        method: "patch",
      });
      setLike(!like);
      setBusinessLike(!like, business._id);
      notify.success(res.message);
    } catch (e) {
      if (e instanceof AxiosError) {
        notify.error(e.response?.data.message);
      } else {
        notify.error("An unknown error occurred");
      }
    }
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${business.businessName}`,
        text: "Check out my awesome business",
        url: `https://razi2809.github.io/raziStore${ROUTER.BUSINESS}/${business._id}`,
      });
    } else {
      notify.error("Web Share API is not supported in your browser");
    }
  };
  const navigateToBusiness = () => {
    navigate(`${ROUTER.BUSINESS}/${business._id}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={navigateToBusiness}
        sx={{ bgcolor: "divider" }}
        style={{
          height: "100%",
          position: "relative",
          cursor: "pointer",
          transition: "transform 0.5s ease",
          boxShadow:
            " rgba(0, 0, 0, 0.06) 0px 0px 0.125rem 0px, rgba(0, 0, 0, 0.12) 0px 0.125rem 0.125rem 0px",
          transform: hover ? "scale(1.02)" : "",
        }}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            sx={{
              width: "100%",
              height: "200px",
              transition: "transform 0.5s ease",
              transform: hover ? "scale(1.05)" : "",
            }}
            component="img"
            image={business.businessImage.url}
            alt={business.businessImage.alt}
          ></CardMedia>
          <div style={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}>
            {user && user.isLoggedIn && (
              <Checkbox
                inputProps={{ "aria-label": "like" }}
                checked={like}
                onClick={(e) => handleBusinessLike(e)}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
            )}
            <IconButton onClick={(e) => handleShare(e)}>
              <ShareOutlinedIcon />{" "}
            </IconButton>
          </div>
          {!isOpen && (
            <span
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                right: 0,
                backgroundColor: "rgba(128, 128, 128, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography
                variant="h3"
                sx={{ color: "#D3D3D3", textAlign: "center" }}
              >
                close for now
              </Typography>
            </span>
          )}
        </Box>
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
      </Card>
    </motion.div>
  );
};
export default BusinessTemplateComponent;
