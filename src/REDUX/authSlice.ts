import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAddress, Iuser } from "../@types/user";
const authSlice = createSlice({
  initialState: {
    isLoggedIn: false,
    user: null as Iuser | null,
  },
  name: "auth",
  reducers: {
    login: (state, action: PayloadAction<Iuser | null>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      state.isLoggedIn = false;
      state.user = null;
    },
    addTemperarlyAddress: (state, action: PayloadAction<IAddress>) => {
      state.user?.address.push(action.payload);
    },
    editTemperarlyPic: (state, action: PayloadAction<{ url: string }>) => {
      if (state.user && state.user.image) {
        state.user.image.url = action.payload.url;
      }
    },
    editTemperarlyName: (
      state,
      action: PayloadAction<{ firstName: string; lastName: string }>
    ) => {
      if (state.user && state.user.image) {
        state.user.name = action.payload;
      }
    },
    editTemperarlyEmail: (state, action: PayloadAction<{ email: string }>) => {
      if (state.user && state.user.email) {
        state.user.email = action.payload.email;
      }
    },
    editTemperarlyPhone: (
      state,
      action: PayloadAction<{ phoneNumber: string }>
    ) => {
      if (state.user && state.user.phoneNumber) {
        state.user.phoneNumber = action.payload.phoneNumber;
      }
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
