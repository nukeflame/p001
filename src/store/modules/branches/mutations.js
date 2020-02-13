/**
 *
 * Main branches mutations
 */
import Vue from "vue";

export default {
  fetchBranches(state, branches) {
    state.branches = branches;
  },

  getbranches(state, branches) {
    state.getbranches = branches;
  },

  timeIn(state, branches) {
    const data = state.branches.find(field => {
      return field.id == branches.id;
    });
  },

  branchesLoading(state, loading) {
    state.usersLoading = loading;
  }
};
