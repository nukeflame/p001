/**
 *
 * Main roles actions
 */

import baseurl from "../../../config/baseUrl";
import toastr from "toastr";

export default {
  fetchPayrollParameterCat({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/pars_categories")
        .then(res => {
          commit("FETCH_PAR_CATEGORIES", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          commit("loadingPaye", false);
        });
    });
  },

  createPayrolParameterCat({ commit }, data) {
    return new Promise((resolve, reject) => {
      baseurl
        .post("api/pars_categories/store", data)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          if (parseInt(error.response.status) == 422) {
            const err = error.response.data.errors;
            if (err.name) {
              toastr["error"](err.name);
            } else if (err.categoryId) {
              toastr["error"](err.categoryId);
            } else if (err.defValue) {
              toastr["error"](err.defValue);
            }
          }

          reject(error);
        })

        .finally(() => {
          commit("loadingPaye", false);
        });
    });
  }
};
