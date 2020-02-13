/**
 *  Vuex main store
 */

import Vue from "vue";
import Vuex from "vuex";
import roles from "./modules/roles";
import taxes from "./modules/taxes";
import users from "./modules/users";
import payroll from "./modules/payroll";
import attendance from "./modules/attendance";
import permissions from "./modules/permissions";
import branches from "./modules/branches";
import employees from "./modules/employees";
import checkins from "./modules/checkins";
import periods from "./modules/periods";
import leaves from "./modules/leaves";
import advances from "./modules/advances";
import consultants from "./modules/consultants";
import reports from "./modules/reports";
import overtime from "./modules/overtime";
import messages from "./modules/messages";
import clients from "./modules/clients";
import authCode from "./modules/authCode";
import settings from "./modules/settings";
import payrollReports from "./modules/payrollReports";
import payrollParameters from "./modules/payrollParameters";
import parametersCategories from "./modules/parametersCategories";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    roles,
    taxes,
    payroll,
    branches,
    employees,
    attendance,
    permissions,
    checkins,
    periods,
    leaves,
    reports,
    advances,
    overtime,
    consultants,
    messages,
    clients,
    settings,
    authCode,
    payrollReports,
    payrollParameters,
    parametersCategories
  }
});
