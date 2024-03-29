import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { Fragment, useState } from "react";
import {
  ErrorObj,
  ICreatebusinessInputs,
  ILocation,
} from "../../@types/generic";
import { storage } from "../../config/fireBase";
import { useNavigate } from "react-router-dom";
import GoogleMapToEdit from "../../layout/layoutRelatedComponents/maps/GoogleMapEdit";
import sendData from "../../hooks/useSendData";
import { IOpeningHours } from "../../@types/business";
import { validateRegisterBusiness } from "../../validation/validationSchema/businessScema/createBusinessScema";
import { normalCreateBusiness } from "../../normalizedData/businessTypesData/CreateBusiness";
import OpeningHoursToEdit from "../../components/businessRelatedComponents/OpeningHoursToEdit";
import UploadPicComponent from "../../components/genericComponents/UploadPicComponent";
import { ROUTER } from "../../Router/ROUTER";
import notify from "../../services/toastService";
import { AxiosError } from "axios";
const defaultAvatarUrl =
  "https://img.freepik.com/premium-vector/abstract-logo-company-made-with-color_341269-925.jpg";
const CreateBusiness = () => {
  const navigate = useNavigate();
  const openingHours = {
    Sunday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Monday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Tuesday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Wednesday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Thursday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Friday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Saturday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
  };
  const [inputs, setInputs] = useState<ICreatebusinessInputs>({
    businessName: "",
    email: "",
    businessPhoneNumber: "",
    businessDescription: "",
    city: "",
    street: "",
    buildingNumber: NaN,
    alt: "",
    url: defaultAvatarUrl,
    OpeningHours: openingHours,
  });
  const requierd = [
    "businessName",
    "email",
    "businessPhoneNumber",
    "businessDescription",
  ];
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [editTimes, SetEditTimes] = useState(false);
  const [didHeEditTimes, SetDidHeEditTimes] = useState(false);
  const [img, setImg] = useState<null | File>(null);
  const [secondtrychance, setSeconrychance] = useState(false);
  const handleSetPic = (file: File) => {
    if (file) {
      setImg(file);
    } else {
      setImg(null);
    }
  };
  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((currentState) => ({
      //update the state  values
      ...currentState,
      [e.target.id]: e.target.value,
    }));
    const updatedInputs = {
      ...inputs,
      [e.target.id]: e.target.value,
    };

    if (secondtrychance || e.target.id === "businessDescription") {
      // Validate using the new inputs
      const joiResponse = validateRegisterBusiness(updatedInputs);
      setErrorsState(joiResponse);

      if (e.target.id === "businessDescription") {
        setSeconrychance(true);
      }
    }
  };
  const getTimes = (openingHours: IOpeningHours) => {
    setInputs((currunetState) => ({
      ...currunetState,
      OpeningHours: openingHours,
    }));
    SetDidHeEditTimes(true);
  };
  const handleLocationChange = (location: ILocation) => {
    Object.entries(location).map(([key, value]) => {
      setInputs((currentState) => ({
        //update the state  values
        ...currentState,
        [key]: value,
      }));
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (img) {
        //there is image then upload it to fire base
        //and then sent to server
        const upload = storage.ref(`images/${img.name}`).put(img);
        upload.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(img.name)
              .getDownloadURL()
              .then(async (url) => {
                inputs.url = url;
                registerBusiness(inputs);
              });
          }
        );
      }
      //there is no image that he wish to upload so jest send to server
      if (!img) {
        inputs.url = defaultAvatarUrl;
        registerBusiness(inputs);
      }
    } catch (e) {
      //register have failed
      console.log(e);
    }
  };
  const registerBusiness = async (inputs: ICreatebusinessInputs) => {
    //set up the inputs ready to send to the server
    const hideLoading = notify.loading("creating business...");

    try {
      const data = normalCreateBusiness(inputs);
      const res = await sendData({
        url: "/business/newBussiness",
        data: data,
        method: "post",
      });
      hideLoading();
      notify.success(res.message);
      navigate(`${ROUTER.HOME}}`);
    } catch (e) {
      hideLoading();
      if (e instanceof AxiosError) {
        notify.error(e.message);
      } else {
        notify.error("An unknown error occurred");
      }
    }
  };
  return (
    <Grid>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        sx={{ p: 5, width: "100%" }}
      >
        <Grid container sx={{ mt: 0 }}>
          <Grid container item md={2} sm={1} xs={1}></Grid>
          <Grid
            container
            item
            md={8}
            sm={10}
            xs={12}
            sx={{
              display: "flex",
              bgcolor: "divider",
              boxShadow: 3,
              borderRadius: 2,
              py: 4,
              px: { xs: 1, sm: 4, md: 8 },
            }}
          >
            {" "}
            <Grid
              container
              item
              spacing={2}
              xs={12}
              sm={12}
              md={12}
              sx={{
                justifyContent: "center",
                alignContent: "center",
                mb: 3,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  display: "flex",
                  alignSelf: "center",
                  color: "text.primary",
                }}
              >
                new business
              </Typography>
            </Grid>
            {Object.entries(inputs).map(([key, value]) => {
              const error = errorsState ? errorsState[key] || null : null;
              return (
                key !== "url" &&
                key !== "city" &&
                key !== "street" &&
                key !== "buildingNumber" &&
                key !== "alt" &&
                key !== "OpeningHours" && (
                  <Fragment key={key}>
                    <Grid
                      container
                      item
                      spacing={2}
                      xs={12}
                      sm={5}
                      md={5}
                      sx={{ pb: "1em", m: "auto", mb: "0px" }}
                    >
                      {error && (
                        <Typography
                          variant="body2"
                          sx={{ mb: 0.5, color: "red" }}
                        >
                          *{error}
                        </Typography>
                      )}

                      <TextField
                        fullWidth
                        name={key}
                        autoFocus={key === "firstName" ? true : false}
                        id={key}
                        required={requierd.includes(key)}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        placeholder={
                          key === "businessPhoneNumber"
                            ? "enter phone number"
                            : key === "alt"
                            ? "decrib the pic"
                            : key === "businessDescription"
                            ? "describe the business"
                            : `Enter your ${key}`
                        }
                        value={Number.isNaN(value) ? "" : value}
                        onChange={(e) => handleInputsChange(e)}
                      />
                    </Grid>
                  </Fragment>
                )
              );
            })}
            <Grid container>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                sx={{
                  justifyContent: "center",
                  height: "18.5em",
                }}
              >
                <Box sx={{ p: 1, width: "100%", height: "100%" }}>
                  <GoogleMapToEdit
                    getLocation={handleLocationChange}
                    theme={"light"}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "16.5em",
                  alignContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", textAlign: "center" }}
                >
                  business pic:
                </Typography>

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

                <Box sx={{ width: "100%", height: "3em" }}>
                  <TextField
                    id="alt"
                    fullWidth
                    placeholder="decrib the pic"
                    value={inputs.alt}
                    onChange={(e) => handleInputsChange(e)}
                    inputProps={{ style: { padding: 7 } }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                justifyContent: "center",
                mb: 1,
              }}
            >
              <Box sx={{ width: "100%", p: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => SetEditTimes(true)}
                  disabled={editTimes || didHeEditTimes}
                >
                  set business opening times
                </Button>
                {editTimes && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: "fixed",
                      overflowY: "auto",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      zIndex: 99,
                    }}
                    onClick={() => SetEditTimes(false)}
                  >
                    <OpeningHoursToEdit getTimes={getTimes} />
                  </motion.div>
                )}
              </Box>
            </Grid>
            {(errorsState !== null
              ? true
              : secondtrychance && didHeEditTimes
              ? false
              : true) && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                }}
              >
                <Typography variant="body2" sx={{ color: "red" }}>
                  * if you dont fill up the inputs you cant create new business
                </Typography>
              </Box>
            )}
            <Button
              type="submit"
              fullWidth
              disabled={
                errorsState !== null
                  ? true
                  : secondtrychance && didHeEditTimes
                  ? false
                  : true
              }
              variant="contained"
            >
              create new business
            </Button>
          </Grid>{" "}
          <Grid container item md={2} sm={1} xs={1}>
            {" "}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default CreateBusiness;
