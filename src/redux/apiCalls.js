import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  createDatawithPicture,
  publicRequest,
  userRequest,
} from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data.data));
    alert("kamu masuk" + res.data.data);
  } catch (err) {
    dispatch(loginFailure());
    alert("Error" + JSON.stringify(err));
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/room/getAllRooms");
    dispatch(getProductSuccess(res.data.data));
    console.log("Ini respon" + JSON.stringify(res.data.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/room/deleteRoom/${id}`);
    alert(id);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await axios({
      method: "post",
      url: "https://553f-103-195-58-17.ap.ngrok.io/room/addRoom",
      data: product,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
    // alert(err);
    console.log(JSON.stringify(err));
  }
};
