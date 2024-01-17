import { FC, useState } from "react";
import { Iuser } from "../../@types/user";
import { Box, Grid, Pagination } from "@mui/material";
import { ROUTER } from "../../Router/ROUTER";
import { useNavigate } from "react-router-dom";
import UserTemplateComponentst from "./UserTemplateComponent";
import SelectFilterUsers from "../searchFilters/userRelatedSelect/SelectFilterUsers";
import { AnimatePresence, motion } from "framer-motion";
import DeleteUserComponents from "./updateUserRelated/DeleteUserComponents";
import usePagination from "../../hooks/usePagination";
interface Props {
  users: Iuser[];
  deleteUser: (userId: string) => void;
}
export interface SelectedUser {
  userId: string;
}
const GridUsersCRM: FC<Props> = ({ users, deleteUser }) => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const {
    currentData: pageUserData,
    currentPage,
    numPages,
    goToPage,
  } = usePagination(users);
  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    //when he clicks to move a page then navigate to a new one
    //the page state will upate automaticly
    // setPage(newPage);
    goToPage(newPage);
    window.scrollTo({ top: 0, left: 0 });
    navigate(`${ROUTER.CRM}?view=grid&page=${newPage}`);
  };

  return (
    <>
      {" "}
      <Box>
        <Grid
          container
          item
          xs={12}
          sx={{ mt: 1, justifyContent: "space-around", mb: 4 }}
        >
          {" "}
          <Box
            sx={{
              width: 350,
              zIndex: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <SelectFilterUsers data={users} />
            </Box>
          </Box>
        </Grid>
      </Box>
      <Grid container spacing={2} sx={{ pl: 4, pr: 4, pb: 3 }}>
        {pageUserData?.length > 0 &&
          pageUserData.map((user) => {
            if (selectedUser !== user._id) {
              return (
                <Grid item md={3} sm={4} xs={12} key={user._id}>
                  <UserTemplateComponentst
                    user={user}
                    setSelectedUser={setSelectedUser}
                    canDelete={true}
                  />
                </Grid>
              );
            } else
              return (
                <Grid item md={3} sm={4} xs={12} key={user._id}>
                  <Box sx={{ width: "100%", height: "100%" }}></Box>
                </Grid>
              );
          })}
      </Grid>
      <AnimatePresence>
        {selectedUser &&
          users &&
          users.map((user) => {
            if (user._id === selectedUser) {
              return (
                <motion.div
                  key={user._id}
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
                  onClick={() => setSelectedUser(null)}
                >
                  <DeleteUserComponents user={user} deleteUser={deleteUser} />
                </motion.div>
              );
            } else {
              return null;
            }
          })}
      </AnimatePresence>
      {numPages > 1 && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            mt: 1,
          }}
          count={numPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
    </>
  );
};

export default GridUsersCRM;
