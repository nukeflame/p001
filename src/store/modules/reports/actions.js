/**
 *
 * Main attendance actions
 */

import baseurl from "../../../config/baseUrl";

export default {
  fetchReports({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/periods")
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createReport({ commit }, data) {}
};
