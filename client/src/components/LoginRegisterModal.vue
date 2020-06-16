<template>
  <v-card class="login-register-modal">
    <v-row no-gutters justify="end">
      <v-btn class="close-button" v-on:click="closeDialog" icon>
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-row>
    <v-tabs v-model="tab" grow>
      <v-tab>Login</v-tab>
      <v-tab>Register</v-tab>
    </v-tabs>
    <div class="modal-content">
      <LoginModal
        v-if="tab === 0"
        v-on:close-dialog="closeDialog"
        :closeOnComplete="closeOnComplete"
      />
      <RegisterModal v-else v-on:close-dialog="closeDialog" :closeOnComplete="closeOnComplete" />
    </div>
  </v-card>
</template>

<script>
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";

export default {
  name: "LoginRegisterModal",
  components: {
    LoginModal,
    RegisterModal
  },
  props: ["initialTab", "closeOnComplete"],
  data() {
    return {
      tab: this.initialTab || 0
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    }
  }
};
</script>
<style lang="scss" scoped>
.close-button {
  margin: 1rem;
}
.login-register-modal {
  margin: 0 auto;
}
.modal-content {
  padding: 0 2rem 2rem 2rem;
}
</style>