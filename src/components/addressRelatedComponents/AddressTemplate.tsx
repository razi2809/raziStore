import { FC } from "react";
import { IAddress } from "../../@types/user";
import { Box, Fab, Typography, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
interface Props {
  address: IAddress;
}
const AddressTemplate: FC<Props> = ({ address }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        borderBottom: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(32, 33, 37, 0.12)"
        }`,
        pb: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", zIndex: 1 }}>
        <Box sx={{ mr: 2 }}>
          <Fab sx={{ height: 20, width: 35 }} disabled>
            <LocationOnIcon />
          </Fab>
        </Box>
        <Box>
          <Typography variant="h6" color="text.primary">
            {address.addressName} | {address.state}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {address.city} {address.street} {address.buildingNumber}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mr: 2, display: "flex", alignItems: "center", zIndex: 1 }}>
        <Fab sx={{ height: 20, width: 35 }} disabled>
          <LocationOnIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default AddressTemplate;
