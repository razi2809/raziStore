import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../REDUX/bigPie";
import sendData from "../../../hooks/useSendData";
import { ErrorObj, IUpdateNameInputs } from "../../../@types/inputs";
import { authActions } from "../../../REDUX/authSlice";
import { AxiosError } from "axios";
import notify from "../../../services/toastService";
import { validateNameChange } from "../../../validation/validationSchema/userSchema/nameChangeSchema";
import { Iuser } from "../../../@types/user";
interface Props {
  user: Iuser;
  updateUser: <T>(name: "name" | "email" | "PhoneNumber", data: T) => void;
}
const ChangeUserName: FC<Props> = ({ user, updateUser }) => {
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [secondtrychance, setSeconrychance] = useState(false);
  const dispatch = useAppDispatch();
  const myuser = useAppSelector((bigPie) => bigPie.authReducer);
  const [inputs, setInputs] = useState<IUpdateNameInputs>({
    firstName: "",
    lastName: "",
  });
  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation();
    }
  };

  const handleNameChange = async () => {
    const data = {
      name: { firstName: inputs.firstName, lastName: inputs.lastName },
    };
    try {
      const res = await sendData({
        url: `/users/name/${user._id}`,
        data: data,
        method: "patch",
      });
      notify.success(res.message);
      if (user._id === myuser.user?._id) {
        dispatch(authActions.editTemperarlyName(data.name));
      }
      updateUser("name", data);
    } catch (e) {
      if (e instanceof AxiosError) {
        notify.error(e.response?.data.message);
      } else {
        notify.error("An unknown error occurred");
      }
    }
  };
  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedInputs = {
      ...inputs,
      [e.target.id]: e.target.value,
    };
    setInputs(updatedInputs);

    if (secondtrychance || e.target.id === "lastName") {
      // Validate using the new inputs
      const joiResponse = validateNameChange(updatedInputs);
      setErrorsState(joiResponse);

      if (e.target.id === "lastName") {
        setSeconrychance(true);
      }
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
            }}
          >
            <Typography variant="h3" color="text.primary" sx={{ mb: 2 }}>
              change user name
            </Typography>
            {errorsState && errorsState["firstName"] && (
              <Typography variant="body2" sx={{ mb: 0.5, color: "red" }}>
                *{errorsState["firstName"]}
              </Typography>
            )}
            <TextField
              id="firstName"
              name="firstName"
              label="first Name"
              placeholder="enter your first name"
              value={inputs.firstName}
              onChange={(e) => handleInputsChange(e)}
              sx={{ mb: 1 }}
            />{" "}
            {errorsState && errorsState["lastName"] && (
              <Typography variant="body2" sx={{ mb: 0.5, color: "red" }}>
                *{errorsState["lastName"]}
              </Typography>
            )}
            <TextField
              id="lastName"
              name="lastName"
              label="last Name"
              placeholder="enter last name"
              value={inputs.lastName}
              onChange={(e) => handleInputsChange(e)}
              sx={{ mb: 1 }}
            />
          </Box>{" "}
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              mt: 1,
            }}
          >
            <Button
              variant="contained"
              disabled={
                errorsState !== null ? true : secondtrychance ? false : true
              }
              color="primary"
              size="large"
              sx={{
                textTransform: "none",
                fontSize: 16,
                flexGrow: 1,
                display: "flex",
              }}
              onClick={() => handleNameChange()}
            >
              <Box sx={{ flexGrow: 1 }}>change name</Box>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ChangeUserName;
