/**
 *
 * Main roles actions
 */

import baseurl from "../../../config/baseUrl";

export default {
  fetchPermissions({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/permissions")
        .then(res => {
          commit("FETCH_PERMS", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  showRolePerms({ commit }, Id) {
    return new Promise((resolve, reject) => {
      baseurl
        .get(`api/permissions/${Id}`)
        .then(res => {
          commit("SHOW_PERMS", res.data);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
