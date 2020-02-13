<template>
  <div class="bg">
    <router-view></router-view>

    <!-- <div class="row">
      <div class="foot-bg">
        <div class="col-md-12">
          <div style="text-align: center;">
            <p class="small mb-0">
              &copy; {{ getFullYear() }} - Neema Payroll. - All Rights Reserved /
              <a
                href="/terms-and-conditions"
                title="Terms of Use"
                target="_blank"
              >Terms of Use</a>
            </p>
            <p class="small mb-3">Designed by
              <a href="#">Epsotech Solutions</a>
            </p>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  created() {
    this.getFullYear();
  },

  methods: {
    getFullYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style>
.bg {
  background: url("../../assets/images/login-register.jpg");
  background-color: #d4cbc1;
  height: 100%;
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.foot-bg {
  font-family: "Roboto", serif;
  color: #fff;
  background: #555;
  text-align: center;
  padding: 0.5rem 0 0;
  position: relative;
  width: 100%;
}
</style>
