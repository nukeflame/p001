<template>
  <div class="login-wrapper">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-shadow">
          <div class="card-body">
            <form
              accept-charset="UTF-8"
              data-role="form"
              method="post"
              @submit.prevent="submitLogin"
            >
              <div class="form-section text-center">
                <img
                  class="mb0 mt10"
                  :src="$resource.getBaseUrl() + 'layouts/img/logo.png'"
                  width="115"
                  height="115"
                  style="margin-left: 28px;"
                />
                <h3 style="font-size: 26px; margin-top: 9px; color: #333;">Payroll</h3>
                <p class="mt-0 mb-0">Sign in with your account</p>
              </div>
              <div class="form-section">
                <div class="form-group">
                  <label for="auth_username" class="color-black">Email Address</label>
                  <input
                    class="form-control"
                    id="auth_username"
                    placeholder="you@example.com"
                    type="text"
                    autofocus
                    v-model="auth.username"
                  />
                </div>
                <div class="form-group">
                  <label for="auth_pwd" class="color-black">Password</label>
                  <input
                    class="form-control"
                    id="auth_pwd"
                    placeholder="********"
                    type="password"
                    v-model="auth.pwd"
                  />
                </div>
                <div style="font-size: 14px; margin-bottom: 1rem; margin-top: -.5rem">
                  <router-link to="/accounts/forgot-password">Forgot your password?</router-link>
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block btn-rounded">
                  <span :class="[loading ? 'hidden' : '']">Sign in</span>
                  <img
                    v-if="loading"
                    :src="$resource.getBaseUrl() + 'images/loader/round-svg-23.svg'"
                    alt="Loading..."
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import toastr from "toastr";
import baseUrl from "../../config/baseUrl";
import AuthService from "../../config/auth";

const Auth = new AuthService();

export default {
  data() {
    return {
      loading: false,
      auth: {
        pwd: "",
        username: ""
      }
    };
  },

  methods: {
    submitLogin() {
      this.loading = true;
      const data = {
        client_id: 2,
        client_secret: "YGSUchEEMvjEAOtCL1jOTNSlriaURvbPbbqXB8ke",
        grant_type: "password",
        username: this.auth.username,
        password: this.auth.pwd,
        scope: "*"
      };

      baseUrl
        .post("oauth/token", data)
        .then(res => {
          Auth.setToken(
            res.data.access_token,
            res.data.expires_in + Date.now()
          );

          // window.location.href = this.$resource.getBaseUrl();
        })
        .catch(error => {
          if (error.response.status === 400) {
            $("#auth_username, #auth_pwd").addClass("is-invalid");
            toastr["error"]("Please fill in all the fields correctly!");
          } else if (error.response.status === 401) {
            $("#auth_username, #auth_pwd").addClass("is-invalid");
            toastr["error"]("The user is not recognized or password incorrect");
          } else {
            toastr["error"](error);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>