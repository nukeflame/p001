/**
 *
 * Main attendance mutations
 */
import Vue from "vue";

export default {
  fetchAttendance(state, attendance) {
    state.attendance = attendance;
  },

  getAttendance(state, attendance) {
    state.getAttendance = attendance;
  },

  timeIn(state, attendance) {
    const data = state.attendance.find(field => {
      return field.id == attendance.user_id;
    });

    data.attendance.push(attendance);
  },

  timeOut(state, attendance) {
    const data = state.attendance.find(field => {
      return field.id == attendance.user_id;
    });

    const item = data.attendance.find(data => {
      return data.id === attendance.id;
    });

    _.extend(item, attendance);
  },

  attendanceLoading(state, loading) {
    state.usersLoading = loading;
  },

  serveConnect(state, data) {
    state.connect = data;
  },

  checkInRT(state, data) {
    state.checkInRT.unshift(data.shift());
  }
};
