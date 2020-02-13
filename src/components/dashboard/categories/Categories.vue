<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Categories</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Categories</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="row pb-2">
              <div class="col-sm-3">
                <h6 class="bold">
                  <u>Payroll Parameter Categories</u>
                </h6>
              </div>
            </div>
            <div class="row pb-2">
              <div class="col-sm-12">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click.prevent="addCategory"
                  >
                    <span v-if="creatingCategory">
                      Processing
                      <img src="../../../assets/loader/round-sm.svg" class="pl-2" alt />
                    </span>
                    <span v-else>
                      <i class="fa fa-plus pr-1"></i>
                      Add Category
                    </span>
                  </button>
                  <!-- <button
                    type="button"
                    :class="[selectedRows && selectedRows.length === 1 ? '' : 'disabled', 'btn btn-info btn-sm']"
                    :disabled="selectedRows && selectedRows.length  === 1 ? false : true"
                    @click.prevent="handlePayrollPar"
                  >
                    <i class="ti-receipt pr-1"></i>Update Payrol Parameter
                  </button>-->
                  <button
                    type="button"
                    :class="[selectedRows && selectedRows.length > 0? '' : 'disabled', 'btn btn-danger btn-sm']"
                    :disabled="selectedRows && selectedRows.length > 0 ? false : true"
                  >
                    <i class="fa fa-trash pr-1"></i>Delete
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="categories"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: 'Search ...'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <!-- check details -->
                    <span v-if="props.column.field == 'check'">
                      <span v-if="testToday(props.row)">
                        <button
                          class="btn btn-sm btn-primary mr-2"
                          @click.once="checkIn(props.row.id)"
                        >
                          <i class="fa fa-sign-in"></i> Check In
                        </button>
                      </span>
                      <span v-else>
                        <span v-for="item in props.row.attendance" :key="item.id">
                          <button
                            v-if="!item.time_out"
                            class="btn btn-sm btn-outline-danger"
                            @click.once="checkOut(props.row.attendance)"
                          >
                            <i class="fa fa-sign-out"></i> Check Out
                          </button>
                        </span>
                      </span>
                    </span>
                    <!-- time in -->
                    <span
                      v-else-if="props.column.field == 'time_in'"
                      :title="titleDate(props.row)"
                    >{{ timeInToday(props.row) }}</span>
                    <!-- time out -->
                    <span
                      v-else-if="props.column.field == 'time_out'"
                      :title="titleDateOut(props.row)"
                    >{{ timeOutToday((props.row) )}}</span>
                    <!-- time out -->
                    <span v-else-if="props.column.field == 'total_hours'">
                      <span class="float-right">{{ todayHours(props.row)}}</span>
                    </span>
                    <!-- status -->
                    <span v-else-if="props.column.field == 'status'">In Time / On Time</span>
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
import { mapState, mapMutations, mapActions } from "vuex";
import moment from "moment-timezone";

export default {
  data() {
    return {
      categories: [],
      selectedRows: [],
      loadingCategory: false,
      creatingCategory: false,
      columns: [
        {
          label: "No.",
          field: "employee_no"
        },
        {
          label: "Name",
          field: "name"
        },
        {
          label: "Type",
          field: "id_no"
        },
        {
          label: "Expense Account",
          field: "id_no"
        },
        {
          label: "Expense Sub-Account",
          field: "id_no"
        },
        {
          label: "Liability Account",
          field: "total_hours"
        },
        {
          label: "Liability Sub-Account",
          field: "total_hours"
        }
      ]
    };
  },

  mounted() {
    $(".sel2").select2({
      placeholder: "--Select--",
      allowClear: true
    });
  },

  computed: {
    ...mapState({
      attendance: state => state.attendance.attendance,
      processLoad: state => state.employees.processLoad
    })
  },

  created() {
    // set title
    document.title = "Epsotech :: Categories";
    this.initializeCreated();
  },

  methods: {
    ...mapActions(["createEmployee"]),
    initializeCreated() {
      this.$store.dispatch("fetchAttendance");
    }
  }
};
</script>

