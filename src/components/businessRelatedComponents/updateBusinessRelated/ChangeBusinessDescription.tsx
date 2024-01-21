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
  IUpdateDescriptionInput,
  changeType,
} from "../../../@types/generic";
import { AxiosError } from "axios";
import notify from "../../../services/toastService";
import { IBusiness } from "../../../@types/business";
import { validateDescrptionChange } from "../../../validation/validationSchema/genericgScema/DescriptionChangeSchema";
interface Props {
  business: IBusiness;
  updateCallBack: <T>(name: changeType, data: T) => void;
}
const ChangeBusinessDescription: FC<Props> = ({ business, updateCallBack }) => {
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [secondtrychance, setSeconrychance] = useState(false);

  const [input, setInput] = useState<IUpdateDescriptionInput>({
    description: "",
  });
  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation();
    }
  };

  const handleEmailChange = async () => {
    const data = {
      businessDescription: input.description,
    };
    try {
      const res = await sendData({
        url: `/business/description/${business._id}`,
        data: data,
        method: "patch",
      });
      notify.success(res.message);
      updateCallBack("businessDescription", data);
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

    if (secondtrychance || e.target.id === "description") {
      // Validate using the new inputs
      setSeconrychance(true);

      const joiResponse = validateDescrptionChange(updatedInputs);
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
              change business<br></br> description
            </Typography>
            {errorsState && errorsState["description"] && (
              <Typography variant="body2" sx={{ mb: 0.5, color: "red" }}>
                *{errorsState["description"]}
              </Typography>
            )}
            <TextField
              id="description"
              name="description"
              label="description"
              placeholder="enter business description"
              value={input.description}
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
              <Box sx={{ flexGrow: 1 }}>change description</Box>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ChangeBusinessDescription;
