/**
 *
 * Main attendance mutations
 */

export default {
  fetchPeriods(state, data) {
    state.periods = data;
  },

  createPeriod(state, data) {
    state.periods.unshift(data);
  },

  creatingPeriod(state, loading) {
    state.creatingPeriod = loading;
  }
};
