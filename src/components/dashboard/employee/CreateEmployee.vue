<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">Add Employee</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="breadcrumb-item active">Employee</li>
        </ol>
      </div>
    </div>
    <!-- Container fluid  -->
    <div class="container-fluid">
      <div class="homeLoader">
        <img v-if="loader" src="images/loader/spinner.gif" width="64" height="64" alt />
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="my-1">
                <h6 class>
                  <u>Personal Details</u>
                </h6>
                <div class="row">
                  <div class="col-sm-12">
                    <form @submit.prevent="addEmployee">
                      <div class="row">
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="surname" class="control-label bold">Surname</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="surname"
                              v-model="employeeData.surname"
                              id="surname"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="othernames" class="control-label bold">Other Names</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="othernames"
                              v-model="employeeData.otherNames"
                              id="othernames"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="gender" class="control-label bold">Gender</label>
                            <small class="mandatory">*</small>
                            <select
                              name="gender"
                              v-model="employeeData.gender"
                              id="gender"
                              class="form-control input-sm"
                            >
                              <option value="1" disabled>--Select--</option>
                              <option value="2">Male</option>
                              <option value="3">Female</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="dob" class="control-label bold">Date of Birth</label>
                            <small class="mandatory">*</small>
                            <input
                              type="date"
                              class="form-control input-sm"
                              name="dob"
                              v-model="employeeData.dob"
                              id="dob"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="idType" class="control-label bold">ID Type</label>
                            <small class="mandatory">*</small>
                            <select
                              id="idType"
                              v-model="employeeData.idType"
                              class="form-control input-sm valid"
                            >
                              <option value="1" disabled>--Select--</option>
                              <option value="2">National Identity Card</option>
                              <option value="3">Alien's Card</option>
                              <option value="5">Passport</option>
                              <option value="6">Millitary ID</option>
                              <option value="8">Birth Certificate</option>
                              <option value="7">Driving License</option>
                              <option value="9">Student ID</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="idNo" class="control-label bold">ID Number</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="idNo"
                              v-model="employeeData.idNo"
                              id="idNo"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="marital_status" class="control-label bold">Marital Status</label>
                            <small class="mandatory">*</small>
                            <select
                              id="marital_status"
                              v-model="employeeData.maritalStatus"
                              class="form-control input-sm valid"
                            >
                              <option value="1" disabled>--Select--</option>
                              <option value="2">Single</option>
                              <option value="3">Married</option>
                              <option value="4">Divorced</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="tel_1" class="control-label bold">Telephone 1</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="tel_1"
                              v-model="employeeData.tel1"
                              id="tel_1"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="tel_2" class="control-label bold">Telephone 2</label>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="tel_2"
                              v-model="employeeData.tel2"
                              id="tel_2"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="email" class="control-label bold">Email</label>
                            <input
                              type="email"
                              class="form-control input-sm"
                              v-model="employeeData.email"
                              name="email"
                              id="email"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="postal_adress" class="control-label bold">Postal Address</label>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="postal_adress"
                              v-model="employeeData.postalAdrress"
                              id="postal_adress"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="postal_code" class="control-label bold">Postal Code</label>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="postal_code"
                              v-model="employeeData.postalCode"
                              id="dob"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label
                              for="physical_address"
                              class="control-label bold"
                            >Physical Address</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="physical_address"
                              v-model="employeeData.physicalAddress"
                              id="physical_address"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="currentAdress" class="control-label bold">Current Residence</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="currentAdress"
                              v-model="employeeData.currentAddress"
                              id="currentAdress"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label
                              for="streetHouseNo"
                              class="control-label bold"
                            >Street And House No.</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="streetHouseNo"
                              v-model="employeeData.streetHouseNo"
                              id="streetHouseNo"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="townCity" class="control-label bold">Town/City</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="townCity"
                              v-model="employeeData.townCity"
                              id="townCity"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="nationality" class="control-label bold">Nationality</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="nationality"
                              v-model="employeeData.nationality"
                              id="nationality"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="department" class="control-label bold">Department</label>
                            <small class="mandatory">*</small>
                            <select
                              class="form-control input-sm error"
                              name="department"
                              v-model="employeeData.department"
                              id="department"
                            >
                              <option></option>
                              <option value="1">Administration</option>
                              <option value="2">General Outpatient</option>
                              <option value="3">Records</option>
                              <option value="4">Laboratory</option>
                              <option value="5">Accounts</option>
                              <option value="6">Radiology</option>
                              <option value="7">MCH (Maternal &amp; Child Health)</option>
                              <option value="8">Pharmacy</option>
                              <option value="9">Inpatient</option>
                              <option value="10">Theatre</option>
                              <option value="11">Stores</option>
                              <option value="17">ENT</option>
                              <option value="19">Morgue</option>
                              <option value="20">Nursing Station</option>
                              <option value="22">Cardiology</option>
                              <option value="23">Casualty</option>
                              <option value="24">Neurology</option>
                              <option value="25">Oncology</option>
                              <option value="27">reception</option>
                              <option value="28">Gynecology</option>
                              <option value="29">Dental</option>
                              <option value="30">Kitchen</option>
                              <option value="31">Renal</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="designation" class="control-label bold">Designation</label>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="designation"
                              v-model="employeeData.designation"
                              id="designation"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="dateEmployed" class="control-label bold">Date Employed</label>
                            <input
                              type="date"
                              class="form-control input-sm"
                              name="dateEmployed"
                              v-model="employeeData.dateEmployed"
                              id="dateEmployed"
                            />
                          </div>
                        </div>
                      </div>
                      <h6 class="my-2">
                        <u>Next Of Kin Details</u>
                      </h6>
                      <div class="row">
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="nextOfKin" class="control-label bold">Next Of Kin</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="nextOfKin"
                              v-model="employeeData.nextOfKin"
                              id="nextOfKin"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="relationship" class="control-label bold">Relationship</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="relationship"
                              v-model="employeeData.relationship"
                              id="relationship"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label
                              for="nextOfKinContacts"
                              class="control-label bold"
                            >Next Of Kin's Contact</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="nextOfKinContacts"
                              v-model="employeeData.nextOfKinContacts"
                              id="nextOfKinContacts"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="placeOfWork" class="control-label bold">Place of Work</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="placeOfWork"
                              v-model="employeeData.placeOfWork"
                              id="placeOfWork"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="occupation" class="control-label bold">Occupation</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="occupation"
                              v-model="employeeData.occupation"
                              id="occupation"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="nokIdType" class="control-label bold">ID Type</label>
                            <small class="mandatory">*</small>
                            <select
                              class="form-control input-sm valid"
                              name="nokIdType"
                              v-model="employeeData.nokIdType"
                              id="nokIdType"
                            >
                              <option value="1" disabled>--Select--</option>
                              <option value="2">National Identity Card</option>
                              <option value="3">Alien's Card</option>
                              <option value="5">Passport</option>
                              <option value="6">Millitary ID</option>
                              <option value="8">Birth Certificate</option>
                              <option value="7">Driving License</option>
                              <option value="9">Student ID</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="nokIdNo" class="control-label bold">ID Number</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="nokIdNo"
                              v-model="employeeData.nokIdNo"
                              id="nokIdNo"
                            />
                          </div>
                        </div>
                      </div>
                      <h6 class="my-2">
                        <u>Employment Details</u>
                      </h6>
                      <div class="row">
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="employmentType" class="control-label bold">Employment Type</label>
                            <small class="mandatory">*</small>
                            <select
                              class="form-control input-sm error"
                              id="employmentType"
                              name="employmentType"
                              v-model="employeeData.employmentType"
                            >
                              <option disabled>--Select--</option>
                              <option value="1">CASUAL</option>
                              <option value="2">CONTRACT</option>
                              <option value="3">PERMANENT</option>
                            </select>
                          </div>
                        </div>

                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="paymentMode" class="control-label bold">Payment Mode</label>
                            <small class="mandatory">*</small>
                            <select
                              id="paymentMode"
                              v-model="employeeData.paymentMode"
                              class="form-control input-sm"
                              @change="handlePaymentMode"
                            >
                              <option value="0" disabled>--Select--</option>
                              <option value="1">Bank Transfer</option>
                              <option value="2">Phone</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="bankName" class="control-label bold">Bank Name</label>
                            <select
                              class="form-control input-sm sel2"
                              id="bankName"
                              v-model="employeeData.bankName"
                              :disabled="paymentModeStatus ? true : false"
                            >
                              <option value="0"></option>
                              <option value="1">Default Bank Account</option>
                              <option value="2">Sidian</option>
                              <option value="3">KCB</option>
                              <option value="4">EQUITY BANK</option>
                              <option value="5">SBI Bank</option>
                              <option value="6">Equity Bank</option>
                              <option value="7">some bank</option>
                              <option value="8">Cooperative Bank</option>
                              <option value="88">standard chartered JAMU LTD</option>
                              <option value="136">DTB BANK</option>
                              <option value="221">National Bank</option>
                              <option value="229">Mwalimu Sacco</option>
                              <option value="246">jamii bora</option>
                              <option value="252">bree foundation</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="bankBranch" class="control-label bold">Bank Branch</label>
                            <select
                              class="form-control input-sm sel2"
                              id="bankBranch"
                              v-model="employeeData.bankBranch"
                              :disabled="paymentModeStatus ? true : false"
                            >
                              <option value="0"></option>
                              <option value="1">Default Bank Account</option>
                              <option value="2">Sidian</option>
                              <option value="3">KCB</option>
                              <option value="4">EQUITY BANK</option>
                              <option value="5">SBI Bank</option>
                              <option value="6">Equity Bank</option>
                              <option value="7">some bank</option>
                              <option value="8">Cooperative Bank</option>
                              <option value="88">standard chartered JAMU LTD</option>
                              <option value="136">DTB BANK</option>
                              <option value="221">National Bank</option>
                              <option value="229">Mwalimu Sacco</option>
                              <option value="246">jamii bora</option>
                              <option value="252">bree foundation</option>
                            </select>
                          </div>
                        </div>

                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="basicPay" class="control-label bold">Basic Pay</label>
                            <small class="mandatory">*</small>
                            <select
                              class="form-control input-sm error"
                              id="basicPay"
                              name="basicPay"
                              v-model="employeeData.basicPay"
                            >
                              <option disabled>--Select--</option>
                              <option value="1">Monthly</option>
                              <option value="2">Hourly</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="paymentNo" class="control-label bold">Payment No.</label>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="paymentNo"
                              id="paymentNo"
                              v-model="employeeData.paymentNo"
                              :disabled="paymentModeStatus ? false : true"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="bankAccNo" class="control-label bold">Bank Acccount No.</label>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="bankAccNo"
                              v-model="employeeData.bankAccNo"
                              id="bankAccNo"
                              :disabled="paymentModeStatus ? true : false"
                            />
                          </div>
                        </div>

                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="bankSortCode" class="control-label bold">Sort Code.</label>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="bankSortCode"
                              v-model="employeeData.bankSortCode"
                              id="nssfNo"
                              :disabled="paymentModeStatus ? true : false"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label for="offDays" class="control-label bold">Off Days</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="offDays"
                              id="offDays"
                              v-model="employeeData.offDays"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="linkToUser" class="control-label bold">Link to System User</label>
                            <small class="mandatory">*</small>
                            <select
                              class="form-control input-sm sel2"
                              name="linkToUser"
                              v-model="employeeData.linkToUser"
                              id="linkToUser"
                            >
                              <option value="0"></option>
                              <option value="1">User 1</option>
                              <option value="2">User 2</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="can_access_portal" class="control-label bold pb-3"></label>
                            <div class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="can_access"
                                v-model="employeeData.canAcess"
                              />
                              <label class="custom-control-label" for="can_access">Can Access Portal</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="nhifNo" class="control-label bold">NHIF No.</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="nhifNo"
                              id="nhifNo"
                              v-model="employeeData.nhifNo"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="kraPin" class="control-label bold">KRA PIN No.</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="kraPin"
                              id="kraPin"
                              v-model="employeeData.kraPin"
                            />
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="form-group">
                            <label for="nssfNo" class="control-label bold">NSSF No.</label>
                            <small class="mandatory">*</small>
                            <input
                              type="text"
                              class="form-control input-sm"
                              name="nssfNo"
                              v-model="employeeData.nssfNo"
                              id="nssfNo"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group mt-3">
                        <button class="btn btn-sm btn-primary float-right" type="submit">
                          <span v-if="processLoad">
                            <span class="pr-2 f-s-13">Processing</span>
                            <img src="../../../assets/loader/round-sm.svg" alt />
                          </span>
                          <span v-else>
                            <i class="ti-save pr-1"></i>Add Employee
                          </span>
                        </button>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      checkMode: false,
      loader: false,
      columns: [
        {
          label: "Employee No.",
          field: "employee_no"
        },
        {
          label: "Employee Name",
          field: "name"
        },
        {
          label: "ID No.",
          field: "id_no"
        },
        {
          label: "Days In",
          field: "days_in"
        },
        {
          label: "Time In",
          field: "time_in",
          type: "date"
        },
        {
          label: "Time Out",
          field: "time_out",
          type: "date"
        },
        {
          label: "Total Hours",
          field: "total_hours"
        }
      ],

      employeeData: {
        id: null,
        bankAccNo: null,
        bankSortCode: null,
        paymentNo: null,
        offDays: null,
        canAcess: null,
        currentAddress: null,
        dateEmployed: null,
        department: null,
        designation: null,
        dob: null,
        email: null,
        employmentType: null,
        gender: null,
        idNo: null,
        idType: null,
        kraPin: null,
        maritalStatus: null,
        nationality: null,
        nextOfKin: null,
        nextOfKinContacts: null,
        nhifNo: null,
        nokIdNo: null,
        nokIdType: null,
        nssfNo: null,
        occupation: null,
        otherNames: null,
        basicPay: 1,
        payrollNo: null,
        physicalAddress: null,
        placeOfWork: null,
        postalAdrress: null,
        postalCode: null,
        relationship: null,
        streetHouseNo: null,
        surname: null,
        tel1: null,
        tel2: null,
        townCity: null,
        bankName: null,
        paymentMode: 1,
        linkToUser: null
      },
      paymentModeStatus: false
    };
  },

  mounted() {
    // $(".sel2").select2({
    //   placeholder: "--Select--",
    //   allowClear: true
    // });

    // paymentMode
    // $("#paymentMode")
    //   .select2()
    //   .on("change", e => {
    //     const obj = $("#paymentMode").select2("data");
    //     this.employeeData.paymentMode = obj[0].id;
    //   });
    // link to user
    $("#linkToUser")
      .select2()
      .on("change", e => {
        const obj = $("#linkToUser").select2("data");
        this.employeeData.linkToUser = obj[0].id;
      });
    //bank name
    $("#bankName")
      .select2()
      .on("change", e => {
        const obj = $("#bankName").select2("data");
        this.employeeData.bankName = obj[0].id;
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
    document.title = "Epsotech :: Employees";
    this.initializeCreated();
  },
  methods: {
    ...mapActions(["createEmployee"]),
    initializeCreated() {
      this.$store.dispatch("fetchAttendance");
    },

    handleSelect2(e) {
      console.log("e");
    },

    addEmployee() {
      console.log(this.employeeData);

      // this.createEmployee(this.employeeData);
    },

    handlePaymentMode(e) {
      const val = e.target.value;
      if (val == 1) {
        this.paymentModeStatus = false;
      } else {
        this.paymentModeStatus = true;
      }
    }
  }
};
</script>

