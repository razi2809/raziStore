import React, { FC } from "react";
import { IBusiness } from "../../../@types/business";
import { Box, Card, CardMedia, Typography } from "@mui/material";
interface Props {
  business: IBusiness;
}
const BusinessSelectTamplate: FC<Props> = ({ business }) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        sx={{ width: "50%", height: "5em", mr: 1 }}
        component="img"
        src={business.businessImage.url}
        alt={business.businessImage.alt}
      />
      <Box>
        <Typography variant="h5">{business.businessName}</Typography>
        <Typography variant="h6">{business.businessDescription}</Typography>
      </Box>
    </Card>
  );
};

export default BusinessSelectTamplate;
