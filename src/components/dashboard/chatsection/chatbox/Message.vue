<template>
  <div
    class="chatbody__message_body"
    :class="[message.senderId === authUser.id ? 'sent still_sms' : 'receive']"
  >
    <div class="chatbody__message__profile" v-if="message.senderId !== authUser.id ">
      <div style="height: 28px; width: 28px;">
        <a class="chatbody__message__avatar" tabindex="-1" href="#">
          <div class="chatbody__message__avatarimg">
            <img
              src="../../../../assets/images/avatar.png"
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
      <div class="chatbody__message__info">
        <div style="flex-direction: column;">
          <div class="chatbody__message_sms clearfix">
            <div class="chatbody__message_space"></div>
            <div
              class="chatbody__message_text chatbody_message_rds"
              style="max-width: 166px; overflow-wrap: inherit;"
            >
              <div class>
                <div>
                  <span class="chatbody__sms_text">
                    <span>{{ message.message }}</span>
                  </span>
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
export default {
  props: ["message", "authUser"]
};
</script>