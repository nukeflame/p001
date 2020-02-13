<template>
  <span>
    <!-- <li class="notification-divider clearfix">New</li> -->
    <!-- check in notification -->
    <span v-if="notf && notf.type.includes('CheckInNotf')">
      <li
        :class="[notf && notf.read_at == null ? 'notfbox-bg' : '','notfbox-container']"
        @click.prevent="markUnreadIndividual(info.user_id)"
      >
        <div class="notfbox-avatar">
          <span class="fa fa-sign-in f-s-30 btn-primary"></span>
        </div>
        <div class="notfbox-body">
          <span v-for="user in users" :key="user.id">
            <span v-if="info.user_id === user.id">
              <router-link to="/users" :title="user.name">{{ user.name}}</router-link>
            </span>
          </span>&nbsp;
          <span>Just checked in the system at : "{{ getTime(info.time_in)}}" on {{ getDay(info.time_in)}}</span>
        </div>
        <time class="notfbox-timestamp" :title="info.time_in">
          <i class="ti-time f-s-12"></i>
          {{ getTimestamp(info.time_in) }}
        </time>
      </li>
    </span>

    <!-- check out notification -->
    <span v-else-if="notf && notf.type.includes('CheckOutNotf')">
      <li
        :class="[notf && notf.read_at == null ? 'notfbox-bg' : '','notfbox-container']"
        @click.prevent="markUnreadIndividual(info.user_id)"
      >
        <div class="notfbox-avatar">
          <span class="fa fa-sign-in f-s-30 btn-danger"></span>
        </div>
        <div class="notfbox-body">
          <span v-for="user in users" :key="user.id">
            <span v-if="info.user_id === user.id">
              <router-link to="/users" :title="user.name">{{ user.name}}</router-link>
            </span>
          </span>&nbsp;
          <span>Just checked out the system at : "{{ getTime(info.time_in)}}" on {{ getDay(info.time_in)}}</span>
        </div>
        <time class="notfbox-timestamp" :title="getTimeTitle(info.time_in)">
          <i class="ti-time f-s-12"></i>
          {{ getTimestamp(info.time_in) }}
        </time>
      </li>
    </span>
  </span>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {
  props: ["notf", "users"],

  data() {
    return {
      info: this.notf.data.attendance
    };
  },

  created() {
    this.getTime();
    this.getDay();
  },

  methods: {
    ...mapActions(["markUnreadUser"]),
    getTime(time) {
      return moment(time).format("LT");
    },

    getDay(time) {
      return moment(time).format("MM-DD-YYYY");
    },

    getTimestamp(time) {
      return moment(time)
        .calendar()
        .toLowerCase();
    },
    getTimeTitle(time) {
      return moment(time).format("MMM Do, YYYY");
    },
    markUnreadIndividual(id) {
      this.markUnreadUser(id);
      // this.$router.push("/notifications");
    }
  }
};
</script>

<style>
.notfbox-bg {
  background-color: #aacbff26 !important;
}
</style>
