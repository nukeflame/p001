<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Overtime</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Attendance</a>
          </li>
          <li class="breadcrumb-item active">Overtime</li>
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
                <h6 class="bold">
                  <u>Overtime Details</u>
                </h6>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-2">
                <span>
                  Total Applications:
                  <span
                    class="pl-1 pr-1 label label-default bold f-s-13"
                  >{{ overtimes && overtimes.length}}</span>
                </span>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-12">
                <div class="float-left">
                  <div class="btn-group mr-2">
                    <button
                      type="button"
                      :class="[selectedRows && selectedRows.length > 0 ? ' ' : 'disabled' ,'btn btn-danger btn-sm']"
                      :disabled="selectedRows && selectedRows.length > 0 ? false: true"
                      @click="deleteOvertimeModal"
                    >
                      <i class="fa fa-trash pr-1"></i>Delete
                    </button>
                    <div class="btn-group">
                      <button
                        type="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                        :class="[selectedRows && selectedRows.length > 0 ? ' ' : 'disabled' ,'btn btn-info dropdown-toggle btn-sm']"
                        :disabled="selectedRows && selectedRows.length > 0 ? false: true"
                      >
                        <i class="fa fa-thumbs-up pr-1"></i>Approval
                        <span class="caret"></span>
                      </button>
                      <ul
                        class="dropdown-menu"
                        role="menu"
                        x-placement="bottom-start"
                        style="position: absolute; transform: translate3d(0px, 40px, 0px); top: 0px; left: 0px; will-change: transform;"
                      >
                        <li class="p-1">
                          <a href="#" @click.prevent="approveOvertime">
                            <i class="fa fa-check pr-1"></i>Approve
                          </a>
                        </li>
                        <li class="p-1">
                          <a href="#" @click.prevent="disapproveOvertime">
                            <i class="fa fa-ban pr-1"></i>Disapprove
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button @click="addOvertime" class="btn btn-outline-primary btn-sm">
                    <i class="fa fa-plus pr-1"></i>Add Overtime
                  </button>
                </div>
                <div class="float-right">
                  <div class="btn-group">
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                      <i class="fa fa-print pr-1"></i> Print
                    </button>
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                      <i class="fa fa-file pr-1"></i> Excel
                    </button>
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                      <i class="fa fa-copy pr-1"></i> Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="overtimes"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: 'Search overtime...'}"
                  @on-selected-rows-change="selOvertime"
                  @on-row-click="editOvertime"
                  :select-options="{ enabled: false, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- actions -->
                    <span v-if="props.column.field == 'actions'">
                      <div class="dropdown">
                        <a
                          class="btn-block color-primary"
                          href="#"
                          @click.prevent="editOvertime(props.row)"
                        >
                          <i class="fa fa-edit"></i> Edit
                        </a>
                      </div>
                    </span>
                    <!-- notes -->
                    <span v-else-if="props.column.field == 'OvertimeNotes'">
                      <span v-if="props.row.notes !== null">{{ props.row.notes }}</span>
                      <span v-else>---</span>
                    </span>
                    <!-- status -->
                    <span v-else-if="props.column.field == 'OvertimeStatus'">
                      <span
                        v-if="props.row.status === 1"
                        class="label label-success f-s-10 bold"
                        style="padding: 2px 6px;"
                      >Approved</span>
                      <span
                        v-else
                        class="label label-warning f-s-10 bold"
                        style="padding: 2px 6px;"
                      >Pending</span>
                    </span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>

          <!-- add overtime modal-->
          <div
            class="modal animated fadeIn addOvertimeMd"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h4 class="modal-title text-center f-s-14">
                    <i class="fa fa-plus pr-1"></i>Add Overtime
                  </h4>
                  <a href="#" @click.prevent="hideOvertime">
                    <i class="fa fa-close"></i>
                  </a>
                </div>
                <div class="modal-body">
                  <form class="form-horizontal">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="employeeName" class="control-label bold">Employee</label>
                          <select
                            name="employeeName"
                            id="employeeName"
                            class="form-control input-sm"
                          ></select>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="date" class="control-label bold">Date</label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            class="form-control input-sm"
                            v-model="overtimeData.date"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <div id="time-range">
                            <p>
                              <label for class="control-label bold pr-2">Overtime Period:</label>
                              <span class="slider-time color-danger">9:00 AM</span> -
                              <span class="slider-time2 color-danger">5:00 PM</span>
                            </p>
                            <div class="sliders_step1">
                              <div id="slider-range"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="rate" class="control-label bold"></label>
                          <div class="row">
                            <div class="col-sm-4 pr-0">
                              <input
                                type="number"
                                name="hours"
                                id="hours"
                                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                                class="form-control input-sm"
                                v-model="overtimeData.hours"
                              />
                            </div>
                            <div class="col-sm-8 pl-0">
                              <input
                                value="Hours"
                                class="form-control input-sm bold"
                                disabled
                                style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="rate" class="control-label bold"></label>
                          <div class="row">
                            <div class="col-sm-4 pr-0">
                              <input
                                type="number"
                                name="hours"
                                id="hours"
                                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                                class="form-control input-sm"
                                v-model="overtimeData.rate"
                              />
                            </div>
                            <div class="col-sm-8 pl-0">
                              <input
                                value="Rate"
                                class="form-control input-sm bold"
                                disabled
                                style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="amount" class="control-label bold">Amount</label>
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            class="form-control input-sm text-right"
                            v-model="overtimeData.amount"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group p-t-35">
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="isStatus"
                              v-model="overtimeData.status"
                            />
                            <label class="custom-control-label bold" for="isStatus">Status</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label for="notes" class="control-label bold">Notes</label>
                          <input
                            type="text"
                            name="notes"
                            id="notes"
                            class="form-control input-sm"
                            v-model="overtimeData.notes"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer pd-footer">
                  <div class="float-right">
                    <button
                      @click="hideOvertime"
                      class="btn btn-sm btn-outline-secondary mr-2"
                    >Cancel</button>
                    <button
                      type="submit"
                      :class="[addingOvertime ? 'disabled': '', 'btn btn-sm btn-info']"
                      @click="saveOvertime"
                      :disabled="addingOvertime ? true: false"
                    >
                      <span v-if="addingOvertime">
                        <span class="pr-2">Processing</span>
                        <img src="../../../assets/loader/round-sm.svg" alt />
                      </span>

                      <span v-else>
                        <i class="fa fa-send"></i> Submit
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- delete leave modal-->
          <div
            class="modal animated fadeIn delAbsentMd"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog modal-sm">
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
                            @click="hideDelOvertimeModal"
                          >Cancel</button>
                          <button class="btn btn-sm btn-danger" @click="deleteOvertime">Delete</button>
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import moment from "moment";
import { formatTime } from "../../../mixins/helpers";

export default {
  data() {
    return {
      selectedRows: [],
      columns: [
        {
          label: "Staff No.",
          field: "staffNo"
        },
        {
          label: "Surname",
          field: "surname"
        },
        {
          label: "Other Names",
          field: "otherNames"
        },

        {
          label: "Date",
          field: "date"
        },
        {
          label: "Overtime Period",
          field: "overtimePeriod"
        },
        {
          label: "Hours",
          field: "hours"
        },
        {
          label: "Rate",
          field: "rate"
        },
        {
          label: "Amount(KES)",
          field: "amount"
        },
        {
          label: "Notes",
          field: "OvertimeNotes"
        },
        {
          label: "Status",
          field: "OvertimeStatus",
          width: "70px"
        },

        {
          label: "",
          field: "actions",
          width: "50px"
        }
      ],
      overtimeData: {
        date: moment().format("YYYY-MM-DD"),
        hours: "",
        rate: "",
        amount: "",
        notes: null,
        status: false,
        overtimePeriod: ""
      },

      endTime: "",
      startTime: ""
    };
  },

  computed: {
    ...mapState({
      employees: state => state.employees.employees,
      overtimes: state => state.overtime.overtimes,
      addingOvertime: state => state.overtime.addingOvertime,
      authUser: state => state.roles.authUser
    })
  },

  mounted() {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 1440,
      step: 15,
      values: [540, 1020],
      slide: function(e, ui) {
        var hours1 = Math.floor(ui.values[0] / 60);
        var minutes1 = ui.values[0] - hours1 * 60;

        if (hours1.length == 1) hours1 = "0" + hours1;
        if (minutes1.length == 1) minutes1 = "0" + minutes1;
        if (minutes1 == 0) minutes1 = "00";
        if (hours1 >= 12) {
          if (hours1 == 12) {
            hours1 = hours1;
            minutes1 = minutes1 + " PM";
          } else {
            hours1 = hours1 - 12;
            minutes1 = minutes1 + " PM";
          }
        } else {
          hours1 = hours1;
          minutes1 = minutes1 + " AM";
        }
        if (hours1 == 0) {
          hours1 = 12;
          minutes1 = minutes1;
        }

        $(".slider-time").html(hours1 + ":" + minutes1);
        this.startTime = hours1 + ":" + minutes1;

        var hours2 = Math.floor(ui.values[1] / 60);
        var minutes2 = ui.values[1] - hours2 * 60;

        if (hours2.length == 1) hours2 = "0" + hours2;
        if (minutes2.length == 1) minutes2 = "0" + minutes2;
        if (minutes2 == 0) minutes2 = "00";
        if (hours2 >= 12) {
          if (hours2 == 12) {
            hours2 = hours2;
            minutes2 = minutes2 + " PM";
          } else if (hours2 == 24) {
            hours2 = 11;
            minutes2 = "59 PM";
          } else {
            hours2 = hours2 - 12;
            minutes2 = minutes2 + " PM";
          }
        } else {
          hours2 = hours2;
          minutes2 = minutes2 + " AM";
        }

        $(".slider-time2").html(hours2 + ":" + minutes2);
      }
    });
  },

  created() {
    this.initiateCreate();
  },

  methods: {
    ...mapActions(["createOvertime", "timeOut"]),

    initiateCreate() {
      this.$store.dispatch("fetchOvertimes");
      this.$store.dispatch("fetchEmployees").then(() => {
        $("#employeeName")
          .select2({
            dropdownParent: $(".addOvertimeMd"),
            placeholder: "Select Employee",
            allowClear: true,
            data: this.employees
          })
          .val(null)
          .trigger("change");
      });
    },

    approveOvertime() {},

    disapproveOvertime() {},

    deleteOvertimeModal() {},

    addOvertime() {
      $(".addOvertimeMd").modal("show");
    },

    hideOvertime() {
      this.overtimeData = {
        date: moment().format("YYYY-MM-DD"),
        hours: "",
        rate: "",
        amount: "",
        notes: null,
        status: false,
        overtimePeriod: ""
      };

      $("#employeeName")
        .val(null)
        .trigger("change");

      $(".addOvertimeMd").modal("hide");
    },

    editOvertime(row) {
      let dataRow = "";
      if (row.selected) {
        console.log(this.selectedRows);
      } else {
        dataRow = row.row;

        this.overtimeData = {
          date: moment(dataRow.date).format("YYYY-MM-DD"),
          hours: dataRow.hours,
          rate: dataRow.rate,
          amount: dataRow.amount,
          notes: dataRow.notes,
          status: dataRow.status,
          overtimePeriod: dataRow.overtimePeriod
        };

        $("#employeeName")
          .val(dataRow.employeeId)
          .trigger("change");
      }

      $(".addOvertimeMd").modal("show");
    },

    saveOvertime() {
      const o = this.overtimeData;
      const data = {
        date: o.date,
        hours: o.hours,
        rate: o.rate,
        amount: o.amount,
        notes: o.notes,
        status: o.status,
        overtimePeriod: 11,
        employeeId: $("#employeeName").val()
      };

      console.log(formatTime(moment("08,12,2019").format()));

      // this.createOvertime(data);
    },

    hideDelOvertimeModal() {},

    deleteOvertime() {},

    selOvertime(row) {
      this.selectedRows = row.selectedRows;
    }
  }
};
</script>