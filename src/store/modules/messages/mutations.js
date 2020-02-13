/**
|--------------------------------------------------
| Mutationd - Advances
|--------------------------------------------------
*/

export default {
  FETCH_MESSAGES(state, messages) {
    state.messages = messages;
  },

  SEND_MESSAGE(state, message) {
    state.messages.push(message);
  },

  CHAT_USER(state, user) {
    state.chatUser = user;
    state.chatBoxOpen = true;
  },

  FINDING_MESSAGES(state, loading) {
    state.findingMessages = loading;
  },

  SHOW_MESSAGES(state, messages) {
    state.messages = messages;
  }
};
