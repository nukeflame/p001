/**
 * Vue Router Navigation
 **/

import Vue from "vue";
import vueRouter from "vue-router";

/** Views - Authentication */
import Auth from "@/components/auth/Auth.vue";
import Login from "@/components/auth/Login.vue";
import PayrollAuth from "@/components/auth/PayrollAuth.vue";

/** Views - Dashboard */
import Layout from "@/components/dashboard/Layout.vue";
import Dashboard from "@/components/dashboard/homepage/Home.vue";

//employees
import Employee from "@/components/dashboard/employee/Employee.vue";
import CreateEmployee from "@/components/dashboard/employee/CreateEmployee.vue";
import TerminateEmployee from "@/components/dashboard/employee/TerminateEmployee.vue";
import ManageContract from "@/components/dashboard/employee/ManageContract.vue";

//attendance
import Absenteeism from "@/components/dashboard/attendance/Absenteeism.vue";
import AddAbsenteeism from "@/components/dashboard/attendance/AddAbsenteeism.vue";
import Overtime from "@/components/dashboard/attendance/Overtime.vue";
import AddOvertime from "@/components/dashboard/attendance/AddOvertime.vue";
import AttendanceLog from "@/components/dashboard/attendance/AttendanceLog.vue";

//payperiods
import PayPeriods from "@/components/dashboard/payperiods/PayPeriods.vue";

import Users from "@/components/dashboard/users/Users.vue";
import ViewUser from "@/components/dashboard/users/ViewUser.vue";
import CreateUser from "@/components/dashboard/users/CreateUser.vue";
import AddBank from "@/components/dashboard/users/AddBank.vue";

import Payroll from "@/components/dashboard/payroll/Payroll.vue";
import GeneratePayroll from "@/components/dashboard/payroll/GenPayroll.vue";

import Permissions from "@/components/dashboard/permissions/Perms.vue";

import Roles from "@/components/dashboard/roles/Roles.vue";
import ViewRole from "@/components/dashboard/roles/ViewRole.vue";
import CreateRole from "@/components/dashboard/roles/CreateRole.vue";

import Notifications from "@/components/dashboard/notifications/Notification.vue";
//reports
// import Payslips from "@/components/dashboard/reports/Payslips.vue";
//payroll parameters
//categories
import Categories from "@/components/dashboard/categories/Categories.vue";
// payment
import AdvancePay from "@/components/dashboard/payment/AdvancePay.vue";
import AdvancePayMonth from "@/components/dashboard/payment/AdvancePayMonth.vue";
import Consultants from "@/components/dashboard/payment/Consultants.vue";
import ProcessPayroll from "@/components/dashboard/payment/ProcessPayroll.vue";
import Payslips from "@/components/dashboard/payment/Payslips.vue";
import ScheduledPayslips from "@/components/dashboard/payment/ScheduledPayslips.vue";
import EmailPayslips from "@/components/dashboard/payment/EmailPayslips.vue";
//leave
import ViewApplications from "@/components/dashboard/leave/ViewApplications.vue";
import ApplyLeave from "@/components/dashboard/leave/ApplyLeave.vue";
import LeaveEntitlement from "@/components/dashboard/leave/LeaveEntitlement.vue";
import LeaveLogs from "@/components/dashboard/leave/LeaveLogs.vue";
import OpeningBalanace from "@/components/dashboard/leave/OpeningBalanace.vue";
// reports
import PayrollReport from "@/components/dashboard/reports/PayrollReport.vue";
import PayamentReport from "@/components/dashboard/reports/NetPayReports.vue";
import LeaveReport from "@/components/dashboard/reports/LeaveReport.vue";
import AuditLogReport from "@/components/dashboard/reports/AuditLogReport.vue";
//settings
import ClientSettings from "@/components/dashboard/clients/Clients.vue";
import GeneralSettings from "@/components/dashboard/settings/GeneralSettings.vue";
import PayrollParameters from "@/components/dashboard/settings/PayrollParameters.vue";
import TaxRanges from "@/components/dashboard/settings/TaxRanges.vue";

/**Views - Page404 */
import Page404 from "@/components/Page404.vue";

Vue.use(vueRouter);

const router = new vueRouter({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          component: Dashboard
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: Dashboard
        },

        {
          path: "/admin/auth/users",
          component: Users
        },
        {
          path: "/users/view",
          name: "view-user",
          component: ViewUser
        },
        {
          path: "/users/create",
          name: "create-user",
          component: CreateUser
        },
        {
          path: "/users/add-bank",
          name: "add-bank",
          component: AddBank
        },
        //roles
        {
          path: "/admin/auth/roles",
          name: "auth_roles",
          component: Roles
        },
        {
          path: "/role/view",
          name: "view-role",
          component: ViewRole
        },
        {
          path: "/roles/create",
          name: "create-role",
          component: CreateRole
        },
        //permisions
        {
          path: "/admin/auth/permissions",
          name: "auth_permissions",
          component: Permissions
        },
        {
          path: "/payroll",
          component: Payroll
        },
        {
          path: "/gen-payroll",
          component: GeneratePayroll
        },
        //reports
        {
          path: "/site/reports/payroll-reports",
          name: "payroll_reports",
          component: PayrollReport
        },
        {
          path: "/site/reports/payment_reports",
          name: "payment_reports",
          component: PayamentReport
        },
        {
          path: "/site/reports/leave_reports",
          name: "leave_reports",
          component: LeaveReport
        },
        {
          path: "/site/reports/audit_log",
          name: "audit_log",
          component: AuditLogReport
        },

        // notifications
        {
          path: "/notifications",
          name: "notifications",
          component: Notifications
        },

        //employees
        {
          path: "/site/employees/",
          name: "employees",
          component: Employee
        },
        {
          path: "/site/employee/create",
          name: "create-employee",
          component: CreateEmployee
        },
        {
          path: "/site/employee/manage_contracts",
          name: "manage_contracts",
          component: ManageContract
        },
        {
          path: "/site/employee/terminate",
          name: "terminate-employee",
          component: TerminateEmployee
        },
        //payperiods
        {
          path: "/site/pay_periods",
          name: "pay-periods",
          component: PayPeriods
        },
        //payroll patarmeters
        {
          path: "/site/settings/payroll-parameters",
          name: "payroll_parameters",
          component: PayrollParameters
        },
        //categories
        {
          path: "/site/categories",
          name: "categories",
          component: Categories
        },
        //attendance
        {
          path: "/site/attendance/log",
          name: "atendance-log",
          component: AttendanceLog
        },
        {
          path: "/site/attendance/absenteeism",
          name: "absenteeism",
          component: Absenteeism
        },
        {
          path: "/site/absenteeism/add",
          name: "add-absenteeism",
          component: AddAbsenteeism
        },
        {
          path: "site/attendance/overtime",
          name: "overtime",
          component: Overtime
        },
        {
          path: "/site/overtime/add",
          name: "add-overtime",
          component: AddOvertime
        },
        //payment
        {
          path: "/site/payment/advance_pay",
          name: "advance-pay",
          component: AdvancePay
        },
        {
          path: "/site/payment/advance_pay/:userId/details",
          props: true,
          name: "advance_grandtotal",
          component: AdvancePayMonth
        },

        {
          path: "/site/payment/consultants",
          name: "consultants",
          component: Consultants
        },
        {
          path: "/site/payment/payslips",
          name: "payment-payslip",
          component: Payslips
        },
        {
          path: "/site/payment/process-payroll",
          name: "process_payroll",
          component: ProcessPayroll
        },
        {
          path: "/site/payment/schedule_payslips",
          name: "schedule_payslips",
          component: ScheduledPayslips
        },
        {
          path: "/site/payment/email_payslips",
          name: "email_payslips",
          component: EmailPayslips
        },
        //leave
        {
          path: "/site/leave/view_applications",
          name: "view_applications",
          component: ViewApplications
        },
        {
          path: "site/leave/apply",
          name: "apply",
          component: ApplyLeave
        },
        {
          path: "/site/leave/entitlement",
          name: "entitlement",
          component: LeaveEntitlement
        },
        {
          path: "/site/leave/logs",
          name: "leave_logs",
          component: LeaveLogs
        },
        {
          path: "/site/leave/opening_balance",
          name: "opening_balance",
          component: OpeningBalanace
        },
        //settings
        {
          path: "/site/settings/clients",
          name: "clients_settings",
          component: ClientSettings
        },
        {
          path: "/site/settings/general",
          name: "general_settings",
          component: GeneralSettings
        },
        {
          path: "/site/settings/tax-ranges",
          component: TaxRanges
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: "/accounts",
      redirect: "/page/404",
      component: Auth,
      children: [
        {
          path: "signin",
          name: "signin",
          component: Login
        },
        {
          path: "payroll-auth",
          name: "payroll_auth",
          component: PayrollAuth
        }
      ],
      meta: { forVisitors: true }
    },
    {
      path: "/page/404",
      component: Page404
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.forVisitors)) {
    if (Vue.auth.isLoggedIn()) {
      next({
        path: "/dashboard"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Vue.auth.isLoggedIn()) {
      next({
        path: "/accounts/payroll-auth"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
