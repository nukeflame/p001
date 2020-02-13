<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Payslips</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>

          <li class="breadcrumb-item active">Payslips</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="my-1">
                <div class="row">
                  <div class="col-sm-8">
                    <div class="row pb-2">
                      <div class="col-sm-12">
                        <h6 class="bold">
                          <u>Payrol Periods</u>
                          <small class="pl-1">(Select pay period to view payslips)</small>
                        </h6>
                      </div>
                    </div>
                    <vue-good-table
                      :columns="periodsCol"
                      :rows="periods"
                      max-height="230px"
                      :pagination-options="{enabled: false}"
                      @on-row-click="periodRowClicked"
                    >
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'actions'">
                          <div>
                            <router-link
                              to="/site/reports/payroll-reports"
                              style="color:var(--blue)"
                            >[View Report]</router-link>
                          </div>
                        </span>
                        <span
                          v-else-if="props.column.field == 'begining_date'"
                        >{{ monthFormat(props.row.beginingDate) }}</span>
                        <span
                          v-else-if="props.column.field == 'ending_date'"
                        >{{ monthFormat(props.row.endingDate) }}</span>
                        <span v-else-if="props.column.field == 'pay_month'">
                          <span v-for="m in months" :key="m.id">
                            <span v-if="props.row.payMonth == m.id">{{ m.name }}</span>
                          </span>
                        </span>
                        <span v-else>{{props.formattedRow[props.column.field]}}</span>
                      </template>
                    </vue-good-table>
                  </div>
                  <div class="col-sm-4">
                    <div class="row pb-2">
                      <div class="col-sm-12">
                        <h6 class="bold">
                          <u>Employee Details</u>
                        </h6>
                      </div>
                    </div>
                    <div class="my-2">
                      <div class="row">
                        <div class="col-sm-4">
                          <label class="bold" for="txtSurname">Surname:</label>
                        </div>
                        <div class="col-sm-8">
                          <span v-if="selStaff !== null">
                            <span class="text-info" id="txtSurname">{{ selStaff.surname }}</span>
                          </span>
                          <span v-else>
                            <span class="text-info" id="txtSurname">---</span>
                          </span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-4">
                          <label class="bold" for="txtOthernames">OtherNames:</label>
                        </div>
                        <div class="col-sm-8">
                          <span v-if="selStaff !== null">
                            <span class="text-info" id="txtOthernames">{{ selStaff.otherNames }}</span>
                          </span>
                          <span v-else>
                            <span class="text-info" id="txtOthernames">---</span>
                          </span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-4">
                          <label class="bold" for="txtStaffNo">Staff No:</label>
                        </div>
                        <div class="col-sm-8">
                          <span v-if="selStaff !== null">
                            <span class="text-info" id="txtStaffNo">{{ selStaff.staffNo }}</span>
                          </span>
                          <span v-else>
                            <span class="text-info" id="txtStaffNo">---</span>
                          </span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-4">
                          <label class="bold" for="txtPayslipNo">Payslip No:</label>
                        </div>
                        <div class="col-sm-8">
                          <span v-if="selStaff !== null">
                            <span class="text-info" id="txtPayslipNo">{{ selStaff.payslipNo }}</span>
                          </span>
                          <span v-else>
                            <span class="text-info" id="txtPayslipNo">---</span>
                          </span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-4">
                          <label class="bold" for="txtPayPeriod">Pay Period:</label>
                        </div>
                        <div class="col-sm-8">
                          <span v-if="selStaff !== null">
                            <span
                              class="text-info"
                              id="txtPayPeriod"
                            >{{ monthOnlyFormat(selStaff.periodDate) }}</span>
                          </span>
                          <span v-else>
                            <span class="text-info" id="txtPayPeriod">---</span>
                          </span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-4">
                          <label class="bold" for="txtStatus">Status:</label>
                        </div>
                        <div class="col-sm-8">
                          <span v-if="selStaff !== null">
                            <span class="text-info" id="txtStatus">
                              <!-- <span class="label label-success f-s-10 bold" style="padding: 2px 6px;">Active</span> -->
                              <span
                                v-if="selStaff.status == 2"
                                class="label label-success f-s-11 bold"
                                style="padding: 2px 6px;"
                              >Active</span>
                              <span
                                v-else-if="selStaff.status == 1"
                                class="label label-warning f-s-11 bold"
                                style="padding: 2px 6px;"
                              >Pending</span>
                              <span
                                v-else
                                class="label label-danger f-s-11 bold"
                                style="padding: 2px 6px;"
                              >Declined</span>
                            </span>
                          </span>
                          <span v-else>
                            <span class="text-info" id="txtStatus">---</span>
                          </span>
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-sm-4">
                          <button
                            type="button"
                            class="btn btn-sm btn-primary"
                            :class="[selStaff === null ? 'disabled' : '']"
                            :disabled="selStaff !== null ? false : true"
                            @click="handleViewPayslip"
                          >
                            <i class="ti-receipt pr-1"></i>View Payslip
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="row pb-2">
                      <div class="col-sm-12">
                        <h6 class="pt-1 bold">
                          Payslips For Period:
                          <span class="pl-1 text-info">{{ periodId }}</span>
                        </h6>
                      </div>
                    </div>
                    <div class="row pb-3">
                      <div class="col-sm-12">
                        <div class="float-left">
                          <div class="btn-group mr-2">
                            <button
                              type="button"
                              class="btn btn-danger btn-sm"
                              :class="[selectedRows.length > 0 ? ' ' : 'disabled']"
                              :disabled=" selectedRows.length > 0 ? false : true"
                              @click="deleteAbsentModal"
                            >
                              <i class="fa fa-trash pr-1"></i>Delete
                            </button>
                            <div class="btn-group">
                              <button
                                type="button"
                                data-toggle="dropdown"
                                aria-expanded="false"
                                class="btn btn-info dropdown-toggle btn-sm"
                                :class="[selectedRows.length > 0 ? ' ' : 'disabled']"
                                :disabled=" selectedRows.length > 0 ? false : true"
                              >
                                <i class="fa fa-thumbs-up pr-1"></i>Approval
                                <span class="caret"></span>
                              </button>
                              <ul
                                class="dropdown-menu"
                                role="menu"
                                x-placement="bottom-start"
                                style="position: absolute; transform: translate3d(0px, 40px, 0px); top: 0px; left: 0px; will-change: transform;"
                              >
                                <li class="p-1">
                                  <a href="#" class="color-primary" @click.prevent="approvePayslip">
                                    <i class="fa fa-check pr-1"></i>Approve
                                  </a>
                                </li>
                                <li class="p-1">
                                  <a href="#" class="color-primary">
                                    <i class="fa fa-ban pr-1"></i>Disapprove
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <router-link
                            to="/site/payment/process-payroll"
                            class="btn btn-sm btn-dark"
                          >
                            Proceess Payrol
                            <i class="fa fa-plus"></i>
                          </router-link>
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
                    <vue-good-table
                      :columns="payslipCol"
                      :rows="staffPeriod"
                      :pagination-options="{enabled: true}"
                      :search-options="{ enabled: true , placeholder: ''}"
                      id="payslip-tbl"
                      @on-selected-rows-change="selEmployee"
                      @on-row-click="staffRowClicked"
                      :select-options="{ enabled: true, selectOnCheckboxOnly: false, selectionInfoClass: 'hidden'}"
                    >
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'deductions'">
                          <span>{{ getFormatMoney(props.row.totalDeductions) }}</span>
                        </span>
                        <span v-else-if="props.column.field == 'gross'">
                          <span>{{ getFormatMoney(props.row.grossSalaray) }}</span>
                        </span>
                        <span v-else-if="props.column.field == 'netSalary'">
                          <span>{{ getFormatMoney(props.row.netSalary) }}</span>
                        </span>
                        <span v-else-if="props.column.field == 'basicPay'">
                          <span>{{ getFormatMoney(props.row.basicSalary) }}</span>
                        </span>
                        <span v-else-if="props.column.field == 'isStatus'">
                          <span
                            v-if="props.row.status == 2"
                            class="label label-success f-s-11 bold"
                            style="padding: 2px 6px;"
                          >Active</span>
                          <span
                            v-else-if="props.row.status == 1"
                            class="label label-warning f-s-10 bold"
                            style="padding: 2px 6px;"
                          >Pending</span>
                          <span
                            v-else
                            class="label label-danger f-s-10 bold"
                            style="padding: 2px 6px;"
                          >Declined</span>
                        </span>

                        <span v-else>{{props.formattedRow[props.column.field]}}</span>
                      </template>
                    </vue-good-table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- view payslip modal-->
          <div
            class="modal animated modal_stretch fadeIn viewPayslipMd"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header pd-header">
                  <h2 class="modal-title text-center f-s-15">Payslip Info</h2>
                </div>
                <div class="modal-body">
                  {{this.payslipData}}
                  <div class="modal-fluid">
                    <a name="PageN1" style="padding:0;margin:0;font-size:1px"></a>
                    <div
                      class="frpage"
                      style="position:relative;width:305.4px;height:820.2px;;background-color:White"
                    >
                      <div class="s0" style="left:0;top:0;width:302.4px;height:226.8px">&nbsp;</div>
                      <div class="s2" style="left:0;top:0;width:302.4px;height:18.9px">
                        <div style="color: #000" class="s1">Payslip</div>
                      </div>
                      <div class="s3" style="left:0;top:28.35px;width:66.15px;height:56.7px">&nbsp;</div>
                      <div class="s3 s4" style="left:0;top:28.35px;width:66.15px;height:56.7px">
                        <img
                          src="http://localhost:8000/img/logo/brand_logo.svg"
                          width="66.15"
                          height="56.7"
                          alt
                        />
                      </div>
                      <div class="s6" style="left:75.6px;top:66.15px;width:226.8px;height:18.9px">
                        <div class="s5">{{ payslipData.tel1 }}</div>
                      </div>
                      <div class="s6" style="left:75.6px;top:28.35px;width:226.8px;height:18.9px">
                        <div class="s5">Main Branch</div>
                      </div>
                      <!-- <div class="s8" style="left:-9450px;top:-9450px;width:699.3px;height:18.9px">
                        <div class="s7">General Examinations</div>
                      </div>-->

                      <div class="s12" style="left:0;top:132.3px;width:113.4px;height:18.9px">
                        <div class="s11">Name:</div>
                      </div>
                      <div class="s12" style="left:0;top:151.2px;width:113.4px;height:18.9px">
                        <div class="s11">Department:</div>
                      </div>
                      <div class="s12" style="left:0;top:170.1px;width:113.4px;height:18.9px">
                        <div class="s11">Designation:</div>
                      </div>
                      <div class="s12" style="left:0;top:189px;width:113.4px;height:18.9px">
                        <div class="s11">Payslip No:</div>
                      </div>
                      <div class="s12" style="left:0;top:207.9px;width:113.4px;height:18.9px">
                        <div class="s11">Pay Period:</div>
                      </div>
                      <div
                        class="s13"
                        style="left:113.4px;top:132.3px;width:179.55px;height:18.9px"
                      >
                        <div class="s9">{{ payslipData.name }}</div>
                      </div>
                      <div
                        class="s13"
                        style="left:113.4px;top:170.1px;width:179.55px;height:18.9px"
                      >
                        <div class="s9">{{ payslipData.designation }}</div>
                      </div>
                      <div
                        class="s13"
                        style="left:113.4px;top:151.2px;width:179.55px;height:18.9px"
                      >
                        <div class="s9">{{ payslipData.department }}</div>
                      </div>
                      <div class="s13" style="left:113.4px;top:189px;width:179.55px;height:18.9px">
                        <div class="s9">{{ payslipData.slipNo }}</div>
                      </div>
                      <div
                        class="s13"
                        style="left:113.4px;top:207.9px;width:179.55px;height:18.9px"
                      >
                        <div class="s9">{{ payslipData.payPeriod }}</div>
                      </div>
                      <div class="s14" style="left:0;top:226.8px;width:302.4px;height:18.9px">&nbsp;</div>
                      <div class="s12" style="left:0;top:226.8px;width:113.4px;height:18.9px">
                        <div class="s11">NHIF No</div>
                      </div>
                      <div
                        class="s13"
                        style="left:113.4px;top:226.8px;width:179.55px;height:18.9px"
                      >
                        <div class="s9">{{ payslipData.nhifNo }}</div>
                      </div>
                      <div
                        class="s15"
                        style="left:0;top:245.7px;width:302.4px;height:66.15px"
                      >&nbsp;</div>
                      <div class="s12" style="left:0;top:283.5px;width:113.4px;height:18.9px">
                        <div class="s11">Earnings</div>
                      </div>
                      <div
                        class="s14"
                        style="left:0;top:311.85px;width:302.4px;height:18.9px"
                      >&nbsp;</div>
                      <div class="s17" style="left:9.45px;top:311.85px;width:151.2px;height:18.9px">
                        <div class="s16">Basic Pay</div>
                      </div>
                      <div
                        class="s18"
                        style="left:170.1px;top:311.85px;width:113.4px;height:18.9px"
                      >
                        <div class="s11">{{ payslipData.basicSalary }}</div>
                      </div>
                      <div
                        class="s19"
                        style="left:0;top:330.75px;width:302.4px;height:37.8px"
                      >&nbsp;</div>
                      <div class="s12" style="left:18.9px;top:330.75px;width:113.4px;height:18.9px">
                        <div class="s11">Gross Earnings</div>
                      </div>
                      <div
                        class="s20"
                        style="left:170.1px;top:330.75px;width:113.4px;height:18.9px"
                      >
                        <div class="s11">{{ payslipData.grossSalary }}</div>
                      </div>
                      <div
                        class="s21 s22"
                        style="left:170.1px;top:349.65px;width:113.4px;height:1px"
                      >&nbsp;</div>
                      <div
                        class="s21 s22"
                        style="left:170.1px;top:330.75px;width:113.4px;height:1px"
                      >&nbsp;</div>
                      <div
                        class="s23"
                        style="left:0;top:368.55px;width:302.4px;height:28.35px"
                      >&nbsp;</div>
                      <div class="s25" style="left:0;top:368.55px;width:132.3px;height:18.9px">
                        <div class="s24">Pre-Tax Deductions</div>
                      </div>
                      <div class="s14" style="left:0;top:396.9px;width:302.4px;height:18.9px">&nbsp;</div>
                      <div class="s17" style="left:9.45px;top:396.9px;width:151.2px;height:18.9px">
                        <div class="s16">NSSF</div>
                      </div>
                      <div class="s18" style="left:170.1px;top:396.9px;width:113.4px;height:18.9px">
                        <div class="s11">{{ payslipData.nssfPay }}</div>
                      </div>
                      <div class="s19" style="left:0;top:415.8px;width:302.4px;height:37.8px">&nbsp;</div>
                      <div class="s20" style="left:170.1px;top:415.8px;width:113.4px;height:18.9px">
                        <div class="s11">{{ payslipData.taxablePay }}</div>
                      </div>
                      <div class="s12" style="left:18.9px;top:415.8px;width:113.4px;height:18.9px">
                        <div class="s11">Taxable Pay</div>
                      </div>
                      <div
                        class="s21 s22"
                        style="left:170.1px;top:434.7px;width:113.4px;height:1px"
                      >&nbsp;</div>
                      <div
                        class="s21 s22"
                        style="left:170.1px;top:415.8px;width:113.4px;height:1px"
                      >&nbsp;</div>
                      <div class="s19" style="left:0;top:453.6px;width:302.4px;height:37.8px">&nbsp;</div>
                      <div class="s12" style="left:9.45px;top:453.6px;width:113.4px;height:18.9px">
                        <div class="s11">Tax Chargeable</div>
                      </div>
                      <div class="s20" style="left:170.1px;top:453.6px;width:113.4px;height:18.9px">
                        <div class="s11">{{ payslipData.taxablePay }}</div>
                      </div>
                      <div
                        class="s21 s22"
                        style="left:170.1px;top:472.5px;width:113.4px;height:1px"
                      >&nbsp;</div>
                      <div
                        class="s21 s22"
                        style="left:170.1px;top:453.6px;width:113.4px;height:1px"
                      >&nbsp;</div>
                      <div
                        class="s23"
                        style="left:0;top:491.4px;width:302.4px;height:28.35px"
                      >&nbsp;</div>
                      <div class="s25" style="left:0;top:491.4px;width:132.3px;height:18.9px">
                        <div class="s24">Tax Relief</div>
                      </div>
                      <div
                        class="s14"
                        style="left:0;top:519.75px;width:302.4px;height:18.9px"
                      >&nbsp;</div>
                      <div class="s17" style="left:9.45px;top:519.75px;width:151.2px;height:18.9px">
                        <div class="s16">Personal Relief</div>
                      </div>
                      <div
                        class="s18"
                        style="left:170.1px;top:519.75px;width:113.4px;height:18.9px"
                      >
                        <div class="s11">1,408.00</div>
                      </div>
                      <div
                        class="s19"
                        style="left:0;top:538.65px;width:302.4px;height:37.8px"
                      >&nbsp;</div>
                      <div class="s12" style="left:18.9px;top:538.65px;width:113.4px;height:18.9px">
                        <div class="s11">PAYE</div>
                      </div>
                      <div
                        class="s20"
                        style="left:170.1px;top:538.65px;width:113.4px;height:18.9px"
                      >
                        <div class="s11">4,739.40</div>
                      </div>
                      <div
                        class="s21 s22"
                        style="left:170.1px;top:557.55px;width:113.4px;height:1px"
                      >&nbsp;</div>
                      <div
                        class="s21 s22"
                        style="left:170.1px;top:538.65px;width:113.4px;height:1px"
                      >&nbsp;</div>
                      <div
                        class="s23"
                        style="left:0;top:576.45px;width:302.4px;height:28.35px"
                      >&nbsp;</div>
                      <div class="s25" style="left:0;top:576.45px;width:132.3px;height:18.9px">
                        <div class="s24">Post-Tax Deductions</div>
                      </div>
                      <div class="s14" style="left:0;top:604.8px;width:302.4px;height:18.9px">&nbsp;</div>
                      <div class="s17" style="left:9.45px;top:604.8px;width:151.2px;height:18.9px">
                        <div class="s16">NHIF</div>
                      </div>
                      <div class="s18" style="left:170.1px;top:604.8px;width:113.4px;height:18.9px">
                        <div class="s11">900.00</div>
                      </div>
                      <div class="s14" style="left:0;top:623.7px;width:302.4px;height:18.9px">&nbsp;</div>
                      <div class="s17" style="left:9.45px;top:623.7px;width:151.2px;height:18.9px">
                        <div class="s16">RBA</div>
                      </div>
                      <div class="s18" style="left:170.1px;top:623.7px;width:113.4px;height:18.9px">
                        <div class="s11">0.00</div>
                      </div>
                      <div class="s14" style="left:0;top:642.6px;width:302.4px;height:18.9px">&nbsp;</div>
                      <div class="s17" style="left:9.45px;top:642.6px;width:151.2px;height:18.9px">
                        <div class="s16">Advance</div>
                      </div>
                      <div class="s18" style="left:170.1px;top:642.6px;width:113.4px;height:18.9px">
                        <div class="s11">4,000.00</div>
                      </div>
                      <div
                        class="s26"
                        style="left:0;top:661.5px;width:302.4px;height:85.05px"
                      >&nbsp;</div>
                      <div class="s27" style="left:28.35px;top:699.3px;width:132.3px;height:18.9px">
                        <div class="s24">Net Pay:</div>
                      </div>
                      <div class="s28" style="left:170.1px;top:699.3px;width:113.4px;height:18.9px">
                        <div class="s11">29,280.60</div>
                      </div>
                      <div
                        class="s21 s22"
                        style="left:170.1px;top:718.2px;width:113.4px;height:1px"
                      >&nbsp;</div>
                      <div
                        class="s21 s22"
                        style="left:170.1px;top:720.65px;width:113.4px;height:1px"
                      >&nbsp;</div>
                      <div
                        class="s21 s22"
                        style="left:170.1px;top:699.3px;width:113.4px;height:1px"
                      >&nbsp;</div>
                      <div
                        class="s19"
                        style="left:0;top:746.55px;width:302.4px;height:37.8px"
                      >&nbsp;</div>
                      <div class="s29" style="left:0;top:756px;width:179.55px;height:18.9px">
                        <div class="s9">Leaves:</div>
                      </div>
                      <div
                        class="s30 s31"
                        style="left:0;top:774.9px;width:302.4px;height:1px"
                      >&nbsp;</div>
                      <div
                        class="s14"
                        style="left:0;top:784.35px;width:302.4px;height:18.9px"
                      >&nbsp;</div>
                      <div
                        class="s23"
                        style="left:0;top:784.35px;width:302.4px;height:28.35px"
                      >&nbsp;</div>
                      <div class="s33" style="left:0;top:793.8px;width:302.4px;height:18.9px">
                        <div class="s32">Payroll By Epsotech Solutions</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer pd-footer">
                  <div class="float-right">
                    <button
                      @click.prevent="hideViewPayslip"
                      class="btn btn-sm btn-info-outline mr-2"
                    >CANCEL</button>
                    <button type="submit" class="btn btn-sm btn-info">
                      PRINT
                      <i class="fa fa-print"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- confim btn modal-->
          <div
            class="modal animated fadeIn confirmApprove"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
          >
            <div class="modal-dialog modal-sm" style="top: 10%;">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 v-if="approveStatus" class="modal-title text-center f-s-15">
                    Proceed Approve ({{ selectedRows.length }})
                    <span
                      v-if="selectedRows.length > 0"
                    >selected payslips?</span>
                    <span v-else>selected payslip?</span>
                  </h4>
                  <h4
                    v-else
                    class="modal-title text-center f-s-17"
                  >Are you sure you want to Disapprove Payroll data?</h4>
                </div>
                <div class="modal-body pd-modal">
                  <div class="modal-fluid">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="float-right">
                          <button
                            class="btn btn-sm btn-outline-secondary mr-2"
                            @click="hidePayslipMd"
                          >CANCEL</button>
                          <button class="btn btn-sm btn-info" @click="proceedApprove">APPROVE</button>
                        </div>
                      </div>
                    </div>
                  </div>
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
import moment from "moment";
import { formatMoney } from "../../../mixins/helpers";

export default {
  data() {
    return {
      payslipCol: [
        {
          label: "Surname",
          field: "surname"
        },
        {
          label: "Other Names",
          field: "otherNames"
        },
        {
          label: "Department",
          field: "department"
        },
        {
          label: "Basic Pay",
          field: "basicPay"
        },
        {
          label: "Gross Earning",
          field: "gross"
        },
        {
          label: "Total Deductions",
          field: "deductions"
        },
        {
          label: "Net Pay",
          field: "netSalary"
        },
        {
          label: "Status",
          field: "isStatus"
        }
      ],
      periodsCol: [
        {
          label: "No",
          field: "id",
          width: "40px"
        },
        {
          label: "Begining Date",
          field: "begining_date"
        },
        {
          label: "Ending Date",
          field: "ending_date"
        },
        {
          label: "Pay Year",
          field: "payYear"
        },
        {
          label: "Pay Month",
          field: "pay_month"
        },
        {
          label: "",
          field: "actions",
          width: "90px"
        }
      ],
      months: [
        { id: 1, name: "January" },
        { id: 2, name: "February" },
        { id: 3, name: "March" },
        { id: 4, name: "April" },
        { id: 5, name: "May" },
        { id: 6, name: "June" },
        { id: 7, name: "July" },
        { id: 8, name: "August" },
        { id: 9, name: "September" },
        { id: 10, name: "October" },
        { id: 11, name: "November" },
        { id: 12, name: "December" }
      ],
      approveStatus: true,
      periodId: null,
      selStaff: null,
      selectedRows: [],
      payslipData: {
        tel1: "",
        name: "",
        designation: "",
        department: "",
        slipNo: "",
        payPeriod: "",
        nhifNo: "",
        basicSalary: "",
        grossSalary: "",
        nssfPay: "",
        taxablePay: "",
        taxBeforeRelief: ""
      }
    };
  },

  computed: {
    ...mapState({
      periods: state => state.periods.periods,
      staffPeriod: state => state.payroll.staffPeriod
    })
  },

  created() {
    // set title
    document.title = "Epsotech :: Payslips";
    //get periods
    this.$store.dispatch("fetchPeriods");
  },

  methods: {
    ...mapActions(["addTaxes", "findStaffPeriod"]),

    periodRowClicked(item) {
      this.selStaff = null;
      const Id = item.row.id;
      this.periodId = Id;
      this.findStaffPeriod(Id);
    },

    deleteAbsentModal() {},

    staffRowClicked(item) {
      this.selStaff = item.row;
    },

    submitTaxes() {
      this.addTaxes(this.taxesData).then(() => {
        this.taxesData = {};
      });
    },

    selEmployee(row) {
      this.selectedRows = row.selectedRows;
    },

    handleViewPayslip() {
      const selStaff = this.selStaff;
      if (selStaff !== null) {
        this.payslipData = {
          tel1: selStaff.tel1,
          name: selStaff.otherNames + " " + selStaff.surname,
          designation: selStaff.designation,
          department: selStaff.department,
          slipNo: selStaff.payslipNo,
          payPeriod: moment(selStaff.periodDate).format("MMMM, YYYY"),
          nhifNo: selStaff.nhifNo,
          basicSalary: formatMoney(selStaff.basicSalary),
          grossSalary: formatMoney(selStaff.grossSalaray),
          taxablePay: formatMoney(selStaff.taxablePay),
          nssfPay: selStaff.nssfPay,
          taxBeforeRelief: formatMoney(selStaff.taxBeforeRelief)
        };

        $(".viewPayslipMd").modal("show");
      }
    },

    hideViewPayslip() {
      $(".viewPayslipMd").modal("hide");
    },

    monthFormat(date) {
      return moment(date).format("MMMM D, YYYY");
    },

    monthOnlyFormat(date) {
      return moment(date).format("MMMM, YYYY");
    },

    approvePayslip() {
      this.approveStatus = true;
      $(".confirmApprove").modal("show");
    },

    hidePayslipMd() {
      this.approveStatus = false;
      $(".confirmApprove").modal("hide");
    },

    disapprovePayslip() {
      this.approveStatus = false;
      $(".confirmApprove").modal("show");
    },

    proceedApprove() {
      $(".confirmApprove").modal("hide");
    },

    getFormatMoney(data) {
      return formatMoney(data);
    }
  }
};
</script>

 <style>
.s4 {
  /* background: url("http://localhost:8000/img/logo/brand_logo.svg") no-repeat !important; */
  -webkit-print-color-adjust: exact;
}

.s22 {
  /* background: url("http://localhost:8000/img/logo/brand_logo.svg") no-repeat !important; */
  -webkit-print-color-adjust: exact;
}

.s31 {
  /* background: url("http://localhost:8000/img/logo/brand_logo.svg") no-repeat !important; */
  -webkit-print-color-adjust: exact;
}
.statutory-ded,
.total-statutory-ded {
  background-color: #fc6 !important;
  border-right: 1px solid #f63 !important;
}
</style>