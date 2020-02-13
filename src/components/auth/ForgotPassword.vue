<template>
  <div class="login-wrapper">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-shadow">
          <div class="card-body">
            <form @submit.prevent="checkEmail">
              <div class="form-section text-center">
                <h3 class="my-4 f-s-26 color-black">Forgot your account password?</h3>
                <p class="mt0 mb0">Please enter your previous email adress</p>
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
                    required
                    v-model="auth.username"
                  >
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">
                  <span :class="[signInLoading ? 'u-hidden' : '']">Submit</span>
                  <img
                    v-if="signInLoading"
                    :src="$resource.getBaseUrl() +  'images/loader/round-svg-23.svg'"
                    alt="Loading..."
                  >
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="my-1">
          <router-link to="/accounts/login">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import toastr from "toastr";

export default {
  data() {
    return {
      auth: {
        pwd: "",
        username: ""
      },
      errorLogin: "",
      signInLoading: false,
      btnDisabled: "disabled"
    };
  },
  methods: {
    ...mapActions(["checkEmailExists"]),

    checkEmail() {
      if (this.auth.username.length != 0) {
        this.checkEmailExists(this.auth).then(res => {
          if (res.data.exits) {            
            this.$router.push({ name: 'verify-user', params: { userData: res.data.exits }});
          }
          else {
            toastr['error']("Email not recognized in our system");
          }
        });
      }
    }
  }
};
</script>
