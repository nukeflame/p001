/**
|--------------------------------------------------
| Server
|--------------------------------------------------
*/
import Echo from "laravel-echo";
import { serverDomain } from "../config/defaultUrls";
import AuthService from "../config/auth";

window.io = require("socket.io-client");

let Auth = new AuthService();

export default () => {
  // Have this in case you stop running your laravel echo server
  if (typeof io !== "undefined") {
    if (Auth.isLoggedIn()) {
      const token = Auth.getToken();

      const options = {
        broadcaster: "socket.io",
        host: serverDomain,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        },
        encrypted: true
      };

      window.Echo = new Echo(options);
    }
  }
};
