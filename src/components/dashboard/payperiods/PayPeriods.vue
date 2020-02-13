<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Pay Periods</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Pay Periods</li>
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
                <h6 class="pt-3 bold">
                  <u>Pay Periods Details</u>
                </h6>
              </div>
              <div class="col-sm-6">
                <button class="btn btn-sm btn-outline-primary mr-2" @click="addPayPeriod">
                  <i class="fa fa-plus pr-1"></i>Create Pay Period
                </button>
              </div>
            </div>
            <div class></div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="periods"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: ''}"
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
                          >Delete Period</a>
                        </div>
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

          <!-- add payperiod modal-->
          <div
            class="modal animated fadeIn payPeriodMd"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h4 class="modal-title text-center f-s-14">Pay Period Details</h4>
                </div>
                <div class="modal-body">
                  <form class="form-horizontal">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="payYear" class="control-label bold">Pay Year</label>
                          <input
                            type="text"
                            name="payYear"
                            id="payYear"
                            class="form-control input-sm text-right"
                            v-model="payPeriodData.payYear"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="periodBegDate" class="control-label bold">Period Begining Date</label>
                          <input
                            type="date"
                            name="periodBegDate"
                            id="periodBegDate"
                            class="form-control input-sm"
                            v-model="payPeriodData.beginingDate"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="payMonth" class="control-label bold">Pay Month</label>
                          <select
                            id="payMonth"
                            class="form-control input-sm error"
                            v-model="payPeriodData.payMonth"
                            required
                          >
                            <option></option>
                            <option :value="m.id" v-for="m in months" :key="m.id">{{ m.name }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="periodEndDate" class="control-label bold">Period Ending Date</label>
                          <input
                            type="date"
                            name="periodEndDate"
                            id="periodEndDate"
                            class="form-control input-sm"
                            v-model="payPeriodData.endingDate"
                            required
                          />
                        </div>
                        <div class="form-group pt-3">
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              v-model="payPeriodData.isCurrent"
                              id="isCurrent"
                              class="custom-control-input"
                              required
                            />
                            <label
                              for="isCurrent"
                              class="custom-control-label"
                            >Is Current Pay Period</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer pd-footer">
                  <div class="float-right">
                    <button
                      @click="hidePayPeriod"
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
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
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
          label: "Period ID.",
          field: "id"
        },
        {
          label: "Pay Year",
          field: "payYear"
        },
        {
          label: "Pay Month",
          field: "pay_month"
        },
        {
          label: "Begining Date",
          field: "beginingDate"
        },
        {
          label: "Ending Date",
          field: "endingDate"
        },
        {
          label: "Is Current",
          field: "is_current"
        },

        {
          label: "",
          field: "actions",
          width: "10px"
        }
      ],
      payPeriodData: {
        id: null,
        payYear: "",
        payMonth: "",
        beginingDate: "",
        endingDate: "",
        isCurrent: false
      }
    };
  },

  computed: {
    ...mapState({
      periods: state => state.periods.periods,
      creatingPeriod: state => state.periods.creatingPeriod
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

    addPayPeriod() {
      $(".payPeriodMd").modal("show");
    },

    hidePayPeriod() {
      $(".payPeriodMd").modal("hide");
    },

    savePeriod() {
      this.createPeriod(this.payPeriodData).then(() => {
        this.resetData();
        $(".payPeriodMd").modal("hide");
      });
    },

    resetData() {
      this.payPeriodData = {
        id: null,
        payYear: "",
        payMonth: "",
        beginingDate: "",
        endingDate: "",
        isCurrent: false
      };
    }
  }
};
</script>
