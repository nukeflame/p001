<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Email Payslips</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Payment</li>
          <li class="breadcrumb-item active">Email Payslips</li>
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
                  <u>Email Payslips Info</u>
                </h6>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-12">
                <div class="btn-group">
                  <button type="button" class="btn btn-warning btn-sm mr-2">
                    <i class="fa fa-calendar-o pr-1"></i> View Scheduled Emails
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="card mt-0 p-0">
                    <div class="card-header" style="padding: 8px 15px">
                      <h6 class="mb-0">
                        <i class="fa fa-envelope"></i> Add accompaning message
                      </h6>
                    </div>
                    <div class="card-body p-3">
                      <div class="form-group color-muted">
                        <p class="mb-0 text-dark">Dear [OtherName Surname],</p>
                      </div>
                      <div class="form-group">
                        <textarea
                          name="email_sms"
                          class="email__box"
                          id="emailSms"
                          v-model="emailData.sms"
                        ></textarea>
                      </div>
                      <div class="form-group">
                        <div class="alert alert-info">
                          An Email will be sent to each Employee you select. Their individual names will be mail-merged into each email. A pay slip in PDF form will be attached to each respective email adress.
                          <br />
                          <span
                            style="color: var(--dark); font-family: 'Roboto-Bold'; font-weight: 500;"
                          >Only Employees with valid Email addresses will receive their documents.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="my-1">
                    <div class="row pb-2">
                      <div class="col-sm-12">
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn btn-info btn-sm mr-2"
                            @click="handleEmailClick"
                          >
                            Email Documents
                            <i class="fa fa-send pl-1"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <vue-good-table
                      class="email__table"
                      :columns="columns"
                      :rows="employees"
                      :pagination-options="{enabled: true}"
                      :search-options="{ enabled: true , placeholder: ' '}"
                      @on-selected-rows-change="selEmployee"
                      :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden', selectionText: 'selected', clearSelectionText: 'clear'}"
                    >
                      <template slot="table-row" slot-scope="props">
                        <!-- actions -->

                        <span v-if="props.column.field == 'emailSlip'" class="float-left">
                          <span>{{ props.row.email }}</span>
                        </span>
                        <span v-else-if="props.column.field == 'is_current'">
                          <span v-if="props.row.isCurrent === 1">Yes</span>
                          <span v-else>No</span>
                        </span>
                        <span v-else>{{props.formattedRow[props.column.field]}}</span>
                      </template>
                    </vue-good-table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- email docs modal-->
          <div
            class="modal animated fadeIn emailDocsMod"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog modal-sm">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h4 class="modal-title text-center f-s-14">Email Documents Process</h4>
                  <a href="#" @click="hideEmailClick">
                    <img src="../../../assets/images/icon_close.svg" alt />
                  </a>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label for="selectPMonth" class="control-label bold">Choose Payroll Month</label>
                          <select
                            name="selectPMonth"
                            id="selectPMonth"
                            class="form-control input-sm sel2"
                          >
                            <option value disabled>Select Payroll Month</option>
                            <option
                              selected
                              :value="period.id"
                              v-for="period in periods"
                              :key="period.id"
                            >{{ getPayMonth(period) }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group pt-2">
                          <label for="sendTime" class="control-label bold">Send Time:</label>
                          <input
                            type="date"
                            name="sendTime"
                            id="sendTime"
                            class="form-control input-sm bold"
                            v-model="advancePayData.sendTime"
                          />
                          <input
                            type="time"
                            name="sendTime"
                            id="sendTime"
                            class="form-control input-sm bold"
                            v-model="advancePayData.sendTime"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group py-3">
                          <button class="btn btn-sm btn-block btn-primary">Send</button>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" id="notifyByEmail" class="custom-control-input" />
                            <label
                              for="notifyByEmail"
                              class="custom-control-label"
                            >Notify me by email when done.</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer pd-footer">
                  <div class="float-right">
                    <button @click="hideEmailClick" class="btn btn-sm btn-outline-secondary">CANCEL</button>
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

export default {
  data() {
    return {
      creatingPeriod: false,
      months: [
        { id: 1, name: "January" },
        { id: 2, name: "February" },
        { id: 3, name: "March" },
        { id: 4, name: "April" },
        { id: 5, name: "May" },
        { id: 6, name: "June" },
        { id: 7, name: "July" },
        { id: 8, name: "August" },
        { id: 9, name: "September" },
        { id: 10, name: "October" },
        { id: 11, name: "November" },
        { id: 12, name: "December" }
      ],
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
          label: "Email",
          field: "email"
        }
      ],
      advancePayData: {
        id: null,
        payYear: "",
        payMonth: "",
        beginingDate: "",
        endingDate: "",
        amountBorrowed: "34,899,099.00"
      },
      emailData: {
        sms: "Please find attached your pay slip for the month of....        "
      }
    };
  },

  computed: {
    ...mapState({
      employees: state => state.employees.employees,
      periods: state => state.periods.periods
    })
  },

  created() {
    // set payperiods
    document.title = "Epsotech :: Pay Periods";
    //get employees
    this.$store.dispatch("fetchEmployees");
    //get periods
    this.$store.dispatch("fetchPeriods").then(() => {
      $("#emailPeriodMonth")
        .select2({
          dropdownParent: $(".advancePayMd"),
          placeholder: "Select Payroll Month",
          allowClear: true,
          data: this.periods
        })
        .val("")
        .trigger("change");
    });
  },

  methods: {
    ...mapActions(["createPeriod"]),

    handleEmailClick() {
      $(".emailDocsMod").modal("show");
    },

    hideEmailClick() {
      $(".emailDocsMod").modal("hide");
    },

    viewSlipModal() {
      $(".viewSlipMd").modal("show");
    },

    hideViewSlipModal() {
      $(".viewSlipMd").modal("hide");
    },

    selEmployee() {},

    savePeriod() {
      this.createPeriod(this.advancePayData).then(() => {
        $(".payPeriodMd").modal("hide");
      });
    },

    getPayMonth(data) {
      return moment(data.endingDate).format("MMMM, YYYY");
    }
  }
};
</script>

<style>
.email__box {
  border-radius: 4px;
  border-color: #99abb4;
  width: 100%;
  height: 200px;
  padding: 20px;
  font-family: inherit;
  font-size: 13px;
}
.email__table thead tr th:last-child {
  text-align: left !important;
}
.email__table tbody tr td:last-child {
  text-align: left !important;
}
</style>