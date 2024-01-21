import { FC, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import SettignsTemplate from "../genericComponents/SettingsTemplate";
import { motion } from "framer-motion";
import { IBusiness } from "../../@types/business";
import ChangeBusinessEmail from "./updateBusinessRelated/ChangeBusinessEmail";
import type { changeType } from "../../@types/generic";
import ChangeBusinessName from "./updateBusinessRelated/ChangeBusinessName";
import ChangeBusinessPhone from "./updateBusinessRelated/ChangeBusinessPhone";
import ChangeBusinessDescription from "./updateBusinessRelated/ChangeBusinessDescription";
import ChangeImage from "../genericComponents/ChangeImage";
interface Props {
  business: IBusiness;
  updateCallBack: <T>(name: changeType, data: T) => void;
}
const BusinessSettings: FC<Props> = ({ business, updateCallBack }) => {
  const [whatToEdit, setWhatToEdit] = useState<changeType | null>(null);
  const changeSettings = {
    businessName: business.businessName,
    email: business.businessEmail,
    phoneNumber: business.businessPhoneNumber,
    businessDescription: business.businessDescription,
    image: "change",
  };
  const handleEdit = (name: changeType) => {
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
              business settings
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
                name={key as changeType}
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
          onClick={() => setWhatToEdit(null)}
        >
          {" "}
          <ChangeBusinessEmail
            business={business}
            updateCallBack={updateCallBack}
          />
        </motion.div>
      )}
      {whatToEdit === "businessName" && (
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
          onClick={() => setWhatToEdit(null)}
        >
          <ChangeBusinessName
            business={business}
            updateCallBack={updateCallBack}
          />
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
          onClick={() => setWhatToEdit(null)}
        >
          <ChangeBusinessPhone
            business={business}
            updateCallBack={updateCallBack}
          />
        </motion.div>
      )}
      {whatToEdit === "businessDescription" && (
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
          onClick={() => setWhatToEdit(null)}
        >
          <ChangeBusinessDescription
            business={business}
            updateCallBack={updateCallBack}
          />
        </motion.div>
      )}
      {whatToEdit === "image" && (
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
          onClick={() => setWhatToEdit(null)}
        >
          <ChangeImage updateCallBack={updateCallBack} />
        </motion.div>
      )}
    </Grid>
  );
};

export default BusinessSettings;
