<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h3 class="text-primary">Roles</h3>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Roles</li>
        </ol>
      </div>
    </div>
    <div class="container-fluid">
      <!-- <div class="row">
        <div class="col-md-3">
          <router-link to="/roles/create" class="btn btn-primary btn-sm">
            <i class="ti-plus"></i> CREATE ROLE
          </router-link>
        </div>
      </div> -->
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-title">
              <h4>
                <i class="ti-key"></i> Roles management
              </h4>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="roles"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: 'Search roles...'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'actions'">
                      <div class="dropdown">
                        <a
                          class="btn-block"
                          href="#"
                          role="button"
                          id="elipsisMenu"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i class="fa fa-ellipsis-v"></i>
                        </a>

                        <div class="dropdown-menu" aria-labelledby="elipsisMenu">
                          <a href="#" class="dropdown-item" @click.prevent="roleView(props.row)">
                            <i class="ti-info-alt"></i> View role
                          </a>
                          
                          <a class="dropdown-item" href="#" @click.prevent="roleEdit()">
                            <i class="ti-pencil-alt"></i> Edit role
                          </a>
                          <!-- <a class="dropdown-item" href="#">
                            <i class="ti-trash color-danger"></i> Delete role
                          </a>-->
                        </div>
                      </div>
                    </span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
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
      columns: [
        {
          label: "Role",
          field: "name"
        },
        {
          label: "Slug",
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
       
      ],
    };
  },

  computed: {
    ...mapState({
      roles: state => state.roles.roles,
    })
  },

  created() {
    this.initializeCreated();
  },

  methods: {
    ...mapMutations(["roleData"]),
    initializeCreated() {
      this.$store.dispatch("fetchRoles");
    },
    roleView(data) {
      this.roleData(data);
      this.$router.push("/role/view");
    },
    roleEdit(data) {
    }
  }
};
</script>
