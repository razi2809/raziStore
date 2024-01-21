import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import sendData from "../../../hooks/useSendData";
import type {
  ErrorObj,
  IUpdatePhoneInput,
  changeType,
} from "../../../@types/generic";
import { AxiosError } from "axios";
import notify from "../../../services/toastService";
import { validatePhoneChange } from "../../../validation/validationSchema/userSchema/phoneChangeSchema";
import { IBusiness } from "../../../@types/business";
interface Props {
  business: IBusiness;
  updateCallBack: <T>(name: changeType, data: T) => void;
}
const ChangeBusinessPhone: FC<Props> = ({ business, updateCallBack }) => {
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [secondtrychance, setSeconrychance] = useState(false);

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
      businessPhoneNumber: input.phoneNumber,
    };
    try {
      const res = await sendData({
        url: `/business/phone/${business._id}`,
        data: data,
        method: "patch",
      });
      notify.success(res.message);
      updateCallBack("phoneNumber", data);
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
            <Typography
              variant="h3"
              color="text.primary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              change business<br></br> phone number
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
              placeholder="enter  business phone Number"
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

export default ChangeBusinessPhone;
