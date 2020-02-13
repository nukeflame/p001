/* Main Js */

import Vue from "vue";
import Urls from "./urls";
import App from "./App.vue";
import store from "./store/index";
import router from "./router/index";
import "chart.js";
import VueGoodTablePlugin from "vue-good-table";
import "vue-good-table/dist/vue-good-table.min.css";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import "toastr/build/toastr.css";
import server from "./server";

require("./config/index");

Vue.use(Urls);
Vue.use(VueGoodTablePlugin);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  router,
  created() {
    //realtime server start
    server();
  },
  render: h => h(App)
}).$mount("#app");
