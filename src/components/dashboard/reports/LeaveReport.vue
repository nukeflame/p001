<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Leave Reports</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Reports</li>
          <li class="breadcrumb-item active">Leave Reports</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="row mt-4">
            <div class="col-sm-2">
              <div class="form-group">
                <select id="branch" class="form-control input-sm">
                  <option value="0">November, 2019</option>
                  <option value="1">October, 2019</option>
                  <option value="1">September, 2019</option>
                  <option value="1">August, 2019</option>
                </select>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="form-group">
                <select id="branch" class="form-control input-sm">
                  <option value="0">All Branches</option>
                  <option
                    v-for="branch in branches"
                    :key="branch.id"
                    :value="branch.id"
                  >{{ branch.name}}</option>
                </select>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="form-group">
                <select id="branch" class="form-control input-sm">
                  <option value="0" selected>All Departments</option>
                  <option value="1">IT Department</option>
                </select>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-info input-sm"
                  style="padding: .375rem .75rem;"
                >
                  <i class="fa fa-refresh pr-2"></i>Run Report
                </button>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="row pb-4">
              <div class="col-sm-12">
                <span>
                  Total Employees:
                  <span class="pl-1 pr-1 label label-default bold f-s-13">1</span>
                </span>
              </div>
            </div>
            <div>
              <vue-good-table
                :columns="columns"
                :rows="reports"
                :pagination-options="{enabled: true, perPage: 15 }"
                :search-options="{ enabled: false}"
                :fixed-header="true"
                max-height="360px"
                @row-select-class="approveRow"
              >
                <!-- <div slot="table-actions-bottom">
                  <div class="vgt-responsive">
                    <table class="vgt-table bordered">
                      <tbody>
                        <tr class>
                          <td class="vgt-left-align" style="width:68px;">
                            <span></span>
                          </td>
                          <td class="vgt-left-align" colspan="4">
                            <span>Grand Totals</span>
                          </td>

                          <td class="vgt-left-align">
                            <span>11,500.00</span>
                          </td>
                          <td class="vgt-left-align">
                            <span>11,500.00</span>
                          </td>
                          <td class="vgt-left-align">
                            <span style="background: rgb(255, 193, 7);">400.00</span>
                          </td>
                          <td class="vgt-left-align">
                            <span>690.00</span>
                          </td>
                          <td class="vgt-left-align">
                            <span>1,090.00</span>
                          </td>
                          <td class="vgt-left-align">
                            <span>1,090.00</span>
                          </td>
                          <td class="vgt-left-align">
                            <span>1,090.00</span>
                          </td>
                          <td class="vgt-left-align">
                            <span>1,090.00</span>
                          </td>
                          <td class="vgt-left-align">
                            <span>Approved</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>-->
                <!-- styleClass="vgt-table condensed" -->
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'branch'">
                    <span v-for="branch in branches" :key="branch.id">
                      <!-- <span v-if="branch.id === props.row.client.branch_id">{{ branch.branch_name}}</span> -->
                    </span>
                  </span>
                  <span
                    v-else-if="props.column.field == 'nhifData'"
                    style="background:#ffc107"
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

export default {
  data() {
    return {
      reports: [
        {
          staffNo: "030333",
          employeeName: "Kennedy Muffin Peters",
          balanceBF: "0",
          daysEarned: "1.75",
          daysUsed: "0",
          balance: "1.70",
          leaveLiability: "1,400.00"
        }
      ],
      columns: [
        {
          label: "Staff No",
          field: "staffNo",
          width: "70px"
        },
        {
          label: "Employee Name",
          field: "employeeName"
        },
        {
          label: "Balance B/F",
          field: "balanceBF"
        },
        {
          label: "Days Earned",
          field: "daysEarned"
        },
        {
          label: "Days Used",
          field: "daysUsed"
        },
        {
          label: "Balance",
          field: "balance"
        },
        {
          label: "Leave Liabilty",
          field: "leaveLiability"
        }
      ]
    };
  },

  computed: {
    ...mapState({
      branches: state => state.branches.branches
      // reports: state => state.reports.reports
    })
  },

  created() {
    this.initCreated();
  },

  methods: {
    initCreated() {
      this.$store.dispatch("fetchBranches");
    },

    approveRow(row) {
      console.log(row);
    },

    getDateTime() {
      return moment().format("YYYY-MM-DD, H:m:s");
    },

    goBack() {
      this.$router.push("/site/payment/payslips");
    }
  }
};
</script>

