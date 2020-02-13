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
                          <input type="checkbox" class="custom-control-input" id="view">
                          <label class="custom-control-label" for="view">View</label>
                        </div>
                      </div>

                      <div class="col-sm-3">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="create">
                          <label class="custom-control-label" for="create">Create</label>
                        </div>
                      </div>

                      <div class="col-sm-3">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="edit">
                          <label class="custom-control-label" for="edit">Edit</label>
                        </div>
                      </div>

                      <div class="col-sm-3">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="delete">
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
                            <input type="checkbox" class="custom-control-input" id="view">
                            <label class="custom-control-label" for="view">Pages</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="view">
                            <label class="custom-control-label" for="view">Forums</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="view">
                            <label class="custom-control-label" for="view">Forums</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="view">
                            <label class="custom-control-label" for="view">Forums</label>
                          </div>
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="view">
                            <label class="custom-control-label" for="view">Forums</label>
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
                              <input type="checkbox" class="custom-control-input" id="view">
                              <label class="custom-control-label" for="view">View</label>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="create">
                              <label class="custom-control-label" for="create">Create</label>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="edit">
                              <label class="custom-control-label" for="edit">Edit</label>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="delete">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState({
      role: state => state.roles.role
    })
  },

  created() {
    if (this.role.id === "") {
      this.$router.push("/roles");
    }
  },

  methods: {}
};
</script>
