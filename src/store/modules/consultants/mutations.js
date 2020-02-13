/**
|--------------------------------------------------
| Mutationd - consultants
|--------------------------------------------------
*/

export default {
  FETCH_CONSULTANTS(state, consultants) {
    state.consultants = consultants;
  },

  CREATE_CONSULTANT(state, consultant) {
    state.consultants.unshift(consultant);
  },

  SAVING_CONSULTANT(state, consultant) {
    state.savingConsultant = consultant;
  }
};
