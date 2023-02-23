import axios from "axios";

const BASE_URL = "https://api.capstone-meeting.online";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const validation = user && JSON.parse(user).currentUser;
const TOKEN = validation?.token;

console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
