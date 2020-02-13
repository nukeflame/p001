<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h3 class="text-primary">{{ role.name }} details</h3>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Role permisions</li>
        </ol>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-title">
              <h4>
                <i class="ti-star"></i>
                {{ role.name }} permisions
              </h4>
            </div>
            <div class="card-body">
              <div class="my-1">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="view"
                            :checked="showRole.includes(2) ? true : false"
                            value="2"
                            @change="changeRole"
                          >
                          <label class="custom-control-label" for="view">View</label>
                        </div>
                      </div>

                      <div class="col-sm-3">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="create"
                            value="1"
                            :checked="showRole.includes(1) ? true : false"
                            @change="changeRole"
                          >
                          <label class="custom-control-label" for="create">Create</label>
                        </div>
                      </div>

                      <div class="col-sm-3">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="edit"
                            value="3"
                            :checked="showRole.includes(3) ? true : false"
                            @change="changeRole"
                          >
                          <label class="custom-control-label" for="edit">Edit</label>
                        </div>
                      </div>

                      <div class="col-sm-3">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="delete"
                            value="4"
                            :checked="showRole.includes(4) ? true : false"
                            @change="changeRole"
                          >
                          <label class="custom-control-label" for="delete">Delete</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <button @click.prevent="goBack" class="btn btn-primary "><i class="ti-angle-left"></i> Back</button>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-title">
              <h4>
                <i class="fa fa-dashboard"></i>
                Dashboard roles
              </h4>
            </div>
            <div class="card-body">
              <div class="my-1">
                <div class="card">
                  <div class="row">
                    <div class="col-sm-8">
                      <div class="card-title">
                        <h5>
                          <i class="ti-key"></i> Roles
                        </h5>
                      </div>
                      <div class="card-body">
                        <div class="my-1">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="role-employees">
                            <label class="custom-control-label" for="role-employees">Employees</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="role-payroll">
                            <label class="custom-control-label" for="role-payroll">Payroll</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="role-reports">
                            <label class="custom-control-label" for="role-reports">Reports</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="role-settings">
                            <label class="custom-control-label" for="role-settings">Settings</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-4">
                      <div class="card-title">
                        <h5>
                          <i class="ti-lock"></i> Permisions
                        </h5>
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="perm-view">
                              <label class="custom-control-label" for="perm-view">View</label>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="perm-create">
                              <label class="custom-control-label" for="perm-create">Create</label>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="perm-edit">
                              <label class="custom-control-label" for="perm-edit">Edit</label>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="perm-delete">
                              <label class="custom-control-label" for="perm-delete">Delete</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      role: state => state.roles.role,
      showRole: state => state.roles.showRole
    })
  },

  created() {
    this.initializeCreated();
  },

  methods: {
    ...mapActions(["addRolePerm"]),
    initializeCreated() {
      if (this.role.id === "") {
        this.$router.push("/roles");
      }
      this.$store.dispatch("showRole", this.role.id);
    },
    changeRole(e) {
      const data = {
        roleId: this.role.id,
        permId: e.target.value,
        checkPerm: e.target.checked
      };

      this.addRolePerm(data);
    },
    goBack() {
      history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>
