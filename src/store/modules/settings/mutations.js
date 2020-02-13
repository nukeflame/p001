/**
|--------------------------------------------------
| Mutationd - Advances
|--------------------------------------------------
*/
import { extend } from "lodash";

export default {
  FETCH_GEN_SETTINGS(state, settings) {
    state.genSettings = settings;
  },

  UPDATE_GEN_SETTINGS(state, settings) {
    state.genSettings = settings;
  },

  UPDATING_GEN_SETTINGS(state, loading) {
    state.upadatingSettings = loading;
  }
};
