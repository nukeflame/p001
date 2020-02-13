import AuthService from "../../../config/auth";

const Auth = new AuthService();

export default {
  FETCH_CODE(state, code) {
    const data = {
      id: code.id,
      name: code.name
    };
    localStorage.setItem("AC", JSON.stringify(data));
    state.authCode = code;
  },

  FETCH_CODE_LOADING(state, loading) {
    state.authLoading = loading;
  },

  AUTH_LOADING(state, loading) {
    state.login = loading;
  },

  LOGIN_USER(state, res) {
    Auth.setToken(res.token, res.expiration + Date.now());
    state.level = res.acc_level;
    window.location.href = "/";
  }
};
