<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Payroll Reports</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Reports</li>
          <li class="breadcrumb-item active">Payroll Reports</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="row mt-4">
            <div class="col-md-2 col-sm-3">
              <div class="form-group">
                <select
                  id="payrollM"
                  class="form-control input-sm sel2"
                  v-model="reportData.monthId"
                >
                  <option
                    :value="period.id"
                    v-for="period in periods"
                    :key="period.id"
                  >{{ getPayMonth(period.endingDate) }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-2 col-sm-3">
              <div class="form-group">
                <select id="branchM" class="form-control input-sm" v-model="reportData.branchId">
                  <option value="0">All Branches</option>
                  <option
                    v-for="branch in branches"
                    :key="branch.id"
                    :value="branch.id"
                  >{{ branch.name}}</option>
                </select>
              </div>
            </div>
            <div class="col-md-2 col-sm-3">
              <div class="form-group">
                <select id="departM" class="form-control input-sm" v-model="reportData.departId">
                  <option value="0" selected>All Departments</option>
                  <option v-for="dep in departments" :key="dep.id" :value="dep.id">{{ dep.name}}</option>
                </select>
              </div>
            </div>
            <div class="col-md-2 col-sm-2">
              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-info input-sm"
                  style="padding: .375rem .75rem;"
                  @click="runReport"
                >
                  <i class="fa fa-refresh pr-2"></i>Run Report
                </button>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="row pb-2">
              <div class="col-sm-12">
                <h6 class="bold text-center">
                  Muster Roll for
                  <span class="text-primary" v-if="payrollMonth">{{ payrollMonth }}</span>
                  <span
                    class="text-primary"
                    v-else
                  >{{ getPayMonth(reports[0] && reports[0].periodDate) }}</span>
                </h6>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-12">
                <div class="float-left">
                  <div class="btn-group mr-2">
                    <div class="btn-group">
                      <button
                        type="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                        class="btn btn-info dropdown-toggle btn-sm"
                      >
                        <i class="fa fa-thumbs-up pr-1"></i>Approval
                        <span class="caret"></span>
                      </button>
                      <ul
                        role="menu"
                        x-placement="bottom-start"
                        class="dropdown-menu"
                        style="position: absolute; transform: translate3d(0px, 40px, 0px); top: 0px; left: 0px; will-change: transform;"
                      >
                        <li class="p-1">
                          <a href="#" class="color-primary">
                            <i class="fa fa-check pr-1"></i>Approve
                          </a>
                        </li>
                        <li class="p-1">
                          <a href="#" class="color-primary">
                            <i class="fa fa-ban pr-1"></i>Disapprove
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
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
            <div>
              <vue-good-table
                class="payroll-reports-tbl"
                :columns="columns"
                :rows="reports"
                :pagination-options="{enabled: true, perPage: 15 }"
                :search-options="{ enabled: true, placeholder: ''}"
                :fixed-header="true"
                max-height="360px"
                @row-select-class="approveRow"
              >
                <div slot="table-actions-bottom hidden">
                  <div class="vgt-responsive">
                    <table class="vgt-table bordered">
                      <tr class>
                        <td class="vgt-left-align">
                          <span class="bold text-dark">Basic Pay:</span>
                        </td>
                        <td class="vgt-left-align">
                          <span>11,500.00</span>
                        </td>
                        <td class="vgt-left-align">
                          <span class="bold text-dark">Gross Pay:</span>
                        </td>
                        <td class="vgt-left-align">
                          <span>690.00</span>
                        </td>
                        <td class="vgt-left-align">
                          <span class="bold text-dark">N.H.I.F:</span>
                        </td>
                        <td class="vgt-left-align">
                          <span>1,090.00</span>
                        </td>
                        <td class="vgt-left-align">
                          <span class="bold text-dark">N.S.S.F</span>
                        </td>
                        <td class="vgt-left-align">
                          <span>1,090.00</span>
                        </td>
                        <td class="vgt-left-align">
                          <span class="bold text-dark">Total Statutory:</span>
                        </td>
                        <td class="vgt-left-align">
                          <span>1,090.00</span>
                        </td>
                        <td class="vgt-left-align">
                          <span class="bold text-dark">Advance Pay:</span>
                        </td>
                        <td class="vgt-left-align">
                          <span>1,090.00</span>
                        </td>
                        <td class="vgt-left-align">
                          <span class="bold text-dark">Total Other Ded:</span>
                        </td>
                        <td class="vgt-left-align">
                          <span>1,090.00</span>
                        </td>
                        <td class="vgt-left-align">
                          <span class="bold text-dark">Net Pay:</span>
                        </td>
                        <td class="vgt-left-align">
                          <span>1,090.00</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <!-- styleClass="vgt-table condensed" -->
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'branch'">
                    <span v-for="branch in branches" :key="branch.id">
                      <!-- <span v-if="branch.id === props.row.client.branch_id">{{ branch.branch_name}}</span> -->
                    </span>
                  </span>
                  <!-- employee name -->
                  <span v-if="props.column.field == 'employeeName'">
                    <span>{{ props.row.otherNames + ' ' + props.row.surname }}</span>
                  </span>
                  <!-- basicSalary -->
                  <span v-if="props.column.field == 'basicPay'">
                    <span>{{ getFormatedMoney(props.row.basicSalary) }}</span>
                  </span>
                  <!-- basicSalary -->
                  <span v-if="props.column.field == 'grossPay'">
                    <span>{{ getFormatedMoney(props.row.grossSalaray) }}</span>
                  </span>
                  <!-- basicSalary -->
                  <!-- <span v-if="props.column.field == 'basicPay'">
                    <span>{{ getFormatedMoney(props.row.basicSalary) }}</span>
                  </span>-->
                  <!-- basicSalary -->
                  <!-- <span v-if="props.column.field == 'basicPay'">
                    <span>{{ getFormatedMoney(props.row.basicSalary) }}</span>
                  </span>-->
                  <span
                    v-else-if="props.column.field == 'nhifData'"
                    class="nhif-td"
                  >{{ props.row.nhif }}</span>

                  <span v-else>{{props.formattedRow[props.column.field]}}</span>
                </template>
              </vue-good-table>
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
import { formatMoney } from "../../../mixins/helpers";

export default {
  data() {
    return {
      departments: [],
      payrollMonth: "",
      columns: [
        {
          label: "Staff No",
          field: "staffNo"
        },
        {
          label: "Employee Name",
          field: "employeeName"
        },
        {
          label: "Job Title",
          field: "jobTitle"
        },
        {
          label: "Basic Pay",
          field: "basicPay"
        },
        {
          label: "Gross Pay",
          field: "grossPay"
        },
        {
          label: "N.H.I.F",
          field: "nhifData"
        },
        {
          label: "N.S.S.F",
          field: "nssf"
        },
        {
          label: "Total Statutory",
          field: "totalStatutory",
          class: "text-primary"
        },
        {
          label: "Advance Pay",
          field: "advancePay"
        },
        {
          label: "Total Other Ded.",
          field: "otherDed"
        },
        {
          label: "Net Pay",
          field: "netPay"
        },
        {
          label: "Approval Status",
          field: "status"
        }
      ],
      reportData: {
        monthId: "",
        branchId: "0",
        departId: "0"
      }
    };
  },

  computed: {
    ...mapState({
      branches: state => state.branches.branches,
      periods: state => state.periods.periods,
      reports: state => state.payrollReports.payrollReports
    })
  },

  mounted() {
    // employee name
    $("#payrollM")
      .select2({
        placeholder: "Select Month"
      })
      .on("change", e => {
        const obj = $("#payrollM").select2("data");
        this.reportData.monthId = obj[0].id;
      });
    // branch name
    $("#branchM")
      .select2({
        placeholder: "Select Branch"
      })
      .on("change", e => {
        const obj = $("#branchM").select2("data");
        this.reportData.branchId = obj[0].id;
      });
    // department name
    $("#departM")
      .select2({
        placeholder: "Select Departments"
      })
      .on("change", e => {
        const obj = $("#departM").select2("data");
        this.reportData.departId = obj[0].id;
      });
  },

  created() {
    this.initCreated();
  },

  methods: {
    ...mapActions(["findPayrollReports"]),
    initCreated() {
      this.$store.dispatch("fetchBranches");
      this.$store.dispatch("fetchPeriods");
      this.$store.dispatch("fetchPayrollReports");
    },

    approveRow(row) {
      console.log(row);
    },

    runReport() {
      this.findPayrollReports(this.reportData);
    },

    getDateTime() {
      return moment().format("YYYY-MM-DD, H:m:s");
    },

    getPayMonth(data) {
      return moment(data).format("MMMM, YYYY");
    },

    getFormatedMoney(money) {
      return formatMoney(money);
    }
  }
};
</script>

<style scoped>
.payroll-reports-tbl table + td .nhif-td {
  background: rgb(255, 193, 7);
}
</style>