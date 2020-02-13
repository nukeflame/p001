<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h3 class="text-primary">Create Role</h3>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Create Role</li>
        </ol>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-title">
              <h4>
                <i class="ti-key"></i> New Role
              </h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitRole">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="role">Role :-</label>
                      <input
                        id="role"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        placeholder="Role name"
                        v-model="roleData.name"
                        required
                      >
                    </div>
                    <div class="form-group">
                      <label for="slug">Slug :-</label>
                      <input
                        id="slug"
                        type="text"
                        class="form-control input-rounded f-s-14"
                        placeholder="Slug is unique"
                        v-model="roleData.slug"
                        required
                      >
                    </div>
                    <div class="form-group mt-5">
                      <button type="button" class="btn btn-default mr-2" @click="resetData">
                        <i class="fa fa-refresh"></i> Reset
                      </button>
                      <button type="submit" class="btn btn-primary">
                        <i class="ti-save"></i> Submit
                      </button>
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
          <button type="button" class="btn btn-primary" @click="goBack">
            <i class="ti-angle-left"></i> Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import toastr from "toastr";

export default {
  data() {
    return {
      roleData: {
        name: "",
        slug: ""
      }
    };
  },

  methods: {
    ...mapActions(["addRole"]),
    submitRole() {
      this.addRole(this.roleData)
        .then(() => {
          this.roleData = {};
          toastr["success"]("New role added successfully!");
          this.$router.push("/roles");
        })
        .catch(error => {
          const errors = error.response.data.errors;
          if (errors) {
            if (errors.name) {
              toastr["error"](errors.name);
            } else if (errors.slug) {
              toastr["error"](errors.slug);
            }
          }
        });
    },
    resetData() {
      this.roleData = {};
    },
    goBack() {
      history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>
