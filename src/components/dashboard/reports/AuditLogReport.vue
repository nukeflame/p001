<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Audit Log Reports</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Reports</li>
          <li class="breadcrumb-item active">Audit Log Reports</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
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
          date: "09/12/2019 17:03:46",
          user: "Kennedy Muffin Peters",
          action: "Logged in to Epsotech Payroll as on IP:154.79.87.254"
        }
      ],
      columns: [
        {
          label: "Date",
          field: "date"
        },
        {
          label: "User",
          field: "user"
        },

        {
          label: "Action",
          field: "action"
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

