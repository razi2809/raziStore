import { FC, useState } from "react";
import { IBusiness } from "../../@types/business";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../Router/ROUTER";
import useBusinessOpen from "../../hooks/useBusinessOpen";
interface Props {
  business: IBusiness;
}
const LikedBusinessComponents: FC<Props> = ({ business }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const isOpen = useBusinessOpen(business);

  const navigetToBusiness = () => {
    navigate(`${ROUTER.BUSINESS}/${business._id}`);
  };
  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={navigetToBusiness}
      sx={{ bgcolor: "divider" }}
      style={{
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.5s ease",
        boxShadow:
          " rgba(0, 0, 0, 0.06) 0px 0px 0.125rem 0px, rgba(0, 0, 0, 0.12) 0px 0.125rem 0.125rem 0px",
        transform: hover ? "scale(1.02)" : "",
        height: "100%",
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          sx={{
            width: "50",
            height: "50",
            transition: "transform 0.5s ease",
            transform: hover ? "scale(1.05)" : "",
          }}
          component="img"
          image={business.businessImage.url}
          alt={business.businessImage.alt}
        ></CardMedia>
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
  );
};
export default LikedBusinessComponents;
