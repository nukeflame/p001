/**
 *
 * Main users actions
 */

import baseurl from "../../../config/baseUrl";

export default {
  fetchUsers({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/users")
        .then(res => {
          commit("FETCH_USERS", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          commit("usersLoading", false);
        });
    });
  },

  addUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      baseurl
        .post("api/users/post", data)
        .then(response => {
          commit("addUser", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  authUser({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/user")
        .then(response => {
          const user = response.data;
          commit("AUTH_USER", user);
          commit("USER_UREAD_NOTF", user.unreadNotf);
          commit("USER_NOTF", user.notifications);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  markUnreadNotf({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/user/mark-unread")
        .then(response => {
          commit("MARK_UNREAD_NOTF", []);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetchNotifications({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/notifications")
        .then(response => {
          // console.log(response.data);

          // commit("addBank", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetchOnlineUsers({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/users-online")
        .then(res => {
          commit("FETCH_ONLINE_USERS", res.data);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
