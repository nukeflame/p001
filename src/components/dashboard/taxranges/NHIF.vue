<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h3 class="text-primary">Settings</h3>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Settings</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div>
                <h4 class="card-title">
                  <i class="ti-plus"></i> Add NHIF Charges
                </h4>
                <form @submit.prevent="submitNHIF">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="min_charge">Min Charge</label>
                        <input
                          type="text"
                          id="min_charge"
                          class="form-control f-s-14"
                          placeholder="Enter minimum charge (ksh)"
                          required
                          v-model="nhifData.min_charges"
                        />
                      </div>
                      <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block">Submit</button>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="min_charge">Max Charge</label>
                        <input
                          type="text"
                          id="min_charge"
                          class="form-control f-s-14"
                          placeholder="Enter maximum charge (ksh)"
                          required
                          v-model="nhifData.max_charges"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="rate">Rate Amount</label>
                        <input
                          type="text"
                          id="rate"
                          required
                          class="form-control f-s-14"
                          placeholder="Enter rate amount (ksh)"
                          v-model="nhifData.rate_amount"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="my-1">
                <h4 class="card-title">
                  <i class="ti-layout-grid2"></i> NHIF Charges
                </h4>
                <vue-good-table
                  :columns="columns"
                  :rows="nhif"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: 'Search details...'}"
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
                            <i class="ti-info-alt"></i> View
                          </a>

                          <a class="dropdown-item" href="#" @click.prevent="roleEdit()">
                            <i class="ti-pencil-alt"></i> Edit
                          </a>
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
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      columns: [
        {
          label: "ID",
          field: "id"
        },
        {
          label: "Min-Charges",
          field: "min_charges"
        },
        {
          label: "Max-Charges",
          field: "max_charges"
        },
        {
          label: "Rate Amount",
          field: "rate_amount"
        },
        {
          label: "",
          field: "actions"
        }
      ],
      nhifData: {
        min_charges: "",
        max_charges: "",
        rate_amount: ""
      }
    };
  },

  computed: {
    ...mapState({
      nhif: state => state.nhif.nhif
    })
  },

  created() {
    this.$store.dispatch("fetchNhif");
  },

  methods: {
    ...mapActions(["addNHIF"]),
    submitNHIF() {
      this.addNHIF(this.nhifData).then(() => {
        this.nhifData = {};
      });
    }
  }
};
</script>
