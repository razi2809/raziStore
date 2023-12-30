import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { Fragment, useState } from "react";
import { ErrorObj, ILoginInputs } from "../../@types/global";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../validation/validationSchema/loginSchema";
import { storeToken } from "../../services/tokenService";
import useAutoLogin from "../../hooks/useAutoLogin";
import { Link } from "react-router-dom";
import { ROUTER } from "../../Router/ROUTER";
import { text } from "stream/consumers";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const LoginPage = () => {
  const [inputs, setInputs] = useState<ILoginInputs>({
    email: "",
    password: "",
  });
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [rememberMe, setrememberMe] = useState(false);
  const [secondtrychance, setSeconrychance] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = useAutoLogin();

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
      const joiResponse = validateLogin(updatedInputs);
      setErrorsState(joiResponse);
    }
    if (e.target.id === "password") {
      //check if its the lest input and want to regisert
      //sende the inpunts to the joi validate
      //if error from joi then set them and trigerr a alert for each input
      //if the joi dosent have value it empty so let the user hit submit
      const joiResponse = validateLogin(updatedInputs);
      setErrorsState(joiResponse);
      setSeconrychance(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios
        .post(`/auth/login`, inputs)
        .then(function (res) {
          login();
          storeToken(res.data.token, secondtrychance);
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
        sx={{ marginTop: 4, marginBottom: 14 }}
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
                log in
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
                    sx={{ m: "auto", mb: 1 }}
                  >
                    {error && key != "url" && (
                      <Typography
                        variant="body2"
                        sx={{ mb: 0.5, color: "red" }}
                      >
                        *{error}
                      </Typography>
                    )}

                    <TextField
                      fullWidth
                      autoFocus={key === "email" ? true : false}
                      id={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      placeholder={`Enter your ${key}`}
                      value={Number.isNaN(value) ? "" : value}
                      onChange={(e) => handleInputsChange(e)}
                      type={
                        key === "password"
                          ? showPassword
                            ? "text"
                            : "password"
                          : "text"
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
                          : {}
                      }
                    />
                  </Grid>
                </Fragment>
              );
            })}{" "}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                mb: 2,
              }}
            >
              <Checkbox
                checked={rememberMe}
                onChange={() => setrememberMe(!rememberMe)}
              />
              <Typography variant="body2">
                do you want to stay loogin
              </Typography>
            </Box>
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
                flexDirection: "column",
              }}
            >
              {(errorsState !== null
                ? true
                : secondtrychance
                ? false
                : true) && (
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  * if you dont fill up the inputs you cant log in
                </Typography>
              )}
            </Grid>
            <Box sx={{ mb: 1 }}>
              <Link
                to={ROUTER.PASSWORDRESET}
                style={{ textDecoration: "none" }}
              >
                forgot password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              disabled={
                errorsState !== null ? true : secondtrychance ? false : true
              }
              variant="contained"
            >
              login{" "}
            </Button>
          </Grid>{" "}
          <Grid container item md={3} sm={2} xs={1}></Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default LoginPage;
