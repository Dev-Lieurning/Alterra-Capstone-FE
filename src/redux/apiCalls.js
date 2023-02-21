import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data.data.token));
    console.log("Success" + JSON.stringify(res.data.data.token));
  } catch (err) {
    dispatch(loginFailure());
    console.log("Error" + JSON.stringify(err));
  }
};
