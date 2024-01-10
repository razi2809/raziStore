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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { Fragment, useState } from "react";
import {
  ErrorObj,
  ILocation,
  IProductInputs,
  IRegiserInputs,
} from "../../@types/inputs";
import { storage } from "../../config/fireBase";
import { normalRegister } from "../../normalizedData/userTypesData/registerFormat";
import { useNavigate, useParams } from "react-router-dom";
import sendData from "../../hooks/useSendData";
import { validateNewProduct } from "../../validation/validationSchema/productScema/createNewProduct";
import { newProductNormalized } from "../../normalizedData/productTypeData/newProduct";
const defaultAvatarUrl =
  "https://firebasestorage.googleapis.com/v0/b/social-media-27267.appspot.com/o/images%2FavatarDefaulPic.png?alt=media&token=1ca6c08e-505f-465b-bcd9-3d47c9b1c28f";
const AddNewProduct = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<IProductInputs>({
    productName: "",
    description: "",
    price: NaN,
    productQuantity: NaN,
    categoryOne: "",
    categoryTwo: "",
    categoryThree: "",
    categoryFour: "",
    alt: "",
    url: defaultAvatarUrl,
  });
  const requierd = [
    "productName",
    "description",
    "price",
    "productQuantity",
    "categoryOne",
  ];
  const [dontShow, setDontShow] = useState(true);
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [img, setImg] = useState<null | File>(null);
  const [secondtrychance, setSeconrychance] = useState(false);
  const { BusinessId } = useParams();

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
      const joiResponse = validateNewProduct(updatedInputs);
      setErrorsState(joiResponse);
    }
    if (e.target.id === "categoryOne") {
      //check if its the lest input and want to regisert
      //sende the inpunts to the joi validate
      //if error from joi then set them and trigerr a alert for each input
      //if the joi dosent have value it empty so let the user hit submit
      const joiResponse = validateNewProduct(updatedInputs);
      setErrorsState(joiResponse);
      setSeconrychance(true);
    }
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
                createProduct(inputs);
              });
          }
        );
      }
      //there is no image that he wish to upload so jest send to server
      if (!img) {
        inputs.url = defaultAvatarUrl;
        createProduct(inputs);
      }
    } catch (e) {
      //createProduct have failed
      console.log(e);
    }
  };
  const createProduct = async (inputs: IProductInputs) => {
    //set up the inputs ready to send to the server
    try {
      const data = newProductNormalized(inputs);
      const res = await sendData({
        url: `/product/newProduct/${BusinessId}`,
        data: data,
        method: "post",
      });
      console.log(res);

      //user created go to verifiey it
      //   navigate(`/verify/${inputs.email}`);
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
        sx={{ p: 1, pt: 5 }}
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
                register
              </Typography>
            </Grid>
            {Object.entries(inputs).map(([key, value]) => {
              const error = errorsState ? errorsState[key] || null : null;
              return (
                key !== "url" &&
                key !== "alt" &&
                (key === "categoryThree" ? (dontShow ? false : true) : true) &&
                (key === "categoryFour" ? (dontShow ? false : true) : true) && (
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
                        autoFocus={key === "productName" ? true : false}
                        id={key}
                        required={requierd.includes(key)}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        placeholder={
                          key === "alt" ? "decrib the pic" : `Enter your ${key}`
                        }
                        value={Number.isNaN(value) ? "" : value}
                        onChange={(e) => handleInputsChange(e)}
                      />
                    </Grid>
                  </Fragment>
                )
              );
            })}
            {dontShow && (
              <Grid container item xs={12} sx={{ pl: 2 }}>
                <Button variant="contained" onClick={() => setDontShow(false)}>
                  add categories
                </Button>
              </Grid>
            )}
            <Grid container spacing={4}>
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
                    product pic:
                  </Typography>
                  <label htmlFor="file-input">
                    <Card sx={{ width: "100%", height: "10em" }}>
                      <CardMedia
                        sx={{ height: "200px" }}
                        component="img"
                        alt="business pic"
                        src={img ? URL.createObjectURL(img) : defaultAvatarUrl}
                      />
                    </Card>

                    <input
                      id="file-input"
                      style={{ display: "none" }}
                      className="file-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSetPic(e)}
                    />
                  </label>{" "}
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
            </Grid>
            {(errorsState !== null ? true : secondtrychance ? false : true) && (
              <Typography variant="body2" sx={{ color: "red", mt: 1 }}>
                * if you dont fill up the inputs you cant register
              </Typography>
            )}
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

export default AddNewProduct;
