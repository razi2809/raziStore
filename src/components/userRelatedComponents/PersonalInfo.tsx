import React, { FC, useState } from "react";
import { Iuser } from "../../@types/user";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { IBusiness } from "../../@types/business";
import { IOrderData } from "../../@types/order";
import { storage } from "../../config/fireBase";
import notify from "../../services/toastService";
import sendData from "../../hooks/useSendData";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../REDUX/bigPie";
import { authActions } from "../../REDUX/authSlice";
import UserLikedPlacesComponents from "../businessRelatedComponents/UserLikedPlaces";
import OrderComponents from "../orderRelatedComponents/OrderComponents";

interface Props {
  user: Iuser;
  userLikedPlaces: IBusiness[] | null;
  orderHistory: IOrderData[] | null;
}
const PersonalInfo: FC<Props> = ({ user, userLikedPlaces, orderHistory }) => {
  const [img, setImg] = useState<null | File>(null);
  const [loading, setLoading] = React.useState(false);
  const myUser = useAppSelector((bigPie) => bigPie.authReducer.user);
  const [url, setUrl] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [successUpload, setSuccessUpload] = useState(false);
  const handleSetPic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.files) {
      setImg(inputElement.files[0]);
      handleImageUpload(inputElement.files[0]);
    } else {
      setImg(null);
    }
  };
  const handleImageUpload = async (selectedImage: File) => {
    setLoading(true);
    const hideLoading = notify.loading("Uploading image...");
    try {
      const uploadTask = storage
        .ref(`images/${selectedImage.name}`)
        .put(selectedImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          hideLoading();
          notify.error(error.message);
          setLoading(false);
        },
        async () => {
          const downloadURL = await storage
            .ref("images")
            .child(selectedImage.name)
            .getDownloadURL();
          await sendPictureToServer(downloadURL, hideLoading);
        }
      );
    } catch (error) {
      // Handle any additional errors
      hideLoading();
      notify.error("An unknown error occurred");
      setLoading(false);
    }
  };
  const sendPictureToServer = async (url: string, hideLoading: () => void) => {
    try {
      const res = await sendData({
        url: `users/image/${user._id}`,
        method: "patch",
        data: { image: url },
      });
      if (user._id === myUser?._id) {
        dispatch(
          authActions.editTemperarlyPic({
            url,
          })
        );
      }
      hideLoading();
      setSuccessUpload(true);
      setLoading(false);
      setUrl(url);
      notify.success(res.message);
    } catch (e) {
      setLoading(false);
      hideLoading();
      if (e instanceof AxiosError) {
        notify.error(e.response?.data.message);
      } else {
        notify.error("An unknown error occurred");
      }
    }
  };

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
                src={successUpload ? url! : user.image.url}
                alt={user.image.alt || "User Profile Picture"}
              />
              {loading && (
                <CircularProgress
                  size={90}
                  sx={{
                    color: "secondary.main",
                    position: "absolute",
                    top: -7,
                    left: -7,
                    zIndex: 1,
                  }}
                />
              )}
              <Box
                sx={{
                  position: "absolute",
                  width: "115%",
                  height: "115%",
                  borderRadius: 50,
                  bgcolor: "white",
                  zIndex: 0,
                }}
              ></Box>
            </Box>{" "}
            <label htmlFor={!loading ? "file-input" : undefined}>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                component="span"
                disabled={loading}
              >
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
        <UserLikedPlacesComponents userLikedPlaces={userLikedPlaces} />
        <OrderComponents ordersdata={orderHistory} />
      </Box>
    </Grid>
  );
};

export default PersonalInfo;
