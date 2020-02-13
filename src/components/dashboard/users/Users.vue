<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Users</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item active">Users</li>
        </ol>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="row pb-3">
              <div class="col-sm-2">
                <span>
                  Total Users:
                  <span class="pl-1 pr-1 label label-default bold f-s-13">4</span>
                </span>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-12">
                <div class="float-left">
                  <div class="btn-group">
                    <button class="btn btn-sm btn-secondary" @click="createUser">
                      Add User
                      <i class="fa fa-plus pl-1"></i>
                    </button>
                  </div>
                </div>
                <div class="float-right">
                  <div class="btn-group">
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                      <i class="fa fa-print pr-1"></i> Print
                    </button>
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                      <i class="fa fa-file pr-1"></i> Excel
                    </button>
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                      <i class="fa fa-copy pr-1"></i> Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="users"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: ''}"
                  @row-select-class="selUser"
                >
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'actions'">
                      <div class="dropdown">
                        <a class="btn-block color-primary" href="#">
                          <i class="fa fa-edit"></i> Edit
                        </a>
                      </div>
                    </span>
                    <span v-else-if="props.column.field == 'branch'">
                      <span v-for="branch in branches" :key="branch.id">
                        <span v-if="props.row.branch_id === branch.id">{{ branch.name }}</span>
                      </span>
                    </span>
                    <span v-else-if="props.column.field == 'status'">
                      <span
                        v-if="props.row.isActive === 0"
                        class="label label-danger f-s-10 bold"
                        style="padding: 2px 6px;"
                      >Blocked</span>
                      <span
                        v-if="props.row.isActive === 1"
                        class="label label-warning f-s-10 bold"
                        style="padding: 2px 6px;"
                      >Pending</span>
                      <span
                        v-if="props.row.isActive === 2"
                        class="label label-success f-s-10 bold"
                        style="padding: 2px 6px;"
                      >Active</span>
                    </span>
                    <span v-else-if="props.column.field == 'created_at'">
                      <span>Aug 16, 2019</span>
                    </span>

                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>

          <!-- Modals -->
          <div
            class="modal animated fadeIn userModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h4 class="modal-title text-center f-s-14">
                    <i class="fa fa-plus"></i> Add User
                  </h4>
                </div>
                <div class="modal-body pt-0">
                  <form class="form-horizontal">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="surname" class="control-label bold">Surname:</label>
                          <input
                            type="text"
                            name="surname"
                            id="surname"
                            class="form-control input-sm"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="otherName" class="control-label bold">Othernames:</label>
                          <input
                            type="email"
                            name="otherName"
                            id="otherName"
                            class="form-control input-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="username" class="control-label bold">Username:</label>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            class="form-control input-sm"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="email_address" class="control-label bold">Email Address:</label>
                          <input
                            type="email"
                            name="email_address"
                            id="email_address"
                            class="form-control input-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="password" class="control-label bold">Password:</label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            class="form-control input-sm"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="conf_password" class="control-label bold">Confirm Password:</label>
                          <input
                            type="password"
                            name="conf_password"
                            id="conf_password"
                            class="form-control input-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="roles" class="control-label bold">Roles:</label>
                          <input
                            type="text"
                            name="roles"
                            id="roles"
                            class="form-control input-sm"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="status" class="control-label bold">Status:</label>
                          <select name="status" id="status" class="form-control input-sm">
                            <option value="0">Blocked</option>
                            <option value="1" selected>Pending</option>
                            <option value="2">Active</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer pd-footer">
                  <div class="float-right">
                    <button
                      @click="hideUserModal"
                      class="btn btn-sm btn-outline-secondary mr-2"
                    >CANCEL</button>
                    <button
                      type="submit"
                      :class="[creatingUser ? 'disabled': '', 'btn btn-sm btn-info']"
                      :disabled="creatingUser ? true: false"
                    >
                      <span v-if="creatingUser">
                        <span class="pr-2">Processing</span>
                        <img src="../../../assets/loader/round-sm.svg" alt />
                      </span>
                      <span v-else>
                        SAVE
                        <i class="fa fa-plus"></i>
                      </span>
                    </button>
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
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      creatingUser: false,
      columns: [
        {
          label: "No",
          field: "id",
          width: "20px"
        },
        {
          label: "Fullnames",
          field: "name"
        },
        {
          label: "E-mail",
          field: "email"
        },
        {
          label: "ID number",
          field: "id_no"
        },
        {
          label: "Phone",
          field: "phone_no"
        },
        {
          label: "Last Login",
          field: "branch"
        },
        {
          label: "Logins",
          field: "branch"
        },
        {
          label: "Status",
          field: "status"
        },
        {
          label: "Created On",
          field: "created_at"
        },
        {
          label: "",
          field: "actions",
          width: "50px"
        }
      ],
      userData: {
        id: "",
        fullname: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        id_no: "",
        password: "",
        password_confirmation: "",
        status_id: 1,
        branch_id: "",
        department_id: ""
      }
    };
  },

  computed: {
    ...mapState({
      users: state => state.users.users,
      branches: state => state.branches.branches,
      usersLoading: state => state.users.usersLoading
    })
  },

  created() {
    this.initializeCreated();
  },

  methods: {
    ...mapMutations(["bankData"]),
    initializeCreated() {
      this.$store.dispatch("fetchBranches");
      this.$store.dispatch("fetchUsers");
    },
    addBank(data) {
      this.bankData(data);
      this.$router.push("/users/add-bank");
    },

    createUser() {
      $(".userModal").modal("show");
    },

    hideUserModal() {
      $(".userModal").modal("hide");
    },

    handleAddUser() {
      // this.handleCreateUser(this.userData).then(() => {
      //   if (this.userCreated != null) {
      //     const user = this.userCreated;
      //     this.userData = {
      //       id: user.id,
      //       email: user.email
      //     };
      //     this.isEdit = false;
      //     $(".userModal").modal("hide");
      //     $(".userAddModal").modal("show");
      //   }
      // });
    },

    selUser() {}
  }
};
</script>

