import React, { useState } from "react";
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
import GoogleMapToEdit from "../../layout/layoutRelatedComponents/maps/GoogleMapEdit";
import { ILocation } from "../../@types/inputs";
import { addAdressNormalized } from "../../normalizedData/userTypesData/addAddress";
import { authActions } from "../../REDUX/authSlice";
import { AxiosError } from "axios";
import notify from "../../services/toastService";

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

      notify.success(res.message);
      dispatch(authActions.addTemperarlyAddress(temoprarlyAddress));
    } catch (e) {
      if (e instanceof AxiosError) {
        notify.error(e.response?.data.message);
      } else {
        notify.error("An unknown error occurred");
      }
    }
  };
  return (
    <>
      <Card
        sx={{
          width: "30em",
          display: "flex",
          flexDirection: "column",
          zIndex: 2000,
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
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
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
            <Box sx={{ height: "20em" }}>
              <GoogleMapToEdit
                theme={user.user ? user.user?.theme : "light"}
                getLocation={locationChange}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{ textAlign: "start", b: 3 }}
            ></Typography>
          </Box>{" "}
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
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
              <Box sx={{ flexGrow: 1 }}>Add address</Box>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default AddAnAddress;
