import React, { FC } from "react";
import { Iuser } from "../../@types/user";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../Router/ROUTER";

interface Props {
  user: Iuser;
  close: () => void;
}
const UserCardTemplate: FC<Props> = ({ user, close }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${ROUTER.PROFILE}/${user?._id}`);
    close();
  };
  return (
    <Button
      onClick={handleClick}
      sx={{ display: "flex", boxShadow: "none", mb: 0.5, bgcolor: "divider" }}
      variant="contained"
    >
      <Avatar src={user.image.url} alt={user.image.alt} />
      <Box sx={{ ml: 1, mr: 1 }}>
        <Typography
          variant="body2"
          sx={{ mb: 1, color: "text.primary", textAlign: "start" }}
        >
          profile
        </Typography>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {user.name.firstName} {user.name.lastName}
        </Typography>
      </Box>
      <ArrowForwardIosIcon sx={{ color: "text.primary" }} />
    </Button>
  );
};

export default UserCardTemplate;
