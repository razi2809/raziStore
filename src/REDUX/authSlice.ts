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
    addTemoprarlyAddress: (state, action: PayloadAction<IAddress>) => {
      state.user?.address.push(action.payload);
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
