/**
|--------------------------------------------------
| Actions - Payroll Reports
|--------------------------------------------------
*/
import baseurl from "../../../config/baseUrl";

export default {
  fetchPayrollReports({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/payroll_reports")
        .then(res => {
          console.log(res.data);

          commit("FETCH_PAYROLL_REPORTS", res.data);
          // resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  findPayrollReports({ commit }, data) {
    return new Promise((resolve, reject) => {
      baseurl
        .post("api/payroll_reports", data)
        .then(res => {
          console.log(res.data);

          // commit("FETCH_ADVANCES", res.data);
          // resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
