<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Advance Payments</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">Payment</li>
          <li class="breadcrumb-item active">Advance Payments</li>
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
                  <u>Advance Pay Details</u>
                </h6>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-2">
                <span>
                  Total Advances:
                  <span class="pl-1 pr-1 label label-default bold f-s-13">1</span>
                </span>
              </div>
              <div class="col-sm-3">
                <span>
                  Total Issued:
                  <span class="pl-1 pr-1 label label-default bold f-s-13">KES 11,000</span>
                </span>
              </div>
              <div class="col-sm-3">
                <span>
                  Total Repaid:
                  <span class="pl-1 pr-1 label label-default bold f-s-13">KES 51,000</span>
                </span>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-12">
                <div class="btn-group">
                  <button type="button" class="btn btn-danger btn-sm mr-2 disabled" disabled>
                    <i class="fa fa-trash pr-1"></i>Delete
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm mr-2"
                    @click="advancePayModal"
                  >
                    <i class="fa fa-plus pr-1"></i> Add Advance
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="advances"
                  :pagination-options="{enabled: true, perPage: 15}"
                  :search-options="{ enabled: true , placeholder: ''}"
                  @on-selected-rows-change="selEmployee"
                  @on-row-click="selEmployee"
                  :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden', selectionText: 'selected', clearSelectionText: 'clear'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- actions -->
                    <span v-if="props.column.field == 'actions'">
                      <div class="dropdown">
                        <a
                          class="color-dark mr-2"
                          href="#"
                          @click.prevent="viewSlipModal(props.row)"
                        >[View Slip]</a>
                        <a class="color-primary" href="#" @click="editAdvancePay">
                          <i class="fa fa-edit"></i> Edit
                        </a>
                      </div>
                    </span>
                    <!-- installment -->
                    <span v-else-if="props.column.field == 'installments'">
                      <span v-if="props.row.repayIn === 1">{{ props.row.repayIn }} installment</span>
                      <span v-else>{{ props.row.repayIn }} installments</span>
                    </span>
                    <!-- month -->
                    <span v-else-if="props.column.field == 'month'">
                      <a
                        href="#"
                        @click.prevent="toAdvanceMonths(props.row.id)"
                        class="color-primary bold"
                      >{{ props.row.dateIssued }}</a>
                    </span>

                    <!-- status -->
                    <span v-else-if="props.column.field == 'isStatus'">
                      <span
                        v-if="props.row.status > 0"
                        class="label label-success f-s-10 bold"
                        style="padding: 2px 6px;"
                      >Active</span>
                      <span
                        v-else
                        class="label label-warning f-s-10 bold"
                        style="padding: 2px 6px;"
                      >Pending</span>
                    </span>
                    <span v-else-if="props.column.field == 'amountIssued'">
                      <span>{{ getFormatMoney(props.row.amountBorrowed) }}</span>
                    </span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>

          <!-- view slip modal-->
          <div
            class="modal animated modal_stretch fadeIn viewSlipMd"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h4 class="modal-title text-center f-s-14">View Slip Information</h4>
                  <a href="#" @click.prevent="hideViewSlip">
                    <i class="fa fa-close"></i>
                  </a>
                </div>
                <div class="modal-body">
                  <div class="modal-fluid">
                    <div class="row">
                      <div class="col-sm-12">
                        <table class="table table-condensed view__slip" id="print-area">
                          <tbody>
                            <tr>
                              <td>
                                <div style="text-align: center;">
                                  <a href="#" class="color-primary">Upload Logo</a>
                                  <p
                                    align="center"
                                    style="color:#666; font-size:10px; letter-spacing: .02em;"
                                  ></p>
                                </div>
                              </td>
                              <td valign="top" align="right">
                                <h3>Epsotech Client Solutions Limited</h3>
                                <span id="addCountry">Kenya</span>
                                <br />
                                <span id="addTel">Tel: 0700412127</span>
                                <br />
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2">
                                <h3 id="doc-title">Advance Pay Slip</h3>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2">
                                <hr />
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2">
                                <table width="100%">
                                  <tbody>
                                    <tr>
                                      <td width="15%">Date:</td>
                                      <td width="35%">
                                        <div v-html="viewSlipData.date"></div>
                                      </td>
                                      <td colpsan="2"></td>
                                    </tr>
                                    <tr>
                                      <td colspan="4">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td>Name:</td>
                                      <td>
                                        <div class="slip-underline" v-html="viewSlipData.name"></div>
                                      </td>
                                      <td width="10%">Job No.:</td>
                                      <td>
                                        <div class="slip-underline" v-html="viewSlipData.jobNo"></div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colspan="4">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td>Amount: (KES)</td>
                                      <td>
                                        <div class="slip-underline" v-html="viewSlipData.amount"></div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colspan="4">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td colspan="4">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td>Signature:</td>
                                      <td>
                                        <div class="slip-underline"></div>
                                      </td>
                                      <td colpsan="2"></td>
                                    </tr>
                                    <tr>
                                      <td colspan="2">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td colspan="2">&nbsp;</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer pd-footer">
                  <div class="float-right">
                    <button
                      @click="hideViewSlip"
                      class="btn btn-sm btn-outline-secondary mr-2"
                    >CANCEL</button>
                    <button
                      type="button"
                      :class="[loadPrint ? 'disabled': '', 'btn btn-sm btn-info']"
                      @click="printAdvancePay"
                      :disabled="loadPrint ? true: false"
                    >
                      <span v-if="loadPrint">
                        <span class="pr-2">Processing</span>
                        <img src="../../../assets/loader/round-sm.svg" alt />
                      </span>
                      <span v-else>
                        PRINT
                        <i class="fa fa-print"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- advance pay modal-->
          <div
            class="modal animated fadeIn advancePayMd"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h4 class="modal-title text-center f-s-14">
                    <i class="fa fa-plus pr-1"></i> Advance Pay Details
                  </h4>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="employeeName" class="control-label bold">Employee Name</label>
                          <input
                            type="text"
                            name="employeeName"
                            id="employeeName"
                            class="form-control input-sm text-right"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="amountBorrowed" class="control-label bold">Amount Borrowed</label>
                          <input
                            type="number"
                            name="amountBorrowed"
                            id="amountBorrowed"
                            class="form-control input-sm bold"
                            v-model="advancePayData.amountBorrowed"
                            @keydown="handleEmployeeKeyDown"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="dateIssued" class="control-label bold">Date Issued</label>
                          <input
                            type="date"
                            name="dateIssued"
                            id="dateIssued"
                            class="form-control input-sm"
                            v-model="advancePayData.dateIssued"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="repayIn" class="control-label bold">To Repay In:</label>
                          <div class="row">
                            <div class="col-sm-4 pr-0">
                              <select
                                name="repayIn"
                                id="repayIn"
                                class="form-control input-sm"
                                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                                v-model="advancePayData.repayIn"
                                required
                              >
                                <option value="0" disabled>Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>
                            </div>
                            <div class="col-sm-8 pl-0">
                              <input
                                value="Instalments"
                                class="form-control input-sm"
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
                          <label for="periodBegDate" class="control-label bold">Unpaid Balance</label>
                          <input
                            type="text"
                            id="periodBegDate"
                            class="form-control input-sm bold"
                            v-model="advancePayData.unpaidBal"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer pd-footer">
                  <div class="float-right">
                    <button
                      @click="hideAdvancePayModal"
                      class="btn btn-sm btn-outline-secondary mr-2"
                    >CANCEL</button>
                    <button
                      type="submit"
                      :class="[creatingPeriod ? 'disabled': '', 'btn btn-sm btn-info']"
                      @click="saveAdvancePay"
                      :disabled="creatingPeriod ? true: false"
                    >
                      <span v-if="creatingPeriod">
                        <span class="pr-2">Processing</span>
                        <img src="../../../assets/loader/round-sm.svg" alt />
                      </span>

                      <span v-else>
                        <i class="fa fa-send"></i> SUBMIT
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
</template>

<script>
import { mapState, mapActions } from "vuex";
import echo from "../../../mixins/echo";
import { formatMoney } from "../../../mixins/helpers";
import toastr from "toastr";

export default {
  data() {
    return {
      creatingPeriod: false,
      loadPrint: false,
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
      // columns: [
      //   {
      //     label: "Month",
      //     field: "month"
      //   },
      //   {
      //     label: "Surname",
      //     field: "surname"
      //   },
      //   {
      //     label: "Other Names",
      //     field: "otherNames"
      //   },
      //   {
      //     label: "Amount Issued",
      //     field: "amountIssued"
      //   },
      //   {
      //     label: "Amount Repaid",
      //     field: "unpaidBal"
      //   },
      //   {
      //     label: "Repay In",
      //     field: "installments"
      //   },
      //   {
      //     label: "Status",
      //     field: "isStatus",
      //     width: "65px"
      //   },
      //   {
      //     label: "",
      //     field: "actions",
      //     width: "120px"
      //   }
      // ],
      columns: [
        {
          label: "Month",
          field: "month"
        },
        {
          label: "No. Of",
          field: "month"
        },

        {
          label: "Amount Issued",
          field: "amountIssued"
        },
        {
          label: "Amount Repaid",
          field: "unpaidBal"
        }
      ],
      isEdit: false,
      advancePayData: {
        id: null,
        dateIssued: "",
        repayIn: "",
        unpaidBal: "",
        amountBorrowed: "",
        isStatus: false
      },
      viewSlipData: {
        logo: null,
        companyName: "",
        companyCountry: "",
        date: "",
        name: "",
        jobNo: "",
        amount: "",
        signature: ""
      }
    };
  },

  mixins: [echo],

  computed: {
    ...mapState({
      employees: state => state.employees.employees,
      advances: state => state.payments.advances,
      authUser: state => state.users.authUser
    })
  },

  created() {
    // set payperiods
    document.title = "Pay Periods :: Epsotech";

    this.initiateCreated();
  },

  methods: {
    ...mapActions(["createAdvancePay"]),

    initiateCreated() {
      //get advances
      this.$store.dispatch("fetchAdavances");
      //employees
      this.$store.dispatch("fetchEmployees").then(() => {
        $("#employeeName")
          .select2({
            dropdownParent: $(".advancePayMd"),
            placeholder: "Select Employee",
            allowClear: true,
            data: this.employees
          })
          .val(null)
          .trigger("change");
      });
    },

    advancePayModal() {
      $(".advancePayMd").modal("show");
    },
    hideAdvancePayModal() {
      this.advancePayData = {};
      $("#employeeName").val("");
      $(".advancePayMd").modal("hide");
    },

    viewSlipModal(row) {
      this.viewSlipData = {
        logo: null,
        companyName: "",
        companyCountry: "",
        date: row.dateIssued,
        name: row.otherNames + " " + row.surname,
        jobNo: row.staffNo,
        amount: formatMoney(row.amountBorrowed),
        signature: ""
      };

      $(".viewSlipMd").modal("show");
    },

    hideViewSlip() {
      this.viewSlipData = {};
      $(".viewSlipMd").modal("hide");
    },

    selEmployee() {},

    saveAdvancePay() {
      const d = this.advancePayData;
      const data = {
        employeeId: $("#employeeName").val(),
        dateIssued: d.dateIssued,
        repayIn: d.repayIn,
        unpaidBal: d.unpaidBal,
        amountBorrowed: d.amountBorrowed,
        isStatus: d.isStatus
      };

      this.createAdvancePay(data).then(() => {
        $(".advancePayMd").modal("hide");
        toastr["success"]("New advance record added successfuly!");
      });
    },
    editAdvancePay() {
      $(".advancePayMd").modal("show");
    },
    handleEmployeeKeyDown(e) {
      this.advancePayData.unpaidBal = formatMoney(
        this.advancePayData.amountBorrowed
      );
    },

    getEventHandlers() {
      return {
        ".Advance.CreateAdvanceEvent": e => {
          if (e.userId !== this.authUser.id) {
            this.$store.commit("CREATE_ADVANCE", e.advance);
          }
        }
      };
    },

    toAdvanceMonths(id) {
      this.$router.push(`/site/payment/advance_pay/${id}/details`);
    },

    getFormatMoney(money) {
      return formatMoney(money);
    },

    printAdvancePay() {
      this.loadPrint = true;
      $("#print-area").printArea();
      this.loadPrint = false;
    }
  }
};
</script>

<style>
#print-area {
  font-size: 12px;
  border: 1px solid #666;
  padding: 5px;
  color: #333;
}
#print-area > tbody > tr > td {
  border: none;
}
.table-condensed > thead > tr > th,
.table-condensed > tbody > tr > th,
.table-condensed > tfoot > tr > th,
.table-condensed > thead > tr > td,
.table-condensed > tbody > tr > td,
.table-condensed > tfoot > tr > td {
  padding-top: 1px;
  padding-bottom: 1px;
  line-height: 1.42857143;
}
.view__slip td,
.view__slip th {
  border: none;
  color: #333;
  text-align: initial;
  vertical-align: initial;
}
.view__slip td h3 {
  font-size: 15px;
  font-family: "Roboto-Medium", serif;
  margin: 0;
  line-height: normal;
  padding: 0;
  color: #333333;
}
#doc-title {
  text-align: center;
}
.view__slip table td {
  padding: 0;
  margin: 0;
}
.view__slip table td:last-child {
  text-align: initial;
}
.slip-underline {
  border-bottom: dotted;
}
</style>