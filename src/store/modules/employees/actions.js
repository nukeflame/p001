/**
 *
 * Main roles actions
 */

import baseurl from "../../../config/baseUrl";
import toastr from "toastr";

export default {
  fetchEmployees({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/employees")
        .then(res => {
          commit("FETCH_EMPLOYEES", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          commit("rolesLoading", false);
        });
    });
  },

  createEmployee({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("CREATE_EMPLOYEE_LOADING", true);
      baseurl
        .post("api/employees/store", data)
        .then(res => {
          commit("createEmployee", res.data);
          toastr["success"]("Employee Record created successfuly!");
          resolve(res);
        })
        .catch(error => {
          if (error.response.status === 422) {
            const err = error.response.data.errors;
            if (err.surname) {
              toastr["error"](err.surname);
            }
            if (err.notFound) {
              toastr["error"](err.notFound);
            }
          }

          reject(error);
        })
        .finally(() => {
          commit("CREATE_EMPLOYEE_LOADING", false);
        });
    });
  }
};
