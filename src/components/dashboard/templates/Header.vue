<template>
  <nav class="navbar top-navbar navbar-expand-md navbar-light">
    <!-- Logo -->
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand">
        <!-- Logo icon -->
        <b>
          <!-- <span  style="color: #000;">Epsotech Solutions</span> -->
        </b>
        <!--End Logo icon -->
        <!-- Logo text -->
        <span>
          <img :src="getImgUrl() + settings.logoUrl" height="60" width="100" alt class="dark-logo" />
          <!-- <img src="" alt="logo" class="dark-logo"> -->
        </span>
      </router-link>
    </div>
    <!-- End Logo -->
    <div class="navbar-collapse">
      <!-- toggle and nav items -->
      <ul class="navbar-nav mr-auto mt-md-0">
        <!-- This is  -->
        <li class="nav-item">
          <a class="nav-link nav-toggler hidden-md-up text-muted" href="javascript:void(0)">
            <i class="mdi mdi-menu"></i>
          </a>
        </li>
        <li class="nav-item m-l-10">
          <a class="nav-link sidebartoggler hidden-sm-down text-muted" href="javascript:void(0)">
            <i class="ti-menu"></i>
          </a>
        </li>
        <!--  -->
        <li class="nav-item m-l-10">
          <h4 class="nav-link sidebartoggler hidden-sm-down text-dark mb-0 bold">{{ client.name }}</h4>
        </li>
      </ul>
      <!-- User profile and search -->
      <ul class="navbar-nav my-lg-0">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-muted text-muted"
            href="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            @click.prevent="markAllRead"
          >
            <i class="fa fa-bell"></i>
            <div class="notify-label" v-if="unreadNotf.length > 0">
              <span class="label label-danger">{{ unreadNotf && unreadNotf.length }}</span>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-right notfbox">
            <ul class="dropdown-user">
              <li class="header">
                Notifications
                <span
                  class="notf-read"
                  v-if="notifications && notifications.length > 0"
                >
                  <a href="#" @click.prevent="markAllRead">Mark All as Read</a>
                </span>
              </li>
              <li>
                <notification-section :notifications="notifications"></notification-section>
              </li>
              <li class="foot">
                <a href="#">See All</a>
                <!-- <router-link to="/notifications">See All</router-link> -->
              </li>
            </ul>
          </div>
        </li>
        <!-- Messages -->
        <!-- <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-muted"
            href="#"
            id="2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fa fa-envelope"></i>
            <div class="notify">
              <span class="count bg-primary">4</span>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-right mailbox" aria-labelledby="2">
            <ul>
              <li>
                <div class="drop-title">You have 4 new messages</div>
              </li>
              <li>
                <div class="message-center">
                  <a href="#">
                    <div class="user-img">
                      <img src="images/users/5.jpg" alt="user" class="img-circle">
                      <span class="profile-status online pull-right"></span>
                    </div>
                    <div class="mail-contnet">
                      <h5>Michael Qin</h5>
                      <span class="mail-desc">Just see the my admin!</span>
                      <span class="time">9:30 AM</span>
                    </div>
                  </a>
                </div>
              </li>
              <li>
                <a class="nav-link text-center" href="javascript:void(0);">
                  <strong>See all e-Mails</strong>
                  <i class="fa fa-angle-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </li>-->
        <!-- Profile -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-muted"
            href="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img src="../../../assets/images/avatar.png" alt class="profile-pic" />
          </a>
          <div class="dropdown-menu dropdown-menu-right animated fadeIn">
            <ul class="dropdown-user">
              <li>
                <a href="#" class="profile-name">
                  <i class="fa fa-user-o"></i>
                  {{ authUser.email }}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  @click.prevent="logout"
                  style="padding: 9px 15px; display: block; color: #67757c;"
                >
                  <i class="fa fa-power-off"></i> Logout
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import NotificationSection from "./notifications/NotificationSection.vue";
import { mapState, mapActions } from "vuex";
import { apiDomain } from "../../../config/defaultUrls";
import { imgUrl } from "../../../config/defaultUrls";

export default {
  data() {
    return {
      client: "",
      notificationData: "",
      imgUrl: apiDomain
    };
  },

  components: {
    "notification-section": NotificationSection
  },

  computed: {
    ...mapState({
      notifications: state => state.users.notifications,
      unreadNotf: state => state.users.unreadNotf,
      authUser: state => state.users.authUser,
      settings: state => state.settings.genSettings
    })
  },

  mounted() {
    const client = JSON.parse(localStorage.getItem("AC"));
    this.client = client;
  },

  created() {
    this.$store.dispatch("fetchNotifications");
    this.$store.dispatch("fetchGeneralSettings");
    this.listenForChanges();
  },

  methods: {
    ...mapActions(["markUnreadNotf"]),

    listenForChanges() {
      this.$store.dispatch("authUser").then(() => {
        const userId = this.authUser.id;
        window.Echo.private("user." + userId).notification(notification => {
          this.getNotificationHandler(notification);
        });
      });
    },

    getNotificationHandler(n) {
      const unread = {
        id: n.id,
        data: n.data,
        type: n.type
      };
      this.$store.commit("ADD_USER_NOTF", unread);
      this.$store.commit("ADD_USER_UREAD_NOTF", unread);
    },

    markAllRead() {
      // this.markUnreadNotf().then(() => {
      //   $(".notfbox-container").removeClass("notfbox-bg");
      // });
    },

    getImgUrl() {
      return imgUrl;
    },

    logout() {
      this.$auth.destroyToken();
      this.$router.push("/accounts/signin");
    }
  }
};
</script>
<style>
.profile-name {
  padding: 9px 15px;
  color: #67757c;
  display: block;
  width: 200px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
