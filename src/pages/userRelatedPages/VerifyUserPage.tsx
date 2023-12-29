import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { Fragment, useState } from "react";
import { ErrorObj, IVerifyInputs } from "../../@types/global";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { validateVerify } from "../../validation/validationSchema/verifyUserSchema";
const VerifyUserPage = () => {
  const navigate = useNavigate();
  let { email } = useParams();
  const [inputs, setInputs] = useState<IVerifyInputs>({
    email: email!,
    verificationCode: "",
  });
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [secondtrychance, setSeconrychance] = useState(false);

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
      const joiResponse = validateVerify(updatedInputs);
      setErrorsState(joiResponse);
    }
    if (e.target.id === "verificationCode") {
      //check if its the lest input and want to regisert
      //sende the inpunts to the joi validate
      //if error from joi then set them and trigerr a alert for each input
      //if the joi dosent have value it empty so let the user hit submit
      const joiResponse = validateVerify(updatedInputs);
      setErrorsState(joiResponse);
      setSeconrychance(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios
        .post(`/users/verify/${inputs.email}/${inputs.verificationCode}`)
        .then(function (res) {
          //user created go to verifiey it
          navigate(`/verify/${inputs.email}`);
        })
        .catch(function (e) {
          console.log(e);
          // the request failed(from server)
        });
    } catch (e) {
      //register have failed
      console.log(e);
    }
  };
  return (
    <Grid>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        sx={{ m: 25 }}
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
                verify user
              </Typography>
            </Grid>
            {Object.entries(inputs).map(([key, value]) => {
              const error = errorsState ? errorsState[key] || null : null;
              return (
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
                      disabled={key === "email" ? true : false}
                      autoFocus={key === "verificationCode" ? true : false}
                      id={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      placeholder={
                        key === "verificationCode"
                          ? "Entr your code"
                          : `Enter your ${key}`
                      }
                      value={Number.isNaN(value) ? "" : value}
                      onChange={(e) => handleInputsChange(e)}
                    />
                  </Grid>
                </Fragment>
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
                justifyContent: "center",
                alignContent: "center",
                mb: 2,
                flexDirection: "column",
              }}
            >
              {(errorsState !== null
                ? true
                : secondtrychance
                ? false
                : true) && (
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  * if you dont fill up the inputs you cant be verified
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
              verify{" "}
            </Button>
          </Grid>{" "}
          <Grid container item md={3} sm={2} xs={1}></Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default VerifyUserPage;
