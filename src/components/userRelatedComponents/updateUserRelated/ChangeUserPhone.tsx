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
import type {
  ErrorObj,
  IUpdatePhoneInput,
  changeType,
} from "../../../@types/generic";
import { authActions } from "../../../REDUX/authSlice";
import { AxiosError } from "axios";
import notify from "../../../services/toastService";
import { Iuser } from "../../../@types/user";
import { validatePhoneChange } from "../../../validation/validationSchema/userSchema/phoneChangeSchema";
interface Props {
  user: Iuser;
  updateUser: <T>(name: changeType, data: T) => void;
}
const ChangeUserPhone: FC<Props> = ({ user, updateUser }) => {
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const dispatch = useAppDispatch();
  const [secondtrychance, setSeconrychance] = useState(false);

  const myuser = useAppSelector((bigPie) => bigPie.authReducer);
  const [input, setInput] = useState<IUpdatePhoneInput>({
    phoneNumber: "",
  });
  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation();
    }
  };

  const handleEmailChange = async () => {
    const data = {
      phoneNumber: input.phoneNumber,
    };
    try {
      const res = await sendData({
        url: `/users/phone/${user._id}`,
        data: data,
        method: "patch",
      });
      notify.success(res.message);
      if (user._id === myuser.user?._id) {
        dispatch(
          authActions.editTemperarlyPhone({ phoneNumber: data.phoneNumber })
        );
      }
      updateUser("phoneNumber", data);
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
      ...input,
      [e.target.id]: e.target.value,
    };
    setInput(updatedInputs);

    if (secondtrychance || e.target.id === "phoneNumber") {
      // Validate using the new inputs
      setSeconrychance(true);

      const joiResponse = validatePhoneChange(updatedInputs);
      setErrorsState(joiResponse);
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
            <Typography variant="h3" color="text.primary" sx={{ mb: 2 }}>
              change user<br></br> phone number
            </Typography>
            {errorsState && errorsState["phoneNumber"] && (
              <Typography variant="body2" sx={{ mb: 0.5, color: "red" }}>
                *{errorsState["phoneNumber"]}
              </Typography>
            )}
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              label="phoneNumber"
              placeholder="enter your phone Number"
              value={input.phoneNumber}
              onChange={(e) => handleInputsChange(e)}
              sx={{ mb: 1 }}
            />{" "}
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
              onClick={() => handleEmailChange()}
            >
              <Box sx={{ flexGrow: 1 }}>change phoneNumber</Box>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ChangeUserPhone;
