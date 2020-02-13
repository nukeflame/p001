<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h3 class="text-primary">Attendance Report</h3>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Attendance Report</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="homeLoader">
        <img v-if="loader" src="images/loader/spinner.gif" width="64" height="64" alt>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="my-1">
                <h4 class="card-title">
                  <i class="ti-layout-grid2"></i> Employees Attendance Report
                </h4>
                <vue-good-table
                  :columns="columns"
                  :rows="attendance"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: 'Search attendance...'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- actions -->
                    <span v-if="props.column.field == 'actions'">
                      <div class="dropdown">
                        <a
                          class="btn-block"
                          href="#"
                          role="button"
                          id="elipsisMenu"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i class="fa fa-ellipsis-v"></i>
                        </a>

                        <div class="dropdown-menu" aria-labelledby="elipsisMenu">
                          <a href="#" class="dropdown-item" @click.prevent="checkStatus(props.row)">
                            <i class="ti-info-alt"></i> View user
                          </a>
                          
                          <!-- <a class="dropdown-item" href="#" @click.prevent="roleEdit()">
                           
                            
                            <span v-if="testToday(props.row)">
                               <i class="ti-refresh"></i> Not Checked Out
                            </span>
                            <span v-else>
                              <span v-for="item in props.row.attendance" :key="item.id">
                                <span v-if="!item.time_out">
                                  Not Checked In
                                </span>
                              </span>
                            </span>
                          </a> -->
                          <!-- <a class="dropdown-item" href="#">
                            <i class="ti-trash color-danger"></i> Delete
                          </a>-->
                        </div>
                      </div>
                    </span>
                    <!-- check details -->
                    <span v-else-if="props.column.field == 'check'">
                      <span v-if="testToday(props.row)">
                        <button
                          class="btn btn-sm btn-primary mr-2"
                          @click.once="checkIn(props.row.id)"
                        >
                          <i class="fa fa-sign-in"></i> Check In
                        </button>
                      </span>
                      <span v-else>
                        <span v-for="item in props.row.attendance" :key="item.id">
                          <button
                            v-if="!item.time_out"
                            class="btn btn-sm btn-outline-danger"
                            @click.once="checkOut(props.row.attendance)"
                          >
                            <i class="fa fa-sign-out"></i> Check Out
                          </button>
                        </span>
                      </span>
                    </span>
                    <!-- time in -->
                    <span
                      v-else-if="props.column.field == 'time_in'"
                      :title="titleDate(props.row)"
                    >{{ timeInToday(props.row) }}</span>
                    <!-- time out -->
                    <span
                      v-else-if="props.column.field == 'time_out'"
                      :title="titleDateOut(props.row)"
                    >{{ timeOutToday((props.row) )}}</span>
                    <!-- time out -->
                    <span v-else-if="props.column.field == 'total_hours'">
                      <span class="float-right">{{ todayHours(props.row)}}</span>
                    </span>

                    <!-- status -->
                    <span v-else-if="props.column.field == 'status'">In Time / On Time</span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
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

export default {
  data() {
    return {
      checkMode: false,
      loader: false,
      columns: [
        {
          label: "Employee No.",
          field: "employee_no"
        },
        {
          label: "Employee Name",
          field: "name"
        },
        {
          label: "ID No.",
          field: "id_no",
        },
        {
          label: "Days In",
          field: "days_in"
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

        
        
      ],
      nhifData: {
        min_charges: "",
        max_charges: "",
        rate: ""
      }
    };
  },

  computed: {
    ...mapState({
      attendance: state => state.attendance.attendance
    })
  },

  created() {
    this.initializeCreated();
  },
  methods: {
    ...mapActions(["timeIn", "timeOut"]),
    initializeCreated() {
      this.$store.dispatch("fetchAttendance");
    },
    getMoment(date) {
      //
      if (date) {
        return moment(date).format("LTS");
      } else {
        return "---";
      }
    },
    checkIn(userId) {
      this.checkMode = true;
      this.loader = true;
      let time = {
        userId: userId
      };
      this.timeIn(time).then(() => {
        location.reload();
        this.loader = false;
      });
    },
    checkOut(attendance) {
      this.loader = true;

      let date1 = "";
      let date2 = "";
      let diffHrs = "";
      let userId = "";

      attendance.forEach(field => {
        date1 = new Date(field.time_in);
        date2 = new Date();
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        diffHrs = Math.ceil(timeDiff / (1000 * 3600));
        userId = field.id;
      });

      const data = {
        userId: userId,
        timeOut: date2,
        totalHours: diffHrs
      };
      this.timeOut(data).then(() => {
        location.reload();
        this.loader = false;
      });
    },
    timeInToday(data) {
      let created = "";
      let timeIn = "";
      data.attendance.forEach(item => {
        created = item.created_at;
        timeIn = item.time_in;
      });

      if (
        moment()
          .tz("Africa/Nairobi")
          .format("d") ===
        moment(created)
          .tz("Africa/Nairobi")
          .format("d")
      ) {
        return moment(timeIn).format("LTS");
      } else {
        return "---";
      }
    },
    timeOutToday(data) {
      let created = "";
      let timeOut = "";
      data.attendance.forEach(item => {
        created = item.created_at;
        timeOut = item.time_out;
      });

      if (
        moment()
          .tz("Africa/Nairobi")
          .format("d") ===
        moment(created)
          .tz("Africa/Nairobi")
          .format("d")
      ) {
        if (!timeOut) {
          return "---";
        } else {
          return moment(timeOut).format("LTS");
        }
      } else {
        return "---";
      }
    },
    todayHours(data) {
      let created = "";
      let totalHours = "";
      data.attendance.forEach(item => {
        created = item.created_at;
        totalHours = item.total_hours;
      });

      if (
        moment()
          .tz("Africa/Nairobi")
          .format("d") ===
        moment(created)
          .tz("Africa/Nairobi")
          .format("d")
      ) {
        if (!totalHours) {
          return "---";
        } else {
          return totalHours;
        }
      } else {
        return "---";
      }
    },
    testToday(data) {
      let created = "";
      let timeIn = "";
      data.attendance.forEach(item => {
        created = item.created_at;
        timeIn = item.time_in;
      });

      if (
        moment()
          .tz("Africa/Nairobi")
          .format("d") ===
        moment(created)
          .tz("Africa/Nairobi")
          .format("d")
      ) {
        return false;
      } else {
        return true;
      }
    },
    titleDate(data) {
      let timeIn = "";
      data.attendance.forEach(item => {
        timeIn = item.time_in;
      });
      return timeIn;
    },
    titleDateOut(data) {
      let timeOut = "";
      data.attendance.forEach(item => {
        timeOut = item.time_out;
      });
      return timeOut;
    }
  }
};
</script>

<style>
.homeLoader {
  margin-right: auto;
  margin-left: auto;
  width: 0px;
  position: fixed;
  top: 50%;
  right: 50%;
  left: 50%;
  bottom: 50%;
  z-index: 999;
  background: white;
}
</style>
