/**
 *
 * Main attendance actions
 */

import baseurl from "../../../config/baseUrl";
import toastr from "toastr";
import checkinImage from "../../../assets/images/avatar.png";
import checkoutImage from "../../../assets/images/checkout.jpg";

export default {
  fetchCheckins({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/checkins")
        .then(res => {
          commit("fetchCheckins", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  findEmployee({ commit }, Id) {
    return new Promise(resolve => {
      commit("FINDING_EMPLOYEE", true);
      baseurl
        .get("api/checkins/" + Id)
        .then(response => {
          const data = response.data;

          //desktop notification
          if (!("Notification" in window)) {
            // alert("Web Notification is not supported");
            return;
          }

          if (data.timeOut && data.timeIn !== null) {
            toastr["info"](`"${data.surname}"  successfully just checked Out`);
            commit("CHECK_OUT_EMPLOYEE", data);
            //desktop notification
            Notification.requestPermission(permission => {
              let notification = new Notification("Check Out Notification!", {
                body: `${data.otherNames} ${data.surname} Just Checked Out`, // content for the alert
                icon: checkoutImage // optional image url
              });

              // link to page on clicking the notification
              notification.onclick = () => {
                window.open((window.location.href = "/site/attendance/log"));
              };
            });
          } else if (data.timeIn !== null) {
            toastr["success"](
              `"${data.surname}"  successfully just checked In`
            );
            commit("CHECK_IN_EMPLOYEE", data);
            //desktop notification
            Notification.requestPermission(permission => {
              let notification = new Notification("Check In Notification!", {
                body: `${data.otherNames} ${data.surname} Just Checked In`, // content for the alert
                icon: checkinImage // optional image url
              });

              // link to page on clicking the notification
              notification.onclick = () => {
                window.open((window.location.href = "/site/attendance/log"));
              };
            });
          }

          resolve(response);
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 404) {
              const err = error.response.data;
              if (err.notFound) {
                toastr["error"](err.notFound);
              }
            } else if (error.response.status === 403) {
              const err = error.response.data;
              if (err.exitsStaff) {
                toastr["info"](err.exitsStaff);
              }
            }
          }
        })
        .finally(() => {
          commit("FINDING_EMPLOYEE", false);
        });
    });
  },

  destroyCheckin({ commit }, Id) {
    return new Promise((resolve, reject) => {
      baseurl
        .delete(`api/checkins/${Id}`)
        .then(res => {
          console.log(res.data);
          // toastr["success"](`${res.data.surname} attendance deleted success!`);
          // commit("DEL_CHECKIN", res.data);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
