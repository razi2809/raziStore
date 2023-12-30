import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import { ErrorObj, IResetPasswordInputs } from "../../@types/global";

import { validateEmail } from "../../validation/validationSchema/emailScema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validateResetPassword } from "../../validation/validationSchema/resetPasswordSchema";
import axios from "axios";

const ResetPasswordPage = () => {
  const [inputs, setInputs] = useState<IResetPasswordInputs>({
    email: "",
    passwordResetCode: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfiremedPassword, setShowConfiremedPassword] = useState(false);
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [sendRequest, setSendRequest] = useState(false);
  const [display, setIsdisplay] = useState(false);
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
    if (!sendRequest) {
      const joiResponse = validateEmail({ email: updatedInputs.email });
      setErrorsState(joiResponse);
      setSeconrychance(true);
    }
    if (secondtrychance && sendRequest) {
      const joiResponse = validateResetPassword(updatedInputs);

      setErrorsState(joiResponse);
    }
    if (e.target.id === "passwordConfirmation") {
      const joiResponse = validateResetPassword(updatedInputs);
      setSeconrychance(true);
      setErrorsState(joiResponse);
    }
  };
  const handleReset = () => {
    try {
      const data = {
        password: inputs.password,
        passwordConfirmation: inputs.passwordConfirmation,
      };
      axios
        .post(
          `users/resetPassword/${inputs.email}/${inputs.passwordResetCode}`,
          data
        )
        .then(function (res) {
          console.log(res);
        })
        .catch(function (e) {
          console.log(e);
          // the request failed(from server)
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = inputs.email;

      axios
        .post(`/users/forgotpassword`, { email: data })
        .then(function (res) {
          setSendRequest(true);
          setSeconrychance(false);
          setTimeout(() => {
            setIsdisplay(true);
          }, 500);
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
        onSubmit={(e) => handleRequest(e)}
        sx={{ marginTop: 4, marginBottom: 14 }}
      >
        <Grid container sx={{ mt: 0 }}>
          <Grid container item md={2} sm={2} xs={1}></Grid>
          <Grid
            container
            item
            md={8}
            sm={8}
            xs={10}
            sx={{
              marginTop: 8,
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
                reset password
              </Typography>
            </Grid>
            <Grid item spacing={2} xs={12} container>
              <Grid item spacing={2} xs={12} container>
                <Grid
                  container
                  item
                  md={sendRequest ? 6 : 12}
                  sm={sendRequest ? 6 : 12}
                  xs={12}
                  sx={{
                    transition: "all 0.5s ease-out",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: sendRequest ? "flex-end" : "center",
                  }}
                >
                  {errorsState && errorsState["email"] && (
                    <Alert
                      variant="filled"
                      severity="warning"
                      sx={{
                        height: "4em",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      *{errorsState["email"]}
                    </Alert>
                  )}

                  <TextField
                    fullWidth
                    autoFocus
                    disabled={sendRequest}
                    id={"email"}
                    label={"email".charAt(0).toUpperCase() + "email".slice(1)}
                    placeholder={`Enter your email`}
                    value={inputs.email}
                    onChange={(e) => handleInputsChange(e)}
                    sx={{ mt: 1 }}
                  />
                </Grid>
                <CSSTransition
                  in={display}
                  timeout={500}
                  classNames="resetCode"
                  unmountOnExit
                >
                  <Grid
                    container
                    item
                    md={6}
                    sm={6}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    {errorsState && errorsState["passwordResetCode"] && (
                      <Alert
                        variant="filled"
                        severity="warning"
                        sx={{
                          height: "4em",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {errorsState["passwordResetCode"]}
                      </Alert>
                    )}
                    <TextField
                      fullWidth
                      autoFocus
                      id={"passwordResetCode"}
                      label={
                        "password reset code".charAt(0).toUpperCase() +
                        "password reset code".slice(1)
                      }
                      placeholder={`Enter your code`}
                      value={inputs.passwordResetCode}
                      onChange={(e) => handleInputsChange(e)}
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                </CSSTransition>
              </Grid>
              <Grid
                item
                spacing={2}
                xs={12}
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <CSSTransition
                  in={display}
                  timeout={500}
                  classNames="resetCode"
                  unmountOnExit
                >
                  <Grid container item md={6} sm={6} xs={12}>
                    {errorsState && errorsState["password"] && (
                      <Alert
                        variant="filled"
                        severity="warning"
                        sx={{
                          height: "4em",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        * {errorsState["password"]}
                      </Alert>
                    )}
                    <TextField
                      fullWidth
                      autoFocus
                      id={"password"}
                      label={
                        "password".charAt(0).toUpperCase() + "password".slice(1)
                      }
                      type={showPassword ? "text" : "password"}
                      placeholder={`Enter your password`}
                      value={inputs.password}
                      onChange={(e) => handleInputsChange(e)}
                      sx={{ mt: 1 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </CSSTransition>{" "}
                <CSSTransition
                  in={display}
                  timeout={500}
                  classNames="resetCode"
                  unmountOnExit
                >
                  <Grid
                    container
                    item
                    md={6}
                    sm={6}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    {errorsState && errorsState["passwordConfirmation"] && (
                      <Alert
                        variant="filled"
                        severity="warning"
                        sx={{
                          height: "4em",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        * {errorsState["passwordConfirmation"]}
                      </Alert>
                    )}
                    <TextField
                      fullWidth
                      autoFocus
                      sx={{ mt: 1 }}
                      id={"passwordConfirmation"}
                      label={
                        "passwordConfirmation".charAt(0).toUpperCase() +
                        "passwordConfirmation".slice(1)
                      }
                      placeholder={`Enter your passwor `}
                      value={inputs.passwordConfirmation}
                      onChange={(e) => handleInputsChange(e)}
                      type={showConfiremedPassword ? "text" : "password"}
                      InputProps={{
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
                      }}
                    />
                  </Grid>
                </CSSTransition>
              </Grid>
            </Grid>
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
                mb: 1,
                mt: 2,
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
            {!sendRequest && (
              <Button
                type="submit"
                fullWidth
                disabled={
                  errorsState !== null ? true : secondtrychance ? false : true
                }
                variant="contained"
                sx={{ mt: 2 }}
              >
                send reset code
              </Button>
            )}
            {sendRequest && (
              <Button
                fullWidth
                disabled={
                  errorsState !== null ? true : secondtrychance ? false : true
                }
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleReset}
              >
                reset password
              </Button>
            )}
          </Grid>{" "}
          <Grid container item md={2} sm={2} xs={1}></Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ResetPasswordPage;
