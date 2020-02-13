<template>
  <ul class="menu">
    <span v-if="displayRow.length > 0">
      <notification v-for="notf in displayRow" :key="notf.id" :notf="notf" :users="users"></notification>
    </span>
    <span v-else>
      <li class="mt-3 text-center">
        <p>No new Notification!</p>
      </li>
    </span>
  </ul>
</template>

<script>
import Notification from "./Notification.vue";
import io from "socket.io-client";
import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      displayRow: [],
      checkInNotf: [],
      checkOutNotf: [],
      check: []
    };
  },

  components: {
    Notification
  },

  computed: {
    ...mapState({
      users: state => state.users.users
    })
  },

  created() {
    this.getNotifications();
  },

  mounted() {
    // this.listenForChanges();
  },

  methods: {
    getNotifications() {
      this.$store.dispatch("authUser").then(res => {
        const notfs = res.data.auth.notifications;

        for (let i = 0; i < notfs.length; i++) {
          const item = notfs[i];
          this.displayRow.push(item);
        }
      });
    },

    listenForChanges() {
      axios.get("api/getAuthUserId").then(response => {
        const userId = response.data.user_id;

        Echo.private(`App.User.${userId}`).notification(latest => {
          console.log(latest);

          // let unreadNotf = this.$store.state.users.unreadNotf;
          // unreadNotf.push(latest);
          // this.displayRow.unshift(latest);
        });

        // socket.on("connect", () => {
        //   console.log("Successfully connected!");
        // });
        // Echo.private(`App.User.${userId}`).notification(latest => {
        //   console.log(latest);

        //   let unreadNotf = this.$store.state.users.unreadNotf;
        //   unreadNotf.push(latest);
        //   this.displayRow.unshift(latest);
        // });
      });
    }
  }
};
</script>

