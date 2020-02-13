<template>
  <div class="chattab">
    <div class="chattab__dock">
      <div class="chatdock__items clearfix">
        <!-- <div class="chatdock__more">
          <div class="popover">
            <a href="#" role="button" alt="messages" style="padding: 6px; line-height: 33px;">
              <i class="fa fa-comments f-s-19"></i>
            </a>
          </div>
        </div>-->
        <div class="chatdock__boxtab closetab">
          <div class="chatdock__item">
            <div class="clearfix titlebar">
              <div class="tbox">
                <div class="tbox__body">
                  <div aria-hidden="true" style="height: 20px; width: 20px; position: relative;">
                    <a
                      aria-label
                      data-hover="tooltip"
                      data-tooltip-content
                      data-tooltip-position="right"
                      class="tbody__link"
                      tabindex="-1"
                      href="#"
                    >
                      <div class="avatar__placeholder" style="width: 20px; height: 20px;">
                        <img
                          src="https://scontent.fnbo4-1.fna.fbcdn.net/v/t1.0-1/cp0/c0.0.60.60a/p60x60/82525804_158570042116445_8028434950250299392_n.jpg?_nc_cat=111&amp;_nc_eui2=AeE7FHwt15y4Sv1u1OyaZAQLuwNnBAevf0dfL0YZ-bSe-RXGhNRFHXxNbMXilkChyBD2Xnf_Ke3dR-zIUlT57ewD0biUXxghAwEsPYeMYkTpjw&amp;_nc_ohc=IIQy-Gg20IkAX9P6fO9&amp;_nc_ht=scontent.fnbo4-1.fna&amp;oh=eacf152413241cf3ffa7b7c1ad9b6f5a&amp;oe=5EA2E5CB"
                          width="20"
                          height="20"
                          alt
                          class="miniavatar"
                        />
                      </div>
                    </a>
                  </div>
                  <div class="tbox__footer">
                    <div class="tbox__footer_title">
                      <div class="title">
                        <a aria-label class="title__link" href="#" @click.prevent="handleOpenTab">
                          <span class="_logo">{{ getChatName() }}</span>
                        </a>
                      </div>
                    </div>
                    <div class="tbox__footer_close">
                      <div class="title__close">
                        <a
                          title="Close tab"
                          class="closetab_button"
                          href="#"
                          @click.prevent="removeChatTab"
                        >
                          <div class>
                            <img src="../../../assets/images/icon_close.svg" alt />
                          </div>
                        </a>
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      chatUserData: null,
      closeTab: false
    };
  },

  created() {},

  methods: {
    ...mapActions(["showMessages"]),
    handleOpenTab() {
      $(".chattab").addClass("animated fadeIn hidden");
      $(".chatbox.chatbox__main").removeClass("hidden");

      //show messages
      const chatUser = JSON.parse(localStorage.getItem("cUser"));
      this.showMessages(chatUser);
    },

    getChatName() {
      const chatUser = JSON.parse(localStorage.getItem("cUser"));
      if (chatUser) {
        return chatUser.name;
      }
    },

    removeChatTab() {
      $(".chattab").addClass("animated fadeIn hidden");
      localStorage.removeItem("cUser");
    }
  }
};
</script>