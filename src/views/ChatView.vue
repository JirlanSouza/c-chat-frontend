<template>
  <div class="containerChat">
    <SideBar></SideBar>
    <div class="chat">
      <MessagesList :propMessageList="messagesList[actualRoom]"></MessagesList>
      <div class="inputMessage">
        <input
          type="text"
          class="IM"
          placeholder="Digite sua mensagem"
          v-model="messageToSend"
          @keyup.enter="pushNewMessage()"
        />
        <button @click="pushNewMessage()">
          Enviar
          <div class="iconeSend"><Send :size="24" /></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations, mapActions } from "vuex";

import Send from "vue3-material-design-icons-ts/dist/Send.vue";
import MessagesList from "@/components/chat/main/messagesList/messagesList.vue";
import SideBar from "@/components/chat/SideBar/sideBar/SideBar/sideBar.vue";

export default defineComponent({
  name: "ChatView",
  data() {
    return {
      messageToSend: "",
    };
  },
  components: {
    MessagesList,
    Send,
    SideBar,
  },

  computed: {
    ...mapState(["userInfo", "messagesList", "actualRoom"]),
  },

  methods: {
    ...mapMutations(["SET_MESSAGE_ON_LIST"]),
    ...mapActions(["GET_FIRST_MESSAGES", "SEND_NEW_MESSAGE"]),

    isLogged() {
      if (!this.userInfo.isLoggedIn) {
        this.$router.push({ name: "Auth" });
      }
    },

    pushNewMessage() {
      const msg = {
        roomId: this.actualRoom,
        userId: this.userInfo.user.id,
        text: this.messageToSend,
      };
      this.SEND_NEW_MESSAGE(msg);
      this.messageToSend = "";
    },
  },

  mounted() {
    this.isLogged();
  },
});
</script>

<style scoped lang="scss">
.containerChat {
  width: 100%;
  height: 100vh;
  display: flex;
}
.chat {
  height: 100vh;
  width: calc(100% - 350px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.inputMessage {
  width: 95%;
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(150, 169, 186, 0.7);
  border-radius: 14px;
  overflow: hidden;

  input {
    height: 40px;
    background: #fdfdfd;
    border: none;
    padding: 16px;
    flex: 1;
    outline: none;
  }
  button {
    width: 108px;
    height: 40px;
    background: #6588de;
    color: white;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    border: none;
    border-radius: 14px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.iconeSend {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.messagesList {
  width: 100%;
  height: calc(100vh - 72px);
  padding: 5px 60px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
</style>