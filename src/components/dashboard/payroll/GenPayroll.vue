<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h3 class="text-primary">Payslip</h3>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Payslip</li>
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
                <i class="ti-receipt"></i> Tax PAYE
              </h4>
              <form @submit.prevent="calculatePayroll">
                <div class="row">
                  <div class="col-md-6">
                    <p>
                      <i class="ti-star f-d-14"></i> Salary Info for
                      <b>{{ dataPay.name}}</b>
                    </p>

                    <div class="form-group">
                      <label for="wageRate">Wage Rate (Ksh)</label>
                      <input
                        id="wageRate"
                        type="text"
                        class="form-control f-s-14"
                        required
                        placeholder="Enter Wage rate per day"
                        v-model="payrollData.wage"
                      >
                    </div>
                    <div class="form-group">
                      <button type="submit" class="btn btn-primary btn-block">
                        <span :class="[loader ? 'hidden' : '']">Calculate</span>
                        <img
                          v-if="loader"
                          :src="$resource.getBaseUrl() + 'images/loader/round-svg-23.svg'"
                          alt="Loading..."
                        >
                      </button>
                    </div>
                  </div>
                  
                </div>
              </form>
              <hr class="mt-1 mb-4">
              <h3 class="card-title"></h3>
              <h5 class="card-title mb-4">
                <i class="ti-time"></i>
                Tax Year:
                <b>{{ new Date().getFullYear() }}</b>
                <span class="ml-4">
                  <i class="ti-calender"></i>
                  Pay Period:
                  <b>Month</b>
                </span>
              </h5>
              <div class="row" id="displayArea">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="pay" class="control-label">Gross Pay</label>
                    <p class="form-control-static">
                      KSh
                      <span v-if="payrollPaye.gross_pay">{{ payrollPaye.gross_pay }}</span>
                      <span v-else>0.00</span>
                    </p>
                  </div>

                  <div class="form-group">
                    <label for="pay" class="control-label">Insurance Relief</label>
                    <p class="form-control-static">
                      KSh
                      <span
                        v-if="payrollPaye.insurance_relief"
                      >{{ payrollPaye.insurance_relief }}</span>
                      <span v-else>0.00</span>
                    </p>
                  </div>

                  <div class="form-group">
                    <label for="pay" class="control-label">NHIF Contribution</label>
                    <p class="form-control-static">
                      KSh
                      <span v-if="payrollPaye.nhif_contr">{{ payrollPaye.nhif_contr }}</span>
                      <span v-else>0.00</span>
                    </p>
                  </div>
                  <div class="form-group">
                    <label for="pay" class="control-label">Net Salary</label>
                    <p class="bs-p">
                      KSh
                      <span v-if="payrollPaye.net_salary">{{ payrollPaye.net_salary }}</span>
                      <span v-else>0.00</span>
                    </p>
                  </div>

                  <div class="form-group">
                    <button
                      @click.prevent="generatePayslip"
                      class="btn btn-info"
                      :disabled="generate ? false : true"
                    >
                      <i class="ti-receipt"></i> Generate Payslip
                    </button>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="pay" class="control-label">Taxable Pay</label>
                    <p class="form-control-static">
                      KSh
                      <span v-if="payrollPaye.taxable_pay">{{ payrollPaye.taxable_pay }}</span>
                      <span v-else>0.00</span>
                    </p>
                  </div>
                  <div class="form-group">
                    <label for="pay" class="control-label">NSSF Contribution</label>
                    <p class="form-control-static">
                      KSh
                      <span v-if="payrollPaye.nss_contr">{{ payrollPaye.nss_contr }}</span>
                      <span v-else>0.00</span>
                    </p>
                  </div>
                  <div class="form-group">
                    <label for="pay" class="control-label">Personal Relief</label>
                    <p class="form-control-static">
                      KSh
                      <span v-if="payrollPaye.personal_relief">{{ payrollPaye.personal_relief }}</span>
                      <span v-else>0.00</span>
                    </p>
                  </div>

                  <div class="form-group">
                    <label for="pay" class="control-label">PAYE</label>
                    <p class="form-control-static">
                      KSh
                      <span v-if="payrollPaye.paye">{{ payrollPaye.paye }}</span>
                      <span v-else>0.00</span>
                    </p>
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
import moment from "moment";
import toastr from "toastr";

export default {
  data() {
    return {
      loader: false,
      generate: false,
      payrollData: {
        id: "",
        wage: ""
      }
    };
  },

  computed: {
    ...mapState({
      payroll: state => state.payroll.payroll,
      dataPay: state => state.payroll.dataPay,
      payrollPaye: state => state.payroll.payrollPaye,
      loadingPaye: state => state.payroll.loadingPaye
    })
  },

  created() {
    this.initializeCreated();
  },

  methods: {
    ...mapActions(["calculatePaye", "generatePay"]),
    initializeCreated() {
      if (this.dataPay.user_id === "") {
        this.$router.push("/payroll");
      }
      this.$store.dispatch("fetchPayroll");
    },
    calculatePayroll() {
      this.loader = true;
      const data = {
        payCalc: true,
        id: this.dataPay.id,
        userId: this.dataPay.user_id,
        daysIn: this.dataPay.days_in,
        wageRate: this.payrollData.wage
      };
      this.calculatePaye(data).then(() => {
        this.loader = false;
        this.generate = true;
      });
    },
    generatePayslip() {
      if (this.generate) {
        const data = {
          paySlip: true,
          id: this.dataPay.id,
          userId: this.dataPay.user_id,
          daysIn: this.dataPay.days_in,
          wageRate: this.payrollData.wage
        };
        this.generatePay(data)
          .then(response => {
            const employee = response.data;

            toastr["success"](
              "New Payslip created and sent to " + employee.email
            );
          })
          .catch(error => {
            toastr["error"](error);
          });
        this.$router.push("/payroll");
      }
    }
  }
};
</script>

<style>
b {
  color: #fd7e14;
}
</style>
