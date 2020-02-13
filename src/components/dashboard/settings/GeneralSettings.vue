<template>
  <div>
    <!-- Bread crumb -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h5 class="text-primary">General Settings</h5>
      </div>
      <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">Settings</li>
          <li class="breadcrumb-item active">General Settings</li>
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
                  <u>General Settings</u>
                </h6>
              </div>
            </div>
            <div class="card-body">
              <div class="my-1">
                <div class="row">
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="name" class="control-label bold">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        v-model="settingsData.name"
                        class="form-control input-sm"
                        :disabled="settingsData.clientCode ? true : false"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="reg_no" class="control-label bold">Registration Number</label>
                      <input
                        type="text"
                        name="reg_no"
                        id="reg_no"
                        v-model="settingsData.regNo"
                        class="form-control input-sm"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="vat_no" class="control-label bold">VAT Number</label>
                      <input
                        type="text"
                        name="vat_no"
                        id="vat_no"
                        v-model="settingsData.vatNo"
                        class="form-control input-sm"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group mt-4">
                      <button class="btn btn-sm btn-outline-info" @click="$refs.imgLogo.click()">
                        Upload logo
                        <i class="fa fa-upload"></i>
                      </button>
                      <input type="file" class="hidden" ref="imgLogo" @change="handleLogoUpload" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="website" class="control-label bold">Website</label>
                      <input
                        type="text"
                        name="website"
                        id="website"
                        v-model="settingsData.website"
                        class="form-control input-sm"
                      />
                    </div>
                    <div class="form-group mt-4">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-primary"
                        @click.prevent="handleUpdateSettings"
                        :disabled="upadatingSettings ? true: false"
                      >
                        <span v-if="upadatingSettings">
                          <span class="pr-2">Updating</span>
                          <img src="../../../assets/loader/round-sm.svg" alt />
                        </span>

                        <span v-else>
                          UPDATE
                          <i class="fa fa-check"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="pin_no" class="control-label bold">PIN Number</label>
                      <input
                        type="text"
                        name="pin_no"
                        id="pin_no"
                        v-model="settingsData.pinNo"
                        class="form-control input-sm"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="agent_no" class="control-label bold">Agent Number</label>
                      <input
                        type="text"
                        name="agent_no"
                        id="agent_no"
                        v-model="settingsData.agentNo"
                        class="form-control input-sm"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="general__logo">
                      <img
                        v-if="!logoFile == ''"
                        id="genlogo"
                        :src="logoFile"
                        width="100"
                        height="100"
                        alt
                        class="img-thumbnail"
                      />
                      <img
                        v-else
                        id="genlogo"
                        :src="getImgUrl() + settingsData.logoUrl"
                        width="100"
                        alt
                        height="100"
                        class="img-thumbnail"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <h6 class="bold">
                      <u>Email Settings</u>
                    </h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="mail_server" class="control-label bold">Mail Server</label>
                      <input
                        type="text"
                        name="mail_server"
                        id="mail_server"
                        class="form-control input-sm"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="mail_port" class="control-label bold">Mail Port</label>
                      <input
                        type="text"
                        name="mail_port"
                        id="mail_port"
                        class="form-control input-sm"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="sender_name" class="control-label bold">Sender Name</label>
                      <input
                        type="text"
                        name="sender_name"
                        id="sender_name"
                        class="form-control input-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="sender_email" class="control-label bold">Sender Email</label>
                      <input
                        type="text"
                        name="sender_email"
                        id="sender_email"
                        class="form-control input-sm"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="smtp_password" class="control-label bold">Password</label>
                      <input
                        type="text"
                        name="smtp_password"
                        id="smtp_password"
                        class="form-control input-sm"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group mt-4">
                      <button class="btn btn-sm btn-outline-secondary">
                        Save
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-sm-12">
                    <h6 class="bold">
                      <u>Other Settings</u>
                    </h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <div class="row">
                      <div class="col-md-6">
                        <label class="slideOne-label pull-left bold">Enable Chat</label>
                      </div>
                      <div class="col-md-2">
                        <div class="slideOne pull-right">
                          <input
                            type="checkbox"
                            value="None"
                            id="enableChat"
                            name="check"
                            :checked="enableChat ? true : false"
                            @change="handleEnableChat"
                          />
                          <label for="enableChat"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="mpesa_shortcode" class="control-label bold">Mpesa STK Shortcode</label>
                      <input
                        type="text"
                        name="mpesa_shortcode"
                        id="mpesa_shortcode"
                        class="form-control input-sm"
                      />
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
import { imgUrl } from "../../../config/defaultUrls";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      enableChat: false,
      logoFile: "",
      settingsData: {
        companyId: "",
        name: "",
        regNo: "",
        vatNo: "",
        website: "",
        agentNo: "",
        pinNo: "",
        logoUrl: "",
        logoFile: null,
        clientCode: false
      }
    };
  },

  computed: {
    ...mapState({
      settings: state => state.settings.genSettings,
      upadatingSettings: state => state.settings.upadatingSettings
    })
  },

  created() {
    this.initiateCreated();
  },

  methods: {
    ...mapActions(["updateGeneralSettings"]),
    initiateCreated() {
      this.$store.dispatch("fetchGeneralSettings").then(() => {
        const set = this.settings;
        this.settingsData = {
          companyId: set.id,
          name: set.name,
          regNo: set.regNo !== null ? set.regNo : "---",
          vatNo: set.vatNo !== null ? set.vatNo : "---",
          website: set.website !== null ? set.website : "---",
          agentNo: set.agentNo !== null ? set.agentNo : "---",
          pinNo: set.pinNo !== null ? set.pinNo : "---",
          logoUrl: set.logoUrl,
          clientCode: set.clientCode == "demo" ? true : false
        };
      });
    },

    handleLogoUpload() {
      let reader,
        logo = this.$refs.imgLogo.files[0];

      if (this.$refs.imgLogo.files.length < 0) {
        return;
      }

      reader = new FileReader();
      reader.readAsDataURL(logo);
      reader.onload = e => {
        this.logoFile = e.target.result;
      };

      this.settingsData.logoFile = logo;
    },

    handleUpdateSettings() {
      const s = this.settingsData;
      const data = {
        logoFile: s.logoFile,
        companyId: s.companyId,
        name: s.name,
        regNo: s.regNo,
        vatNo: s.vatNo,
        website: s.website,
        agentNo: s.agentNo,
        pinNo: s.pinNo
      };

      this.updateGeneralSettings(data).then(() => {
        // this.logoFile = "";
      });
    },

    resetSettings() {
      this.settingsData = {
        companyId: "",
        name: "",
        regNo: "",
        vatNo: "",
        website: "",
        agentNo: "",
        pinNo: "",
        logoUrl: "",
        clientCode: false,
        logoFile: ""
      };
    },

    handleEnableChat(e) {
      console.log(e.target.checked);
    },

    getImgUrl() {
      return imgUrl;
    }
  }
};
</script>

<style>
.general__logo {
  margin-top: 1.4rem;
  width: 100px;
  height: 100px;
  background-color: #fff;
  border: 1px solid #fff;
}
.general__logo > img {
  display: inline-block;
  max-width: 100%;
  height: auto;
  padding: 4px;
  line-height: 1.42857143;
  border: none;
  border-color: #fff;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}
.slideOne {
  width: 30px;
  height: 10px;
  background: #808080;
  margin: 20px auto;
  position: relative;
  border-radius: 50px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.2);
}
.slideOne input[type="checkbox"] {
  visibility: hidden;
  margin-top: 1px;
}
.slideOne label {
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  top: -3px;
  left: -3px;
  cursor: pointer;
  background: #fcfff4;
  border-radius: 50px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
}
.slideOne-label {
  margin: 16px auto;
}
.slideOne input[type="checkbox"]:checked + label {
  left: 17px;
  background-color: #66aa18;
}
</style>