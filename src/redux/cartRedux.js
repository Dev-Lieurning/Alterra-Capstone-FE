import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    date: "",
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.date = state.startDate + state.endDate;
      state.total += action.payload.price * action.payload.quantity;
    },
    substractProductOrder: (state, action) => {
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
    addProductOrder: (state, action) => {
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeOrder: (state) => {
      state = {
        products: [],
        date: "",
        quantity: 0,
        total: 0,
      };
    },
  },
});

export const {
  addProduct,
  substractProductOrder,
  addProductOrder,
  removeOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
