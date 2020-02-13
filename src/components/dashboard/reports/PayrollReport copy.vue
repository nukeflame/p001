<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h3 class="text-primary">Payroll Report</h3>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Payroll Report</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <!-- <div class="row">
        <div class="col-md-6">
          <button type="button" class="btn btn-sm btn-primary">
            <i class="fa fa-file-excel-o"></i> Export to Excel
          </button>
          <button @click.prevent="makePDF" type="button" class="btn btn-sm btn-warning ml-4">
            <i class="fa fa-file-pdf-o"></i> Export to PDF
          </button>
        </div>
      </div>-->
      <!-- <div class="row">
        <div class="col m-6">
          <p class="my-3">
            Date From:
            <input
              type="text"
              id="datepickerFrom"
              width="150"
              class="form-controll"
              style="height: 25px;"
            >
            Date to:
            <input
              type="text"
              id="datepickerTo"
              width="150"
              class="form-controll"
              style="height: 25px;"
            >
          </p>
        </div>
      </div>-->

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">
                <i class="ti-receipt"></i> Employees Payroll Report
              </h4>
              <div class="my-1">
                <vue-good-table
                  :columns="columns"
                  :rows="data"
                  :pagination-options="{enabled: true}"
                  :search-options="{ enabled: true , placeholder: 'Search reports...'}"
                >
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'date_to'">{{ endDate(props.row.created_at)}}</span>

                    <span
                      v-if="props.column.field == 'date_from'"
                    >{{ startDate(props.row.created_at)}}</span>

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
import moment from "moment";
import toastr from "toastr";

export default {
  data() {
    return {
      data: [],
      columns: [
        {
          label: "Reference",
          field: "payroll_no"
        },
        {
          label: "Employees",
          field: "user_name"
        },
        {
          label: "Payslip Name",
          field: "name"
        },
        {
          label: "Date From",
          field: "date_from"
        },
        {
          label: "Date to",
          field: "date_to"
        },
        {
          label: "Status",
          field: "status"
        }
      ]
    };
  }
};
