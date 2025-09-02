import axios from "axios";

const instance = axios.create({
  // baseURL: 'https://codebet-backend.onrender.com/api', // or your backend URL
  baseURL: "http://localhost:5000/api",
});

export default instance;
