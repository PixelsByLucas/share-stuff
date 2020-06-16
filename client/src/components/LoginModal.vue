<template>
  <div>
    <v-row dense no-gutters>
      <v-card-title>Login</v-card-title>
    </v-row>
    <v-divider></v-divider>
    <v-card-text>
      <v-form v-model="valid" ref="loginForm" v-on:submit.prevent="handleSubmit">
        <v-row no-gutters>
          <v-col>
            <v-text-field
              v-model="formValues.email"
              label="email"
              outlined
              :rules="emailRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-text-field
              v-model="formValues.password"
              label="password"
              outlined
              :rules="passwordRules"
              required
              :type="showPassword ? 'text' : 'password'"
              counter
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-btn type="submit" v-on:click.prevent="handleSubmit">LOGIN</v-btn>
      </v-row>
    </v-card-actions>
  </div>
  <!-- </v-card> -->
</template>

<script>
import { isEmail } from "validator";
import { mapState } from "vuex";

export default {
  name: "LoginModal",
  props: ["closeOnComplete"],
  data() {
    return {
      formValues: {
        email: "",
        password: ""
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => isEmail(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Password must be more than 8 characters"
      ],
      valid: false,
      showPassword: false
    };
  },
  computed: mapState({
    isLoggedIn: state => state.users.me.isLoggedIn
  }),
  watch: {
    isLoggedIn(loggedIn) {
      if (loggedIn && this.closeOnComplete) {
        this.$emit("close-dialog");
      }
    }
  },
  methods: {
    async handleSubmit() {
      if (this.valid) {
        await this.$store.dispatch("loginWithEmail", {
          ...this.formValues
        });
        if (!this.isLoggedIn) {
          this.formValues.password = "";
          this.$refs.loginForm.resetValidation();
        }
      } else {
        this.$refs.loginForm.validate();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
