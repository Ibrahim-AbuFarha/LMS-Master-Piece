import axios from "axios";
export const LMS_API = axios.create({
  baseURL: "http://192.168.1.20:8000/api/v1",

  withCredentials: true,
});
