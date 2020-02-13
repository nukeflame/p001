<template>
  <div>
    <!-- Main wrapper  -->
    <div id="main-wrapper">
      <div class="header" :class="mode">
        <dashboard-header></dashboard-header>
      </div>
      <!-- Left Sidebar  -->
      <div class="left-sidebar">
        <sidebar :userRole="userRole"></sidebar>
      </div>
      <!-- Page wrapper  -->
      <div class="page-wrapper">
        <!-- page views -->
        <router-view></router-view>
        <!-- footer -->
        <dashboard-footer></dashboard-footer>
        <!-- clock out/in modal-->
        <div
          class="modal animated fadeIn clockInOutMd"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header pd-header">
                <h5 class="modal-title text-center f-s-15">
                  <i class="ti-user pr-1"></i>Clock In/Out Employee
                </h5>
                <a href="#" @click.prevent="hideClockInOut">
                  <i class="fa fa-close"></i>
                </a>
              </div>
              <div class="modal-body">
                <div class="modal-fluid">
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="profile-img">
                        <div style="text-align: center;  margin-bottom: 15px;">
                          <span>
                            <img src="../../assets/images/avatar.png" class="img-thumbnail" alt />
                          </span>
                        </div>

                        <div>
                          <h6 class="text-muted f-s-13 mb-0">Date Time is:-</h6>
                          <p class="bold text-info f-s-14">{{ timer}}</p>
                        </div>
                        <div>
                          <h6 class="text-muted f-s-13 mb-0">Today is:-</h6>
                          <span class="f-s-12 bold text-danger">{{ dateToday }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-8">
                      <ul class="list-group">
                        <li class="list-group-item text-right">
                          <span class="pull-left">
                            <span class="bold">Surname :</span>
                          </span>
                          <span v-if="checkedEmployee !== null">{{ checkedEmployee.surname }}</span>
                          <span v-else>---</span>
                        </li>
                        <li class="list-group-item text-right">
                          <span class="pull-left">
                            <span class="bold">ID Number :</span>
                          </span>
                          <span v-if="checkedEmployee !== null">{{ checkedEmployee.idNo }}</span>
                          <span v-else>---</span>
                        </li>
                        <li class="list-group-item text-right">
                          <span class="pull-left">
                            <span class="bold">Other Names :</span>
                          </span>
                          <span v-if="checkedEmployee !== null">{{ checkedEmployee.otherNames }}</span>
                          <span v-else>---</span>
                        </li>
                        <li class="list-group-item text-right">
                          <span class="pull-left">
                            <span class="bold">Employee No :</span>
                          </span>
                          <span v-if="checkedEmployee !== null">{{ checkedEmployee.staffNo }}</span>
                          <span v-else>---</span>
                        </li>
                        <li class="list-group-item text-right">
                          <span class="pull-left">
                            <span class="bold">Time In :</span>
                          </span>
                          <span v-if="checkedEmployee !== null">{{ checkedEmployee.timeIn }}</span>
                          <span v-else>---</span>
                        </li>
                        <li class="list-group-item text-right">
                          <span class="pull-left">
                            <span class="bold">Time Out :</span>
                          </span>
                          <span v-if="checkedEmployee !== null">{{ checkedEmployee.timeOut }}</span>
                          <span v-else>---</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <form class="mt-4" @submit.prevent>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group mt-2">
                          <input
                            type="text"
                            class="form-control input-sm"
                            placeholder="Enter Employee ID"
                            v-model="employeeID"
                            autocomplete="on"
                            @keyup.enter="handleEmployeeCheckIn"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <button
                          class="btn btn-sm btn-primary mt-2 mr-2"
                          style="height: 30px;"
                          type="button"
                          :disabled="employeeID.length ? false: true"
                          @click.prevent="handleEmployeeCheckIn"
                        >
                          <span v-if="findingStaff">
                            <span class="pr-2 f-s-13">Processing</span>
                            <img src="../../assets/loader/round-sm.svg" alt />
                          </span>
                          <span v-else>
                            <i class="fa fa-sign-in pr-1"></i> Check In
                          </span>
                        </button>
                        <button
                          class="btn btn-sm btn-danger mt-2"
                          style="height: 30px;"
                          type="button"
                          @click.prevent="handleEmployeeCheckOut"
                          :disabled="employeeID.length ? false: true"
                        >
                          <span v-if="findingStaff">
                            <span class="pr-2 f-s-13">Processing</span>
                            <img src="../../assets/loader/round-sm.svg" alt />
                          </span>
                          <span v-else>
                            <i class="fa fa-sign-out pr-1"></i> Check Out
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer pd-footer">
                <div class="float-right">
                  <button
                    @click.prevent="hideClockInOut"
                    class="btn btn-sm btn-info-outline mr-2"
                  >Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- confim btn modal-->
        <div
          class="modal animated fadeIn confirmCheck"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div class="modal-dialog modal-sm" style="top: 10%;">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title text-center f-s-17">Are you sure you want to continue?</h4>
              </div>

              <div class="modal-body pd-modal">
                <div class="modal-fluid">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="float-right">
                        <button
                          class="btn btn-sm btn-outline-secondary mr-2"
                          @click="cancelCheck"
                        >Cancel</button>
                        <button
                          v-if="checkIn"
                          class="btn btn-sm btn-primary"
                          @click="proceedCheck"
                        >Check In</button>
                        <button v-else class="btn btn-sm btn-danger" @click="proceedCheck">Check Out</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Chat Wrapper -->
    <chat-wrapper v-if="chatWrapper" />
  </div>
</template>

<script>
import DashboardHeader from "./templates/Header.vue";
import DashboardFooter from "./templates/Footer.vue";
import Sidebar from "./templates/Sidebar.vue";
import ChatWrapper from "./chatsection/ChatWrapper.vue";
import { mapState, mapActions } from "vuex";
import moment from "moment";
import echo from "../../mixins/echo";

export default {
  components: {
    DashboardHeader,
    DashboardFooter,
    Sidebar,
    ChatWrapper
  },

  mixins: [echo],

  data() {
    return {
      mode: "light-mode",
      preloader: false,
      employeeID: "",
      dateTime: null,
      checkIn: true,
      timer: null,
      dateToday: moment().format("Do MMM YYYY")
    };
  },

  computed: {
    ...mapState({
      employees: state => state.employees.employees,
      checkedEmployee: state => state.checkins.checkedEmployee,
      findingStaff: state => state.employees.findingStaff,
      userRole: state => state.roles.userRole,
      authUser: state => state.users.authUser,
      chatWrapper: state => state.settings.chatWrapper
    })
  },

  created() {
    this.iniatializeCreated();
  },

  methods: {
    ...mapActions(["findEmployee"]),
    iniatializeCreated() {
      this.$store.dispatch("authUser").then(() => {
        // const socketId = window.Echo.socketId();
        // Axios.defaults.headers.post["X-Sockect-Id"] = socketId;
        // console.log(socketId);
      });

      this.startTimer();
    },

    getEventHandlers() {
      return {
        "Dashboard.UpdateAppearance": e => {
          this.mode = e.mode;
        }
      };
    },

    hideClockInOut() {
      this.employeeID = "";
      $(".clockInOutMd").modal("hide");
    },

    handleEmployeeCheckIn() {
      this.checkIn = true;
      this.handleCheck();
    },

    handleEmployeeCheckOut() {
      this.checkIn = false;
      this.handleCheck();
    },

    handleCheck() {
      $(".clockInOutMd").modal("hide");
      $(".confirmCheck").modal("show");
    },

    cancelCheck() {
      this.employeeID = "";
      $(".confirmCheck").modal("hide");
      $(".clockInOutMd").modal("show");
    },

    proceedCheck() {
      $(".confirmCheck").modal("hide");
      const data = {
        Id: this.employeeID,
        checkIn: this.checkIn
      };

      this.findEmployee(JSON.stringify(data)).then(() => {
        this.hideClockInOut();
      });
    },

    hideConfirmModal() {
      $(".confirmCheck").modal("hide");
    },

    startTimer() {
      setInterval(() => {
        this.timer = moment().format("LTS");
      }, 1000);
    },

    // handleMainChatbox() {
    //   $(".chattab").toggleClass("chattab--tray");
    // },

    checkOnlineUsers() {
      $(".chatbox")
        .removeClass("chatbox--active animated fadeOut")
        .addClass("chatbox--empty animated fadeIn");
    }
  }
};
</script>

<style>
/* chat */
.chattab {
  position: fixed;
  right: 179px;
  bottom: 0;
  width: auto;
  min-height: 0px;
  font-family: "Roboto", sans-serif;
  transition: all 600ms cubic-bezier(0.19, 1, 0.22, 1);
  display: flex;
  flex-direction: row;
  z-index: 1051;
}
.chattab.chattab--stretch {
  right: 250px;
}
.chatbox.chatbox--active.chatbox__main.chattab--stretch {
  right: 250px;
}
.chattab__dock {
  float: left;
  position: relative;
  font-size: 12px;
  line-height: 16px;
}
.chatdock__items {
  align-items: flex-end;
  display: flex;
}
.chatdock__more {
  margin-right: 32px;
}
.chatdock__more .popover {
  background-color: #fff;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  height: 30px;
  vertical-align: top;
  display: inline-block;
}
.chatdock__boxtab {
  margin: 0 0 0 4px;
  width: 192px;
  position: relative;
}
.chatdock__boxtab.opentab {
  /* width: 192px; */
}
.chatdock__boxtab.closetab {
  width: 192px;
}
.chatdock__boxtab .chatdock__item {
  height: 28px;
  width: 180px;
  margin-left: 12px;
  float: left;
  position: relative;
}
.chatdock__item .titlebar {
  height: auto;
}
.titlebar .tbox {
  background-color: #fff;
  border-radius: 4px 4px 0 0;
  transition: background-color 0.4s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  z-index: 3;
  cursor: pointer;
  height: 28px;
  padding: 8px 4px 7px 8px;
  position: relative;
  color: #1d2129;
}
.titlebar .tbox:hover {
  background-color: #f2f3f5;
  transition: background-color 0.1s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}
.tbox .tbox__body {
  min-height: 20px;
  display: flex;
  position: relative;
  bottom: 3px;
}
.tbody__link {
  float: left;
}
.tbody__link .avatar__placeholder {
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.tbody__link .avatar__placeholder img.miniavatar {
  display: block;
  object-fit: cover;
}
.tbox__footer {
  margin-left: 6px;
  position: relative;
  top: -1px;
  display: flex;
  justify-content: space-between;
  min-width: 1px;
  width: 100%;
}
.tbox__footer_title {
  min-width: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tbox__footer_title .title {
  font-family: inherit;
  font-size: 13px;
  height: 18px;
  margin-bottom: -3px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1c1e21;
  min-width: 0;
}
.tbox__footer_title .title .title__link {
  text-decoration: none;
}
.title__link ._logo {
  font-family: "Roboto-Medium";
  color: #1c1e21;
  white-space: nowrap;
}
.tbox__footer_close {
  display: flex;
  flex: 0 0 auto;
  height: 16px;
  margin: auto 0 auto 6px;
}
.title__close {
  padding: 0 6px 0;
}
.title__close .closetab_button {
  height: 16px;
  width: 16px;
  position: relative;
  top: 2px;
  vertical-align: top;
  display: inline-block;
}
.closetab_button img {
  vertical-align: top;
}

.chatbox.chatbox--active.chatbox__main {
  position: fixed;
  right: 179px;
  width: 300px;
}
</style>