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
                  :pagination-options="{enabled: true, perPage: 50}"
                  :search-options="{ enabled: true , placeholder: ' '}"
                  @on-selected-rows-change="selOvertime"
                  @on-row-click="selEditOvertime"
                  :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden'}"
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
                    <!-- overtime priod -->
                    <span
                      v-else-if="props.column.field == 'overtimePeriod'"
                    >[{{ props.row.from }} - {{ props.row.to }}]</span>
                    <!-- amount kes -->
                    <span
                      v-else-if="props.column.field == 'amountKes'"
                    >{{ checkMoney(props.row.amount) }}</span>
                    <!-- status -->
                    <span v-else-if="props.column.field == 'OvertimeStatus'">
                      <span
                        v-if="props.row.status"
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
                <form @submit.prevent="saveOvertime">
                  <div class="modal-header pd-header">
                    <h4 class="modal-title text-center f-s-14">
                      <span v-if="isEdit">
                        <i class="fa fa-edit pr-1"></i>Edit Overtime
                      </span>
                      <span v-else>
                        <i class="fa fa-plus pr-1"></i>Add Overtime
                      </span>
                    </h4>
                    <a href="#" @click.prevent="hideOvertime">
                      <i class="fa fa-close"></i>
                    </a>
                  </div>
                  <div class="modal-body">
                    <div class="form-horizontal">
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label for="employeeName" class="control-label bold">Employee</label>
                            <select
                              name="employeeName"
                              id="employeeName"
                              class="form-control input-sm"
                              required
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
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label for="from" class="control-label bold">From</label>
                            <input
                              type="time"
                              name="from"
                              id="from"
                              class="form-control input-sm"
                              v-model="overtimeData.from"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label for="to" class="control-label bold">To</label>
                            <input
                              type="time"
                              name="to"
                              id="to"
                              class="form-control input-sm"
                              v-model="overtimeData.to"
                              @change="changedTime"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label for="amount" class="control-label bold">Amount</label>
                            <input
                              type="text"
                              name="amount"
                              id="amount"
                              class="form-control input-sm text-right"
                              v-model="overtimeData.amount"
                              @change="changedAmount"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group p-t-12">
                            <label for="rate" class="control-label bold"></label>
                            <div class="row">
                              <div class="col-sm-4 pr-0">
                                <input
                                  type="number"
                                  name="hours"
                                  id="hours"
                                  value
                                  style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                                  class="form-control input-sm slider-diff"
                                  v-model="overtimeData.hours"
                                  required
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
                      <div class="row"></div>
                    </div>
                  </div>
                  <div class="modal-footer pd-footer">
                    <div class="float-right">
                      <button
                        @click="hideOvertime"
                        class="btn btn-sm btn-outline-secondary mr-2"
                      >CANCEL</button>
                      <button
                        type="submit"
                        :class="[addingOvertime ? 'disabled': '', 'btn btn-sm btn-info']"
                        :disabled="addingOvertime ? true: false"
                      >
                        <span v-if="addingOvertime">
                          <span class="pr-2">Processing</span>
                          <img src="../../../assets/loader/round-sm.svg" alt />
                        </span>

                        <span v-else>
                          SUBMIT
                          <i class="fa fa-send"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
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
                  <h5
                    class="modal-title text-center f-s-14"
                  >Do you want to delete ({{ selectedRows.length }}) selected items?</h5>
                </div>

                <div class="modal-body pd-modal">
                  <div class="modal-fluid">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="float-right">
                          <button
                            class="btn btn-sm btn-outline-secondary mr-2"
                            @click="hideDelOvertimeModal"
                          >CANCEL</button>
                          <button class="btn btn-sm btn-danger" @click="deleteOvertime">DELETE</button>
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
import { mapState, mapActions } from "vuex";
import moment from "moment";
import toastr from "toastr";
import { formatMoney } from "../../../mixins/helpers";

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
          field: "overtimePeriod",
          width: "120px"
        },
        {
          label: "Hours",
          field: "hours"
        },

        {
          label: "Amount(KES)",
          field: "amountKes"
        },
        {
          label: "Notes",
          field: "OvertimeNotes",
          width: "200px"
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
        id: null,
        date: moment().format("YYYY-MM-DD"),
        hours: "",
        from: moment().format("HH:mm"),
        to: "",
        amount: "",
        realAmount: "",
        notes: null,
        status: false
      },
      isEdit: false
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

  created() {
    this.initiateCreate();
  },

  methods: {
    ...mapActions(["createOvertime", "updateOvertime", "destroyOvertime"]),

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

    deleteOvertimeModal() {
      $(".delAbsentMd").modal("show");
    },

    addOvertime() {
      $(".addOvertimeMd").modal("show");
    },

    hideOvertime() {
      this.overtimeData = {};
      this.isEdit = false;
      $("#employeeName")
        .val("")
        .trigger("change");

      $(".addOvertimeMd").modal("hide");
    },

    editOvertime(row) {
      this.overtimeData = {
        id: row.id,
        date: moment(row.date).format("YYYY-MM-DD"),
        hours: row.hours,
        from: row.from,
        to: row.to,
        notes: row.notes,
        status: row.status,
        realAmount: row.amount,
        amount: formatMoney(row.amount)
      };
      this.isEdit = true;

      $("#employeeName")
        .val(row.employeeId)
        .trigger("change");

      $(".addOvertimeMd").modal("show");
    },

    changedTime() {
      const v = this.overtimeData;
      let a = parseInt(v.to.split(":", 1));
      let b = parseInt(v.from.split(":", 1));
      const diff = Math.abs(a - b);
      this.overtimeData.hours = diff;
    },

    changedAmount() {
      this.overtimeData.realAmount = this.overtimeData.amount;
      return (this.overtimeData.amount = formatMoney(this.overtimeData.amount));
    },

    checkMoney(data) {
      return formatMoney(data);
    },
    saveOvertime() {
      const v = this.overtimeData;
      const data = {
        id: v.id,
        date: v.date,
        hours: v.hours,
        from: v.from,
        to: v.to,
        amount: v.realAmount,
        notes: v.notes,
        status: v.status,
        employeeId: $("#employeeName").val()
      };
      if (this.isEdit) {
        this.updateOvertime(data).then(() => {
          toastr.success("Successfully update selected record");
          this.hideOvertime();
        });
      } else {
        this.createOvertime(data).then(() => {
          toastr.success("Successfully added new record");
          this.hideOvertime();
        });
      }
    },

    hideDelOvertimeModal() {
      $(".delAbsentMd").modal("hide");
    },

    deleteOvertime() {
      // const selectedIds = [];
      // for (let i = 0; i < this.selectedRows.length; i++) {
      //   this.destroyOvertime(this.selectedRows[i].id);
      // }

      // this.destroyOvertime( );

      $(".delAbsentMd").modal("hide");
    },

    selEditOvertime() {},

    selOvertime(row) {
      this.selectedRows = row.selectedRows;
    }
  }
};
</script>