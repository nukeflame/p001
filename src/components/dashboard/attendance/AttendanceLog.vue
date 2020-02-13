<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Attendance Log</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Attendance Log</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="row pb-2">
              <div class="col-sm-2">
                <h6 class="pt-2 bold">
                  <u>Attendance Log Details</u>
                </h6>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="checkins"
                  :pagination-options="{enabled: true, perPage: 13}"
                  :search-options="{ enabled: true , placeholder: 'Search ...'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- check details -->
                    <span v-if="props.column.field == 'checkBtns'">
                      <button
                        class="btn btn-sm btn-primary mr-2 btn-xs"
                        @click.prevent="revokeTime(props.row)"
                      >
                        <i class="fa fa-sign-out"></i> Check Out
                      </button>
                      <button
                        class="btn btn-sm btn-danger btn-xs"
                        @click.prevent="deleteAttendance(props.row)"
                      >
                        <i class="fa fa-trash"></i> Delete
                      </button>
                    </span>
                    <!-- time in -->
                    <span v-else-if="props.column.field == 'time_in'" :title="props.row.timeIn">
                      <span>{{formatDateIn(props.row.timeIn)}}</span>
                    </span>
                    <!-- time out -->
                    <span v-else-if="props.column.field == 'time_out'" :title="props.row.timeOut">
                      <span>{{formatDate(props.row.timeOut)}}</span>
                    </span>
                    <!--total hours -->
                    <span v-else-if="props.column.field === 'total_hours'" class="float-right">
                      <span>{{ formatTotalHrs(props.row.totalHrs) }}</span>
                    </span>
                    <span v-else-if="props.column.field === 'presentDate'">
                      <span>{{ returnTodayDate(props.row.timeIn)}}</span>
                    </span>

                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>
        </div>

        <!-- revoke btn modal-->
        <div
          class="modal animated fadeIn confirmCheckBtns"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div class="modal-dialog modal-sm" style="top: 10%;">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title text-center f-s-17">Are you sure you want to delete?</h4>
              </div>

              <div class="modal-body pd-modal">
                <div class="modal-fluid">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="float-right">
                        <button
                          class="btn btn-sm btn-outline-secondary mr-2"
                          @click="hideConfimBtns"
                        >Cancel</button>
                        <button class="btn btn-sm btn-danger" @click="proceedCheckBtns">Confirm</button>
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import moment from "moment-timezone";
import toastr from "toastr";
import echo from "../../../mixins/echo";

export default {
  data() {
    return {
      columns: [
        {
          label: "Employee No.",
          field: "staffNo"
        },
        {
          label: "Surname",
          field: "surname",
          width: "150px"
        },
        {
          label: "OtherNames",
          field: "otherNames",
          width: "150px"
        },
        {
          label: "ID Number",
          field: "idNo"
        },
        {
          label: "Present Date",
          field: "presentDate",
          type: "date"
        },

        {
          label: "Time In",
          field: "time_in",
          type: "date"
        },
        {
          label: "Time Out",
          field: "time_out",
          type: "date"
        },

        {
          label: "Total Hours",
          field: "total_hours"
        },
        {
          label: "",
          field: "checkBtns"
        }
      ],
      clockData: {
        id: "",
        idNo: "",
        otherNames: "",
        overTime: "",
        staffNo: "",
        surname: "",
        timeIn: "",
        timeOut: "",
        totalHours: ""
      },
      attandanceId: null
    };
  },

  computed: {
    ...mapState({
      checkins: state => state.checkins.checkins,
      authUser: state => state.roles.authUser
    })
  },

  created() {
    // set title
    document.title = "Attendance Log :: Epsotech";
    //get checkins
    this.$store.dispatch("fetchCheckins");
  },

  mixins: [echo],

  methods: {
    ...mapActions(["destroyCheckin"]),

    revokeTime(data) {
      // console.log(data);
      $(".confirmCheckBtns").modal("show");
      // clockData
      console.log(data);
    },

    deleteAttendance(data) {
      // console.log(data);
      $(".confirmCheckBtns").modal("show");
      // clockData
      this.attandanceId = data.id;
    },

    hideConfimBtns() {
      $(".confirmCheckBtns").modal("hide");
      this.attandanceId = null;
    },

    proceedCheckBtns() {
      if (this.attandanceId !== null) {
        this.destroyCheckin(this.attandanceId);
        this.hideConfimBtns();
      }
    },

    formatTotalHrs(hrs) {
      if (hrs) {
        return hrs + " hrs";
      } else {
        return "---";
      }
    },
    returnTodayDate(date) {
      if (date) {
        return moment(date).format("MMMM, YYYY");
      } else {
        return "---";
      }
    },

    formatDate(date) {
      if (date) {
        return moment(date).format("LTS");
      } else {
        return "Not Checked Out";
      }
    },

    formatDateIn(date) {
      if (date) {
        return moment(date).format("LTS");
      } else {
        return "Not Checked In";
      }
    },

    getEventHandlers() {
      return {
        ".DestroyAttendanceEvent": e => {
          console.log(e);
        }
      };
    }
  }
};
</script>
