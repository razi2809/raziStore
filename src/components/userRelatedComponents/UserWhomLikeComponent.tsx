import { Box, Fab, Grid, Typography } from "@mui/material";
import { FC, Fragment, memo, useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { Iuser } from "../../@types/user";
import UserTemplateComponent from "./UserTemplateComponent";
interface Props {
  usersData: Iuser[] | null;
}
const UserWhomLikeComponent: FC<Props> = ({ usersData }) => {
  const TOTAL_PER_PAGE = 4;
  const [users, setUser] = useState<Iuser[] | null>(usersData);
  const [userIndex, setUserIndex] = useState(1);

  useEffect(() => {
    //  handling users pagination
    if (!usersData) return;
    const start = userIndex - 1;
    const end = start + TOTAL_PER_PAGE;
    setUser(usersData.slice(start, end));
  }, [usersData, userIndex]);

  return (
    <Fragment>
      {usersData && usersData.length > 0 && (
        <Grid sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  users who give a like
                </Typography>
              </Box>
              {usersData.length > 4 && (
                <Box>
                  <Fab
                    sx={{
                      bgcolor: "secondary.main",
                      mr: 2,
                      height: 20,
                      width: 35,
                      zIndex: 1,
                    }}
                    disabled={userIndex === 1}
                    onClick={() => setUserIndex(userIndex - 1)}
                  >
                    <ArrowBackIcon />
                  </Fab>
                  <Fab
                    sx={{
                      bgcolor: "secondary.main",
                      mr: 2,
                      height: 20,
                      width: 35,
                      zIndex: 1,
                    }}
                    disabled={
                      userIndex - 1 === usersData.length - TOTAL_PER_PAGE
                    }
                    onClick={() => setUserIndex(userIndex + 1)}
                  >
                    <ArrowForwardIcon />
                  </Fab>
                </Box>
              )}
            </Box>{" "}
            <Grid
              container
              spacing={2}
              sx={{ mt: 1, justifyContent: "center" }}
            >
              {users &&
                users.length > 0 &&
                users.map((user) => (
                  <Grid item md={3} sm={6} xs={12} key={user._id}>
                    {" "}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ height: "100%" }}
                    >
                      <UserTemplateComponent
                        user={user}
                        setSelectedUser={null}
                        canDelete={false}
                      />
                    </motion.div>
                  </Grid>
                ))}
            </Grid>{" "}
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default memo(UserWhomLikeComponent);
