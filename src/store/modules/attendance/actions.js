/**
 *
 * Main attendance actions
 */

import baseurl from "../../../config/baseUrl";

export default {
  fetchAttendance({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/attendance")
        .then(res => {
          commit("fetchAttendance", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          commit("attendanceLoading", false);
        });
    });
  },

  getAttendance({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/attendance/create")
        .then(res => {
          commit("getAttendance", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  timeIn({ commit }, data) {
    return new Promise((resolve, reject) => {
      baseurl
        .post("api/attendance/post", data)
        .then(response => {
          commit("timeIn", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  timeOut({ commit }, data) {
    return new Promise((resolve, reject) => {
      baseurl
        .put("api/attendance/" + data.userId, data)
        .then(response => {
          commit("timeOut", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  checkInRT({ commit }, data) {
    commit("checkInRT", data);
  }
};
