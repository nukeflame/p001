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
                      <label for="fullnames">Fullname :-</label>
                      <input
                        id="fullnames"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        placeholder="Fulnames"
                        v-model="userData.name"
                      >
                    </div>
                    <div class="form-group">
                      <label for="password">Password :-</label>
                      <input
                        id="password"
                        type="password"
                        class="form-control input-rounded f-s-14"
                        placeholder="Password"
                        v-model="userData.password"
                      >
                    </div>
                    <div class="form-group">
                      <label for="phone">Phone :-</label>
                      <input
                        id="phone"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        placeholder="Phone number"
                        v-model="userData.phone"
                      >
                    </div>
                    <div class="form-group">
                      <label for="nhif">NHIF No. :-</label>
                      <input
                        id="nhif"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        placeholder="NHIF number"
                        v-model="userData.nhif_no"
                      >
                    </div>
                    <div class="form-group">
                      <label for="branch">Branch Name :-</label>
                      <select
                        name="branch"
                        id="branch"
                        class="form-control input-rounded f-s-14"
                        v-model="userData.branch_id"
                      >
                        <option value="0" selected disabled>--Select--</option>
                        <option
                          v-for="branch in branches"
                          :key="branch.id"
                          :value="branch.id"
                        >{{ branch.name }}</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="department">Department Name :-</label>
                      <input
                        id="department"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        placeholder="Department name"
                        v-model="userData.department"
                      >
                    </div>

                    <div class="form-group">
                      <button type="button" class="btn btn-default mr-2" @click="resetData">
                        <i class="fa fa-refresh"></i> Reset
                      </button>
                      <button type="submit" class="btn btn-primary">
                        <i class="ti-save"></i> Submit
                      </button>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email">E-Mail Address :-</label>
                      <input
                        id="email"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        placeholder="E-Mail"
                        v-model="userData.email"
                      >
                    </div>
                    <div class="form-group">
                      <label for="id_no">ID No. :-</label>
                      <input
                        id="id_no"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        placeholder="ID number"
                        v-model="userData.id_no"
                      >
                    </div>
                    <div class="form-group">
                      <label for="gender">Gender :-</label>
                      <select
                        class="form-control input-rounded f-s-14"
                        id="gender"
                        v-model="userData.gender"
                      >
                        <option value="0" selected disabled>--Select--</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="position">Position :-</label>
                      <input
                        id="position"
                        type="position"
                        class="form-control input-rounded f-s-14"
                        placeholder="Position"
                        v-model="userData.position"
                      >
                    </div>

                    <div class="form-group">
                      <label for="nssf">NSSF No. :-</label>
                      <input
                        id="nssf"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        placeholder="NSSF number"
                        v-model="userData.nssf_no"
                      >
                    </div>
                    <div class="form-group">
                      <label for="kra">KRA No. :-</label>
                      <input
                        id="kra"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        placeholder="KRA number"
                        v-model="userData.kra_no"
                      >
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
          <div class="my-3">
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
        phone: "",
        nssf_no: "",
        kra_no: "",
        nhif_no: "",
        position: "",
        id_no: "",
        gender: "0",
        branch_id: "0",
        department: ""
      }
    };
  },

  computed: {
    ...mapState({
      branches: state => state.branches.branches
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
          // this.$router.push("/users");
        })
        .catch(error => {
          const errors = error.response.data.errors;
          // if (errors) {
          //   if (errors.name) {
          //     toastr["error"](errors.name);
          //   } else if (errors.email) {
          //     toastr["error"](errors.email);
          //   } else if (errors.phone) {
          //     toastr["error"](errors.phone);
          //   } else if (errors.id_no) {
          //     toastr["error"](errors.id_no);
          //   } else if (errors.password) {
          //     toastr["error"](errors.password);
          //   }
          // }
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
