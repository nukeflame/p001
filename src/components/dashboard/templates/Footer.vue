<template>
  <footer class="footer">
    Epsotech Payroll Management &copy; 2017 - {{ getFullYear() }}. All rights reserved. Designed with
    <i
      class="fa fa-heart pr-1"
    ></i>
    by
    <a href="https://www.epsotechsolutions.com/">Epsotech Solutions.</a>
  </footer>
</template>

<script>
export default {
  created() {
    this.getFullYear();
  },

  methods: {
    getFullYear() {
      return new Date().getFullYear();
    }
  }
};
</script>