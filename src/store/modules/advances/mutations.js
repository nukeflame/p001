/**
|--------------------------------------------------
| Mutationd - Advances
|--------------------------------------------------
*/

export default {
  FETCH_ADVANCES(state, advances) {
    state.advances = advances;
  },

  CREATE_ADVANCE(state, advance) {
    state.advances.unshift(advance);
  },

  FETCH_ADVANCES_BY_MONTH(state, advances) {
    state.advanceMonth = advances;
  }
};
