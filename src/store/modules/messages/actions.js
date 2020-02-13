/**
|--------------------------------------------------
| Actions - Advances
|--------------------------------------------------
*/
import baseurl from "../../../config/baseUrl";

export default {
  fetchMessages({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/messages")
        .then(res => {
          commit("FETCH_MESSAGES", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  showMessages({ commit }, user) {
    commit("CHAT_USER", user);
    commit("FINDING_MESSAGES", true);
    return new Promise((resolve, reject) => {
      baseurl
        .get(`api/messages/${user.id}`)
        .then(res => {
          commit("SHOW_MESSAGES", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          commit("FINDING_MESSAGES", false);
        });
    });
  },

  createMessage({ commit }, message) {
    return new Promise((resolve, reject) => {
      baseurl
        .post("api/messages/send", message)
        .then(res => {
          commit("SEND_MESSAGE", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
