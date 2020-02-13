import { forIn } from "lodash";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      authUser: state => state.users.authUser
    })
  },

  created() {
    this.$store.dispatch("authUser").then(() => {
      forIn(this.getEventHandlers(), (handler, eventName) => {
        // const userId = this.authUser.id;
        //leaves
        window.Echo.channel(`leaves`).listen(eventName, e => handler(e));
        //payments
        window.Echo.channel(`payments`).listen(eventName, e => handler(e));
        //dashboard
        window.Echo.channel(`dashboard`).listen(eventName, e => handler(e));
        //attendance
        window.Echo.channel(`attendance`).listen(eventName, e => handler(e));
      });
    });
  }
};
