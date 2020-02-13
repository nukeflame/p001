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
          <div class="row mt-4">
            <div class="col-md-6">
              <div class="form-group" style="display: flex; flex-direction: row;">
                <select id="branch" class="form-control input-sm mr-1">
                  <option value="0">November, 2019</option>
                  <option value="1">October, 2019</option>
                  <option value="1">September, 2019</option>
                  <option value="1">August, 2019</option>
                </select>

                <select id="branch" class="form-control input-sm mr-1">
                  <option value="0">All Branches</option>
                  <option
                    v-for="branch in branches"
                    :key="branch.id"
                    :value="branch.id"
                  >{{ branch.name}}</option>
                </select>

                <select id="branch" class="form-control input-sm mr-1">
                  <option value="0" selected>All Departments</option>
                  <option value="1">IT Department</option>
                </select>

                <select id="branch" class="form-control input-sm mr-1">
                  <option value="0" selected>All Departments</option>
                  <option value="1">IT Department</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <button type="button" class="btn btn-sm btn-info mt-1">
                  Refresh
                  <i class="fa fa-refresh pl-1"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="row pb-2">
              <div class="col-sm-6">
                <h6 class="bold">Advances: {{ getAdMonth() }}</h6>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="advances"
                  :pagination-options="{enabled: true, perPage: 20}"
                  :search-options="{ enabled: true , placeholder: ''}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- actions -->
                    <span
                      v-if="props.column.field == 'amount'"
                    >{{ getFormatMoney(props.row.amountBorrowed)}}</span>

                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
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
import moment from "moment";

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
          label: "Job Title",
          field: "amountIssued"
        },
        {
          label: "ID No.",
          field: "unpaidBal"
        },
        {
          label: "Bank",
          field: "installments"
        },
        {
          label: "Branch",
          field: "isStatus"
        },
        {
          label: "Account No",
          field: "amount"
        },
        {
          label: "Amount",
          field: "amount"
        }
      ],
      editAdvancePay: false,
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

  props: ["userId"],

  computed: {
    ...mapState({
      employees: state => state.employees.employees,
      advances: state => state.advances.advanceMonth,
      authUser: state => state.users.authUser,
      branches: state => state.branches.branches
    })
  },

  created() {
    // set payperiods
    document.title = "Advance Payments :: Epsotech";

    this.initiateCreated();
  },

  methods: {
    ...mapActions(["createAdvancePay", "fetchAdavancesById"]),

    initiateCreated() {
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
      //get advances by id
      this.fetchAdavancesById(this.userId);
    },

    advancePayModal() {
      $(".advancePayMd").modal("show");
    },

    hideAdvancePayModal() {
      this.advancePayData = {};
      // $("#employeeName").val();
      $(".advancePayMd").modal("hide");
    },

    viewSlipModal() {
      $(".viewSlipMd").modal("show");
    },

    hideViewSlipModal() {
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

    toAdvanceMonths() {
      this.$router.push("/site/payment/advance_pay/1/details");
    },

    getAdMonth() {
      if (this.advances.length) {
        const m = this.advances && this.advances[0].dateIssued;
        return moment(m).format("M, YYYY");
      }
    },

    getFormatMoney(money) {
      return formatMoney(money);
    }
  }
};
</script>
