/**
 * Authentication package
 */

export default function(Vue) {
  Vue.auth = {
    // Set token
    setToken(token, expiration) {
      localStorage.setItem("token", token);
      localStorage.setItem("expiration", expiration);
    },

    // Get token
    getToken() {
      var token = localStorage.getItem("token");
      var expiration = localStorage.getItem("expiration");

      if (!token || !expiration) {
        this.destroyToken();
        return null;
      }

      if (Date.now() > parseInt(expiration)) {
        return null;
      } else {
        return token;
      }
    },

    // Destroy token
    destroyToken() {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
    },

    // IsAuthenticated token
    isLoggedIn() {
      if (this.getToken()) {
        return true;
      } else {
        return false;
      }
    }
  };
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        return Vue.auth;
      }
    }
  });
}
