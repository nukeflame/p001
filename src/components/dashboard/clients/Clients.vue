<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Clients</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item active">Clients</li>
        </ol>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-title">
              <div class="float-left">
                <h6>Select client to change</h6>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-2">
                <span>
                  Total Clients:
                  <span
                    class="pl-1 pr-1 label label-default bold f-s-13"
                  >{{ clients && clients.length }}</span>
                </span>
              </div>
              <!-- <div class="col-sm-3">
                <span>
                  Active Clients:
                  <span class="pl-1 pr-1 label label-default bold f-s-13">11,000</span>
                </span>
              </div>-->
            </div>
            <div class="row pb-3">
              <div class="col-sm-12">
                <div class="btn-group">
                  <button type="button" class="btn btn-danger btn-sm mr-2 disabled" disabled>
                    <i class="fa fa-trash pr-1"></i>Delete
                  </button>
                  <button class="btn btn-sm btn-secondary" @click="addClient">
                    Add Client
                    <i class="fa fa-plus pl-1"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="clients"
                  :pagination-options="{enabled: true}"
                  @on-selected-rows-change="selClient"
                  @on-row-click="selClient"
                  :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden', selectionText: 'selected', clearSelectionText: 'clear'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'actions'"></span>
                    <span v-else-if="props.column.field == 'branch'">
                      <span v-for="branch in branches" :key="branch.id">
                        <span v-if="props.row.branch_id === branch.id">{{ branch.name }}</span>
                      </span>
                    </span>
                    <span v-else-if="props.column.field == 'status'">
                      <span v-if="props.row.status">
                        <span
                          class="label label-success f-s-10 bold"
                          style="padding: 2px 6px;"
                        >Online</span>
                      </span>
                      <span v-else>
                        <span
                          class="label label-danger f-s-10 bold"
                          style="padding: 2px 6px;"
                        >Offline</span>
                      </span>
                    </span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>

          <!-- Modals -->
          <div class="modal animated fadeIn clientModal" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header" style="padding: 8px 15px;">
                  <h6 class="modal-title">
                    <i class="fa fa-plus"></i>
                    Add Client
                  </h6>
                </div>
                <form @submit.prevent="handleAddClient">
                  <div class="modal-body">
                    <div class="modal-fluid">
                      <div class="row form-group">
                        <div class="col-md-4">
                          <label for="client" class="bold">Client Name:</label>
                        </div>
                        <div class="col-md-8">
                          <input
                            v-model="clientData.clientName"
                            type="text"
                            id="client"
                            class="form-control input-sm has-error"
                            required
                          />
                        </div>
                      </div>
                      <div class="row form-group">
                        <div class="col-md-4">
                          <label for="clientEmail" class="bold">Client Email:</label>
                        </div>
                        <div class="col-md-8">
                          <input
                            v-model="clientData.clientEmail"
                            type="email"
                            id="clientEmail"
                            class="form-control input-sm has-error"
                            required
                          />
                        </div>
                      </div>

                      <div class="row form-group">
                        <div class="col-md-4">
                          <label for="clientId" class="bold">Client ID:</label>
                        </div>
                        <div class="col-md-8">
                          <input
                            v-model="clientData.clientId"
                            type="text"
                            id="clientId"
                            class="form-control input-sm has-error"
                            required
                          />
                        </div>
                      </div>
                      <div class="row form-group">
                        <div class="col-md-4">
                          <label for="company" class="bold">Company:</label>
                        </div>
                        <div class="col-md-8">
                          <input
                            v-model="clientData.company"
                            type="text"
                            id="company"
                            class="form-control input-sm"
                            required
                          />
                        </div>
                      </div>
                      <div class="row form-group">
                        <div class="col-md-4">
                          <label for="email_address" class="bold">Email Address:</label>
                        </div>
                        <div class="col-md-8">
                          <input
                            v-model="clientData.emailAddress"
                            type="email"
                            id="email_address"
                            class="form-control input-sm"
                            required
                          />
                        </div>
                      </div>
                      <div class="row form-group">
                        <div class="col-md-4">
                          <label for="telephone" class="bold">Telephone:</label>
                        </div>
                        <div class="col-md-8">
                          <input
                            v-model="clientData.telephone"
                            type="text"
                            id="telephone"
                            class="form-control input-sm"
                            required
                          />
                        </div>
                      </div>
                      <div class="row form-group">
                        <div class="col-md-4">
                          <label for="location" class="bold">Location:</label>
                        </div>
                        <div class="col-md-8">
                          <input
                            v-model="clientData.location"
                            type="telephone"
                            id="location"
                            class="form-control input-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer" style="padding: 8px 15px;">
                    <div class="float-right">
                      <button
                        @click.prevent="hideClientModal"
                        class="btn btn-sm btn-info-outline mr-2"
                      >CANCEL</button>
                      <button
                        type="submit"
                        class="btn btn-sm btn-info"
                        :disabled="creatingClient ? true: false"
                        @click="saveClient"
                      >
                        <span v-if="creatingClient">Creating...</span>
                        <span v-else>
                          CREATE
                          <i class="fa fa-plus"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
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
      columns: [
        {
          label: "Client",
          field: "name"
        },
        {
          label: "E-mail",
          field: "email"
        },
        {
          label: "Client ID",
          field: "clientId"
        },
        {
          label: "Telephone",
          field: "telephone"
        },

        {
          label: "Location",
          field: "location"
        },
        {
          label: "Status",
          field: "status"
        },
        {
          label: "Branches",
          field: "branches"
        },
        {
          label: "",
          field: "actions"
        }
      ],

      clientData: {
        clientName: "",
        clientEmail: "",
        company: "",
        clientId: "",
        emailAddress: "",
        telephone: "",
        location: ""
      }
    };
  },

  computed: {
    ...mapState({
      clients: state => state.clients.clients,
      branches: state => state.branches.branches,
      creatingClient: state => state.clients.creatingClient
    })
  },

  created() {
    this.initiateCreated();
  },

  methods: {
    ...mapActions(["createClient"]),
    initiateCreated() {
      this.$store.dispatch("fetchBranches");
      //get clients
      this.$store.dispatch("fetchClients");

      this.clientData.clientId =
        "EPS/" +
        Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase();
    },

    addClient() {
      $(".clientModal").modal("show");
    },

    handleAddClient() {
      $(".clientModal").modal("show");
    },

    hideClientModal() {
      this.clientData = {
        clientName: "",
        emailAddress: "",
        telephone: "",
        location: ""
      };
      this.clientData.clientId =
        "EPS/" +
        Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase();
      $(".clientModal").modal("hide");
    },

    saveClient() {
      this.createClient(this.clientData);
    },

    selClient() {}
  }
};
</script>

