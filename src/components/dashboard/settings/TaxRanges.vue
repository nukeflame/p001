<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Tax Range</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Employees</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="row pb-2">
              <div class="col-sm-6">
                <h6 class="bold">
                  <u>PAYE Tax Ranges</u>
                </h6>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-12">
                <div class="float-left">
                  <div class="btn-group mr-2">
                    <button
                      type="button"
                      disabled="disabled"
                      class="disabled btn btn-danger btn-sm"
                    >
                      <i class="fa fa-trash pr-1"></i>Delete
                    </button>
                  </div>
                  <a href="#" class="btn btn-outline-primary btn-sm" @click.prevent="addTaxRange">
                    <i class="fa fa-plus pr-1"></i> Add Tax Range
                  </a>
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
                  :rows="taxes"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: ''}"
                  @on-selected-rows-change="selTaxRange"
                  @on-row-click="selTaxRange"
                  :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- actions -->
                    <span v-if="props.column.field == 'actions'">
                      <div class="dropdown">
                        <a class="btn-block color-primary" href="#" @click.prevent="editPayrollPar">
                          <i class="fa fa-edit"></i> Edit
                        </a>
                      </div>
                    </span>
                    <span v-if="props.column.field == 'upper_limit'">
                      <span v-if="props.row.hasNoLimit">And Above</span>
                      <span v-else>{{ getFormatedMoney(props.row.upperLimit)}}</span>
                    </span>
                    <span v-else-if="props.column.field == 'lower_limit'">
                      <span>{{ getFormatedMoney(props.row.lowerLimit)}}</span>
                    </span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>

          <!-- tax range modal-->
          <div
            class="modal animated fadeIn addTaxRangeMd"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h6 class="modal-title text-center f-s-14">Tax Range Details</h6>
                </div>
                <form @submit.prevent="saveTaxRange">
                  <div class="modal-body">
                    <div class="modal-fluid">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group mg-formgroup">
                            <label for="lowerLimit" class="control-label bold">Lower Limit</label>
                            <input
                              type="number"
                              name="lowerLimit"
                              id="lowerLimit"
                              class="form-control input-sm"
                              v-model="taxRangeData.lowerLimit"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group mg-formgroup">
                            <label for="taxRate" class="control-label bold">Tax Rate(%)</label>
                            <input
                              type="number"
                              name="taxRate"
                              id="taxRate"
                              class="form-control input-sm"
                              v-model="taxRangeData.taxRate"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group mg-formgroup">
                            <label for="upperLimit" class="control-label bold">Upper Limit</label>
                            <input
                              type="number"
                              name="upperLimit"
                              id="upperLimit"
                              class="form-control input-sm"
                              v-model="taxRangeData.upperLimit"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group pt-4">
                            <div class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                id="hasNoLimit"
                                class="custom-control-input"
                                v-model="taxRangeData.hasNoLimit"
                              />
                              <label for="hasNoLimit" class="custom-control-label bold">Has No Limit</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="float-right">
                      <button
                        @click.prevent="hideTaxRange"
                        class="btn btn-sm btn-secondary-outline mr-2"
                      >CANCEL</button>
                      <button type="submit" class="btn btn-sm btn-info">
                        <span v-if="processTax">
                          <span class="pr-2 f-s-13">Processing</span>
                          <img src="../../../assets/loader/round-sm.svg" alt />
                        </span>
                        <span v-else>
                          SAVE
                          <i class="fa fa-plus pl-1"></i>
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
import { formatMoney } from "../../../mixins/helpers";

export default {
  data() {
    return {
      columns: [
        {
          label: "Range ID",
          field: "id"
        },
        {
          label: "Lower Limit",
          field: "lower_limit"
        },
        {
          label: "Upper Limit",
          field: "upper_limit"
        },
        {
          label: "Tax Rate (%)",
          field: "taxRate"
        },
        {
          label: "",
          field: "actions",
          width: "50px"
        }
      ],
      taxRangeData: {
        lowerLimit: "",
        taxRate: "",
        upperLimit: "",
        hasNoLimit: false
      }
    };
  },

  computed: {
    ...mapState({
      taxes: state => state.taxes.taxes,
      processTax: state => state.taxes.processTax
    })
  },

  created() {
    this.$store.dispatch("fetchTaxes");
  },

  methods: {
    ...mapActions(["createTaxRange"]),

    addTaxRange() {
      $(".addTaxRangeMd").modal("show");
    },

    hideTaxRange() {
      $(".addTaxRangeMd").modal("hide");
    },

    saveTaxRange() {
      this.createTaxRange(this.taxRangeData).then(() => {
        this.taxRangeData = {};
        $(".addTaxRangeMd").modal("hide");
      });
    },

    selTaxRange() {},

    getFormatedMoney(money) {
      return formatMoney(money);
    }
  }
};
</script>
