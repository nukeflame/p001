<template>
  <div class="container">
    <div class="justify-content-center row">
      <div class="form-box col-sm-5 col-lg-5">
        <div class="loginbg" style="background: rgba(32, 168, 216, 0.25);">
          <div class="form-top">
            <div class="form-top-left">
              <h3>{{ client.name }}</h3>
            </div>
          </div>
          <div class="form-bottom">
            <h6 class="font-white">Please insert your credentials</h6>
            <form class @submit.prevent="submitLogin">
              <div class="mt-3 form-group">
                <label for="form-username" class="sr-only">Username</label>
                <input
                  name="username"
                  placeholder="Username"
                  id="username"
                  type="text"
                  class="form-username form-control"
                  autofocus
                  v-model="auth.username"
                />
                <div class="animated fadeIn invalid-feedback" style="color: rgb(255, 235, 59);"></div>
              </div>
              <div class="my-3 form-group">
                <input
                  name="password"
                  placeholder="Password"
                  id="password"
                  type="password"
                  class="form-password form-control"
                  v-model="auth.pwd"
                />
                <div class="animated fadeIn invalid-feedback" style="color: rgb(255, 235, 59);"></div>
              </div>
              <button type="submit" class="btn loginsubmit-btn mb-2">
                <span v-if="authLogin">
                  <img src="../../assets/loader/round-lg.svg" alt srcset />
                </span>
                <span v-else>
                  Sign In
                  <i class="icon-login"></i>
                </span>
              </button>
            </form>
            <br />
            <p class="mt-2 text-center">
              <router-link to="/accounts/forgot-password" class="forgot mr-2">
                <i class="fa fa-key"></i> Forgot Password?
              </router-link>
              <a href="#" @click.prevent="toChangeCode" class="forgot mr-2">
                <i class="fa fa-sign-out"></i> Change Payroll Code
              </a>
              <router-link to="/accounts/forgot-password" class="forgot">
                <i class="fa fa-user"></i> Employee Portal
              </router-link>
            </p>
            <p class="mb-2 color-white text-center">
              Epsotech Copyright © 2019. All rights reserved
              <br />Help and Support : info@epsotechsolutions.com
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      authChange: false,
      client: "",
      auth: {
        pwd: "",
        username: ""
      }
    };
  },

  mounted() {
    const client = JSON.parse(localStorage.getItem("AC"));
    this.client = client;
    if (!client) {
      this.$router.push("/accounts/payroll-auth");
    }
  },

  computed: {
    ...mapState({
      authCode: state => state.authCode.authCode,
      authLogin: state => state.authCode.login
    })
  },

  methods: {
    ...mapActions(["loginUser"]),
    submitLogin() {
      const data = {
        pwd: this.auth.pwd,
        username: this.auth.username,
        clientId: this.client.id
      };

      this.loginUser(data);
    },

    toChangeCode() {
      this.$router.push("/accounts/payroll-auth");
      localStorage.removeItem("AC");
    }
  }
};
</script>