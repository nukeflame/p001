<template>
  <div>
    <i class="ti-time f-s-12"></i>
    {{ relativeDateTime }}
  </div>
</template>

<script>
import { relativeDateTime } from "../../../mixins/helpers";

export default {
  props: ["moment"],

  data() {
    return {
      relativeDateTime: ""
    };
  },

  created() {
    this.refreshRelativeDateTime();
    setInterval(this.refreshRelativeDateTime, 1000);
  },

  methods: {
    refreshRelativeDateTime() {
      this.relativeDateTime = relativeDateTime(this.moment);
    }
  }
};
</script>
