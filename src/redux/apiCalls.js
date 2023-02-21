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
import Swal from 'sweetalert2';

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
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/room/deleteRoom/${id}`);
    Swal.fire(
      'Deleted!',
      'Room has been deleted',
      'success'
    )
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await createDatawithPicture.put('/room/updateRoom', product)
    Swal.fire(
      'Updated!',
      'Room has been updated',
      'success'
    )
    
    dispatch(updateProductSuccess({ id, product: res.data.data }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await createDatawithPicture.post('/room/addRoom', product);
    Swal.fire(
      'Saved',
      'Room has been Added',
      'success'
    )
    dispatch(addProductSuccess(res.data.data));
  } catch (err) {
    dispatch(addProductFailure());
    // alert(err);
    console.log(JSON.stringify(err));
  }
};
