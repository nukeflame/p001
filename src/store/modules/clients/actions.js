/**
 *
 * Main users actions
 */

import baseurl from "../../../config/baseUrl";
import toastr from "toastr";

export default {
  fetchClients({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/clients")
        .then(res => {
          console.log(res.data);

          commit("FETCH_CLIENTS", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createClient({ commit }, data) {
    commit("CREATING_CLIENT", true);
    return new Promise((resolve, reject) => {
      baseurl
        .post("api/clients", data)
        .then(res => {
          console.log(res.data);
          commit("ADD_CLIENT", res.data);
          resolve(res);
        })
        .catch(error => {
          if (error.response.status == 422) {
            const err = error.response.data.errors;
            console.log(err);
            if (err.clientName) {
              toastr.error(err.clientName);
            } else if (err.clientEmail) {
              toastr.error(err.clientEmail);
            } else if (err.clientId) {
              toastr.error(err.clientId);
            } else if (err.company) {
              toastr.error(err.company);
            } else if (err.emailAddress) {
              toastr.error(err.emailAddress);
            } else if (err.telephone) {
              toastr.error(err.telephone);
            } else if (err.location) {
              toastr.error(err.location);
            }
          }
        })
        .finally(() => {
          commit("CREATING_CLIENT", false);
        });
    });
  }
};
