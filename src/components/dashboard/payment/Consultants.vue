<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Consultants</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Payment</li>
          <li class="breadcrumb-item active">Consultants</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="row pb-2">
              <div class="col-sm-2">
                <h6 class="bold">
                  <u>Consultants Details</u>
                </h6>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 pb-3 hidden">s</div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-3">
                <span>
                  Total :
                  <span class="pl-1 pr-1 label label-default bold f-s-13">
                    KES
                    <span>{{ getTotalAmount() }}</span>
                  </span>
                </span>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-12">
                <div class="btn-group">
                  <button type="button" class="btn btn-danger btn-sm mr-2 disabled" disabled>
                    <i class="fa fa-trash pr-1"></i>Delete
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm mr-2"
                    @click="consultantModal"
                  >
                    <i class="fa fa-plus pr-1"></i> Add Consultant
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="consultants"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: ''}"
                  @on-selected-rows-change="selConsultant"
                  @on-row-click="selRow"
                  :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden', selectionText: 'selected', clearSelectionText: 'clear'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- actions -->
                    <span v-if="props.column.field == 'actions'">
                      <div class="dropdown">
                        <a class="btn-block color-primary" href="#" @click.prevent="editConsultant">
                          <i class="fa fa-edit"></i> Edit
                        </a>
                      </div>
                    </span>
                    <span v-else-if="props.column.field == 'statusCons'">
                      <span v-if="props.row.status">
                        <span class="label label-success f-s-10 bold" style="padding: 2px 6px;">Paid</span>
                      </span>
                      <span v-else>
                        <span
                          class="label label-warning f-s-10 bold"
                          style="padding: 2px 6px;"
                        >Pending</span>
                      </span>
                    </span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>

          <!-- advance pay modal-->
          <div
            class="modal animated fadeIn consultantMd"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h4 class="modal-title text-center f-s-14">
                    <i class="fa fa-plus pr-1"></i> Consultants Details
                  </h4>
                </div>
                <form @submit.prevent="saveConsultant">
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="surname" class="control-label bold">Surname</label>
                          <input
                            type="text"
                            name="surname"
                            id="surname"
                            class="form-control input-sm"
                            v-model="consultantData.surname"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="otherNames" class="control-label bold">Other Names</label>
                          <input
                            type="text"
                            id="otherNames"
                            class="form-control input-sm"
                            v-model="consultantData.otherNames"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="alias" class="control-label bold">Alias</label>
                          <input
                            type="text"
                            name="alias"
                            id="alias"
                            class="form-control input-sm"
                            v-model="consultantData.alias"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="phone" class="control-label bold">Phone Number</label>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            class="form-control input-sm"
                            v-model="consultantData.phone"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="designation" class="control-label bold">Designation</label>
                          <input
                            type="text"
                            name="designation"
                            id="designation"
                            class="form-control input-sm"
                            v-model="consultantData.designation"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="amount" class="control-label bold">Amount</label>
                          <input
                            type="text"
                            name="amount"
                            id="amount"
                            class="form-control input-sm"
                            v-model="consultantData.amount"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="email" class="control-label bold">Email</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            class="form-control input-sm"
                            v-model="consultantData.email"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer pd-footer">
                    <div class="float-right">
                      <button
                        type="button"
                        @click="hideAdvancePay"
                        class="btn btn-sm btn-outline-secondary mr-2"
                      >CANCEL</button>
                      <button
                        type="submit"
                        :class="[savingConsultant ? 'disabled': '', 'btn btn-sm btn-info']"
                        :disabled="savingConsultant ? true: false"
                      >
                        <span v-if="savingConsultant">
                          <span class="pr-2">Processing</span>
                          <img src="../../../assets/loader/round-sm.svg" alt />
                        </span>

                        <span v-else>
                          SUBMIT
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
import { formatMoney } from "../../../mixins/helpers";
import toastr from "toastr";

export default {
  data() {
    return {
      columns: [
        {
          label: "Alias",
          field: "alias"
        },
        {
          label: "Designation ",
          field: "designation"
        },
        {
          label: "Surname",
          field: "surname"
        },
        {
          label: "Other Names",
          field: "otherNames"
        },
        {
          label: "Mobile No.",
          field: "phone"
        },
        {
          label: "Email",
          field: "email"
        },
        {
          label: "Amount",
          field: "amount"
        },
        {
          label: "Status",
          field: "statusCons"
        },
        {
          label: "",
          field: "actions",
          width: "50px"
        }
      ],

      consultantData: {
        id: null,
        surname: "",
        otherNames: "",
        alias: "",
        phone: "",
        designation: "",
        amount: "",
        email: ""
      }
    };
  },

  computed: {
    ...mapState({
      consultants: state => state.consultants.consultants,
      savingConsultant: state => state.consultants.savingConsultant
    })
  },

  created() {
    // set payperiods
    document.title = "Epsotech :: Consultants";
    this.initiateCreated();
  },

  methods: {
    ...mapActions(["createConsultant"]),
    initiateCreated() {
      //get periods
      this.$store.dispatch("fetchConsultants");
    },

    consultantModal() {
      $(".consultantMd").modal("show");
    },

    hideAdvancePay() {
      this.consultantData = {};
      $(".consultantMd").modal("hide");
    },

    selRow() {},

    editConsultant() {
      $(".consultantMd").modal("show");
    },

    selConsultant() {},

    saveConsultant() {
      this.createConsultant(this.consultantData).then(() => {
        this.consultantData = {};
        $(".consultantMd").modal("hide");
        toastr.success("Successfully new  record added.");
      });
    },

    getTotalAmount() {
      if (this.consultants.length > 0) {
        return formatMoney(this.consultants[0].totalAmount);
      }
    }
  }
};
</script>
