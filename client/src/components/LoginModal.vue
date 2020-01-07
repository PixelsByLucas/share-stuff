<template>
  <v-card class="login-modal">
    <v-row>
      <v-spacer></v-spacer>
      <v-btn v-on:click="$emit('close-dialog')" icon>
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-row>
    <v-card-title>Login</v-card-title>
    <div>
      <v-form v-model="valid" ref="loginForm">
        <v-row>
          <v-col>
            <v-text-field
              v-model="formValues.email"
              label="email"
              :rules="emailRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="formValues.password"
              label="password"
              :rules="passwordRules"
              required
              :type="showPassword ? 'text' : 'password'"
              counter
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-on:click="handleSubmit">LOGIN</v-btn>
        </v-card-actions>
      </v-form>
    </div>
  </v-card>
</template>

<script>
import { isEmail } from "validator";
import { mapState } from "vuex";

export default {
  name: "LoginModal",
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
      if (loggedIn) {
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
.login-modal {
  padding: 3rem 4rem 3rem 4rem;
  margin: 0 auto;
}
</style>
