import axios from "axios";

interface Props {
  url: string;
  data?: any;
  method: "post" | "patch" | "delete";
}

const sendData = async (props: Props) => {
  const { url, data, method } = props;

  if (!url || !method) throw new Error("URL or Method not provided");
  try {
    let response;
    switch (method) {
      case "post":
        response = await axios.post(url, data);
        break;
      case "patch":
        response = await axios.patch(url, data);
        break;
      case "delete":
        response = await axios.delete(url);
        break;
    }
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Unknown error occurred");
  }
};

export default sendData;
