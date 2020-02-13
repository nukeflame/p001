/**
 *
 * Main roles actions
 */

import baseurl from "../../../config/baseUrl";
import toastr from "toastr";

export default {
  fetchRoles({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/roles")
        .then(res => {
          commit("FETCH_ROLES", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createRole({ commit }, data) {
    commit("CREATING_ROLE", true);
    return new Promise(resolve => {
      baseurl
        .post("api/roles", data)
        .then(res => {
          toastr.success(`The role was added successfully.`);
          commit("CREATE_ROLE", res.data);
          resolve(res);
        })
        .catch(error => {
          if (error.response.status) {
            const err = error.response.status;
            const errData = error.response.data.errors;
            if (err === 422) {
              if (errData.role) {
                toastr.error(errData.role);
              } else if (errData.slug) {
                toastr.error(errData.slug);
              } else if (errData.description) {
                toastr.error(errData.description);
              }
            }
          }
        })
        .finally(() => {
          commit("CREATING_ROLE", false);
        });
    });
  },

  updateRole({ commit }, data) {
    return new Promise(resolve => {
      baseurl
        .put(`api/roles/${data.id}`, data)
        .then(res => {
          toastr.success(`The role was updated successfully.`);
          commit("UPDATE_ROLE", res.data);
          resolve(res);
        })
        .catch(error => {
          if (error.response.status) {
            const err = error.response.status;
            const errData = error.response.data.errors;
            if (err === 422) {
              if (errData.role) {
                toastr.error(errData.role);
              } else if (errData.slug) {
                toastr.error(errData.slug);
              } else if (errData.description) {
                toastr.error(errData.description);
              }
            }
          }
        });
    });
  },

  addRolePerm({ commit }, data) {
    return new Promise((resolve, reject) => {
      baseurl
        .post("api/roles/post", data)
        .then(res => {
          // commit('addRolePerm', res.data);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  showRole({ commit }, id) {
    return new Promise((resolve, reject) => {
      // baseurl
      //   .get("api/roles/" + id)
      //   .then(res => {
      //     commit("showRole", res.data);
      //     resolve(res);
      //   })
      //   .catch(error => {
      //     reject(error);
      //   });
    });
  }
};
