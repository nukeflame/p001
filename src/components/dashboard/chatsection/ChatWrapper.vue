<template>
  <div>
    <chatbox></chatbox>
    <!-- Chat - Chat tabs -->
    <chat-tab></chat-tab>
    <!-- Chat - Online users -->
    <chat-online></chat-online>
  </div>
</template>

<script>
import Chatbox from "./Chatbox.vue";
import ChatTab from "./ChatTab.vue";
import ChatOnline from "./ChatOnline.vue";

export default {
  components: {
    Chatbox,
    ChatTab,
    ChatOnline
  },

  mounted() {
    const chatUser = JSON.parse(localStorage.getItem("cUser"));
    if (chatUser === null) {
      $(".chattab").addClass("hidden");
      $(".chatbox.chatbox__main").addClass("hidden");
    }
  }
};
</script>