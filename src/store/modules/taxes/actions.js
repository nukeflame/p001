/**
 *
 * Main roles actions
 */

import baseurl from "../../../config/baseUrl";
import toastr from "toastr";

export default {
  fetchTaxes({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/taxes")
        .then(res => {
          commit("FETCH_TAXES", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createTaxRange({ commit }, data) {
    return new Promise(resolve => {
      commit("PROCESSING_TAX_RANGE", true);
      baseurl
        .post("api/taxes/store", data)
        .then(res => {
          commit("CREATE_TAX_RANGE", res.data);
          toastr["success"]("New tax range record added successfuly");
          resolve(res);
        })
        .catch(error => {
          if (error.response.status == 422) {
            const err = error.response.data.errors;
            if (err.lowerLimit) {
              toastr["error"](err.lowerLimit);
            } else if (err.upperLimit) {
              toastr["error"](err.upperLimit);
            } else if (err.taxRate) {
              toastr["error"](err.taxRate);
            }
            if (err.hasNoLimit) {
              toastr["error"](err.hasNoLimit);
            }
          }
        })
        .finally(() => {
          commit("PROCESSING_TAX_RANGE", false);
        });
    });
  }
};
