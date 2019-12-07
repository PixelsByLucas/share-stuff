<template>
  <div>
    <v-dialog max-width="675px" persistent v-model="loginDialog">
      <template v-slot:activator="{ on }">
        <v-btn class="nav__login-btn" v-on="on">LOGIN</v-btn>
      </template>
      <LoginModal v-on:close-dialog="loginDialog = false" />
    </v-dialog>
    <v-dialog max-width="675px" persistent v-model="registerDialog">
      <template v-slot:activator="{ on }">
        <v-btn class="nav__register-btn" v-on="on">REGISTER</v-btn>
      </template>
      <RegisterModal v-on:close-dialog="registerDialog = false" />
    </v-dialog>
  </div>
</template>

<script>
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

export default {
  name: "LoginRegisterBtns",
  components: {
    RegisterModal,
    LoginModal
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
</style>
