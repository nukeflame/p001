<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Privilages</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">Auth</li>
          <li class="breadcrumb-item active">Privilages</li>
        </ol>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-title">
              <div class="float-left">
                <h6>Select role to add privilage</h6>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-4">
                <div class="form-group">
                  <select
                    name="selRole"
                    id="selRole"
                    class="form-control input-sm"
                    @change="onSelectedRole"
                  >
                    <option :value="role.id" v-for="role in roles" :key="role.id">{{ role.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="card-body module">
              <div class="form-row field-permissions">
                <div class="row">
                  <div class="col-md-12">
                    <div class="selector">
                      <div class="selector-chosen">
                        <h2>
                          Role privilages
                          <span
                            class="help help-tooltip help-icon"
                            title="This is the list of available permissions. You may choose some by selecting them in the box below and then clicking the &quot;Choose&quot; arrow between the two boxes."
                          ></span>
                        </h2>
                        <select
                          name="permissions_old"
                          id="id_permissions_from"
                          multiple
                          class="filtered"
                          style="height: 267.594px;"
                        >
                          <option
                            :value="perm.id"
                            v-for="perm in privilages"
                            :key="perm.id"
                          >{{ perm.name }}</option>
                        </select>
                        <a
                          title="Click to choose all permissions at once."
                          href="#"
                          id="id_permissions_add_all_link"
                          class="selector-chooseall active"
                        >Choose all</a>
                      </div>
                      <ul class="selector-chooser">
                        <li>
                          <a
                            title="Choose"
                            href="#"
                            id="id_permissions_add_link"
                            :class="[permData.availablePerms.length ? 'active' :  ' ', 'selector-add']"
                            @click.prevent="handleChoosePerms"
                          >
                            <i class="fa fa-arrow-circle-left"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            title="Remove"
                            href="#"
                            id="id_permissions_remove_link"
                            :style="{marginBottom: '4px'}"
                            :class="[permData.filterdPerms.length ? 'active' :  ' ', 'selector-remove']"
                            @click.prevent="handleRemovePerms"
                          >
                            <i class="fa fa-arrow-circle-right"></i>
                          </a>
                        </li>
                      </ul>
                      <div class="selector-available">
                        <h2>
                          Available privilages
                          <span
                            class="help help-tooltip help-icon"
                            title="This is the list of chosen permissions. You may remove some by selecting them in the box below and then clicking the &quot;Remove&quot; arrow between the two boxes."
                          ></span>
                        </h2>
                        <p id="id_permissions_filter" class="selector-filter">
                          <label class="aligned" for="id_permissions_input">
                            <span
                              class="help-tooltip search-label-icon"
                              title="Type into this box to filter down the list of available permissions."
                            ></span>
                            <i class="fa fa-search f-s-15"></i>
                          </label>

                          <input type="text" placeholder="Filter" id="id_permissions_input" />
                        </p>
                        <select
                          id="id_permissions_to"
                          multiple="multiple"
                          size="0"
                          name="permissions"
                          class="filtered"
                          style="height: 17.2em;"
                          @change="permChange"
                        >
                          <option
                            :value="perm.id"
                            v-for="perm in permissions"
                            :key="perm.id"
                            :title="perm.name"
                          >{{ perm.name }}</option>
                        </select>
                        <a
                          title="Click to remove all chosen permissions at once."
                          href="#"
                          id="id_permissions_remove_all_link"
                          class="selector-clearall"
                        >Remove all</a>
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
    return {
      creatingUser: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "30px"
        },
        {
          label: "Role",
          field: "name"
        },
        {
          label: "Description",
          field: "slug"
        },
        {
          label: "Users",
          field: "users.length"
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
      permData: {
        id: "",
        availablePerms: "",
        filterdPerms: ""
      },
      permRoles: []
    };
  },

  computed: {
    ...mapState({
      permissions: state => state.permissions.permRoles,
      privilages: state => state.permissions.privilages
    }),

    roles() {
      return this.$store.state.roles.roles;
    }
  },

  mounted() {
    // $("#selRole")
    //   .select2({
    //     placeholder: "-- Select Role --",
    //     allowClear: true,
    //     data: this.roles
    //   })
    //   .val("")
    //   .trigger("change");
  },

  created() {
    this.initializeCreated();
  },

  methods: {
    ...mapActions(["showRolePerms"]),
    initializeCreated() {
      this.$store.dispatch("fetchRoles");
      this.$store.dispatch("fetchPermissions");
    },

    onSelectedRole(e) {
      const permId = e.target.value;
      this.showRolePerms(permId);
    },

    handleChoosePerms() {},
    handleRemovePerms() {},
    permChange() {}
  }
};
</script>

