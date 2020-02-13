/**
 *
 * Main attendance mutations
 */

export default {
  FETCH_LEAVES(state, leaves) {
    state.leaves = leaves;
  },

  CREATE_LEAVE(state, leave) {
    state.leaves.unshift(leave);
  },

  CREATING_LEAVE(state, loading) {
    state.creatingLeave = loading;
  },

  FETCH_LEAVES_TYPE(state, data) {
    state.leaveTypes = data;
  },

  DEL_LEAVE(state, leaves) {
    for (let i = 0; i < leaves.length; i++) {
      const el = leaves[i];
      const data = state.leaves.find(data => {
        return data.id == el.id;
      });

      state.leaves.splice(state.leaves.indexOf(data), 1);
    }
  }
};
