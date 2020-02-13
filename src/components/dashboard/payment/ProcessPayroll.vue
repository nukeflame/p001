<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Proccess Payroll</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item active">Payment</li>
          <li class="breadcrumb-item active">Proccess Payroll</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="row pb-2">
              <div class="col-sm-6">
                <h6 class="bold">
                  <u>Proccess Payroll Info</u>
                </h6>
              </div>
            </div>

            <div class="row py-2">
              <div class="col-md-2 col-sm-4">
                <div class="form-group">
                  <select
                    name="payroll_month"
                    id="payrollMonth"
                    class="form-control input-sm sel2"
                    v-model="processMonth"
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
              <div class="col-md-10 col-sm-8">
                <div class="btn-group">
                  <button
                    type="button"
                    style="padding: .375rem .75rem;"
                    class="btn btn-danger input-sm"
                    :class="[selectedRows && selectedRows.length > 0? '' : 'disabled']"
                    :disabled="selectedRows && selectedRows.length > 0 ? false : true"
                  >
                    <i class="fa fa-trash pr-1"></i>Delete
                  </button>
                  <button
                    type="button"
                    style="padding: .375rem .75rem;"
                    class="btn btn-info input-sm"
                    @click="verifyData"
                  >
                    <i class="fa fa-info-circle pr-1"></i>Verify Data
                  </button>
                  <button
                    type="button"
                    style="padding: .375rem .75rem;"
                    class="btn btn-primary input-sm"
                    @click.prevent="generateProcess"
                    :class="[selectedRows && selectedRows.length > 0? '' : 'disabled']"
                    :disabled="selectedRows && selectedRows.length > 0 ? false : true"
                  >
                    Generate
                    <i class="fa fa-refresh pl-1"></i>
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
                  :search-options="{ enabled: true , placeholder: ''}"
                  @on-selected-rows-change="handleVerifyDataSel"
                  @on-row-dblclick="handleVerifyData"
                  @on-row-click="handleVerifyClick"
                  :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden', selectionText: 'selected', clearSelectionText: 'clear'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'actions'">
                      <a
                        href="#"
                        class="color-primary"
                        @click.prevent="handleVerifyData(props)"
                      >[Verify Data]</a>
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
                    <span class="pl-1 f-s-13 bold">{{payrollParData.name}}</span>
                  </h4>
                  <a href="#" @click="hidePayrolPar">
                    <img src="../../../assets/images/icon_close.svg" alt />
                  </a>
                </div>
                <div class="modal-body">
                  <div class="modal-fluid">
                    <form @submit.prevent="addPayrolPar">
                      <div class="row">
                        <div class="col-md-4 col-sm-6">
                          <div class="form-group">
                            <label for="par" class="control-label bold">Parameter</label>
                            <select
                              name="par"
                              id="payrollPar"
                              class="form-control input-sm sel2"
                              required
                            ></select>
                          </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
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
                        <div class="col-md-4 col-sm-6">
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
                        <div class="col-md-4 col-sm-6">
                          <div class="form-group mt-3 float-right">
                            <button
                              type="submit"
                              :class="[updatingPayrolPar ? 'disabled': '', 'btn btn-sm btn-info']"
                              :disabled="updatingPayrolPar ? true: false"
                            >
                              <span v-if="updatingPayrolPar">
                                <span class="pr-2">Processing</span>
                                <img src="../../../assets/loader/round-sm.svg" alt />
                              </span>
                              <span v-else>
                                Add Parameter
                                <i class="fa fa-plus"></i>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
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
                          :rows="parData"
                          :pagination-options="{enabled: false}"
                          max-height="300px"
                          @on-selected-rows-change="selParameter"
                          @on-row-click="selParameter"
                          :search-options="{ enabled: true , placeholder: ''}"
                        >
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'actions'">
                              <a
                                href="#"
                                class="color-danger"
                                @click.prevent="handleDelParameter(props.row.id)"
                                :title="'Delete ' + props.row.name"
                              >
                                <i class="fa fa-trash"></i>
                              </a>
                            </span>
                            <span v-if="props.column.field == 'isActive'">
                              <span v-if="props.row.useDefault">Default</span>
                              <span v-else>
                                <span v-if="props.row.isActive">Yes</span>
                                <span v-else>Default</span>
                              </span>
                            </span>
                            <span v-else-if="props.column.field == 'amountVal'">
                              <span
                                v-if="props.row.amount !== null"
                              >{{ getFormatedMoney(props.row.amount)}}</span>
                              <span v-else>{{ getFormatedMoney(props.row.defValue) }}</span>
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
                    <button @click="hidePayrolPar" class="btn btn-sm btn-outline-secondary">CANCEL</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- confim delete parameter modal-->
          <div
            class="modal animated fadeIn delParameterMod"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog modal-sm" style="top: 10%;">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title text-center f-s-17">Are you sure you want to delete?</h4>
                </div>

                <div class="modal-body pd-modal">
                  <div class="modal-fluid">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="float-right">
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary mr-2"
                            @click="hideParameterMod"
                          >CANCEL</button>
                          <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            @click="deleteStaffParameter"
                          >DELETE</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- confim delete parameter modal-->
          <div
            class="modal animated fadeIn delEmployeeMod"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog modal-sm" style="top: 10%;">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title text-center f-s-17">Are you sure you want to delete?</h4>
                </div>

                <div class="modal-body pd-modal">
                  <div class="modal-fluid">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="float-right">
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary mr-2"
                            @click="hideParameterMod"
                          >CANCEL</button>
                          <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            @click="deleteStaffParameter"
                          >DELETE</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- confim process payrol modal-->
          <div
            class="modal animated fadeIn confProcessPayMod"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog modal-sm" style="top: 10%;">
              <div class="modal-content">
                <div class="modal-header">
                  <h4
                    class="modal-title text-center f-s-14"
                  >Process ({{ selectedRows && selectedRows.length }}) selected employees?</h4>
                </div>

                <div class="modal-body pd-modal">
                  <div class="modal-fluid">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="float-right">
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary mr-2"
                            @click="hideConfProcess"
                          >CANCEL</button>
                          <button type="button" class="btn btn-sm btn-info" @click="addPayslip">
                            <span v-if="proccessPayslip">
                              Processing
                              <img
                                src="../../../assets/loader/round-sm.svg"
                                class="pl-2"
                                alt
                              />
                            </span>
                            <span v-else>
                              GENERATE
                              <i class="fa fa-cog pl-1"></i>
                            </span>
                          </button>
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
      processMonth: "",
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
          label: "Gender",
          field: "gender"
        },
        {
          label: "ID No.",
          field: "idNo"
        },
        {
          label: "Telephone No.",
          field: "tel1"
        },
        {
          label: "",
          field: "actions",
          width: "90px"
        }
      ],
      payrollParData: {
        id: null,
        amount: "",
        name: "",
        isActive: false,
        parameter: ""
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
          field: "amountVal"
        },
        {
          label: "",
          field: "actions",
          width: "20px"
        }
      ],
      parameterDelId: ""
    };
  },

  computed: {
    ...mapState({
      employees: state => state.employees.employees,
      payrolPars: state => state.payrollParameters.payrolPars,
      parData: state => state.payrollParameters.parData,
      proccessPayslip: state => state.payroll.proccessPayslip,
      updatingPayrolPar: state => state.payrollParameters.updatingPayrolPar,
      periods: state => state.periods.periods
    })
  },

  created() {
    // set title
    document.title = "Epsotech :: Proccess Payroll";
    //get employees.
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
    //get periods
    this.$store.dispatch("fetchPeriods").then(() => {
      $("#payrollMonth")
        .select2({
          placeholder: "Select Payroll Month",
          allowClear: true,
          data: this.periods
        })
        .val("")
        .trigger("change");
    });
  },

  methods: {
    ...mapActions([
      "generatePayslip",
      "updateStaffParameter",
      "fetchEmployeeParameter",
      "destroyStaffParameter"
    ]),

    hidePayrolPar() {
      $(".payrollParMd").modal("hide");
      this.$store.dispatch("fetchEmployees");
    },

    addPayrolPar() {
      const p = this.payrollParData;
      const data = {
        isStaff: true,
        staffId: p.id,
        amount: p.amount,
        isActive: p.isActive,
        parameter: $("#payrollPar").val()
      };

      this.updateStaffParameter(data).then(() => {
        this.payrollParData.amount = "";
        this.payrollParData.isActive = false;
        $("#payrollPar")
          .val("")
          .trigger("change");
      });
    },

    handleVerifyDataSel(rows) {
      this.selectedRows = rows.selectedRows;
    },

    selParameter() {},
    handleVerifyClick() {},
    handleVerifyData(data) {
      const row = data.row;
      this.payrollParData = {
        id: row.id,
        name: row.surname + " " + row.otherNames
      };
      //get employee parameters
      this.$store.commit("GET_STAFF_PAR", row.parameter);
      $(".payrollParMd").modal("show");
    },

    verifyData() {},

    generateProcess() {
      const payMonth = $("#payrollMonth").val();
      if (payMonth !== null) {
        $(".confProcessPayMod").modal("show");
      } else {
        $("#payrollMonth")
          .val("")
          .trigger("change");
        toastr.error("Please select payroll month to continue. ");
      }
    },

    hideConfProcess() {
      this.selectedRows = [];
      $("#payrollMonth")
        .val("")
        .trigger("change");
      $(".confProcessPayMod").modal("hide");
      this.$store.dispatch("fetchEmployees");
    },

    addPayslip() {
      const payMonth = $("#payrollMonth").val();
      const formData = new FormData();
      for (let i = 0; i < this.selectedRows.length; i++) {
        const el = this.selectedRows[i];
        formData.append("staffId[]", el.id);
      }
      formData.append("periodId", payMonth);
      // generate payslip
      this.generatePayslip(formData).then(() => {
        this.hideConfProcess();
      });
    },

    handleDelParameter(Id) {
      this.parameterDelId = Id;
      $(".payrollParMd").modal("hide");
      $(".delParameterMod").modal("show");
    },

    hideParameterMod() {
      this.parameterDelId = "";
      $(".delParameterMod").modal("hide");
      $(".payrollParMd").modal("show");
    },

    deleteStaffParameter() {
      const data = {
        staffId: this.payrollParData.id,
        parId: this.parameterDelId
      };

      this.destroyStaffParameter(JSON.stringify(data)).then(() => {
        this.hideParameterMod();
      });
    },

    goBack() {
      history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },

    getPayMonth(data) {
      return moment(data.endingDate).format("MMMM, YYYY");
    },

    getFormatedMoney(money) {
      return formatMoney(money);
    }
  }
};
</script>
