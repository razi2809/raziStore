import { Dispatch, FC, useState } from "react";
import { Iuser } from "../../@types/user";
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ROUTER } from "../../Router/ROUTER";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectedUser } from "./GridUsersCRM";
import { useAppSelector } from "../../REDUX/bigPie";
import notify from "../../services/toastService";
interface Props {
  user: Iuser;
  setSelectedUser: Dispatch<React.SetStateAction<SelectedUser | null>> | null;
  canDelete: boolean;
}
const UserTemplateComponent: FC<Props> = ({
  user,
  setSelectedUser,
  canDelete,
}) => {
  const myUser = useAppSelector((bigPie) => bigPie.authReducer.user);
  const navigate = useNavigate();

  const [hover, setHover] = useState(false);
  const navigateToUserProfile = () => {
    if (!myUser?.isAdmin) {
      notify.error("must be an admin to view the user profile");
      return;
    }
    navigate(`${ROUTER.PROFILE}/${user._id}`);
  };
  const handleDeleteUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!setSelectedUser) return;
    setSelectedUser(user._id);
  };
  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={navigateToUserProfile}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        position: "relative",
        cursor: "pointer",
        transition: "transform 0.5s ease",
        boxShadow:
          " rgba(0, 0, 0, 0.06) 0px 0px 0.125rem 0px, rgba(0, 0, 0, 0.12) 0px 0.125rem 0.125rem 0px",
        transform: hover ? "scale(1.02)" : "",
      }}
    >
      {myUser && myUser.isAdmin && canDelete && (
        <div style={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}>
          <Tooltip title="delete user">
            <IconButton onClick={(e) => handleDeleteUser(e)}>
              <DeleteIcon />{" "}
            </IconButton>
          </Tooltip>
        </div>
      )}
      <Box
        sx={{
          mt: 1,
          mb: 1,
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <Typography variant="h4" color="text.primary">
          {user.name.firstName + " " + user.name.lastName}
        </Typography>

        <Typography variant="h6" color="text.primary">
          {user.email}
        </Typography>
      </Box>
    </Card>
  );
};

export default UserTemplateComponent;
