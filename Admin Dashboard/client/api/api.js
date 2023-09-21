import axios from 'axios';

export const LMS_API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  withCredentials: true,
});
