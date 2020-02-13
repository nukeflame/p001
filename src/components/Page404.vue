<template>
  <div class="error-page" id="wrapper">
    <div class="error-box">
      <div class="error-body text-center">
        <h1>404</h1>
        <h3 class="text-uppercase">Page not found</h3>
        <p class="text-muted m-t-30 m-b-30">Please try after some time</p>

        <router-link
          to="/"
          class="btn btn-info btn-rounded waves-effect waves-light m-b-40"
        >Back to home</router-link>
      </div>
    </div>
  </div>
</template>
