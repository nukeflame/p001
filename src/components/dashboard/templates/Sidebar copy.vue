<template>
  <!-- Sidebar scroll-->
  <div class="scroll-sidebar">
    <!-- Sidebar navigation-->
    <nav class="sidebar-nav active">
      <ul id="sidebarnav" class="in">
        <li class="nav-devider"></li>
        <li class="nav-label">Home</li>
        <li>
          <router-link to="/" aria-expanded="false">
            <i class="fa fa-laptop"></i>
            <span class="hide-menu">Dashboard</span>
          </router-link>
        </li>

        <li class="nav-label">Features</li>
        <li>
          <a href="/" @click.prevent="handleClockInOut" aria-expanded="false">
            <i class="ti-time"></i>
            <span class="hide-menu">Clock In/Out</span>
          </a>
        </li>
        <li>
          <a class="has-arrow" href="#" aria-expanded="false">
            <i class="fa fa-newspaper-o"></i>
            <span class="hide-menu">Attendance</span>
          </a>
          <ul aria-expanded="false" class="collapse">
            <li>
              <router-link to="/site/attendance/overtime">
                <i class="fa fa-fighter-jet"></i> Overtime
              </router-link>
            </li>
            <li>
              <router-link to="/site/attendance/absenteeism">
                <i class="fa fa-fighter-jet"></i> Absenteeism
              </router-link>
            </li>
            <li>
              <router-link to="/site/attendance/log">
                <i class="fa fa-fighter-jet"></i> Attendance Log
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <a class="has-arrow" href="#" aria-expanded="false">
            <i class="fa fa-money"></i>
            <span class="hide-menu">Payment</span>
          </a>
          <ul aria-expanded="false" class="collapse">
            <li>
              <router-link to="/site/payment/advance_pay">
                <i class="fa fa-fighter-jet"></i> Advance Pay
              </router-link>
            </li>
            <li>
              <router-link to="/site/payment/consultants">
                <i class="fa fa-fighter-jet"></i> Consultants
              </router-link>
            </li>
            <li>
              <router-link to="/site/payment/payslips">
                <i class="fa fa-fighter-jet"></i> Payslips
              </router-link>
            </li>
            <li>
              <router-link to="/site/payment/process-payroll">
                <i class="fa fa-fighter-jet"></i> Process Payroll
              </router-link>
            </li>
            <li>
              <router-link to="/site/payment/email_payslips">
                <i class="fa fa-fighter-jet"></i> Email Payslip
              </router-link>
            </li>
            <li>
              <router-link to="/site/payment/schedule_payslips">
                <i class="fa fa-fighter-jet"></i> Scheduled Payslips
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <a class="has-arrow" href="#" aria-expanded="false">
            <i class="fa fa-vcard"></i>
            <span class="hide-menu">Leave</span>
          </a>
          <ul aria-expanded="false" class="collapse">
            <li>
              <router-link to="/site/leave/view_applications">
                <i class="fa fa-fighter-jet"></i> View Applications
              </router-link>
            </li>
            <li>
              <router-link to="/site/leave/apply">
                <i class="fa fa-fighter-jet"></i> Apply for Leave
              </router-link>
            </li>
            <li>
              <router-link to="/site/leave/entitlement">
                <i class="fa fa-fighter-jet"></i> Leave Entitlement
              </router-link>
            </li>
            <li>
              <router-link to="/site/leave/logs">
                <i class="fa fa-fighter-jet"></i> Leave Logs
              </router-link>
            </li>
            <li>
              <router-link to="/site/leave/opening_balance">
                <i class="fa fa-fighter-jet"></i> Leave Opening Balances
              </router-link>
            </li>
            <!-- <li>
              <router-link to="/site/leave/categories">
                <i class="fa fa-fighter-jet"></i> Leave Categories
              </router-link>
            </li>-->
          </ul>
        </li>
        <li>
          <a class="has-arrow" href="#" aria-expanded="false">
            <i class="fa fa-users"></i>
            <span class="hide-menu">Employees</span>
          </a>
          <ul aria-expanded="false" class="collapse">
            <li>
              <router-link to="/site/employees">
                <i class="fa fa-fighter-jet"></i> View Employees
              </router-link>
            </li>
            <li>
              <router-link to="/site/employee/manage_contracts">
                <i class="fa fa-fighter-jet"></i> Manage Contracts
              </router-link>
            </li>
            <li>
              <router-link to="/site/employee/create">
                <i class="fa fa-fighter-jet"></i> Add Employee
              </router-link>
            </li>
            <!-- <li>
              <router-link to="/site/employee/payroll_data">
                <i class="fa fa-fighter-jet"></i> Payroll Data
              </router-link>
            </li>-->
            <!-- <li>
              <router-link to="/site/employee/data">
                <i class="fa fa-fighter-jet"></i> Employee Data
              </router-link>
            </li>-->
            <li>
              <router-link to="/site/employee/terminate">
                <i class="fa fa-fighter-jet"></i> Terminate Employment
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <a class="has-arrow" href="#" aria-expanded="false">
            <i class="fa fa-bar-chart"></i>
            <span class="hide-menu">Reports</span>
          </a>
          <ul aria-expanded="false" class="collapse">
            <li>
              <router-link to="/site/reports/payroll-reports">
                <i class="fa fa-fighter-jet"></i> Payroll Reports
              </router-link>
            </li>
            <li>
              <router-link to="/site/reports/payment_reports">
                <i class="fa fa-fighter-jet"></i> Payment Reports
              </router-link>
            </li>
            <!-- <li>
              <router-link to="/permissions">
                <i class="fa fa-fighter-jet"></i> Statutory Reports
              </router-link>
            </li>-->
            <li>
              <router-link to="/site/reports/leave_reports">
                <i class="fa fa-fighter-jet"></i> Leave Report
              </router-link>
            </li>
            <li>
              <router-link to="/site/reports/audit_log">
                <i class="fa fa-fighter-jet"></i> Audit Log
              </router-link>
            </li>
          </ul>
        </li>

        <li>
          <a class="has-arrow" href="#" aria-expanded="false">
            <i class="fa fa-sliders"></i>
            <span class="hide-menu">Settings</span>
          </a>
          <ul aria-expanded="false" class="collapse">
            <!-- <li>
              <router-link to="/roles">
                <i class="fa fa-fighter-jet"></i> HRM Settings
              </router-link>
            </li>
            <li>
              <router-link to="/roles">
                <i class="fa fa-fighter-jet"></i> Payroll Settings
              </router-link>
            </li>

            <li>
              <router-link to="/permissions">
                <i class="fa fa-fighter-jet"></i> Expense Claim Settings
              </router-link>
            </li>-->
            <li>
              <router-link to="/site/settings/clients">
                <i class="fa fa-fighter-jet"></i> Clients
              </router-link>
            </li>
            <li>
              <router-link to="/site/settings/general">
                <i class="fa fa-fighter-jet"></i> General
              </router-link>
            </li>
            <li>
              <router-link to="/permissions">
                <i class="fa fa-fighter-jet"></i> My Branches
              </router-link>
            </li>
            <li>
              <router-link to="/admin/auth/users">
                <i class="fa fa-fighter-jet"></i> Users
              </router-link>
            </li>
            <li>
              <router-link to="/site/pay_periods">
                <i class="fa fa-fighter-jet"></i> Pay Periods
              </router-link>
            </li>
            <li>
              <router-link to="/site/tax_ranges">
                <i class="fa fa-fighter-jet"></i> Taxe Range
              </router-link>
            </li>
            <li>
              <router-link to="/site/payroll_parameters">
                <i class="fa fa-fighter-jet"></i> Payroll Parameter
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      showRole: state => state.roles.showRole
    })
  },

  created() {
    this.$store.dispatch("showRole", 2);
  },

  methods: {
    handleClockInOut() {
      $(".clockInOutMd").modal("show");
    }
  }
};
</script>