<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">View Applications</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Leave</li>
          <li class="breadcrumb-item active">View Applications</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="row pb-2">
              <div class="col-sm-12">
                <h6 class="bold">
                  <u>View Applications Details</u>
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
                      @click="deleteLeaveModal"
                    >
                      <i class="fa fa-trash pr-1"></i>Delete
                    </button>
                    <div class="btn-group">
                      <button
                        type="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                        :class="[selectedRows && selectedRows.length > 0 ? ' ' : 'disabled' ,'btn btn-primary dropdown-toggle btn-sm']"
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
                          <a href="#" @click.prevent="approvePayslip">
                            <i class="fa fa-check pr-1"></i>Approve
                          </a>
                        </li>
                        <li class="p-1">
                          <a href="#" @click.prevent="disapprovePayslip">
                            <i class="fa fa-ban pr-1"></i>Disapprove
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <router-link to="/site/leave/apply" class="btn btn-outline-primary btn-sm mr-2">
                    <i class="fa fa-plus pr-1"></i> New Leave Application
                  </router-link>
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
                  :rows="leaves"
                  :pagination-options="{enabled: true, perPage: 15}"
                  :search-options="{ enabled: true , placeholder: ''}"
                  @on-selected-rows-change="selLeave"
                  :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- actions -->
                    <span v-if="props.column.field == 'actions'">
                      <div>
                        <button type="button" class="btn btn-xs btn-primary mr-2">
                          <i class="fa fa-edit pr-1"></i> Edit Advance
                        </button>
                        <button
                          type="button"
                          class="btn btn-xs btn-info"
                          @click="viewSlipModal"
                        >View Slip</button>
                      </div>
                    </span>
                    <span v-else-if="props.column.field == 'status'">
                      <span
                        v-if="props.row.leaveStatus == 1"
                        class="label label-success f-s-10 bold"
                        style="padding: 2px 10px;"
                      >Approved</span>
                      <span
                        v-else
                        class="label label-warning f-s-10 bold"
                        style="padding: 2px 10px;"
                      >Pending</span>
                    </span>
                    <span v-else-if="props.column.field == 'leave_type'">
                      <span v-if="props.row.leaveType.slug === 'sick_leave'">
                        <i class="fa fa-square" style="color:var(--green)" aria-hidden="true"></i>
                        {{ props.row.leaveType.name}}
                      </span>
                      <span v-else-if="props.row.leaveType.slug === 'annual_leave'">
                        <i class="fa fa-square" style="color:var(--pink)" aria-hidden="true"></i>
                        {{ props.row.leaveType.name}}
                      </span>
                      <span v-else-if="props.row.leaveType.slug === 'paternity_leave'">
                        <i class="fa fa-square" style="color:var(--cyan)" aria-hidden="true"></i>
                        {{ props.row.leaveType.name}}
                      </span>
                      <span v-else-if="props.row.leaveType.slug === 'maternity_leave'">
                        <i class="fa fa-square" style="color:var(--purple)" aria-hidden="true"></i>
                        {{ props.row.leaveType.name}}
                      </span>
                    </span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>

          <!-- delete leave modal-->
          <div
            class="modal animated fadeIn delLeaveMd"
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
                            @click="hideDelLeaveModal"
                          >Cancel</button>
                          <button class="btn btn-sm btn-danger" @click="deleteLeave">Delete</button>
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
import toastr from "toastr";
import echo from "../../../mixins/echo";
import DateRangePicker from "vue2-daterange-picker";

export default {
  data() {
    return {
      columns: [
        {
          label: "Employee",
          field: "employeeName"
        },

        {
          label: "Leave Type",
          field: "leave_type"
        },

        {
          label: "Application Date",
          field: "appDate"
        },
        {
          label: "Start Date",
          field: "startDate"
        },
        {
          label: "End Date",
          field: "endDate"
        },
        {
          label: "Duration",
          field: "duration"
        },
        {
          label: "Leave Status",
          field: "status",
          width: "90px"
        }
      ],
      data: [
        {
          employeeName: "Kennedy Mwanzi Peters",
          leaveType: "Sick Leave",
          applicationDate: "2019/11/23",
          startDate: "23/11/2019 [08:00 am]",
          endDate: "23/11/2019 [08:00 am]",
          duration: "1 days	",
          leaveStatus: "Approved"
        },
        {
          employeeName: "Kennedy Mwanzi Peters",
          leaveType: "Sick Leave",
          applicationDate: "2019/11/23",
          startDate: "23/11/2019 [08:00 am]",
          endDate: "23/11/2019 [08:00 am]",
          duration: "1 days	",
          leaveStatus: 1
        }
      ],
      selectedRows: [],
      leaveAppData: {
        id: null,
        leaveBal: "",
        leaveType: "",
        dateRange: "",
        mode: ""
      },
      dateRange: new Date()
    };
  },

  components: { DateRangePicker },

  computed: {
    ...mapState({
      leaves: state => state.leaves.leaves,
      leaveTypes: state => state.leaves.leaveTypes,
      authUser: state => state.users.authUser,
      employees: state => state.employees.employees
    })
  },

  mixins: [echo],

  created() {
    // set payperiods
    document.title = "View Applications :: Epsotech";
    //extended
    this.initiateCreate();
  },

  methods: {
    ...mapActions(["destroyLeave"]),
    initiateCreate() {
      //get leaves
      this.$store.dispatch("fetchLeaves");
      //leave ttyes
      this.$store.dispatch("fetchLeavesType");

      //get employees
      this.$store.dispatch("fetchEmployees").then(() => {
        $("#employeeName")
          .select2({
            dropdownParent: $(".leaveAppMd"),
            placeholder: "Select Employee",
            allowClear: true,
            data: this.employees
          })
          .val(null)
          .trigger("change");
      });
    },

    getEventHandlers() {
      return {
        "Leaves.CreateLeaveEvent": e => {
          if (e.userId !== this.authUser.id) {
            this.$store.commit("CREATE_LEAVE", e.leave);
          }
        },

        "Leaves.DestroyLeaveEvent": e => {
          if (e.userId !== this.authUser.id) {
            this.$store.commit("DEL_LEAVE", e.leave);
          }
        }
      };
    },

    selLeave(row) {
      this.selectedRows = row.selectedRows;
    },

    deleteLeaveModal() {
      $(".delLeaveMd").modal("show");
    },

    hideDelLeaveModal() {
      this.selectedRows = [];
      $(".delLeaveMd").modal("hide");
    },

    deleteLeave() {
      if (this.selectedRows.length > 0) {
        this.destroyLeave(this.selectedRows).then(() => {
          this.selectedRows = [];
          $(".delLeaveMd").modal("hide");
          toastr("success")["Leave Applications trashed!"];
        });
      }
    }
  }
};
</script>


