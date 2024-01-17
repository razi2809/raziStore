import { FC, useState } from "react";
import { Iuser } from "../../@types/user";
import { Box, Grid, Typography } from "@mui/material";
import SettignsTemplate from "../genericComponents/SettingsTemplate";
import ChangeUserName from "./updateUserRelated/ChangeUserName";
import { motion } from "framer-motion";
import ChangeUserEmail from "./updateUserRelated/ChangeUserEmail";
import ChangeUserPhone from "./updateUserRelated/ChangeUserPhone";

interface Props {
  user: Iuser;
  updateUser: <T>(
    name: "name" | "email" | "PhoneNumber" | "businessName",
    data: T
  ) => void;
}
const UserSettings: FC<Props> = ({ user, updateUser }) => {
  const [whatToEdit, setWhatToEdit] = useState("");
  const changeSettings = {
    name: user.name.firstName + " " + user.name.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  };
  const handleEdit = (
    name: "name" | "email" | "PhoneNumber" | "businessName"
  ) => {
    setWhatToEdit(name);
  };

  return (
    <Grid sx={{ mt: 2, p: 2 }}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              variant="h4"
              sx={{ color: "text.primary", textAlign: "start" }}
            >
              user settings
            </Typography>
          </Box>
        </Box>{" "}
      </Grid>
      {Object.entries(changeSettings).map(([key, value]) => (
        <Box sx={{ display: "flex", justifyContent: "center" }} key={key}>
          <Grid container sx={{ width: "100%", justifyContent: "center" }}>
            <Grid item md={2} xs={0}></Grid>
            <Grid item md={8} xs={10} sx={{ p: 1, mb: 1 }}>
              <SettignsTemplate
                name={key as "name" | "email" | "PhoneNumber"}
                value={value}
                handleEdit={handleEdit}
              />
            </Grid>
            <Grid item md={2} xs={0}></Grid>
          </Grid>
        </Box>
      ))}
      {whatToEdit === "email" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
          onClick={() => setWhatToEdit("")}
        >
          {" "}
          <ChangeUserEmail user={user} updateUser={updateUser} />
        </motion.div>
      )}
      {whatToEdit === "name" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
          onClick={() => setWhatToEdit("")}
        >
          {" "}
          <ChangeUserName user={user} updateUser={updateUser} />
        </motion.div>
      )}
      {whatToEdit === "phoneNumber" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
          onClick={() => setWhatToEdit("")}
        >
          {" "}
          <ChangeUserPhone user={user} updateUser={updateUser} />
        </motion.div>
      )}
    </Grid>
  );
};

export default UserSettings;
