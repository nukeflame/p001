<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Apply For Leave</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Leave</li>
          <li class="breadcrumb-item active">Apply For Leave</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="row pb-2">
              <div class="col-sm-4">
                <h6 class="bold">
                  <u>Leave Details</u>
                </h6>
              </div>
            </div>
            <div class="card-body">
              <div class="row my-1">
                <div class="col-sm-8">
                  <form @submit.prevent="addLeaveForm">
                    <div class="form-group row">
                      <div class="col-sm-3">
                        <label
                          for="empName"
                          class="control-label bold pt-1 float-right"
                        >Employee Name:</label>
                      </div>
                      <div class="col-sm-6">
                        <select
                          name="empName"
                          v-model="leaveData.employeeName"
                          id="empName"
                          class="form-control input-sm sel2"
                        >
                          <option
                            :value="emp.id"
                            v-for="emp in employees"
                            :key="emp.id"
                          >{{ emp.text }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-3">
                        <label
                          for="leaveType"
                          class="control-label bold pt-1 float-right"
                        >Leave Type:</label>
                      </div>
                      <div class="col-sm-6">
                        <select
                          id="leaveType"
                          v-model="leaveData.leaveType"
                          class="form-control input-sm sel2"
                        >
                          <option value="0">Annual Leave</option>
                          <option value="1">Paternity Leave</option>
                          <option value="2">Maternity Leave</option>
                          <option value="3">Sick Leave</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-3">
                        <label
                          for="leaveBal"
                          class="control-label bold pt-1 float-right"
                        >Leave Balance:</label>
                      </div>
                      <div class="col-sm-6">
                        <input
                          type="text"
                          name="leaveBal"
                          id="leaveBal"
                          class="form-control input-sm disabled"
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-3">
                        <label
                          for="rangeFrom"
                          class="control-label bold pt-1 float-right"
                        >Date Range:</label>
                      </div>
                      <div class="col-sm-6">
                        <div class="row">
                          <div class="col-sm-6">
                            <input
                              name="rangeFrom"
                              type="date"
                              v-model="leaveData.fromRange"
                              id="rangeFrom"
                              required="required"
                              class="form-control input-sm"
                              style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                            />
                          </div>
                          <div class="col-sm-6">
                            <input
                              type="date"
                              value="rangeTo"
                              v-model="leaveData.toRange"
                              class="form-control input-sm"
                              style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-3">
                        <label for="duration" class="control-label bold pt-1 float-right">Duration:</label>
                      </div>
                      <div class="col-sm-6">
                        <div class="row">
                          <div class="col-sm-4 pr-0">
                            <input
                              type="text"
                              name="hours"
                              id="hours"
                              value="3"
                              required
                              disabled
                              class="form-control input-sm disabled"
                              style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                            />
                          </div>
                          <div class="col-sm-8 pl-0">
                            <input
                              value="Days"
                              disabled
                              class="form-control input-sm bold disabled"
                              style="border-top-left-radius: 0px; border-bottom-left-radius: 0px; border-left: 1px solid;"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-3">
                        <label for="comment" class="control-label bold pt-1 float-right">Comment:</label>
                      </div>
                      <div class="col-sm-6">
                        <textarea
                          id="comment"
                          v-model="leaveData.comment"
                          class="form-control"
                          style="height: 100px;"
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group row mt-3">
                      <div class="col-sm-3">
                        <label for="attachments" class="control-label bold pt-1 float-right"></label>
                      </div>
                      <div class="col-sm-6">
                        <span id class="bold">Attachments</span>
                        <input
                          type="file"
                          name="attachments"
                          id="attachments"
                          class="hidden"
                          ref="leaveAttach"
                          multiple
                          @change="handleUploadAttachments"
                        />
                        <div class="row">
                          <div class="col-sm-12">
                            <ul>
                              <li>{{ leaveData.attachments.length }} attachment(s)</li>
                            </ul>
                            <div class="pt-2">
                              <button
                                type="button"
                                class="btn btn-xs btn-outline-dark"
                                @click="$refs.leaveAttach.click()"
                              >
                                <i class="fa fa-file pr-1"></i> Attach Files
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row mt-3">
                      <div class="col-sm-3">
                        <label for="isStatus" class="control-label bold pt-1 float-right"></label>
                      </div>
                      <div class="col-sm-6">
                        <div class="float-left">
                          <button
                            type="submit"
                            class="btn btn-sm btn-primary"
                            :class="[creatingLeave ? 'disabled': '']"
                            :disabled="creatingLeave ? true: false"
                          >
                            <span v-if="creatingLeave">
                              <span class="pr-2">Processing</span>
                              <img src="../../../assets/loader/round-sm.svg" alt />
                            </span>
                            <span v-else>
                              SUBMIT
                              <i class="fa fa-send"></i>
                            </span>
                          </button>
                        </div>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      leaveData: {
        employeeId: "",
        leaveType: "",
        leaveBal: "",
        fromRange: "",
        toRange: "",
        duration: "",
        comment: "",
        attachments: []
      }
    };
  },

  computed: {
    ...mapState({
      employees: state => state.employees.employees,
      creatingLeave: state => state.leaves.creatingLeave
    })
  },

  mounted() {
    // employee name
    $("#empName")
      .select2({
        placeholder: "Select Employee",
        allowClear: true
      })
      .on("change", e => {
        const obj = $("#empName").select2("data");
        this.leaveData.employeeId = obj[0].id;
      });
    //leaveType
    $("#leaveType")
      .select2({
        placeholder: "Select Leave Type",
        allowClear: true
      })
      .on("change", e => {
        const obj = $("#leaveType").select2("data");
        this.leaveData.leaveType = obj[0].id;
      });
  },

  created() {
    // set payperiods
    document.title = "Epsotech :: Apply Leave";
    this.initiateCreated();
  },

  methods: {
    ...mapActions(["createLeave"]),
    initiateCreated() {
      //get employees
      this.$store.dispatch("fetchEmployees");
    },

    advancePayModal() {
      $(".advancePayMd").modal("show");
    },

    hideAdvancePayModal() {
      $(".advancePayMd").modal("hide");
    },

    viewSlipModal() {
      $(".viewSlipMd").modal("show");
    },

    hideViewSlipModal() {
      $(".viewSlipMd").modal("hide");
    },

    selEmployee() {},

    addLeaveForm() {
      this.createLeave(this.leaveData).then(() => {
        this.leaveData = {
          employeeId: "",
          leaveType: "",
          leaveBal: "",
          fromRange: "",
          toRange: "",
          duration: "",
          comment: "",
          attachments: []
        };
      });
    },

    handleUploadAttachments() {
      const leaveFiles = this.$refs.leaveAttach.files;
      for (let i = 0; i < leaveFiles.length; i++) {
        const f = leaveFiles[i];
        this.leaveData.attachments.push(f);
      }
    }
  }
};
</script>
