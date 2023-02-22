import axios from "axios";

const BASE_URL = "https://api.capstone-meeting.online";
const TOKEN = JSON.parse(localStorage.getItem("persist:root")) ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser : null;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN?.token}` },
});

export const createDatawithPicture = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${TOKEN?.token}` },
});
