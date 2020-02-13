<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Payroll Parameters</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Settings</a>
          </li>
          <li class="breadcrumb-item active">Payroll Parameters</li>
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
                  <u>Payroll Parameters</u>
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
                  <a
                    href="#"
                    class="btn btn-outline-primary btn-sm mr-2"
                    @click.prevent="addPayrollPar"
                  >
                    <i class="fa fa-plus pr-1"></i> Create Parameter
                  </a>
                  <a
                    href="#"
                    class="btn btn-outline-secondary btn-sm mr-2"
                    @click.prevent="addCategory"
                  >
                    <i class="fa fa-plus pr-1"></i> Create Categories
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
                  :rows="payrolPars"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: ''}"
                  @on-selected-rows-change="selPar"
                  @on-row-click="selPar"
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
                    <!-- defValue details -->
                    <span v-else-if="props.column.field == 'default'">
                      <span class="float-right">{{ getFormatedMOney(props.row.defValue)}}</span>
                    </span>
                    <!--isRequired -->
                    <span v-else-if="props.column.field == 'is_req'">
                      <span v-if="props.row.isRequired > 1">Yes</span>
                      <span v-else>No</span>
                    </span>

                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>
        </div>

        <!-- add payperiod modal-->
        <div
          class="modal animated fadeIn payrollParMd"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header pd-header">
                <h4 class="modal-title text-center f-s-14">Payroll Parameter Details</h4>
              </div>
              <form class="form-horizontal" @submit.prevent="savePayrollPar">
                <div class="modal-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="name" class="control-label bold">Name</label>
                        <input
                          type="text"
                          id="name"
                          class="form-control input-sm"
                          v-model="payrolParData.name"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="categoryId" class="control-label bold">Category</label>
                        <select
                          id="categoryId"
                          v-model="payrolParData.categoryId"
                          class="form-control input-sm error sel2"
                        >
                          <option value="0"></option>
                          <option value="1">Basic Pay</option>
                          <option value="2">National Hospital Cover</option>
                          <option value="3">Security Fund</option>
                          <!-- <option
                            :value="cat.id"
                            v-for="cat in payrolParsCat"
                            :key="cat.id"
                             v-model="payrolParData.categoryId"
                          >{{ cat.name}}</option>-->
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="description" class="control-label bold">Description</label>
                        <input
                          type="text"
                          name="description"
                          id="description"
                          class="form-control input-sm"
                          v-model="payrolParData.description"
                        />
                      </div>
                      <div class="form-group pt-3">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            v-model="payrolParData.isDefVal"
                            id="isDefVal"
                            class="custom-control-input"
                          />
                          <label for="isDefVal" class="custom-control-label">Use Default Value</label>
                        </div>
                      </div>
                      <div class="form-group pt-1">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            v-model="payrolParData.isRequired"
                            id="isRequired"
                            class="custom-control-input"
                          />
                          <label for="isRequired" class="custom-control-label">Is Required</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="defValue" class="control-label bold">Default Value</label>
                        <input
                          type="text"
                          name="defValue"
                          id="defValue"
                          class="form-control input-sm"
                          v-model="payrolParData.defValue"
                        />
                      </div>
                      <div class="form-group pt-3">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            v-model="payrolParData.isDef"
                            id="isDef"
                            class="custom-control-input"
                          />
                          <label for="isDef" class="custom-control-label">Is Default</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer pd-footer">
                  <div class="float-right">
                    <button
                      @click="hidePayrollPar"
                      class="btn btn-sm btn-outline-secondary mr-2"
                    >CANCEL</button>
                    <button
                      type="submit"
                      :class="[loadingPar ? 'disabled': '', 'btn btn-sm btn-info']"
                      :disabled="loadingPar ? true: false"
                    >
                      <span v-if="loadingPar">
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
              </form>
            </div>
          </div>
        </div>

        <!-- add category parameter modal-->
        <div
          class="modal animated fadeIn categoryMd"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header pd-header">
                <h4 class="modal-title text-center f-s-14">Payroll Parameters Categories</h4>
              </div>
              <div class="modal-body">
                <div class="modal-fluid">
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label for="amount" class="control-label bold">Name</label>
                        <input
                          type="number"
                          class="form-control input-sm"
                          name="amount"
                          id="amount"
                        />
                      </div>
                    </div>

                    <div class="col-sm-4">
                      <div class="form-group">
                        <label for="amount" class="control-label bold">Type</label>
                        <select id="CategoryType" class="form-control input-sm error" required>
                          <option></option>
                          <option value="1">Basic Pay</option>
                          <option value="2">Benefit</option>
                          <option value="3">Allowance</option>
                          <option value="4">Pre-tax/Admissible Deduction</option>
                          <option value="5">Post-tax Deduction</option>
                          <option value="6">Tax Relief</option>
                          <option value="7">Payroll Tax</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-sm-4">
                      <div class="form-group mt-4">
                        <button
                          type="submit"
                          :class="[loadingCategory ? 'disabled': '', 'btn btn-sm btn-info']"
                          @click="saveCategory"
                          :disabled="loadingCategory ? true: false"
                        >
                          <span v-if="loadingCategory">
                            <span class="pr-2">Processing</span>
                            <img src="../../../assets/loader/round-sm.svg" alt />
                          </span>
                          <span v-else>
                            <i class="ti-plus"></i> Add Category
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="row pb-2">
                    <div class="col-sm-12">
                      <h6 class="pt-4 bold f-s-13 pr-1">
                        <u>Payroll Parameter Categories:-</u>
                      </h6>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <vue-good-table
                        :columns="catColumns"
                        :rows="catData"
                        :pagination-options="{enabled: false}"
                        max-height="250px"
                        :search-options="{ enabled: true , placeholder: 'Search ...'}"
                      ></vue-good-table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pd-footer">
                <div class="float-right">
                  <button @click="hideCategory" class="btn btn-sm btn-outline-secondary mr-2">CANCEL</button>
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
import { formatMoney } from "../../../mixins/helpers";

export default {
  data() {
    return {
      loadingPar: false,
      loadingCategory: false,
      catColumns: [
        {
          label: "No",
          field: "id"
        },
        {
          label: "Name",
          field: "name"
        },
        {
          label: "Type",
          field: "type"
        },
        {
          label: "",
          field: "actions"
        }
      ],
      catData: [
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "National Hospital Cover",
          type: "Post-tax Deduction"
        },
        {
          id: 1,
          name: "Security Fund",
          type: "Pre-tax/Admissible Deduction"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "National Hospital Cover",
          type: "Post-tax Deduction"
        },
        {
          id: 1,
          name: "Security Fund",
          type: "Pre-tax/Admissible Deduction"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic  Pay"
        },
        {
          id: 1,
          name: "National Hospital Cover",
          type: "Post-tax Deduction"
        },
        {
          id: 1,
          name: "Security Fund",
          type: "Pre-tax/Admissible Deduction"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        },
        {
          id: 1,
          name: "Basic Pay",
          type: "Basic Pay"
        }
      ],
      columns: [
        {
          label: "No.",
          field: "id"
        },
        {
          label: "Name",
          field: "name"
        },
        {
          label: "Category",
          field: "category.name"
        },
        {
          label: "Required",
          field: "is_req"
        },
        {
          label: "Default",
          field: "default"
        },
        {
          label: "",
          field: "actions",
          width: "50px"
        }
      ],
      payrolParData: {
        name: "",
        categoryId: "",
        description: "",
        defValue: "",
        isDefVal: false,
        isDef: false,
        isRequired: false
      }
    };
  },

  computed: {
    ...mapState({
      payrolPars: state => state.payrollParameters.payrolPars,
      payrolParsCat: state => state.parametersCategories.payrolParsCat,
      authUser: state => state.roles.authUser
    })
  },

  mounted() {
    $("#categoryId")
      .select2({
        placeholder: "--Select--",
        allowClear: true,
        dropdownParent: $(".payrollParMd")
      })
      .on("change", e => {
        const obj = $("#categoryId").select2("data");
        this.payrolParData.categoryId = obj[0].id;
      });
  },

  created() {
    //
    this.$store.dispatch("fetchPayrollParameter");
    this.$store.dispatch("fetchPayrollParameterCat");
  },

  methods: {
    ...mapActions(["createPayrolParameter"]),

    selPar() {},

    addPayrollPar() {
      $(".payrollParMd").modal("show");
    },

    hidePayrollPar() {
      $(".payrollParMd").modal("hide");
    },

    savePayrollPar() {
      console.log(this.payrolParData);
      // this.createPayrolParameter(this.payrolParData);
    },

    addCategory() {
      $(".categoryMd").modal("show");
    },

    saveCategory() {
      console.log("e");
    },

    hideCategory() {
      $(".categoryMd").modal("hide");
    },

    editPayrollPar() {},

    getFormatedMOney(money) {
      return formatMoney(money);
    }
  }
};
</script>
