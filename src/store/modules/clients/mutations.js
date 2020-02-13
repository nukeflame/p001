/**
 *
 * Main users mutations
 */

export default {
  FETCH_CLIENTS(state, clients) {
    state.clients = clients;
  },

  ADD_CLIENT(state, client) {
    state.clients.unshift(client);
  },

  CREATING_CLIENT(state, loading) {
    state.creatingClient = loading;
  }
};
