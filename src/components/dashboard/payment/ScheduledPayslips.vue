<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Scheduled Payslips</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Payment</li>
          <li class="breadcrumb-item active">Scheduled Payslips</li>
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
                  <u>Scheduled Mass Emails</u>
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
                    <i class="fa fa-plus pr-1"></i> New Advance Entry
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="data"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: ''}"
                  @on-selected-rows-change="selEmployee"
                  :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden', selectionText: 'selected', clearSelectionText: 'clear'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- actions -->
                    <span v-if="props.column.field == 'actions'">
                      <div>
                        <button
                          type="button"
                          class="btn btn-xs btn-primary mr-2"
                          @click="advancePayModal"
                        >
                          <i class="fa fa-edit pr-1"></i> Edit Advance
                        </button>
                        <button
                          type="button"
                          class="btn btn-xs btn-info"
                          @click="viewSlipModal"
                        >View Slip</button>
                      </div>
                    </span>
                    <span v-else-if="props.column.field == 'pay_month'">
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

          <!-- view slip modal-->
          <div
            class="modal animated fadeIn viewSlipMd"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h4 class="modal-title text-center f-s-14">View Slip Information</h4>
                </div>
                <div class="modal-body">
                  <div style="max-height:100%; overflow: auto">
                    <div class="row">
                      <div class="col-sm-12">
                        <table class="table table-condensed" id="print-area">
                          <tbody>
                            <tr>
                              <td>
                                <div style="text-align: center;">
                                  <uploadlogo>
                                    <a
                                      href="https://wingubox.com/?cat=settings&amp;subCat=RWRpdCBDb21wYW55&amp;companyId=8361"
                                    >Upload Logo</a>
                                  </uploadlogo>
                                  <p
                                    align="center"
                                    style="color:#666; font-size:10px; letter-spacing: .02em;"
                                  ></p>
                                </div>
                              </td>
                              <td valign="top" align="right">
                                <h3>Epso</h3>
                                <span id="addCountry">Kenya</span>
                                <br />
                                <span id="addTel">Tel: 0700412127</span>
                                <br />
                              </td>
                            </tr>

                            <tr>
                              <td colspan="2">
                                <h3 id="doc-title">Scheduled Payslips Slip</h3>
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
                                        <div>13/11/2019</div>
                                      </td>
                                      <td colpsan="2"></td>
                                    </tr>
                                    <tr>
                                      <td colspan="4">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td>Name:</td>
                                      <td>
                                        <div class="slip-underline">ken mwanzi peters</div>
                                      </td>
                                      <td width="10%">Job No.:</td>
                                      <td>
                                        <div class="slip-underline">090</div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colspan="4">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td>Amount: (KES)</td>
                                      <td>
                                        <div class="slip-underline">45,566.00</div>
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
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2">&nbsp;</td>
                            </tr>
                            <tr>
                              <td colspan="2">&nbsp;</td>
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
                      @click="hideViewSlipModal"
                      class="btn btn-sm btn-outline-secondary mr-2"
                    >Cancel</button>
                    <button
                      type="submit"
                      :class="[creatingPeriod ? 'disabled': '', 'btn btn-sm btn-info']"
                      @click="savePeriod"
                      :disabled="creatingPeriod ? true: false"
                    >
                      <span v-if="creatingPeriod">
                        <span class="pr-2">Processing</span>
                        <img src="../../../assets/loader/round-sm.svg" alt />
                      </span>

                      <span v-else>
                        <i class="ti-save"></i> Save
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Scheduled Payslips modal-->
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
                    <i class="fa fa-plus pr-1"></i> Scheduled Payslips Details
                  </h4>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="payYear" class="control-label bold">Employee Name</label>
                          <input
                            type="text"
                            name="payYear"
                            id="payYear"
                            class="form-control input-sm text-right"
                            v-model="advancePayData.payYear"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="periodBegDate" class="control-label bold">Unpaid Balance</label>
                          <input
                            type="text"
                            id="periodBegDate"
                            class="form-control input-sm bold text-right"
                            disabled
                            v-model="advancePayData.unpaidBal"
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
                          <label for="amountBorrowed" class="control-label bold">Amount Borrowed</label>
                          <input
                            type="text"
                            name="amountBorrowed"
                            id="amountBorrowed"
                            class="form-control input-sm bold text-right"
                            disabled
                            v-model="advancePayData.amountBorrowed"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="repayIn" class="control-label bold">
                            To Repay In:
                            <small class="pl-1">(Instalments)</small>
                          </label>
                          <select
                            name="repayIn"
                            id="repayIn"
                            class="form-control input-sm"
                            v-model="advancePayData.repayIn"
                            required
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
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
                    >Cancel</button>
                    <button
                      type="submit"
                      :class="[creatingPeriod ? 'disabled': '', 'btn btn-sm btn-info']"
                      @click="savePeriod"
                      :disabled="creatingPeriod ? true: false"
                    >
                      <span v-if="creatingPeriod">
                        <span class="pr-2">Processing</span>
                        <img src="../../../assets/loader/round-sm.svg" alt />
                      </span>

                      <span v-else>
                        <i class="ti-save"></i> Save
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
          label: "Date",
          field: "month"
        },
        {
          label: "Document",
          field: "surname"
        },
        {
          label: "Payroll Period",
          field: "otherNames"
        },
        {
          label: "Total",
          field: "amountIssued"
        },
        {
          label: "Send Time",
          field: "amountRepaid"
        },
        {
          label: "Status",
          field: "status"
        },
        {
          label: "Deliverd",
          field: "status"
        },
        {
          label: "Comments",
          field: "status"
        },
        {
          label: "",
          field: "action"
        }
      ],
      data: [
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        },
        {
          month: "21/12/2019",
          surname: "Mwanzi",
          otherNames: "Kennedy Peters",
          amountIssued: "11,000.00",
          amountRepaid: "51,000.00",
          status: "Pending"
        }
      ],
      advancePayData: {
        id: null,
        payYear: "",
        payMonth: "",
        beginingDate: "",
        endingDate: "",
        amountBorrowed: "34,899,099.00"
      }
    };
  },

  computed: {
    ...mapState({
      periods: state => state.periods.periods
      // creatingPeriod: state => state.periods.creatingPeriod
    })
  },

  created() {
    // set payperiods
    document.title = "Epsotech :: Pay Periods";
    //get periods
    this.$store.dispatch("fetchPeriods");
  },

  methods: {
    ...mapActions(["createPeriod"]),

    advancePayModal() {
      $(".advancePayMd").modal("show");
    },

    hideAdvancePayModal() {
      $(".advancePayMd").modal("hide");
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
    }
  }
};
</script>
