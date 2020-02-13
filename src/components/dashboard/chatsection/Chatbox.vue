<template>
  <div class="chatbox chatbox--active chatbox__main hidden">
    <!-- :class="[chatBoxOpen ? '' : 'hidden' chatbox__main chatbox--closed ] -->
    <div class="chatbox__title">
      <h6 @click="handleToggleBox">
        <a href="#" id="nameChat">
          <span>{{ getChatName() }}</span>
        </a>
      </h6>
      <button class="chatbox__title__tray">
        <span></span>
      </button>
      <button class="chatbox__title__tray users_icon">
        <img src="../../../assets/images/icon_settings.svg" alt />
      </button>
      <button class="chatbox__title__tray users_icon" @click="handleToggleBox">
        <img src="../../../assets/images/icon_close.svg" alt />
      </button>
    </div>
    <div class="chatbox__body">
      <div class="chatbody__panel">
        <div class="chatbody__scroll" style="overscroll-behavior: contain;" ref="messageBox">
          <div class="chatbody__info">
            <div class="chatbody__info_txt"></div>
            <div class="chatbody__message_list">
              <div v-for="message in messages" :key="message.id">
                <!-- <time class="chatbody__time">
                  <span class="chatbody__time_p">11:06 AM</span>
                </time>-->
                <message-chatbox :message="message" :authUser="authUser"></message-chatbox>
                <!-- <time class="chatbody__time">
                  <span class="chatbody__time_p">6/30/19, 6:52 PM</span>
                </time>-->
                <!-- <div class="chatbody__message_body receive">
                  <div class="chatbody__message__profile">
                    <div style="height: 28px; width: 28px;">
                      <a class="chatbody__message__avatar" tabindex="-1" href="#">
                        <div class="chatbody__message__avatarimg">
                          <img
                            src="../../../assets/images/avatar.png"
                            width="28"
                            height="28"
                            alt
                            class="img_profile"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="chatbody__message__item">
                    <div>
                      <div class="chatbody__message__info">
                        <div style="flex-direction: column;">
                          <div class="chatbody__message_sms clearfix">
                            <div class="chatbody__message_space"></div>
                            <div
                              class="chatbody__message_text chatbody_message_rds"
                              style="max-width: 166px; overflow-wrap: inherit;"
                            >
                              <div>
                                <div>
                                  <span class="chatbody__sms_text">
                                    <span>Yeah was popping my frend long time not see you actually i wanted to inform am kul and doing well so whats going to happen next after initial commit of the system?</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>-->
                <!--  <div class="chatbody__message_body receive">
                  <div class="chatbody__message__profile">
                    <div style="height: 28px; width: 28px;">
                      <a class="chatbody__message__avatar" tabindex="-1" href="#">
                        <div class="chatbody__message__avatarimg">
                          <img
                            src="../../../assets/images/avatar.png"
                            width="28"
                            height="28"
                            alt
                            class="img_profile"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="chatbody__message__item">
                    <div>
                      <div class="chatbody__message__info">
                        <div style="flex-direction: column;">
                          <div class="chatbody__message_sms clearfix">
                            <div class="chatbody__message_space"></div>
                            <div
                              class="chatbody__message_text chatbody_message_rds"
                              style="max-width: 166px; overflow-wrap: inherit;"
                            >
                              <div>
                                <div>
                                  <span class="chatbody__sms_text">
                                    <span>Yeah was popping my frend long time not see you actually i wanted to inform am kul and doing well so whats going to happen next after initial commit of the system?</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- send message -->
    <div class="chatbox__message">
      <div class="chatbox__box">
        <input
          type="text"
          placeholder="Send Message... "
          class="form-control chat__sms"
          tabindex="-1"
          id="textbox"
          autocomplete="off"
          autofocus
          @change="sendMessage"
          v-model="newMessage"
        />
      </div>
      <ul class="chatbox__attachements">
        <li class="upload-imgs">
          <a href="#" class="upload-form">
            <i class="icon-picture f-s-16 f-w-700"></i>
          </a>
        </li>
        <li>
          <i class="icon-emotsmile f-s-16 f-w-700"></i>
        </li>
        <li class="send__button">
          <a label="send" class="chat-send" title="Press Enter to send" href="#">
            <i class="icon-paper-plane f-s-16 f-w-700"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MessageChatbox from "./chatbox/Message.vue";

export default {
  data() {
    return {
      newMessage: "",
      firstScroll: false
    };
  },

  components: {
    MessageChatbox
  },

  computed: {
    ...mapState({
      messages: state => state.messages.messages,
      chatUser: state => state.messages.chatUser,
      chatBoxOpen: state => state.messages.chatBoxOpen,
      authUser: state => state.users.authUser,
      findingMessages: state => state.messages.findingMessages
    })
  },

  mounted() {
    // this.scrollToBottom();
  },

  watch: {
    messages() {
      this.firstScroll = true;
      this.scrollToBottom();
    }
  },

  created() {
    window.Echo.join("presence-chat-1")
      // .here(...)
      // .joining(...)
      // .leaving(...)
      .listen("Messages.MessageSent", e => {
        console.log(e);
      });

    window.Echo.private(`user.1}`).notification(notification => {
      console.log(notification.type);
    });

    this.iniateCreated();
  },

  methods: {
    ...mapActions(["createMessage", "showMessages"]),
    iniateCreated() {
      this.getChatName();
    },

    handleToggleBox() {
      $(".chatbox.chatbox__main").addClass("animated fadeIn hidden");
      $(".chattab").removeClass("hidden");
    },

    scrollToBottom() {
      this.$nextTick(() => {
        if (this.firstScroll) {
          this.$refs.messageBox.scrollTop = this.$refs.messageBox.scrollHeight;
          this.firstScroll = false;
        } else if (
          this.$refs.messageBox.scrollTop +
            this.$refs.messageBox.clientHeight ===
          this.$refs.messageBox.scrollHeight
        ) {
          this.$refs.messageBox.scrollTop = this.$refs.messageBox.scrollHeight;
        }
      });
    },

    sendMessage() {
      if (this.newMessage.length) {
        const sms = {
          senderId: this.authUser.id,
          message: this.newMessage
        };

        this.createMessage(sms).then(() => {
          this.newMessage = "";
        });
      }
    },

    getChatName() {
      return this.chatUser.name;
    }
  }
};
</script>

<style>
.chatbody__message_list .chatbody__message_body.still_sms {
  border-bottom: 1px solid white;
  padding-top: 0px;
  border-top: none;
}
.still_sms .chatbody__message__info {
  padding: 0px;
}
.still_sms.receive .chatbody__message_text {
  border-top: none;
  border-bottom: none;
}
</style>