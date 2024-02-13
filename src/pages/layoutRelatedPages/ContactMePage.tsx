import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { Fragment, useState } from "react";
import { ErrorObj, IContactInputs } from "../../@types/generic";
import sendData from "../../hooks/useSendData";
import { AxiosError } from "axios";
import notify from "../../services/toastService";
import { validateContactMe } from "../../validation/validationSchema/genericgScema/contactMeSchema";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../Router/ROUTER";
const option: { value: string; label: string }[] = [
  { value: "admin", label: "Request to be an admin user" },
  { value: "business", label: "Request to be a business user" },
  { value: "bug", label: "Report a bug in the system" },
];
const ContactMePage = () => {
  const [inputs, setInputs] = useState<IContactInputs>({
    fullName: "",
    email: "",
    phoneNumber: "",
    request: "",
    freeText: "",
  });
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [secondtrychance, setSeconrychance] = useState(false);
  const navigate = useNavigate();
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

    if (secondtrychance || e.target.id === "freeText") {
      // Validate using the new inputs
      const joiResponse = validateContactMe(updatedInputs);
      setErrorsState(joiResponse);

      if (e.target.id === "freeText") {
        setSeconrychance(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hideLoading = notify.loading("sendind request...");
    try {
      const res = await sendData({
        url: `/users/request`,
        data: inputs,
        method: "post",
      });
      navigate(ROUTER.HOME);
      hideLoading();
      notify.success(res.message);
    } catch (e) {
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
                contact me
              </Typography>
            </Grid>
            {Object.entries(inputs).map(([key, value]) => {
              const error = errorsState ? errorsState[key] || null : null;
              if (key !== "request" && key !== "freeText") {
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
                        autoFocus={key === "fullName" ? true : false}
                        id={key}
                        required
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        placeholder={`Enter your ${key}`}
                        value={Number.isNaN(value) ? "" : value}
                        onChange={(e) => handleInputsChange(e)}
                      />
                    </Grid>
                  </Fragment>
                );
              } else if (key !== "freeText") {
                return (
                  <Grid
                    container
                    item
                    spacing={2}
                    xs={12}
                    sm={5}
                    md={5}
                    sx={{ m: "auto", mb: 1, width: "100%" }}
                    key={key}
                  >
                    <Autocomplete
                      fullWidth
                      sx={{ width: "100%" }}
                      id="combo-box-demo"
                      options={option}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      onChange={(event, newValue) => {
                        if (newValue === null) {
                          setInputs((current) => ({
                            ...current,
                            request: "",
                          }));
                          return;
                        }
                        setInputs((current) => ({
                          ...current,
                          request: newValue.label,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="request" />
                      )}
                    />
                  </Grid>
                );
              }
            })}
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ m: "auto", mb: 1, width: "100%", p: 1 }}
            >
              <TextField
                fullWidth
                name={"freeText"}
                id={"freeText"}
                required
                label={"freeText"}
                placeholder={`feel free to specify  your request`}
                value={inputs.freeText}
                onChange={(e) => handleInputsChange(e)}
              />
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
                mt: 1,
                flexDirection: "column",
              }}
            >
              {(errorsState !== null
                ? true
                : secondtrychance
                ? false
                : true) && (
                <Typography variant="body2" sx={{ color: "red" }}>
                  * if you dont fill up the inputs you cant log in
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
              contact me{" "}
            </Button>
          </Grid>{" "}
          <Grid container item md={3} sm={2} xs={1}></Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ContactMePage;
