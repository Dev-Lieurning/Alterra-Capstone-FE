import axios from "axios";

const BASE_URL = "https://api.capstone-meeting.online";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).data;
const TOKEN = currentUser?.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb3ViYTY3QGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWRfdXNlciI6OCwiaWF0IjoxNjc3MTU3OTM0LCJleHAiOjE2NzcyNDQzMzR9.kaJGmOP3Fih234Xl91s8aR5KikvRNXxGSL1pg2o9cig",
  },
});
