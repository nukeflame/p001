<template>
  <span>
    <!-- check in notification -->
    <span v-if="notf.type.includes('CheckInNotification')">
      <li :class="[notf.readAt == null ? 'notfbox-bg' : '','notfbox-container']">
        <!-- @click.prevent="markUnreadIndividual(info.user_id)" -->
        <div class="notfbox-avatar">
          <span class="fa fa-sign-in f-s-30 btn-primary"></span>
        </div>
        <div class="notfbox-body">
          <span>
            <router-link
              to="/users"
            >{{ notf.data.checkin && notf.data.checkin.otherNames + ' ' + notf.data.checkin && notf.data.checkin.surname }}</router-link>
          </span>&nbsp;
          <!-- <router-link
              to="/users"
            >{{ notf.data.checkin && notf.data.checkin.otherNames + ' ' + notf.data.checkin && notf.data.checkin.surname }}</router-link>&nbsp;,
            <router-link
              to="/users"
            >{{ notf.data.checkin && notf.data.checkin.otherNames + ' ' + notf.data.checkin && notf.data.checkin.surname }}</router-link>&nbsp;and
            <router-link
              to="/users"
            >{{ notf.data.checkin && notf.data.checkin.otherNames + ' ' + notf.data.checkin && notf.data.checkin.surname }}</router-link>
          </span>&nbsp;-->
          <span>
            Just checked in to work at :
            "
            <span
              class="bold"
            >{{ getTime(notf.data.checkin && notf.data.checkin.timeIn)}}</span>
            "
            on {{ getDay(notf.data.checkin && notf.data.checkin.timeIn)}}
          </span>
        </div>
        <time class="notfbox-timestamp" :title="notf.data.checkin && notf.data.checkin.timeIn">
          <relative-date :moment="notf.data.checkin.timeIn"></relative-date>
        </time>
      </li>
    </span>

    <!-- check out notification -->
    <span v-else-if="notf.type.includes('CheckOutNotification')">
      <li :class="[notf.readAt == null ? 'notfbox-bg' : '','notfbox-container']">
        <!-- @click.prevent="markUnreadIndividual(info.user_id)" -->
        <div class="notfbox-avatar">
          <span class="fa fa-sign-out f-s-30 btn-danger"></span>
        </div>
        <div class="notfbox-body">
          <span>
            <router-link
              to="/users"
            >{{ notf.data.checkout && notf.data.checkout.otherNames + ' ' + notf.data.checkout && notf.data.checkout.surname }}</router-link>
          </span>&nbsp;
          <span>
            Just checked in to work at :
            "
            <span
              class="bold"
            >{{ getTime(notf.data.checkout && notf.data.checkout.timeIn)}}</span>
            "
            on {{ getDay(notf.data.checkout && notf.data.checkout.timeIn)}}
          </span>
        </div>
        <time class="notfbox-timestamp" :title="notf.data.checkout && notf.data.checkout.timeIn">
          <relative-date :moment="notf.data.checkout.timeIn"></relative-date>
        </time>
      </li>
    </span>
  </span>
</template>

<script>
import RelativeDate from "../RelativeDate";
import moment from "moment";
import { mapActions } from "vuex";

export default {
  props: ["notf"],

  created() {
    this.getTime();
    this.getDay();
  },

  components: {
    RelativeDate
  },

  methods: {
    // ...mapActions(["markUnreadUser"]),
    getTime(time) {
      return moment(time).format("LT");
    },

    getDay(time) {
      return moment(time).format("MMMM Do YYYY");
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
      //   this.markUnreadUser(id);
      // this.$router.push("/notifications");
    }
  }
};
</script>

<style>
/* .notfbox-bg {
  background-color: #aacbff26 !important;
} */
</style>
