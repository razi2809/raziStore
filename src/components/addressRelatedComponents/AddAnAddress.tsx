import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../REDUX/bigPie";
import ClearIcon from "@mui/icons-material/Clear";
import sendData from "../../hooks/useSendData";
import animationData from "../../svg/locationSvg.json";
import Lottie from "react-lottie";
import GoogleMapToEdit from "../../layout/layoutRelatedComponents/maps/GoogleMapEdit";
import { ILocation } from "../../@types/inputs";
import { addAdressNormalized } from "../../normalizedData/userTypesData/addAddress";
import { authActions } from "../../REDUX/authSlice";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const AddAnAddress = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((bigPie) => bigPie.authReducer);
  const [addressName, setAddressName] = useState("");
  const [address, SetAddress] = useState<ILocation | null>(null);
  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation();
    }
  };
  const locationChange = (location: ILocation) => {
    SetAddress(location);
  };
  const addAddress = async () => {
    if (!address) return;
    const data = addAdressNormalized(address, addressName);
    try {
      const res = await sendData({
        url: "/users/address/addNew",
        data: data,
        method: "patch",
      });
      const temoprarlyAddress = {
        ...data.address,
        id: 1,
      };
      dispatch(authActions.addTemoprarlyAddress(temoprarlyAddress));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Card
        sx={{
          width: "30em",
          display: "flex",
          flexDirection: "column",
          zIndex: 2000, // Add this line
          position: "relative",
        }}
        onClick={handleClick}
      >
        <Box
          sx={{
            position: "absolute",
            right: 0,
            p: 1,
          }}
        >
          <Fab sx={{ width: 35, height: 10 }}>
            <ClearIcon />
          </Fab>
        </Box>
        <CardContent
          sx={{
            bgcolor: "secondary.main",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            // mt: 2,
            p: 3,
          }}
          onClick={handleClick}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" color="text.primary">
              add new address
            </Typography>
            <TextField
              id="addressName"
              name="addressName"
              label="Address Name"
              placeholder="what is the name of the address"
              value={addressName}
              onChange={(e) => setAddressName(e.target.value)}
              sx={{ mb: 1 }}
            />
            <GoogleMapToEdit
              theme={user.user ? user.user?.theme : "light"}
              getLocation={locationChange}
            />
            <Lottie options={defaultOptions} height={400} width={400} />
            <Typography variant="h5" sx={{ textAlign: "start", b: 3 }}>
              {/* {product.description} */}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              // height: "70%",
              mt: 1,
            }}
          >
            <Button
              variant="contained"
              disabled={!addressName || !address}
              color="primary"
              size="large"
              sx={{
                textTransform: "none",
                fontSize: 16,
                flexGrow: 1,
                display: "flex",
              }}
              onClick={() => addAddress()}
            >
              <Box sx={{ flexGrow: 1 }}>Add to Cart</Box>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default AddAnAddress;
