import { createSlice } from "@reduxjs/toolkit";

const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    currentReservation: {},
    isFetching: false,
    error: false,
    isLogedIn: false,
  },
  reducers: {
    reservationStart: (state) => {
      state.isFetching = false;
    },
    reservationSuccess: (state, action) => {
      state.isFetching = false;
      state.currentReservation = action.payload;
    },
    reservationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearResevation: (state) => {
      state.currentReservation = {};
    },
  },
});

export const {
  reservationStart,
  reservationSuccess,
  reservationFailure,
  clearResevation,
} = reservationSlice.actions;
export default reservationSlice.reducer;
