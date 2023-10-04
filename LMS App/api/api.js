import axios from "axios";
export const LMS_API = axios.create({
  baseURL: "http://10.7.3.45:8000/api/v1",

  withCredentials: true,
});
