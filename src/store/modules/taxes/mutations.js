/**
 *
 * Main roles mutations
 */

export default {
  FETCH_TAXES(state, taxes) {
    state.taxes = taxes;
  },

  CREATE_TAX_RANGE(state, taxes) {
    state.taxes.push(taxes);
  },

  PROCESSING_TAX_RANGE(state, loading) {
    state.processTax = loading;
  }
};
