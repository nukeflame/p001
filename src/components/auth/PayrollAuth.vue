<template>
  <div class="top-content">
    <div class="row">
      <div class="col-sm-12">
        <div class="container">
          <div class="loginbg" style="background: rgb(51, 153, 255);">
            <div class="form-top">
              <div class="form-top-left">
                <h3 class="bold">Payroll Management System</h3>
                <span class="f-s-14">Epsotech Solutions Limited &trade;</span>
              </div>
            </div>
            <div class="form-bottom">
              <h3 class="font-white f-s-13">Enter payroll pin code</h3>
              <form @submit.prevent="runAuth">
                <div class="mb-3 form-group">
                  <label for="form-username" class="sr-only">Hospital Code</label>
                  <input
                    name="hospital_code"
                    id="hospital_code"
                    autocomplete="off"
                    type="text"
                    class="form-username form-control"
                    style="color: rgb(0, 0, 0);"
                    v-model="authData.pin"
                    required
                  />
                  <div class="animated fadeIn invalid-feedback" style="color: rgb(139, 0, 0);"></div>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    v-model="authData.remember"
                    id="save-code"
                  />
                  <label class="custom-control-label" for="save-code">Remember Code</label>
                </div>
                <button type="submit" class="btn loginsubmit-btn" :class="{'disabled' : loading}">
                  <span v-if="loading">
                    <img src="../../assets/loader/round-lg.svg" alt srcset />
                  </span>
                  <span v-else>
                    Authenticate
                    <i class="fa fa-key pl-2"></i>
                  </span>
                </button>
              </form>
              <br />
              <p class="mt-3 mb-0 text-center text-dark">
                Epsotech Copyright © 2019. All rights reserved
                <br />Help and Support : info@epsotechsolutions.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      authData: {
        pin: "",
        remember: false
      }
    };
  },

  computed: {
    ...mapState({
      loading: state => state.authCode.authLoading
    })
  },

  mounted() {
    const client = JSON.parse(localStorage.getItem("AC"));
    if (client) {
      this.$router.push("/accounts/signin");
    }
  },

  methods: {
    ...mapActions(["fetchAuthCode"]),
    runAuth() {
      this.fetchAuthCode(this.authData).then(() => {
        this.$router.push("/accounts/signin");
      });
    }
  }
};
</script>

<style >
.top-content {
  margin: 0 auto;
}
.top-content .container {
  width: 445px;
}
.form-top-left {
  padding-top: 15px;
}
</style>