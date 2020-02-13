<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Employees</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Employees</li>
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
                  <u>Employee Details</u>
                </h6>
              </div>
            </div>

            <div class="row pb-3">
              <div class="col-sm-12">
                <div class="float-left">
                  <div class="btn-group mr-2">
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
                  <router-link
                    to="/site/employee/create"
                    class="btn btn-outline-primary btn-sm mr-2"
                  >
                    <i class="fa fa-plus pr-1"></i> Create Employee
                  </router-link>

                  <router-link to="/site/payment/payslips" class="btn btn-sm btn-outline-secondary">
                    <i class="ti-receipt pr-1"></i> Payslips
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
                  :rows="employees"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: 'Search ...'}"
                  @on-selected-rows-change="selEmployee"
                  :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden'}"
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
                    <span v-else-if="props.column.field == 'employeeName'">
                      <span>{{ props.row.otherNames + ' ' + props.row.surname }}</span>
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
                    <span class="pl-1 f-s-13">(Kennedy Peters)</span>
                  </h4>
                </div>
                <div class="modal-body">
                  <div class="modal-fluid">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="par" class="control-label bold">Parameter</label>
                          <select name="par" id="par" class="form-control input-sm sel2">
                            <option value="1">NSSF</option>
                            <option value="2">RBA</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="amount" class="control-label bold">Amount</label>
                          <input
                            type="text"
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
                            <input type="checkbox" class="custom-control-input" id="can_access" />
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
                        <h6 class="pt-4 bold f-s-13">
                          <u>Employee Payroll Parameters</u>
                        </h6>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <vue-good-table
                          :columns="parColumns"
                          :rows="parData"
                          :pagination-options="{enabled: false}"
                          max-height="300px"
                          :fixed-header="true"
                          :search-options="{ enabled: true , placeholder: 'Search ...'}"
                        ></vue-good-table>
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
      columns: [
        {
          label: "Staff No.",
          field: "staffNo",
          width: "100px"
        },
        {
          label: "Employee",
          field: "text",
          minWidth: "150px"
        },
        {
          label: "ID No.",
          field: "idNo"
        },
        {
          label: "Department",
          field: "department.name"
        },
        {
          label: "KRA PIN No.",
          field: "kraPin"
        },
        {
          label: "NSSF No.",
          field: "nssfNo"
        },
        {
          label: "NHIF No.",
          field: "nhifNo"
        },

        {
          label: "Tel1 No.",
          field: "tel1"
        },
        {
          label: "Email",
          field: "email"
        },
        {
          label: "",
          field: "actions",
          width: "10px"
        }
      ],
      parColumns: [
        {
          label: "Parameter",
          field: "parameter"
        },
        {
          label: "Category",
          field: "category"
        },
        {
          label: "Type",
          field: "type"
        },
        {
          label: "Is Active",
          field: "isActive"
        },
        {
          label: "Amount",
          field: "amount"
        }
      ],
      parData: [
        {
          parameter: "Basic Pay",
          category: "Basic Pay",
          type: "Basic Pay",
          isActive: "Yes",
          amount: "35,000.00"
        },
        {
          parameter: "Housing",
          category: "Sacco",
          type: "Post-tax Deduction",
          isActive: "Yes",
          amount: "35,000.00"
        },
        {
          parameter: "NSSF",
          category: "Security Fund",
          type: "Pre-tax/Admissible Deduction",
          isActive: "Yes",
          amount: "5,000.00"
        }
      ],
      selEmployee: [],
      payrollParData: {
        parameter: null,
        amount: ""
      }
    };
  },

  computed: {
    ...mapState({
      employees: state => state.employees.employees,
      proccessPayslip: state => state.payroll.proccessPayslip
    })
  },

  mounted() {
    $(".sel2").select2({
      placeholder: "--Select--",
      allowClear: true
    });

    // paymentMode
    // $("#parameter")
    //   .select2()
    //   .on("change", e => {
    //     const obj = $("#parameter").select2("data");
    //     this.payrollParData.parameter = obj[0].id;
    //   });
  },

  created() {
    // set title
    document.title = "Epsotech :: Employees";
    //fetch employees
    this.$store.dispatch("fetchEmployees");
  },

  methods: {
    ...mapActions(["timeIn", "timeOut"]),

    hidePayrolPar() {
      $(".payrollParMd").modal("hide");
    },

    savePayrolPar() {},

    handlePayrollPar() {
      $(".payrollParMd").modal("show");
    }
  }
};
</script>
