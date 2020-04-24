<template>
  <div>
    <v-dialog max-width="675px" persistent v-model="loginDialog">
      <template v-slot:activator="{ on }">
        <v-btn class="nav__login-btn" v-on="on">LOGIN</v-btn>
      </template>
      <LoginRegisterModal :initialTab="0" v-on:close-dialog="loginDialog = false" />
    </v-dialog>

    <v-dialog
      :scrollable="true"
      content-class="register-modal"
      max-width="675px"
      persistent
      v-model="registerDialog"
    >
      <template v-slot:activator="{ on }">
        <v-btn class="nav__register-btn" v-on="on">REGISTER</v-btn>
      </template>
      <LoginRegisterModal
        :initialTab="1"
        v-on:close-dialog="registerDialog = false"
        closeOnComplete
      />
    </v-dialog>
  </div>
</template>

<script>
import LoginRegisterModal from "./LoginRegisterModal";

export default {
  name: "LoginRegisterBtns",
  components: {
    LoginRegisterModal
  },
  data() {
    return {
      loginDialog: false,
      registerDialog: false
    };
  }
};
</script>

<style lang="scss" scoped>
.nav {
  padding: 0 3% 0 3%;

  &__register-btn {
    margin-left: 1rem;
  }
}
.register-modal {
  height: 40rem !important;
}
</style>
