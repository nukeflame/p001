<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Absenteeism</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item active">Absenteeism</li>
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
                  <u>Absenteeism Details</u>
                </h6>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-2">
                <span>
                  Total Applications:
                  <span class="pl-1 pr-1 label label-default bold f-s-13">3</span>
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
                      @click="deleteAbsentModal"
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
                          <a href="#" @click.prevent="approveAbsenteeism">
                            <i class="fa fa-check pr-1"></i>Approve
                          </a>
                        </li>
                        <li class="p-1">
                          <a href="#" @click.prevent="disapproveAbsenteeism">
                            <i class="fa fa-ban pr-1"></i>Disapprove
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button @click="addAbsenteeism" class="btn btn-outline-primary btn-sm">
                    <i class="fa fa-plus pr-1"></i>Add Absenteeism
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
                  :rows="dataCol"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: 'Search absenteeism...'}"
                  @on-selected-rows-change="selAbsenteeism"
                  :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- actions -->
                    <span v-if="props.column.field == 'actions'">
                      <div class="dropdown">
                        <a class="btn-block color-primary" href="#">
                          <i class="fa fa-edit"></i> Edit
                        </a>
                      </div>
                    </span>
                    <!-- status -->
                    <span v-else-if="props.column.field == 'status'">
                      <span v-if="props.row.status == 1">Active</span>
                      <span v-else-if="props.row.status == 0">Pending</span>
                      <span v-else>Cleared</span>
                    </span>
                    <!-- amount_kes -->
                    <span
                      v-else-if="props.column.field == 'amount_kes'"
                      class="float-right"
                    >{{ formatMoney(props.row.amount)}}</span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>

          <!-- add payperiod modal-->
          <div
            class="modal animated fadeIn addAbsenteeismMd"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h4 class="modal-title text-center f-s-14">
                    <i class="fa fa-plus pr-1"></i>Add Absenteeism
                  </h4>
                </div>
                <div class="modal-body">
                  <form class="form-horizontal">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="employee" class="control-label bold">Employee</label>
                          <select name="employee" id="employee" class="form-control input-sm"></select>
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
                            v-model="absenteeData.date"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="from" class="control-label bold">From</label>
                          <input
                            type="date"
                            name="from"
                            id="from"
                            class="form-control input-sm"
                            v-model="absenteeData.from"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="to" class="control-label bold">To</label>
                          <input
                            type="date"
                            name="to"
                            id="to"
                            class="form-control input-sm"
                            v-model="absenteeData.amount"
                          />
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
                                value
                                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                                class="form-control input-sm slider-diff"
                                v-model="absenteeData.hours"
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
                        <div class="form-group p-t-23">
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="isStatus"
                              v-model="absenteeData.status"
                            />
                            <label class="custom-control-label bold" for="isStatus">Status</label>
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
                            v-model="absenteeData.amount"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="notes" class="control-label bold">Notes</label>
                          <input
                            type="text"
                            name="notes"
                            id="notes"
                            class="form-control input-sm"
                            v-model="absenteeData.notes"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row"></div>
                  </form>
                </div>
                <div class="modal-footer pd-footer">
                  <div class="float-right">
                    <button
                      @click="hideAbsenteeism"
                      class="btn btn-sm btn-outline-secondary mr-2"
                    >CANCEL</button>
                    <button
                      type="submit"
                      :class="[addingAbsentee ? 'disabled': '', 'btn btn-sm btn-info']"
                      @click="saveAbsenteeism"
                      :disabled="addingAbsentee ? true: false"
                    >
                      <span v-if="addingAbsentee">
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
                            @click="hideDelAbsentModal"
                          >CANCEL</button>
                          <button class="btn btn-sm btn-danger" @click="deleteAbsenteeism">Delete</button>
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

export default {
  data() {
    return {
      addingAbsentee: false,
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
          label: "Absenteeism Period",
          field: "absPeriod"
        },
        {
          label: "Hours",
          field: "absHrs"
        },
        {
          label: "Rate",
          field: "absRate"
        },
        {
          label: "Amount(KES)",
          field: "amount_kes"
        },
        {
          label: "Notes",
          field: "notes"
        },
        {
          label: "Status",
          field: "status"
        },
        {
          label: "",
          field: "actions",
          width: "60px"
        }
      ],
      absenteeData: {
        date: moment().format("YYYY-MM-DD"),
        from: moment().format("YYYY-MM-DD"),
        hours: "",
        to: "",
        amount: "",
        notes: "",
        status: ""
      },
      selectedRows: [],
      dataCol: [
        {
          staffNo: "EMP-003021",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          date: "12, Oct, 2019",
          absPeriod: "12/3/2019 - 19/3/2019",
          absHrs: "12hrs",
          absRate: "10",
          amount: "30000000",
          status: 1
        }
      ]
    };
  },

  computed: {
    ...mapState({
      attendance: state => state.attendance.attendance,
      employees: state => state.employees.employees,
      authUser: state => state.roles.authUser
    })
  },

  created() {
    // set title
    document.title = "Absenteeism :: Epsotech";

    this.$store.dispatch("fetchEmployees").then(() => {
      $("#employee")
        .select2({
          dropdownParent: $(".addAbsenteeismMd"),
          placeholder: "Select Employee",
          allowClear: true,
          data: this.employees
        })
        .val(null)
        .trigger("change");
    });
  },

  methods: {
    ...mapActions(["timeIn", "timeOut"]),

    addAbsenteeism() {
      $(".addAbsenteeismMd").modal("show");
    },

    hideAbsenteeism() {
      $(".addAbsenteeismMd").modal("hide");
    },

    saveAbsenteeism() {
      $(".addAbsenteeismMd").modal("show");
    },

    selAbsenteeism(row) {
      this.selectedRows = row.selectedRows;
    },

    approveAbsenteeism() {},

    disapproveAbsenteeism() {},

    deleteAbsentModal() {
      $(".delAbsentMd").modal("show");
    },

    hideDelAbsentModal() {
      this.selectedRows = [];
      $(".delAbsentMd").modal("hide");
    },

    deleteAbsenteeism() {
      if (this.selectedRows.length > 0) {
        this.destroyLeave(this.selectedRows).then(() => {
          this.selectedRows = [];
          $(".delAbsentMd").modal("hide");
          toastr("success")["Leave Applications trashed!"];
        });
      }
    },

    formatMoney(n, c, d, t) {
      var c = isNaN((c = Math.abs(c))) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
        j = (j = i.length) > 3 ? j % 3 : 0;

      return (
        s +
        (j ? i.substr(0, j) + t : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
        (c
          ? d +
            Math.abs(n - i)
              .toFixed(c)
              .slice(2)
          : "")
      );
    }
  }
};
</script>
