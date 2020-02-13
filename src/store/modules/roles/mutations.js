/**
 * Roles - Mutations
 */
import { extend } from "lodash";

export default {
  FETCH_ROLES(state, roles) {
    state.roles = roles;
  },

  CREATE_ROLE(state, role) {
    state.roles.push(role);
  },

  UPDATE_ROLE(state, role) {
    const data = state.roles.find(r => r.id === role.id);
    extend(data, role);
  },

  CREATING_ROLE(state, loading) {
    state.creatingRole = loading;
  }

  // showRole(state, role) {
  //   state.showRole = [];
  //   role.permissions.forEach(item => {
  //     state.showRole.push(item.id);
  //   });
  // }

  //   addRolePerm(state, role) {
  //     state.showRole = [];
  //     role.permissions.forEach(item => {
  //       state.showRole.push(item.id);
  //     });
  //   }
};
