<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Roles</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">Auth</li>
          <li class="breadcrumb-item active">Roles</li>
        </ol>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 col-sm-8">
          <div class="card">
            <div class="row pb-3">
              <div class="col-sm-12">
                <div class="float-left">
                  <div class="btn-group">
                    <button class="btn btn-sm btn-secondary" @click="addRole">
                      Add Role
                      <i class="fa fa-plus pl-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="roles"
                  :pagination-options="{enabled: true, perPage: 15}"
                  :search-options="{ enabled: true , placeholder: ''}"
                >
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'actions'">
                      <div class="dropdown" v-if="props.row.slug !== 'super_admin'">
                        <a class="btn-block color-primary" href="#" @click="editRole(props.row)">
                          <i class="fa fa-edit"></i> Edit
                        </a>
                      </div>
                    </span>
                    <span v-if="props.column.field == 'roleId'">{{ props.index +1 }}</span>
                    <span
                      v-if="props.column.field == 'created_at'"
                    >{{ monthFormat(props.row.createdAt) }}</span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>
          <!-- Modals -->
          <div
            class="modal animated fadeIn roleModel"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h4 class="modal-title text-center f-s-14">
                    <i class="fa fa-plus"></i> Add Role
                  </h4>
                </div>
                <div class="modal-body pt-0">
                  <form class="form-horizontal">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="role_name" class="control-label bold">Role:</label>
                          <input
                            type="text"
                            name="role_name"
                            id="role_name"
                            class="form-control input-sm"
                            required
                            v-model="roleData.role"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="slug" class="control-label bold">Slug:</label>
                          <input
                            type="text"
                            name="slug"
                            id="slug"
                            class="form-control input-sm"
                            required
                            v-model="roleData.slug"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label for="description" class="control-label bold">Description:</label>
                          <input
                            type="email"
                            name="description"
                            id="description"
                            class="form-control input-sm"
                            required
                            v-model="roleData.description"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer pd-footer">
                  <div class="float-right">
                    <button
                      @click="hideroleModel"
                      class="btn btn-sm btn-outline-secondary mr-2"
                    >CANCEL</button>
                    <button
                      type="button"
                      :class="[creatingRole ? 'disabled': '', 'btn btn-sm btn-info']"
                      :disabled="creatingRole ? true: false"
                      @click="saveRole"
                    >
                      <span v-if="creatingRole">
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
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      columns: [
        {
          label: "No",
          field: "roleId",
          width: "30px"
        },
        {
          label: "Role",
          field: "name"
        },
        {
          label: "Description",
          field: "description"
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
      roleData: {
        id: "",
        slug: "",
        role: "",
        description: ""
      },
      clientId: "",
      isEdit: false
    };
  },

  computed: {
    ...mapState({
      roles: state => state.roles.roles,
      creatingRole: state => state.roles.creatingRole
    })
  },

  created() {
    this.initializeCreated();
  },

  methods: {
    ...mapActions(["createRole", "updateRole"]),
    initializeCreated() {
      this.$store.dispatch("fetchRoles");
    },

    addRole() {
      $(".roleModel").modal("show");
    },

    editRole(data) {
      this.roleData = {
        id: data.id,
        slug: data.slug,
        role: data.name,
        description: data.description
      };
      this.isEdit = true;
      $(".roleModel").modal("show");
    },

    hideroleModel() {
      $(".roleModel").modal("hide");
      this.isEdit = false;
    },

    saveRole() {
      const client = JSON.parse(localStorage.getItem("AC"));
      const rd = this.roleData;
      const data = {
        id: rd.id,
        slug: rd.slug,
        role: rd.role,
        description: rd.description,
        clientId: client.id
      };

      if (this.isEdit) {
        this.updateRole(data).then(() => {
          this.resetRoleData();
        });
      } else {
        this.createRole(data).then(() => {
          this.resetRoleData();
        });
      }
    },

    resetRoleData() {
      this.roleData = {
        id: "",
        slug: "",
        role: "",
        description: ""
      };
      this.isEdit = false;
      $(".roleModel").modal("hide");
    },

    monthFormat(date) {
      return moment(date).format("MMMM D, YYYY");
    }
  }
};
</script>

