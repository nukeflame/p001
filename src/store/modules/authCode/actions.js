/**
 *
 * Main users actions
 */

import baseurl from "../../../config/baseUrl";
import toastr from "toastr";

export default {
  fetchAuthCode({ commit }, data) {
    commit("FETCH_CODE_LOADING", true);
    return new Promise(resolve => {
      baseurl
        .post(`api/payrollcode`, data)
        .then(res => {
          commit("FETCH_CODE", res.data);
          resolve(res);
        })
        .catch(error => {
          const err = error.response.status;
          if (err) {
            const errData = error.response.data.errors;
            if (err == 404) {
              toastr.error("Invalid Payroll PIN, Please try again.");
            } else if (err == 422) {
              toastr.error(errData);
            }
          } else {
            toastr.error(error);
          }
        })
        .finally(() => {
          commit("FETCH_CODE_LOADING", false);
        });
    });
  },

  loginUser({ commit }, data) {
    commit("AUTH_LOADING", true);
    return new Promise(resolve => {
      baseurl
        .post(`api/login`, data)
        .then(res => {
          commit("LOGIN_USER", res.data);
          resolve(res);
        })
        .catch(error => {
          if (error.response.status) {
            const err = error.response.status;
            const errData = error.response.data;
            if (err === 404) {
              toastr.error(errData.notfound);
            }
            if (err === 406) {
              toastr.error(errData.blocked);
            }
            if (err === 409) {
              toastr.warning(errData.pending);
            }
          } else {
            toastr.error(error);
          }
        })
        .finally(() => {
          commit("AUTH_LOADING", false);
        });
    });
  }
};

// baseUrl
//   .post("oauth/token", data)
//   .then(response => {
//     Auth.setToken(
//       response.data.access_token,
//       response.data.expires + Date.now()
//     );
//     window.location.href = "/";
//   })
//   .catch(error => {
//     if (error.response.status === 400) {
//       $("#auth_username, #auth_pwd").addClass("is-invalid");
//       toastr["error"]("Please fill in all the fields correctly!");
//     } else if (error.response.status === 401) {
//       $("#auth_username, #auth_pwd").addClass("is-invalid");
//       toastr["error"]("The user is not recognized or password incorrect");
//     } else {
//       toastr["error"](error);
//     }
//   })
//   .finally(() => {
//     this.loading = false;
//   });
