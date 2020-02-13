/**
|--------------------------------------------------
| Actions - Consultants
|--------------------------------------------------
*/
import baseurl from "../../../config/baseUrl";

export default {
  fetchConsultants({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/consultants")
        .then(res => {
          commit("FETCH_CONSULTANTS", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createConsultant({ commit }, data) {
    commit("SAVING_CONSULTANT", true);
    return new Promise((resolve, reject) => {
      baseurl
        .post("api/consultants", data)
        .then(res => {
          commit("CREATE_CONSULTANT", res.data);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
          commit("SAVING_CONSULTANT", false);
        });
    });
  }
};
