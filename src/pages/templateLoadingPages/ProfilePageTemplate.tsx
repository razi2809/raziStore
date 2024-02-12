import { Box, Grid, Typography } from "@mui/material";
import CategoryDispalyForUserTemplate from "../../components/genericComponents/CategoryDispalyForUserTemplate";
import PersonalInfoTemplate from "../../components/genericComponents/PersonalInfoTemplate";

const ProfilePageTemplate = () => {
  return (
    <Grid>
      <Box
        sx={{
          height: "20vh",
          p: 5,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h3" sx={{ color: "text.primary" }}>
          profile
        </Typography>
      </Box>
      <CategoryDispalyForUserTemplate />
      <PersonalInfoTemplate />
    </Grid>
  );
};

export default ProfilePageTemplate;
