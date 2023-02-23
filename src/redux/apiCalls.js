import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    const payload = JSON.parse(atob(res.data.data.token.split(".")[1]));
    dispatch(loginSuccess({ ...payload, token: res.data.data.token }));
  } catch (err) {
    dispatch(loginFailure());
    console.log("Error" + JSON.stringify(err));
  }
};
