import { FC } from "react";
import { Avatar, Box, Card, Typography } from "@mui/material";
import { Iuser } from "../../../@types/user";
interface Props {
  user: Iuser;
}
const UserSelectTamplate: FC<Props> = ({ user }) => {
  return (
    <Card sx={{ display: "flex" }}>
      <Box
        sx={{
          m: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 75,
          height: 75,
        }}
      >
        <Avatar
          sx={{ width: 75, height: 75, zIndex: 1 }}
          src={user.image.url}
          alt={user.image.alt || "User Profile Picture"}
        />
      </Box>{" "}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" textAlign="center">
          {user.name.firstName}
        </Typography>
        <Typography variant="h6" textAlign="center">
          {user.email}
        </Typography>
      </Box>
    </Card>
  );
};

export default UserSelectTamplate;
