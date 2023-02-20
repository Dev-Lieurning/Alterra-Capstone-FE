import axios from "axios";

const BASE_URL = "https://553f-103-195-58-17.ap.ngrok.io";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.accessToken;
// const TOKEN = "JOKO";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  // headers: { token: `Bearer ${TOKEN}` },
});

export const createDatawithPicture = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});
