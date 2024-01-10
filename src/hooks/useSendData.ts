import axios, { AxiosError } from "axios";
import { useState } from "react";

interface Props {
  url: string;
  data?: any;
  method: "post" | "patch";
}

const sendData = async (props: Props) => {
  const { url, data, method } = props;

  if (!url) return;
  try {
    let res;
    if (method === "post") {
      res = await axios.post(url, data);
    } else if (method === "patch") {
      res = await axios.patch(url, data);
    }

    if (!res) throw new Error("Unable to send data");
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    return error;
  }
};

export default sendData;
