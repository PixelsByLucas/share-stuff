<template>
  <v-card class="register-modal">
    <v-row>
      <v-spacer></v-spacer>
      <v-btn v-on:click="$emit('close-dialog')" icon>
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-row>
    <v-card-title>Register</v-card-title>
    <!-- === first form === -->
    <div class="firstForm" v-if="formPage === 0">
      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure sit
        maiores necessitatibus temporibus quasi officiis, unde et magni vitae
        numquam sequi.
      </v-card-text>
      <v-form v-model="valid.firstForm" ref="firstForm">
        <v-row>
          <v-col>
            <v-text-field
              v-model="formValues.email"
              label="email"
              :error-messages="warnings.emailWarning"
              :rules="emailRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              v-model="formValues.password"
              label="password"
              :rules="passwordRules"
              required
              counter
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-on:click="handleNext('firstForm')">NEXT</v-btn>
        </v-card-actions>
      </v-form>
    </div>
    <!-- === second form === -->
    <div class="secondForm" v-if="formPage === 1">
      <v-form v-model="valid.secondForm" ref="secondForm">
        <v-container>
          <v-row>
            <v-col cols="8">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formValues.fullName"
                    label="Full name"
                    :rules="fullNameRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formValues.username"
                    label="Username"
                    :error-messages="warnings.usernameWarning"
                    :rules="usernameRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formValues.address"
                    label="Address"
                    :rules="addressRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4" class="secondForm__iconCol">
              <div>
                <v-btn icon class="secondForm__iconBtn" @click="pickFile">
                  <v-icon size="124px" v-if="!avatar.imageUrl">mdi-account-circle</v-icon>
                  <v-img
                    class="secondForm__profilePic"
                    v-else
                    :src="avatar.imageUrl"
                    alt="profile picture"
                    width="124px"
                    height="124px"
                  ></v-img>
                </v-btn>
                <label
                  :class="
                    warnings.imageWarning
                      ? 'secondForm__label imageWarning'
                      : 'secondForm__label'
                  "
                  v-if="!avatar.imageUrl"
                >Upload profile picture</label>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                />
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn v-on:click="handleBack">BACK</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-on:click="handleNext('secondForm')">NEXT</v-btn>
        </v-card-actions>
      </v-form>
    </div>
    <!-- === third form === -->
    <div v-if="formPage === 2">
      <v-card-subtitle>Terms and Condition</v-card-subtitle>
      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestiae
        distinctio qui exercitationem, dolores rerum atque odit rem maxime
        praesentium dolore natus facere vero esse mollitia tenetur dolorum quo
        consequuntur! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Odio, dolorum minima sequi, ratione incidunt aliquam optio nostrum et
        laudantium doloribus harum tempore beatae impedit officia odit
        reiciendis. Laudantium, debitis eum! Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Alias ad est consequuntur eveniet
        laboriosam aliquid perspiciatis delectus harum. Nesciunt ad aspernatur
        id eius, ex voluptates consequatur officiis cum inventore recusandae?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
        debitis amet repellendus laboriosam! Facere, dicta praesentium
        perferendis eius qui quod veniam dolorum officiis, expedita reiciendis
        incidunt, labore odit quo nisi?
      </v-card-text>
      <v-form v-model="valid.thirdForm" ref="thirdForm">
        <v-checkbox
          v-model="agreeToTerms"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>
      </v-form>
      <v-card-actions>
        <v-row class="thirdForm__actions">
          <v-btn v-on:click="handleBack">BACK</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-on:click="handleSubmit">SUBMIT</v-btn>
        </v-row>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { isEmail } from "validator";
import debounce from "../utils/debounce";

export default {
  name: "RegisterModal",
  data() {
    return {
      formValues: {
        // TODO: We'll want to sanitize these values to make sure they don't contain <, >, &, ', ", etc. characters
        email: "",
        password: "",
        fullName: "",
        username: "",
        primaryLocation: {
          lat: 0,
          long: 0
        }
      },
      avatar: {
        imageFile: "",
        imageName: "",
        imageUrl: ""
      },
      valid: {
        firstForm: false,
        secondForm: false,
        thirdForm: false
      },
      warnings: {
        imageWarning: false,
        emailWarning: [],
        usernameWarning: []
      },
      addressInput: "",
      formPage: 0,
      agreeToTerms: false,
      showPassword: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => isEmail(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Password must be more than 8 characters"
      ],
      // TODO: provide more rules here
      fullNameRules: [v => !!v || "Full name is required"],
      usernameRules: [v => !!v || "Username is required"],
      addressRules: [v => !!v || "Address is required"]
    };
  },
  watch: {
    "formValues.email": async function(email) {
      const unique = await this.debouncedDispatch("verifyUniqueEmail", email);

      unique
        ? (this.warnings.emailWarning = [])
        : (this.warnings.emailWarning = ["That email is already in use"]);
    },
    "formValues.username": async function(username) {
      const unique = await this.debouncedDispatch(
        "verifyUniqueUserName",
        username
      );

      unique
        ? (this.warnings.usernameWarning = [])
        : (this.warnings.usernameWarning = ["That username is already in use"]);
    }
  },
  methods: {
    handleNext(formNum) {
      if (!this.valid[formNum]) {
        this.$refs[formNum].validate();
        return;
      }
      if (formNum === "secondForm" && !this.avatar.imageFile) {
        this.warnings.imageWarning = true;
        return;
      }
      this.formPage++;
    },
    handleBack() {
      if (this.formPage > 0) {
        this.formPage--;
      }
    },
    async handleSubmit() {
      if (this.valid.thirdForm) {
        this.$store.dispatch("registerUser", {
          formValues: this.formValues,
          avatar: this.avatar.imageFile
        });
        this.$emit("close-dialog");
      }
      this.$refs.thirdForm.validate();
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.avatar.imageName = files[0].name;
        if (this.avatar.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.avatar.imageUrl = fr.result;
          const fd = new FormData();
          fd.append("avatar", files[0], files[0].name);
          this.avatar.imageFile = fd;
        });
      } else {
        this.avatar.imageName = "";
        this.avatar.imageFile = "";
        this.avatar.imageUrl = "";
      }
    }
  },
  created() {
    this.debouncedDispatch = debounce(this.$store.dispatch, 1000);
  }
};
</script>

<style lang="scss" scoped>
.register-modal {
  padding: 3rem 4rem 3rem 4rem;
  margin: 0 auto;
}
.secondForm {
  &__iconCol {
    align-self: center;
  }
  &__profilePic {
    border-radius: 50%;
  }
  &__iconBtn {
    width: 124px;
    height: 124px;
    margin: 0 auto;
    display: block;
  }
  &__label {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
  }
}
.thirdForm {
  &__actions {
    margin-top: 2rem;
  }
}
.imageWarning {
  color: red;
}
</style>
