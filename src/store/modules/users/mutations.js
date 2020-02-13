/**
 *
 * Main users mutations
 */

export default {
  FETCH_USERS(state, users) {
    state.users = users;
  },

  addUser(state, user) {
    state.users.unshift(user);
  },

  usersLoading(state, loading) {
    state.usersLoading = loading;
  },

  MARK_UNREAD_NOTF(state, clear) {
    state.unreadNotf = clear;
  },

  USER_UREAD_NOTF(state, unread) {
    state.unreadNotf = unread;
  },

  ADD_USER_UREAD_NOTF(state, unread) {
    state.unreadNotf.unshift(unread);
  },

  ADD_USER_NOTF(state, unread) {
    state.notifications.unshift(unread);
  },

  USER_NOTF(state, user) {
    state.notifications = user;
  },

  FETCH_ONLINE_USERS(state, users) {
    state.onlineUsers = users;
  },

  AUTH_USER(state, user) {
    state.authUser = user;

    let roles = [];
    user.roles.forEach(item => {
      roles.push(item.slug);
    });

    if (roles.includes("admin")) {
      state.userRole.admin = true;
    }
    if (roles.includes("branch_manager")) {
      state.userRole.manager = true;
    }
    if (roles.includes("attendance_officer")) {
      state.userRole.attendance_officer = true;
    }
    if (roles.includes("payroll_officer")) {
      state.userRole.payroll_officer = true;
    }
    if (roles.includes("reports_officer")) {
      state.userRole.reports_officer = true;
    }
    if (roles.includes("guest")) {
      state.userRole.guest = true;
    }
  },

  bankData(state, data) {
    state.bankData = {
      id: data.id,
      name: data.name
    };
  }
};
