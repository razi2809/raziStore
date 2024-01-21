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
  IUpdateQuantityInput,
  changeType,
} from "../../../@types/generic";
import { AxiosError } from "axios";
import notify from "../../../services/toastService";
import { IProduct } from "../../../@types/product";
import { validateQuantityChange } from "../../../validation/validationSchema/productScema/quantityChangeSchema";
interface Props {
  product: IProduct;
  updateCallBack: <T>(name: changeType, data: T) => void;
}
const ChangeProductQuantity: FC<Props> = ({ product, updateCallBack }) => {
  const [errorsState, setErrorsState] = useState<ErrorObj | null>(null);
  const [secondtrychance, setSeconrychance] = useState(false);
  const [input, setInput] = useState<IUpdateQuantityInput>({
    quantity: NaN,
  });
  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation();
    }
  };

  const handleQuantityChange = async () => {
    const data = {
      productQuantity: Number(input.quantity),
    };
    try {
      const res = await sendData({
        url: `/product/quantity/${product._id}`,
        data: data,
        method: "patch",
      });
      notify.success(res.message);
      updateCallBack("productQuantity", data);
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

    if (secondtrychance || e.target.id === "quantity") {
      // Validate using the new inputs
      setSeconrychance(true);

      const joiResponse = validateQuantityChange(updatedInputs);
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
              change product<br></br> quantity
            </Typography>
            {errorsState && errorsState["quantity"] && (
              <Typography variant="body2" sx={{ mb: 0.5, color: "red" }}>
                *{errorsState["quantity"]}
              </Typography>
            )}
            <TextField
              id="quantity"
              name="quantity"
              label="quantity"
              placeholder="enter product quantity"
              value={Number.isNaN(input.quantity) ? "" : input.quantity}
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
              onClick={() => handleQuantityChange()}
            >
              <Box sx={{ flexGrow: 1 }}>change quantity</Box>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ChangeProductQuantity;
