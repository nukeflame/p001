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
                    <!-- month -->
                    <span v-if="props.column.field == 'month'">
                      <a
                        href="#"
                        @click.prevent="toAdvanceMonths(props.row.id)"
                        class="color-primary bold"
                      >{{ getFormatMonth(props.row.dateIssued) }}</a>
                    </span>
                    <!-- status -->
                    <span v-else-if="props.column.field == 'noOf'">2</span>
                    <!-- amount received -->
                    <span v-else-if="props.column.field == 'amountIssued'">
                      <span>{{ getFormatMoney(props.row.amountBorrowed) }}</span>
                    </span>
                    <!-- amount issued -->
                    <span v-else-if="props.column.field == 'amountRepaid'">
                      <span>{{ getFormatMoney(props.row.amountBorrowed) }}</span>
                    </span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
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
import { formatMoney, formatMonth } from "../../../mixins/helpers";
import toastr from "toastr";

export default {
  data() {
    return {
      creatingPeriod: false,
      loadPrint: false,
      columns: [
        {
          label: "Month",
          field: "month"
        },
        {
          label: "No. Of",
          field: "noOf"
        },
        {
          label: "Amount Issued",
          field: "amountIssued"
        },
        {
          label: "Amount Repaid",
          field: "amountRepaid"
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
      }
    };
  },

  mixins: [echo],

  computed: {
    ...mapState({
      employees: state => state.employees.employees,
      advances: state => state.advances.advances,
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

    getFormatMonth(date) {
      return formatMonth(date);
    },

    printAdvancePay() {
      this.loadPrint = true;
      $("#print-area").printArea();
      this.loadPrint = false;
    }
  }
};
</script>

