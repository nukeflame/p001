/**
 *
 * Main branches actions
 */

import baseurl from "../../../config/baseUrl";

export default {
  fetchBranches({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/branches")
        .then(res => {
          commit("fetchBranches", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
