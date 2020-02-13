<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Leave Logs</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item active">Payment</li>
          <li class="breadcrumb-item active">Leave Logs</li>
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
                  <u>Leave Log Details</u>
                </h6>
              </div>
            </div>
            <div class="row pb-2">
              <div class="col-sm-12">
                <div class="btn-group">
                  <button
                    type="button"
                    :class="[selectedRows && selectedRows.length > 0 || proccessPayslip? '' : 'disabled', 'btn btn-primary btn-sm']"
                    :disabled="selectedRows && selectedRows.length > 0 || proccessPayslip ? false : true"
                    @click.prevent="addPayslip"
                  >
                    <span v-if="proccessPayslip">
                      Processing
                      <img src="../../../assets/loader/round-sm.svg" class="pl-2" alt />
                    </span>
                    <span v-else>
                      <i class="fa fa-money pr-1"></i>
                      Generate Payslip(s)
                    </span>
                  </button>
                  <button
                    type="button"
                    :class="[selectedRows && selectedRows.length === 1 ? '' : 'disabled', 'btn btn-info btn-sm']"
                    :disabled="selectedRows && selectedRows.length  === 1 ? false : true"
                    @click.prevent="handlePayrollPar"
                  >
                    <i class="ti-receipt pr-1"></i>Update Payrol Parameter
                  </button>
                  <button
                    type="button"
                    :class="[selectedRows && selectedRows.length > 0? '' : 'disabled', 'btn btn-danger btn-sm']"
                    :disabled="selectedRows && selectedRows.length > 0 ? false : true"
                  >
                    <i class="fa fa-trash pr-1"></i>Delete
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="employees"
                  :pagination-options="{enabled: true}"
                  @on-selected-rows-change="selEmployee"
                  :search-options="{ enabled: true , placeholder: 'Search ...'}"
                  :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden', selectionText: 'selected', clearSelectionText: 'clear'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'pay_month'">
                      <span v-for="month in months" :key="month.id">
                        <span v-if="props.row.payMonth == month.id">{{month.name}}</span>
                      </span>
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

          <!-- update payroll parameter modal-->
          <div
            class="modal animated fadeIn payrollParMd"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h4 class="modal-title text-center f-s-14">
                    Payroll Parameters:-
                    <span class="pl-1 f-s-13">({{payrollParData.name}})</span>
                  </h4>
                  <!-- <a class>
                    <i class="fa fa-close"></i>
                  </a>-->
                </div>
                <div class="modal-body">
                  <div class="modal-fluid">
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label for="par" class="control-label bold">Parameter</label>
                          <select name="par" id="payrollPar" class="form-control input-sm sel2"></select>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label for="amount" class="control-label bold">Amount</label>
                          <input
                            type="number"
                            class="form-control input-sm"
                            name="amount"
                            id="amount"
                            v-model="payrollParData.amount"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for class="control-label bold pb-3"></label>
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="can_access"
                              v-model="payrollParData.isActive"
                            />
                            <label class="custom-control-label" for="can_access">Is Active</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group mt-3">
                          <button
                            type="submit"
                            :class="[updatingPayrolPar ? 'disabled': '', 'btn btn-sm btn-info']"
                            @click="savePayrolPar"
                            :disabled="updatingPayrolPar ? true: false"
                          >
                            <span v-if="updatingPayrolPar">
                              <span class="pr-2">Processing</span>
                              <img src="../../../assets/loader/round-sm.svg" alt />
                            </span>
                            <span v-else>
                              <i class="ti-plus"></i> Add Parameter
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="row pb-2">
                      <div class="col-sm-12">
                        <h6 class="pt-4 bold f-s-13 pr-1">
                          <u>Employee Payroll Parameters:-</u>
                          <i class="f-s-10">(Loans, Benefits and Deductions)</i>
                        </h6>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <vue-good-table
                          :columns="parColumns"
                          :rows="payrollParData.parData"
                          :pagination-options="{enabled: false}"
                          max-height="300px"
                          :search-options="{ enabled: true , placeholder: 'Search ...'}"
                        >
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'isActive'">
                              <span v-if="props.row.isDefault == 1">Yes</span>
                              <span v-else>No</span>
                            </span>
                            <span v-else-if="props.column.field == 'amount'">
                              <span>{{ formatMoney(props.row.defValue)}}</span>
                            </span>
                            <span v-else>{{props.formattedRow[props.column.field]}}</span>
                          </template>
                        </vue-good-table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer pd-footer">
                  <div class="float-right">
                    <button
                      @click="hidePayrolPar"
                      class="btn btn-sm btn-outline-secondary mr-2"
                    >Cancel</button>
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
      updatingPayrolPar: false,
      selectedRows: [],
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
          label: "Date",
          field: "staffNo"
        },
        {
          label: "Description",
          field: "surname"
        },
        {
          label: "Surname",
          field: "gender"
        },
        {
          label: "Other Names",
          field: "otherNames"
        },

        {
          label: "Days",
          field: "idNo"
        },
        {
          label: "Balance",
          field: "tel1"
        }
      ],
      payPeriodData: {
        id: null,
        payYear: "",
        payMonth: "",
        beginingDate: "",
        endingDate: "",
        isCurrent: false
      },
      payrollParData: {
        id: null,
        amount: "",
        name: "",
        isActive: false,
        parameter: null,
        parData: []
      },
      parColumns: [
        {
          label: "Parameter",
          field: "name"
        },
        {
          label: "Category",
          field: "description"
        },
        {
          label: "Type",
          field: "category.name"
        },
        {
          label: "Is Active",
          field: "isActive"
        },
        {
          label: "Amount (kes)",
          field: "amount"
        }
      ]
      // payrollPars: [
      //   { text: "Basic Pay", id: 1 },
      //   { text: "Security Fund", id: 2 },
      //   { text: "Health Fund", id: 3 },
      //   { text: "Tax Relief", id: 4 },
      //   { text: "Sacco", id: 5 },
      //   { text: "Car Benefit", id: 6 },
      //   { text: "Transport Allowance", id: 7 },
      //   { text: "Medical Assistance", id: 8 },
      //   { text: "Advance", id: 9 }
      // ]
    };
  },

  computed: {
    ...mapState({
      employees: state => state.employees.employees,
      payrolPars: state => state.payrollParameters.payrolPars,
      proccessPayslip: state => state.payroll.proccessPayslip
    })
  },

  created() {
    // set payperiods
    document.title = "Epsotech :: Leave Logs";
    //get periods.
    this.$store.dispatch("fetchEmployees");
    //get parameters
    this.$store.dispatch("fetchPayrollParameter").then(() => {
      $("#payrollPar")
        .select2({
          dropdownParent: $(".payrollParMd"),
          placeholder: "Select parameter",
          allowClear: true,
          data: this.payrolPars
        })
        .val(null)
        .trigger("change");
    });
  },

  // mounted() {

  // },

  methods: {
    ...mapActions(["generatePayslip", "updateStaffParameter"]),

    hidePayrolPar() {
      $(".payrollParMd").modal("hide");
    },

    savePayrolPar() {
      const p = this.payrollParData;
      const data = {
        staffId: p.id,
        amount: p.amount,
        isActive: p.isActive,
        parameter: $("#payrollPar").val()
      };

      this.updateStaffParameter(data);
    },

    handlePayrollPar() {
      const sel = this.selectedRows[0];
      this.payrollParData = {
        id: sel.id,
        name: sel.surname + " " + sel.otherNames,
        parData: sel.parameter
      };

      $(".payrollParMd").modal("show");
    },

    selEmployee(row) {
      this.selectedRows = row.selectedRows;
    },

    addPayslip() {
      const formData = new FormData();

      for (let i = 0; i < this.selectedRows.length; i++) {
        const el = this.selectedRows[i];
        formData.append("staffId[]", el.id);
      }

      this.generatePayslip(formData);
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
