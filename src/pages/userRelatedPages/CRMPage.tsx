import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Iuser } from "../../@types/user";
import notify from "../../services/toastService";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import { useSearchParams } from "react-router-dom";
import GridviewLayout from "../../layout/layoutRelatedComponents/GridviewLayout";
import GridUsersCRM from "../../components/userRelatedComponents/GridUsersCRM";
import { Box, Grid } from "@mui/material";
import sendData from "../../hooks/useSendData";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../REDUX/bigPie";
import { authActions } from "../../REDUX/authSlice";
type newDevices = "grid" | "tabel";

const CRMPage = () => {
  const { data, error, loading } = useFetch(`/users`);
  const [users, setUsers] = useState<Iuser[]>([]);
  const [searchParams] = useSearchParams();
  const myUser = useAppSelector((bigPie) => bigPie.authReducer.user);
  const dispatch = useAppDispatch();
  const WhatView = searchParams.get("view") || "grid";
  const [layout, setLayout] = useState(WhatView);

  useEffect(() => {
    // Check if there's an error after fetching data.
    if (error) {
      // Handle the error, e.g., by setting an error message in the state,
      // showing a toast notification to the user.
      notify.error(error.message);
    } else if (data) {
      // If there's no error and data is present, update the businesses state.
      setUsers(data.users);
    }
  }, [data, error]);
  const handleDevicesChange = (newDevices: newDevices) => {
    if (newDevices) {
      setLayout(newDevices);
    }
  };
  const handleUserTemporaryDelete = async (userId: string) => {
    try {
      const updatedUsers = users.filter((user) => user._id !== userId);
      const res = await sendData({
        url: `/users/${userId}`,
        method: "delete",
      });
      if (userId === myUser?._id) {
        dispatch(authActions.logout());
      }
      setUsers(updatedUsers);
      notify.success(res.message);
    } catch (e) {
      if (e instanceof AxiosError) {
        notify.error(e.response?.data.message);
      } else {
        notify.error("An unknown error occurred");
      }
    }
  };
  if (users) {
    return (
      <Grid>
        <Box sx={{ ml: 2, mt: 10 }}>
          <GridviewLayout handleDevices={handleDevicesChange} />
        </Box>
        {layout === "grid" && (
          <GridUsersCRM users={users} deleteUser={handleUserTemporaryDelete} />
        )}
      </Grid>
    );
  } else if (loading) {
    return <LoaderComponent />;
  } else return null;
};

export default CRMPage;
