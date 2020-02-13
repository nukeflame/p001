<template>
  <ul class="menu">
    <span v-if="notifications.length > 0">
      <notification v-for="(notf, index) in notifications" :key="index" :notf="notf"></notification>
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
import { mapState } from "vuex";

export default {
  // props: ["notifications"],

  data() {
    return {
      displayRow: []
    };
  },

  components: {
    Notification
  },

  computed: {
    ...mapState({
      notifications: state => state.users.notifications
    })
  },

  methods: {}
};
</script>