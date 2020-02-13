import axios from "axios";
import { apiDomain } from "./defaultUrls";
import AuthService from "./auth";

let Auth = new AuthService();

const baseurl = axios.create({
  baseURL: apiDomain,
  timeout: 100000,
  headers: {
    "content-Type": "application/json"
  }
});

baseurl.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

baseurl.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    // Do something with response error
    if (error.response.status === 401) {
      Auth.destroyToken();
      this.$router.replace("/auth/login");
    }

    return Promise.reject(error);
  }
);

export default baseurl;
