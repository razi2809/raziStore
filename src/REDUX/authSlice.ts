import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Iuser } from "../@types/user";
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
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
