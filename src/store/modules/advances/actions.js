/**
|--------------------------------------------------
| Actions - Advances
|--------------------------------------------------
*/
import baseurl from "../../../config/baseUrl";

export default {
  fetchAdavances({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/advances")
        .then(res => {
          console.log(res.data);

          // commit("FETCH_ADVANCES", res.data);
          // resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createAdvancePay({ commit }, data) {
    return new Promise((resolve, reject) => {
      baseurl
        .post("api/advances", data)
        .then(res => {
          commit("CREATE_ADVANCE", res.data);
          resolve(res);
        })
        .catch(error => {
          //   if (parseInt(error.response.status) == 422) {
          //     const err = error.response.data.errors;
          //     if (err.name) {
          //       toastr["error"](err.name);
          //     } else if (err.categoryId) {
          //       toastr["error"](err.categoryId);
          //     } else if (err.defValue) {
          //       toastr["error"](err.defValue);
          //     }
          //   }
          reject(error);
        });
    });
  },

  fetchAdavancesById({ commit }, id) {
    return new Promise((resolve, reject) => {
      baseurl
        .get(`api/advances/${id}`)
        .then(res => {
          commit("FETCH_ADVANCES_BY_MONTH", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
