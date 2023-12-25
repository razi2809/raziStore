import { Button } from "@mui/material";
import axios from "axios";
const data = {};
const handleGoogle = () => {
  console.log("google");
  axios
    .post("users/register", data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    });
};
const GoogleButton = () => {
  return (
    <div>
      <Button onClick={handleGoogle}>google</Button>
    </div>
  );
};

export default GoogleButton;
