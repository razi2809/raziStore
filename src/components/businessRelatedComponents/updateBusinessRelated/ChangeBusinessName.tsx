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
  IUpdatespecialNameInputs,
  changeType,
} from "../../../@types/generic";
import { AxiosError } from "axios";
import notify from "../../../services/toastService";
import { validateSpeicalNameChange } from "../../../validation/validationSchema/genericgScema/speicalNameChangeSchema";
import { IBusiness } from "../../../@types/business";
interface Props {
  business: IBusiness;
  updateCallBack: <T>(name: changeType, data: T) => void;
}
const ChangeBusinessName: FC<Props> = ({ business, updateCallBack }) => {
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [secondtrychance, setSeconrychance] = useState(false);
  const [inputs, setInputs] = useState<IUpdatespecialNameInputs>({
    name: "",
  });
  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation();
    }
  };

  const handleNameChange = async () => {
    const data = {
      businessName: inputs.name,
    };
    try {
      const res = await sendData({
        url: `/business/name/${business._id}`,
        data: data,
        method: "patch",
      });
      notify.success(res.message);
      updateCallBack("name", data);
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

    if (secondtrychance || e.target.id === "name") {
      // Validate using the new inputs
      const joiResponse = validateSpeicalNameChange(updatedInputs);
      setErrorsState(joiResponse);

      if (e.target.id === "name") {
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
            <Typography
              variant="h3"
              color="text.primary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              change business<br></br> name
            </Typography>
            {errorsState && errorsState["name"] && (
              <Typography variant="body2" sx={{ mb: 0.5, color: "red" }}>
                *{errorsState["name"]}
              </Typography>
            )}
            <TextField
              id="name"
              name="businessName"
              label="business Name"
              placeholder="enter the business name"
              value={inputs.name}
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

export default ChangeBusinessName;
