<template>
  <div>
    <v-btn class="nav__login-btn">LOGIN</v-btn>
    <v-dialog max-width="675px" persistent v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-btn class="nav__register-btn" v-on="on">REGISTER</v-btn>
      </template>
      <RegisterModal v-on:close-dialog="dialog = false" />
    </v-dialog>
  </div>
</template>

<script>
import RegisterModal from "./RegisterModal";

export default {
  name: "LoginRegisterBtns",
  components: {
    RegisterModal
  },
  data() {
    return {
      dialog: false
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
