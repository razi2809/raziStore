import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppSelector } from "../../REDUX/bigPie";
import { ErrorObj, IRegiserInputs, IUpdateInputs } from "../../@types/global";
import { validateUpdateUser } from "../../validation/validationSchema/updateUserSchema";

const ProfileViewer = () => {
  const user = useAppSelector((bigPie) => bigPie.authReducer);
  const [edit, setEdit] = useState(true);
  const [secondtrychance, setSeconrychance] = useState(false);
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);

  const [inputs, setInputs] = useState<IUpdateInputs>({
    firstName: user.user?.name.firstName!,
    lastName: user.user?.name.lastName!,
    email: user.user?.email!,
    phoneNumber: user.user?.phoneNumber!,
    city: user.user?.address.city!,
    street: user.user?.address.street!,
    buildingNumber: user.user?.address.buildingNumber!,
  });
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
      const joiResponse = validateUpdateUser(updatedInputs);
      setErrorsState(joiResponse);
    }
    if (e.target.id === "buildingNumber") {
      //check if its the lest input and want to regisert
      //sende the inpunts to the joi validate
      //if error from joi then set them and trigerr a alert for each input
      //if the joi dosent have value it empty so let the user hit submit
      const joiResponse = validateUpdateUser(updatedInputs);
      setErrorsState(joiResponse);
      setSeconrychance(true);
    }
  };
  return (
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
            profile
          </Typography>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", mb: 3 }}>
            <Typography
              variant="h6"
              color={"text.primary"}
              sx={{ width: "3em" }}
            >
              Name:
            </Typography>
            <Box sx={{ marginLeft: "10em" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  height: "3em",
                  alignItems: "center",
                }}
              >
                {" "}
                <Typography variant="h6" color={"text.secondary"}>
                  First name:
                </Typography>
                {!edit && (
                  <Typography variant="h6" color={"text.secondary"}>
                    {user.user?.name.firstName}
                  </Typography>
                )}
                {edit && (
                  <TextField
                    sx={{ height: "100%" }}
                    inputProps={{ style: { padding: 10 } }}
                    id="firstName"
                    value={inputs.firstName}
                    onChange={(e) => handleInputsChange(e)}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  height: "3em",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" color={"text.secondary"}>
                  Last name:
                </Typography>{" "}
                {!edit && (
                  <Typography variant="h6" color={"text.secondary"}>
                    {user.user?.name.lastName}
                  </Typography>
                )}
                {edit && (
                  <TextField
                    sx={{ height: "100%" }}
                    inputProps={{ style: { padding: 10 } }}
                    id="lastName"
                    value={inputs.lastName}
                    onChange={(e) => handleInputsChange(e)}
                  />
                )}
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", mb: 3 }}>
            {" "}
            <Typography
              variant="h6"
              color={"text.primary"}
              sx={{ width: "3em" }}
            >
              Address:
            </Typography>
            <Box sx={{ marginLeft: "10em" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  height: "3em",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" color={"text.secondary"}>
                  State:
                </Typography>

                <Typography variant="h6" color={"text.secondary"}>
                  {user.user?.address.state}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  height: "3em",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  color={"text.secondary"}
                  sx={{ width: "3em", textAlign: "left" }}
                >
                  City:
                </Typography>
                {!edit && (
                  <Typography variant="h6" color={"text.secondary"}>
                    {user.user?.address.city}
                  </Typography>
                )}
                {edit && (
                  <TextField
                    sx={{ height: "100%", marginLeft: "1em" }}
                    inputProps={{ style: { padding: 10 } }}
                    id="city"
                    value={inputs.city}
                    onChange={(e) => handleInputsChange(e)}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  height: "3em",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  color={"text.secondary"}
                  sx={{ width: "3em", textAlign: "left" }}
                >
                  Street:{" "}
                </Typography>
                {!edit && (
                  <Typography variant="h6" color={"text.secondary"}>
                    {user.user?.address.street}
                  </Typography>
                )}
                {edit && (
                  <TextField
                    sx={{ height: "100%", marginLeft: "1em" }}
                    inputProps={{ style: { padding: 10 } }}
                    id="street"
                    value={inputs.street}
                    onChange={(e) => handleInputsChange(e)}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  height: "3em",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" color={"text.secondary"}>
                  Building number:{" "}
                </Typography>
                {!edit && (
                  <Typography variant="h6" color={"text.secondary"}>
                    {user.user?.address.buildingNumber?.toString()}
                  </Typography>
                )}
                {edit && (
                  <TextField
                    sx={{
                      height: "100%",
                      display: "inline-block",
                      marginLeft: "1em",
                    }}
                    inputProps={{
                      style: { padding: 10, width: "3em" },
                    }}
                    id="buildingNumber"
                    value={inputs.buildingNumber}
                    onChange={(e) => handleInputsChange(e)}
                  />
                )}
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", mb: 3, height: "3em" }}>
            <Typography
              variant="h6"
              color={"text.primary"}
              sx={{ width: "3em" }}
            >
              Email:
            </Typography>

            <Box sx={{ marginLeft: "10em" }}>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                {" "}
                {!edit && (
                  <Typography variant="h6" color={"text.secondary"}>
                    {user.user?.email}
                  </Typography>
                )}
                {edit && (
                  <TextField
                    sx={{ height: "100%" }}
                    inputProps={{ style: { padding: 10 } }}
                    id="email"
                    value={inputs.email}
                    onChange={(e) => handleInputsChange(e)}
                  />
                )}
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", mb: 3, height: "3em" }}>
            <Typography
              variant="h6"
              color={"text.primary"}
              sx={{ width: "3em" }}
            >
              Phone:
            </Typography>
            <Box sx={{ marginLeft: "10em" }}>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                {" "}
                {!edit && (
                  <Typography variant="h6" color={"text.secondary"}>
                    {user.user?.phoneNumber}
                  </Typography>
                )}
                {edit && (
                  <TextField
                    sx={{ height: "100%" }}
                    inputProps={{ style: { padding: 10 } }}
                    id="phoneNumber"
                    value={inputs.phoneNumber}
                    onChange={(e) => handleInputsChange(e)}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid container item md={3} sm={2} xs={1}></Grid>
    </Grid>
  );
};

export default ProfileViewer;
