import { 
  loginStart,
  loginSuccess,
  loginFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "./userRedux";
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

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data.data));
  } catch (err) {
    console.log(err)
    dispatch(loginFailure());
  }
};
//USERS
export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/user/getAllUsers");
    dispatch(getUserSuccess(res.data.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await userRequest.delete(`/user/deleteUser/${id}`);
    Swal.fire(
      'Deleted!',
      'User has been deleted',
      'success'
    )
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await createDatawithPicture.put('/user/updateUser', user)
    Swal.fire(
      'Updated!',
      'User has been updated',
      'success'
    )
    
    dispatch(updateUserSuccess({ id, user: res.data.data }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await createDatawithPicture.post('/user/addUser', user);
    Swal.fire(
      'Saved',
      'User has been Added',
      'success'
    )
    dispatch(addUserSuccess(res.data.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
}

//PRODUCTS
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
    await userRequest.delete(`/room/deleteRoom/${id}`);
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
  }
};
