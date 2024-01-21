import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import notify from "../../services/toastService";
import type { changeType } from "../../@types/generic";
import UploadPicComponent from "./UploadPicComponent";
import { storage } from "../../config/fireBase";
// import { validateBusinessDescrptionChange } from "../../../validation/validationSchema/businessScema/businessDescriptionChangeSchema";
interface Props {
  // business: IBusiness;
  updateCallBack: <T>(name: changeType, data: T) => void;
}
const ChangeImage: FC<Props> = ({ updateCallBack }) => {
  const [img, setImg] = useState<null | File>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation();
    }
  };
  const handleSetPic = (file: File) => {
    if (file) {
      setImg(file);
    } else {
      setImg(null);
    }
  };
  const handleSubmit = () => {
    try {
      if (img) {
        //there is image then upload it to fire base
        const hideLoading = notify.loading("Uploading image...");

        const upload = storage.ref(`images/${img.name}`).put(img);
        upload.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            notify.error(error.message);
          },
          () => {
            storage
              .ref("images")
              .child(img.name)
              .getDownloadURL()
              .then(async (url) => {
                await updateCallBack("image", url);
                hideLoading();
              });
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          zIndex: 2000,
          position: "relative",
        }}
        onClick={handleClick}
      >
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
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h3"
              color="text.primary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              change image
            </Typography>
          </Box>{" "}
          <Box sx={{ width: "100%", height: "10em", mb: 1 }}>
            {!img && <UploadPicComponent onFileSelect={handleSetPic} />}
            {img && (
              <Card sx={{ width: "100%", height: "10em" }}>
                <CardMedia
                  sx={{ height: "200px" }}
                  component="img"
                  alt="business pic"
                  src={URL.createObjectURL(img)}
                />
              </Card>
            )}
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              mt: 1,
            }}
          >
            <Button
              variant="contained"
              disabled={false}
              color="primary"
              size="large"
              sx={{
                textTransform: "none",
                fontSize: 16,
                flexGrow: 1,
                display: "flex",
              }}
              onClick={() => handleSubmit()}
            >
              <Box sx={{ flexGrow: 1 }}>change image</Box>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ChangeImage;
