import axios from "axios";

export const API = axios.create({
  baseURL: "http://ec2-18-181-215-107.ap-northeast-1.compute.amazonaws.com:5000/waysbeans/",
  // baseURL: "http://localhost:5000/waysbeans/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
