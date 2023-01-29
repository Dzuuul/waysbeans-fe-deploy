import axios from "axios";

export const API = axios.create({
  baseURL: "process.env.REACT_APP_BASEURL",
  // baseURL: "http://localhost:5000/waysbeans/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
