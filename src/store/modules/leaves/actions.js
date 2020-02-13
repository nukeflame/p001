/**
 *
 * Main attendance actions
 */

import baseurl from "../../../config/baseUrl";
import toastr from "toastr";

export default {
  fetchLeaves({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/leaves")
        .then(res => {
          commit("FETCH_LEAVES", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  fetchLeavesType({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/leaves_type")
        .then(res => {
          commit("FETCH_LEAVES_TYPE", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createLeave({ commit }, leaveData) {
    return new Promise(resolve => {
      commit("CREATING_LEAVE", true);
      baseurl
        .post("api/leaves", leaveData)
        .then(res => {
          console.log(res.data);

          // commit("CREATE_LEAVE", res.data);
          // toastr["success"]("New period record added successfully!");
          resolve(res);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          commit("CREATING_LEAVE", false);
        });
    });
  },

  destroyLeave({ commit }, Ids) {
    let dataIds = [];
    for (var i = 0; i < Ids.length; i++) {
      dataIds.push(Ids[i].id);
    }
    return new Promise(resolve => {
      baseurl.delete(`api/leaves/${dataIds}`).then(res => {
        commit("DEL_LEAVE", res.data);
        resolve();
      });
    });
  }
};
