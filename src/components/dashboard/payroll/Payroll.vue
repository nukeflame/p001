<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h3 class="text-primary">Payroll</h3>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Payroll</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">
                <i class="ti-receipt"></i> Employees Payroll
              </h4>
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="payroll"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: 'Search payroll...'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- actions -->
                    <span v-if="props.column.field == 'actions'">
                      <span v-if="!props.row.created_payroll">
                        <button
                          type="button"
                          @click.once="generateLink(props.row)"
                          class="btn btn-info btn-sm btn-block"
                        >
                          <i class="fa fa-hourglass-2"></i> Generate
                        </button>
                      </span>
                    </span>
                    <!-- actions -->
                    <span v-else-if="props.column.field == 'date'">{{ getDate() }}</span>
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
import { mapState, mapMutations, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      columns: [
        {
          label: "Date",
          field: "date",
          type: "date",
          width: "70px"
        },
        {
          label: "Employee Name",
          field: "name"
        },
        {
          label: "ID Number",
          field: "id_no"
        },
        {
          label: "Days In (this month)",
          field: "days_in",
          width: "126px"
        },
        {
          label: "Working Days",
          field: "working_days",
          width: "95px"
        },

        {
          label: "NHIF No.",
          field: "nhif_no"
        },
        {
          label: "KRA No.",
          field: "kra_no"
        },
        {
          label: "",
          field: "actions",
          width: "10px"
        }
      ],

      nhifData: {
        min_charges: "",
        max_charges: "",
        rate: ""
      }
    };
  },

  computed: {
    ...mapState({
      payroll: state => state.payroll.payroll
    })
  },

  created() {
    this.initializeCreated();
  },
  methods: {
    ...mapActions(["timeIn", "timeOut"]),
    ...mapMutations(["payrollData"]),
    initializeCreated() {
      this.$store.dispatch("fetchPayroll");
    },
    generateLink(data) {
      this.payrollData(data);
      this.$router.push("/gen-payroll");
    },
    getDate() {
      return moment().format("l");
    },
    payrollDate(created) {
      if (
        moment(created)
          .tz("Africa/Nairobi")
          .format("M") ===
        moment()
          .tz("Africa/Nairobi")
          .format("M")
      ) {
        return true;
      } else {
        return false;
      }
    },
    buttonToggle(created) {
      if (
        moment(created)
          .tz("Africa/Nairobi")
          .format("M") !==
        moment()
          .tz("Africa/Nairobi")
          .format("M")
      ) {
        return true;
      }
    }
  }
};
</script>
