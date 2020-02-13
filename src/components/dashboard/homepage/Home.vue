<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">
          <i class="fa fa-laptop pr-1"></i>
          Dashboard
        </h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active">Dashboard</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <div class="card bg-primary p-20">
            <div class="media widget-ten">
              <div class="media-left meida media-middle">
                <span>
                  <i class="fa fa-bar-chart f-s-40"></i>
                </span>
              </div>
              <div class="media-body media-text-right">
                <h2 class="color-white">278</h2>
                <p class="m-b-0">Reports</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-pink p-20">
            <div class="media widget-ten">
              <div class="media-left meida media-middle">
                <span>
                  <i class="ti-comment f-s-40"></i>
                </span>
              </div>
              <div class="media-body media-text-right">
                <h2 class="color-white">278</h2>
                <p class="m-b-0">New Comment</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-success p-20">
            <div class="media widget-ten">
              <div class="media-left meida media-middle">
                <span>
                  <i class="ti-vector f-s-40"></i>
                </span>
              </div>
              <div class="media-body media-text-right">
                <h2 class="color-white">$27647</h2>
                <p class="m-b-0">Bounce Rate</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-danger p-20">
            <div class="media widget-ten">
              <div class="media-left meida media-middle">
                <span>
                  <i class="ti-location-pin f-s-40"></i>
                </span>
              </div>
              <div class="media-body media-text-right">
                <h2 class="color-white">278</h2>
                <p class="m-b-0">Total Visitor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <div class="card bg-dark p-20">
            <div class="media widget-ten">
              <div class="media-left meida media-middle">
                <span>
                  <i class="ti-user f-s-40"></i>
                </span>
              </div>
              <div class="media-body media-text-right">
                <h2 class="color-white">{{ activeUsers }}</h2>
                <p class="m-b-0">DAILY ACTIVE USERS</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4" v-if="offline">
          <div class="card bg-danger p-20">
            <div class="media widget-ten">
              <div class="media-left meida media-middle">
                <span>
                  <i class="ti-server f-s-40"></i>
                </span>
              </div>
              <div class="media-body media-text-right">
                <h2 class="color-white">{{ lastHeartBeatReceivedAt }}</h2>
                <p class="m-b-0">OFFLINE</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <div class="row pb-2">
              <div class="col-sm-12">
                <h6 style="font-family: 'Roboto-BoldItalic'">
                  <i class="fa fa-link pr-1"></i>
                  <u>Quick Links</u>
                </h6>
              </div>
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col-sm-12">
                  <button type="button" class="btn btn-primary btn-flat mr-3">
                    <i class="fa fa-money"></i> Process Payroll
                    <i class="fa fa-arrow-right"></i>
                  </button>

                  <button type="button" class="btn btn-success btn-flat mr-3">
                    <i class="fa fa-bar-chart"></i> View Reports
                    <i class="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <div class="row pt-3">
                <div class="col-sm-12">
                  <button type="button" class="btn btn-info btn-flat mr-2">
                    <i class="fa fa-users"></i> View Employees
                    <i class="fa fa-arrow-right"></i>
                  </button>

                  <button type="button" class="btn btn-primary btn-flatmr-2">
                    <i class="fa fa-arrow-right"></i> View Attendance
                    <i class="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";
import moment from "moment";
import echo from "../../../mixins/echo";

export default {
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "name"
        },
        {
          label: "ID No.",
          field: "id_no"
        },
        {
          label: "Phone",
          field: "phone_no"
        },
        {
          label: "Branch",
          field: "branch"
        }
      ],
      activeUsers: 0,
      offline: false,
      lastHeartBeatReceivedAt: moment()
    };
  },

  created() {
    setInterval(this.determineConnectionStatus, 1000);
    this.iniatilizeCreated();
  },

  mixins: [echo],

  computed: {
    ...mapState({
      employees: state => state.users.users,
      branches: state => state.branches.branches,
      getAttendance: state => state.attendance.getAttendance,
      authUser: state => state.users.authUser
    }),

    recentAttended() {
      let attendance = this.$store.state.attendance.getAttendance;
      let users = this.$store.state.users.users;
      let userId = [];
      let attended = [];

      if (attendance && attendance.length > 0) {
        for (let i = 0; i < attendance.length; i++) {
          userId.push(attendance[i].user_id);
        }
      }

      if (users && users.length > 0) {
        for (let i = 0; i < users.length; i++) {
          if (userId.includes(users[i].id)) {
            attended.push(users[i]);
          }
        }
      }

      return attended.slice(0, 5);
    }
  },

  methods: {
    iniatilizeCreated() {
      this.$store.dispatch("getAttendance");
      this.$store.dispatch("fetchBranches");

      Axios.get(
        "http://localhost:6001/apps/f9ee1b7bd153ee1c/status?auth_key=6a86bb3a30c21112daa468f6d155fd97"
      )
        .then(res => {
          setInterval((this.activeUsers = res.data.subscription_count), 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },

    determineConnectionStatus() {
      const lastHeartBeatReceivedSecondsAgo = moment().diff(
        this.lastHeartBeatReceivedAt,
        "seconds"
      );

      this.offline = lastHeartBeatReceivedSecondsAgo > 125;
    },

    getEventHandlers() {
      return {
        ".server.status": () => {
          this.lastHeartBeatReceivedAt = moment();
        }
      };
    }

    // server.status

    // determineConnectionStatus() {
    //   const lastHeartBeatReceivedSecondsAgo = moment().diff(
    //     this.lastHeartBeatReceivedAt,
    //     "seconds"
    //   );

    //   this.offline = lastHeartBeatReceivedSecondsAgo > 125;
    // }
  }
};
</script>

