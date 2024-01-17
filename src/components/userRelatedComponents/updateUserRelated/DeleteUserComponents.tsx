import React, { FC, useState } from "react";
import { Iuser } from "../../../@types/user";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../../REDUX/bigPie";
interface Props {
  user: Iuser;
  deleteUser: (userId: string) => void;
}
const DeleteUserComponents: FC<Props> = ({ user, deleteUser }) => {
  const [email, setEmail] = useState("");
  const myUser = useAppSelector((bigPie) => bigPie.authReducer.user);

  return (
    <Box
      sx={{
        bgcolor: "divider",
        width: "20em",
        p: 3,
        borderRadius: 2,
      }}
    >
      <Box onClick={(e) => e.stopPropagation()}>
        {user._id !== myUser?._id ? (
          <Typography variant="h5" sx={{ color: "text.primary" }}>
            are you sure you want to delete{" "}
            {user.name.firstName + " " + user.name.lastName}?
          </Typography>
        ) : (
          <Typography variant="h5" sx={{ color: "text.primary" }}>
            are you sure you want to delete your user?
          </Typography>
        )}
        <Typography variant="h6" sx={{ color: "red" }}>
          * this is unreversed action
          {user._id === myUser?._id && " and will cause a logout action"}
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "text.primary", mt: 2, textAlign: "center" }}
        >
          confirm by writing the email {user.email}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          id="email"
          label="email"
          value={email}
          type="email"
          placeholder="enter the user email"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{
            onDragOver: (e) => e.preventDefault(),
            onDrop: (e) => e.preventDefault(),
            onPaste: (e) => e.preventDefault(),
          }}
        />
        <Button
          sx={{ mt: 1 }}
          variant="contained"
          color="error"
          disabled={email !== user.email}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          onClick={() => deleteUser(user._id)}
        >
          delete user
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteUserComponents;
