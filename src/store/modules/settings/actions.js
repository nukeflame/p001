/**
|--------------------------------------------------
| Actions - Advances
|--------------------------------------------------
*/
import baseurl from "../../../config/baseUrl";

export default {
  fetchGeneralSettings({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/general_settings")
        .then(res => {
          commit("FETCH_GEN_SETTINGS", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  updateGeneralSettings({ commit }, data) {
    commit("UPDATING_GEN_SETTINGS", true);
    return new Promise((resolve, reject) => {
      baseurl
        .put(`api/general_settings/${data.companyId}`, data)
        .then(res => {
          commit("UPDATE_GEN_SETTINGS", res.data);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
          commit("UPDATING_GEN_SETTINGS", false);
        });
    });
  }
};
