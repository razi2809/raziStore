import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import React, { Fragment, useState } from "react";
import { ErrorObj, ILocation, IRegiserInputs } from "../../@types/global";
import { validateRegister } from "../../validation/validationSchema/registerSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { storage } from "../../config/fireBase";
import { normalRegister } from "../../normalizedData/registerFormat";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleMapToEdit from "../../layout/layoutRelatedComponents/GoogleMapEdit";
const defaultAvatarUrl =
  "https://firebasestorage.googleapis.com/v0/b/social-media-27267.appspot.com/o/images%2FavatarDefaulPic.png?alt=media&token=1ca6c08e-505f-465b-bcd9-3d47c9b1c28f";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<IRegiserInputs>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
    city: "",
    street: "",
    buildingNumber: NaN,
    alt: "",
    url: defaultAvatarUrl,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfiremedPassword, setShowConfiremedPassword] = useState(false);
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [img, setImg] = useState<null | File>(null);
  const [secondtrychance, setSeconrychance] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [upload, setUpload] = useState(false);

  const handleSetPic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      setImg(inputElement.files[0]);
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
    if (secondtrychance) {
      //when its his second try and we gave him the warning then
      //alert him if its still have an error or if its not
      const joiResponse = validateRegister(updatedInputs);
      setErrorsState(joiResponse);
    }
    if (e.target.id === "passwordConfirmation") {
      //check if its the lest input and want to regisert
      //sende the inpunts to the joi validate
      //if error from joi then set them and trigerr a alert for each input
      //if the joi dosent have value it empty so let the user hit submit
      const joiResponse = validateRegister(updatedInputs);
      setErrorsState(joiResponse);
      setSeconrychance(true);
    }
  };
  const handleLocationChange = (location: ILocation) => {
    let updatedInputs = { ...inputs };
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
          (snapshot) => {
            setUpload(true);
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            if (progress === 100) {
              setProgress(100);
              setBuffer(10);
            } else {
              setProgress(progress);
              setBuffer(progress + 10);
            }
          },
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
                sendData(inputs);
              });
          }
        );
      }
      //there is no image that he wish to upload so jest send to server
      if (!img) {
        inputs.url = defaultAvatarUrl;
        sendData(inputs);
      }
    } catch (e) {
      //register have failed
      console.log(e);
    }
  };
  const sendData = (inputs: IRegiserInputs) => {
    //set up the inputs ready to send to the server
    inputs.buildingNumber = Number(inputs.buildingNumber);
    try {
      const data = normalRegister(inputs);
      axios
        .post("/users/register", data)
        .then(function (res) {
          //user created go to verifiey it
          navigate(`/verify/${inputs.email}`);
        })
        .catch(function (e) {
          console.log(e);
          // the request failed(from server)
        });
    } catch (e) {
      // the request failed(not from server)
    }
  };
  return (
    <Grid>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        sx={{ marginTop: 4, marginBottom: 4 }}
      >
        <Grid container sx={{ mt: 0 }}>
          <Grid container item md={3} sm={2} xs={1}></Grid>
          <Grid
            container
            item
            md={6}
            sm={8}
            xs={10}
            sx={{
              // marginTop: 8,
              display: "flex",
              bgcolor: "divider",
              boxShadow: 3,
              borderRadius: 2,
              py: 4,
              px: { xs: 5, sm: 4, md: 8 },
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
                register
              </Typography>
            </Grid>
            {Object.entries(inputs).map(([key, value]) => {
              const error = errorsState ? errorsState[key] || null : null;
              return (
                key !== "url" &&
                key !== "city" &&
                key !== "street" &&
                key !== "buildingNumber" &&
                key !== "alt" && (
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
                      {error && key !== "url" && (
                        <Typography
                          variant="body2"
                          sx={{ mb: 0.5, color: "red" }}
                        >
                          *{error}
                        </Typography>
                      )}

                      <TextField
                        fullWidth
                        autoFocus={key === "firstName" ? true : false}
                        id={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        placeholder={
                          key === "passwordConfirmation"
                            ? "confirm password"
                            : key === "alt"
                            ? "decrib the pic"
                            : `Enter your ${key}`
                        }
                        value={Number.isNaN(value) ? "" : value}
                        onChange={(e) => handleInputsChange(e)}
                        type={
                          key === "password"
                            ? showPassword
                              ? "text"
                              : "password"
                            : key === "passwordConfirmation"
                            ? showConfiremedPassword
                              ? "text"
                              : "password"
                            : key
                        }
                        InputProps={
                          key === "password"
                            ? {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                    >
                                      {showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }
                            : key === "passwordConfirmation"
                            ? {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() =>
                                        setShowConfiremedPassword(
                                          !showConfiremedPassword
                                        )
                                      }
                                    >
                                      {showConfiremedPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }
                            : {}
                        }
                      />
                    </Grid>
                  </Fragment>
                )
              );
            })}{" "}
            <Grid
              container
              item
              spacing={2}
              xs={12}
              sm={12}
              md={12}
              sx={{
                marginTop: 2,
                justifyContent: "center",
                mb: 2,
                // flexDirection: "column",
              }}
            >
              <Box sx={{ p: 1 }}>
                <GoogleMapToEdit
                  getLocation={handleLocationChange}
                  theme={"light"}
                />
              </Box>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "text.primary" }}>
                  user profile pic:
                </Typography>
                <label htmlFor="file-input">
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      cursor: "pointer",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    alt="user pic"
                    src={img ? URL.createObjectURL(img) : defaultAvatarUrl}
                  />{" "}
                  <input
                    id="file-input"
                    style={{ display: "none" }}
                    className="file-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSetPic(e)}
                  />
                </label>{" "}
                <Box sx={{ width: 200, height: "3em" }}>
                  <TextField
                    id="alt"
                    // label={"alt".charAt(0).toUpperCase() + "alt".slice(1)}
                    placeholder="decrib the pic"
                    value={inputs.alt}
                    onChange={(e) => handleInputsChange(e)}
                    inputProps={{ style: { padding: 7 } }}
                  />
                </Box>
              </Box>

              {(errorsState !== null
                ? true
                : secondtrychance
                ? false
                : true) && (
                <Typography
                  variant="body2"
                  sx={{ color: "text.primary", mt: 1 }}
                >
                  * if you dont fill up the inputs you cant register
                </Typography>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              disabled={
                errorsState !== null ? true : secondtrychance ? false : true
              }
              variant="contained"
            >
              regiser{" "}
            </Button>
          </Grid>{" "}
          <Grid container item md={3} sm={2} xs={1}>
            {" "}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default RegisterPage;
