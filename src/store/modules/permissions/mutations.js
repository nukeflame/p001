/**
 * Permissions - Mutation
 */

export default {
  FETCH_PERMS(state, permissions) {
    state.permissions = permissions;
    state.permRoles = permissions;
  },

  SHOW_PERMS(state, privilages) {
    if (privilages.length) {
      // const data =
      for (let i = 0; i < privilages.length; i++) {
        const p = privilages[i];
        console.log(p);

        // const data = state.permRoles.filter(f => {
        //   if (f.id !== p.id) {
        //     return f;
        //   } else {
        //     state.permRoles = state.permissions;
        //   }
        // });

        // state.permRoles = data;
      }
    } else {
      state.permRoles = state.permissions;
    }
    state.privilages = privilages;
  }
};
