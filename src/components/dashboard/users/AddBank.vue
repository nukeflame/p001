<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h3 class="text-primary">Add Bank</h3>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Add Bank</li>
        </ol>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-title">
              <h4>
                <i class="ti-money"></i> Add Bank
              </h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitBank">
                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group">
                      <label for="bank">Bank</label>
                      <input
                        type="text"
                        id="bank"
                        class="form-control"
                        required
                        v-model="bankData.bank_name"
                      >
                    </div>
                  </div>
                </div>
                <!-- <div class="row">
                  <div class="col-md-8">
                    <div class="form-group">
                      <label for="acc_holder">Account Holder</label>
                      <input
                        type="text"
                        id="acc_holder"
                        class="form-control"
                        required
                        v-model="bankData.acc_holder"
                      >
                    </div>
                  </div>
                </div>-->
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="bank_code">Bank Code</label>
                      <input
                        type="text"
                        id="bank_code"
                        class="form-control"
                        required
                        v-model="bankData.bank_code"
                      >
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="acc_no">Account No.</label>
                      <input
                        type="text"
                        id="acc_no"
                        class="form-control"
                        required
                        v-model="bankData.acc_no"
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="swift">SWIFT Code</label>
                      <input
                        type="text"
                        id="swift"
                        class="form-control"
                        required
                        v-model="bankData.swift_code"
                      >
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="iban">IBAN No.</label>
                      <input
                        type="text"
                        id="iban"
                        class="form-control"
                        required
                        v-model="bankData.iban_no"
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group">
                      <button type="submit" class="btn btn-primary">
                        <i class="ti-save"></i> Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <div class="mt-3 mb-0">
            <button type="button" class="btn btn-info" @click.prevent="goBack">
              <i class="ti-angle-left"></i> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      bankData: {
        id: "",
        name: "",
        bank_name: "",
        acc_holder: "",
        bank_code: "",
        acc_no: "",
        swift_code: "",
        iban_no: ""
      }
    };
  },

  computed: {
    ...mapState({
      userData: state => state.users.bankData
    })
  },

  created() {
    if (this.userData.id === "") {
      this.$router.push("/users");
    }
  },

  methods: {
    ...mapActions(["addBank"]),
    submitBank() {
      const data = {
        id: this.userData.id,
        name: this.userData.name,
        bank_name: this.bankData.bank_name,
        acc_holder: this.userData.name,
        bank_code: this.bankData.bank_code,
        acc_no: this.bankData.acc_no,
        swift_code: this.bankData.swift_code,
        iban_no: this.bankData.iban_no,
        add_bank: true
      };

      this.addBank(data).then(() => {
        toastr["success"]("User bank added successfully");
        this.$router.push("/users");
        this.bankData = {};
      }).catch(() => {
        toastr["error"]("Input the fields correctly");
        this.bankData = {};
      })
    },
    goBack() {
      history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

