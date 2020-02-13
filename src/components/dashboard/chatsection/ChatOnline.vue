<template>
  <div class="chatbox chatbox--empty chatbox--tray">
    <div class="chatbox__title online__bg">
      <h5 @click.prevent="handleOnlineChatbox">
        <a href="#" id="nameChat">Chat</a>
      </h5>
      <button class="chatbox__title__tray" @click.prevent="handleOnlineChatbox">
        <span></span>
      </button>
    </div>
    <div class="chatbox__credentials">
      <ul class="list-group chatbox__listgroup" id="connectedUsers">
        <li class="chatbox__online clearfix" v-for="user in onlineUsers" :key="user.id">
          <a href="#" class="chatbox__placeholder" @click.prevent="handleOnlineUser(user)">
            <div class="chatbox__online_tray">
              <div aria-hidden="true" class="chatbox__img">
                <div class="chatbox__img_holder" style="width: 32px; height: 32px;">
                  <img
                    src="../../../assets/images/avatar.png"
                    width="32"
                    height="32"
                    alt
                    class="chatbox__avatar"
                  />
                </div>
              </div>
              <div class="chatbox__online_icon">
                <div class="online__icon__box">
                  <div class="info_online"></div>
                  <span
                    aria-label="Active Now"
                    style="background: rgb(66, 183, 42); border-radius: 50%; display: inline-block; height: 6px; margin-left: 4px; width: 6px;"
                  ></span>
                </div>
              </div>
              <div class="chatbox__listname">{{ user.name }}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <!-- search online users -->
    <div class="chatbox__search">
      <input type="text" placeholder="Search" class="chatbox__searchPlaceholder" />
      <i class="fa fa-search chatbox__searchIcon"></i>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      users: [],
      messages: [],
      chatOpen: false,
      chatUserId: null,
      loadingMessages: false,
      newMessage: ""
    };
  },

  created() {
    this.$store.dispatch("fetchOnlineUsers");
  },

  computed: {
    ...mapState({
      onlineUsers: state => state.users.onlineUsers,
      authUser: state => state.users.authUser
    })
  },

  methods: {
    ...mapActions(["showMessages"]),
    handleOnlineChatbox() {
      // chatbox--empty chatbox--active
      $(".chatbox.chatbox--empty").toggleClass("chatbox--tray");
      $(".chattab, .chatbox").toggleClass("chattab--stretch");
    },

    handleOnlineUser(user) {
      const userId = user.id;
      if (this.chatUserId !== userId) {
        this.chatOpen = true;
        this.chatUserId = userId;

        const chatUser = {
          cId: 2,
          id: this.chatUserId,
          name: user.name
        };

        localStorage.setItem("cUser", JSON.stringify(chatUser));
        this.showMessages(chatUser);
      }

      $(".chatbox.chatbox__main").removeClass("hidden");
      $(".chatbox.chatbox--empty").toggleClass("chatbox--tray");
      $(".chattab").addClass("hidden");
      $(".chattab, .chatbox").toggleClass("chattab--stretch");
    }
  }
};
</script>