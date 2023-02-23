import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isFetching: false,
    error: false,
    isLogedIn: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = false;
      // state.isLogedIn = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isLogedIn = true;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.isLogedIn = false;
    },
    logout: (state) => {
      state.isLogedIn = false;
      state.currentUser = {};
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
