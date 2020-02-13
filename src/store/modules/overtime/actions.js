/**
 *
 * Main overtime actions
 */

import baseurl from "../../../config/baseUrl";

export default {
  fetchOvertimes({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/overtime")
        .then(res => {
          commit("FETCH_OVERTIME", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createOvertime({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("ADDING_OVERTIME", true);
      baseurl
        .post("api/overtime", data)
        .then(res => {
          commit("CREATE_OVERTIME", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          commit("ADDING_OVERTIME", false);
        });
    });
  },

  updateOvertime({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("UPDATING_OVERTIME", true);
      baseurl
        .put(`api/overtime/${data.id}`, data)
        .then(res => {
          commit("UPDATE_OVERTIME", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          commit("UPDATING_OVERTIME", false);
        });
    });
  },

  destroyOvertime({ commit }, ids) {
    return new Promise((resolve, reject) => {
      baseurl
        .delete(`api/overtime/${ids}`)
        .then(res => {
          // commit("UPDATE_OVERTIME", res.data);
          console.log(res.data);

          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
