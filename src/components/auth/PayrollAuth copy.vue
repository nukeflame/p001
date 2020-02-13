<template>
  <div class="top-content">
    <div class="container">
      <div class="justify-content-center row">
        <div class="form-box col-sm-5 col-lg-5">
          <div class="loginbg" style="background: rgb(51, 153, 255);">
            <div class="form-top">
              <div class="form-top-left" style="padding-top: 37px;">
                <h3
                  class="color-white"
                  style="color: rgb(255, 255, 255); background: transparent; text-shadow: rgb(122, 122, 122) 4px 3px 0px; font-size: 27px;"
                >AfyaMed HIMS</h3>
              </div>
              <div class="form-top-right">
                <i class="fa fa-lock"></i>
              </div>
            </div>
            <div class="form-bottom">
              <h3 class="font-white">Enter hospital code</h3>
              <form class>
                <div class="mb-3 form-group">
                  <label for="form-username" class="sr-only">Hospital Code</label>
                  <input
                    name="hospital_code"
                    id="hospital_code"
                    autocomplete="off"
                    type="text"
                    class="form-username form-control"
                    style="color: rgb(0, 0, 0);"
                  />
                  <div class="animated fadeIn invalid-feedback" style="color: rgb(139, 0, 0);"></div>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="save-code" />
                  <label class="custom-control-label" for="save-code">Remember Code</label>
                </div>
                <button type="submit" class="btn loginsubmit-btn">
                  <span>
                    Authenticate
                    <i class="fa fa-key pl-2"></i>
                  </span>
                </button>
              </form>
              <br />
              <p class="mt-3 mb-0 text-center">
                Epsotech Copyright © 2019. All rights reserved
                <br />Help and Support : info@epsotechsolutions.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style >
.loginbg {
  max-height: 480px;
  box-shadow: 0 10px 18px 0 rgba(62, 57, 107, 0.2);
  border-radius: 4px;
}
</style>