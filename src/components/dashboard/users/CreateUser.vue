<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h3 class="text-primary">Create User</h3>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Create User</li>
        </ol>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-title">
              <h4>
                <i class="ti-user"></i> New user
              </h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitUser">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="fullnames">Fullnames</label>
                      <input
                        id="fullnames"
                        type="text"
                        placeholder="Fullnames"
                        class="form-control input-rounded f-s-14"
                        v-model="userData.name"
                      >
                    </div>
                    <div class="form-group">
                      <label for="phone">Phone</label>
                      <input
                        id="phone"
                        type="text"
                        placeholder="Phone No."
                        class="form-control input-rounded f-s-14"
                        v-model="userData.phone_no"
                      >
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        class="form-control input-rounded f-s-14"
                        v-model="userData.password"
                      >
                    </div>
                    <div class="form-group">
                      <label for="password">KRA No.</label>
                      <input
                        id="kra_no"
                        type="text"
                        placeholder="KRA Pin No"
                        class="form-control input-rounded f-s-14"
                        v-model="userData.kra_no"
                      >
                    </div>
                    <div class="form-group">
                      <label for="nhif_no">NHIF No.</label>
                      <input
                        id="nhif_no"
                        type="text"
                        placeholder="NHIF No"
                        class="form-control input-rounded f-s-14"
                        v-model="userData.nhif_no"
                      >
                    </div>

                    <div class="form-group">
                      <button type="reset" class="btn btn-default mr-2">
                        <i class="fa fa-refresh"></i> Reset
                      </button>
                      <button type="submit" class="btn btn-primary">
                        <i class="ti-save"></i> Submit
                      </button>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email">E-Mail Adress</label>
                      <input
                        id="email"
                        type="text"
                        placeholder="E-Mail"
                        class="form-control input-rounded f-s-14"
                        v-model="userData.email"
                      >
                    </div>
                    <div class="form-group">
                      <label for="id_no">ID No.</label>
                      <input
                        id="id_no"
                        type="text"
                        placeholder="ID No."
                        class="form-control input-rounded f-s-14"
                        v-model="userData.id_no"
                      >
                    </div>
                    <div class="form-group">
                      <label for="gender">Choose Gender</label>
                      <select
                        id="gender"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        v-model="userData.gender"
                      >
                        <option value>Select Gender</option>
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for="job_title">Choose Job Title</label>
                      <select
                        id="job_title"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        v-model="userData.job_title"
                      >
                        <option value>Select Job Title</option>

                        <option
                          v-for="role in roles"
                          :key="role.id"
                          :value="role.id"
                          v-if="role.id != 1"
                        >{{ role.name}}</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="branch_id">Choose Branch</label>
                      <select
                        id="branch_id"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        v-model="userData.branch_id"
                      >
                        <option value>Select branch</option>
                        <option
                          v-for="branch in branches"
                          :key="branch.id"
                          :value="branch.id"
                        >{{ branch.name }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <div class="mt-3 mb-0">
            <button type="button" class="btn btn-info" @click="goBack">
              <i class="ti-angle-left"></i> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import toastr from "toastr";

export default {
  data() {
    return {
      userData: {
        name: "",
        email: "",
        password: "",
        phone_no: "",
        nssf_no: "",
        kra_no: "",
        nhif_no: "",
        id_no: "",
        gender: "",
        branch_id: "",
        job_title: ""
      }
    };
  },

  computed: {
    ...mapState({
      branches: state => state.branches.branches,
      roles: state => state.roles.roles
    })
  },

  created() {
    this.$store.dispatch("fetchBranches");
  },

  methods: {
    ...mapActions(["addUser"]),

    submitUser() {
      this.addUser(this.userData)
        .then(() => {
          this.userData = {};
          toastr["success"]("New user added successfully!");
          this.$router.push("/users");
        })
        .catch(error => {
          const errors = error.response.data.errors;
          if (errors) {
            if (errors.name) {
              toastr["error"](errors.name);
            } else if (errors.email) {
              toastr["error"](errors.email);
            } else if (errors.phone) {
              toastr["error"](errors.phone);
            } else if (errors.id_no) {
              toastr["error"]('Another User already using this ID number');
            } else if (errors.password) {
              toastr["error"](errors.password);
            }
            else if (errors.gender) {
              toastr["error"]('Please choose your gender');
            }
            else if (errors.kra_no) {
              toastr["error"]('Another User already using this KRA number');
            }
            else if (errors.job_title) {
              toastr["error"](errors.job_title);
            }
            else if (errors.nhif_no) {
              toastr["error"]('Another User already using this NHIF number');
            }
            else if (errors.branch_id) {
              toastr["error"]('Please choose Branch name');
            }
            
          }
        });
    },
    resetData() {
      this.userData = {};
    },
    goBack() {
      history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>
