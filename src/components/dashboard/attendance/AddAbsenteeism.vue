<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">
          <i class="fa fa-user-times pr-1" />Add Absentee
        </h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item active">Add Absentee</li>
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
                  <u>Absenteeism Details</u>
                </h6>
              </div>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-sm-2">
                    <button class="btn btn-outline-primary btn-sm">
                      <i class="fa fa-plus pr-1"></i>Add Absentee
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body">
              <div class="my-1">
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
                          <a
                            href="#"
                            class="dropdown-item"
                            @click.prevent="checkStatus(props.row)"
                          >Employee Details</a>
                          <a
                            href="#"
                            class="dropdown-item"
                            @click.prevent="checkStatus(props.row)"
                          >Payrol Parameters</a>
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
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
      monthDate: new Date(),

      columns: [
        {
          label: "Staff No.",
          field: "employee_no"
        },
        {
          label: "Surname",
          field: "name"
        },
        {
          label: "Other Names",
          field: "name"
        },
        {
          label: "Gender",
          field: "id_no"
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
          field: "actions",
          width: "10px"
        }
      ],
      employees: [],
      options: [{ id: 1, text: "None" }, { id: 2, text: "All Departments" }]
    };
  },

  components: {
    Datepicker
  },

  mounted() {
    $("#allDeps")
      .select2({
        placeholder: "Departments",
        allowClear: true,
        data: this.options
      })
      .val(null)
      .trigger("change");
  },

  computed: {
    ...mapState({
      attendance: state => state.attendance.attendance,
      checkInRT: state => state.attendance.checkInRT,
      authUser: state => state.roles.authUser
    })
  },

  created() {
    this.$store.dispatch("fetchEmployees").then(res => {
      //employees
      $("#selEmployee")
        // init select2
        .select2({
          data: res.data,
          placeholder: "Employees",
          allowClear: true
        })
        .val(null)
        .trigger("change");
      //
      this.employees = res.data;
    });
  },

  methods: {
    ...mapActions(["timeIn", "timeOut"]),

    monthFormatter(date) {
      return moment(date).format("MMMM, YYYY");
    }
  }
};
</script>
