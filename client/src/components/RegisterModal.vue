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
      <v-card-text
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure sit
        maiores necessitatibus temporibus quasi officiis, unde et magni vitae
        numquam sequi.
      </v-card-text>
      <v-form v-model="valid.firstForm" ref="firstForm">
        <v-row>
          <v-col>
            <v-text-field
              v-model="formValues.email"
              label="mail"
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
            >
            </v-text-field>
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
      <v-form v-model="valid.firstForm" ref="secondForm">
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
                  <v-icon size="124px">mdi-account-circle</v-icon>
                </v-btn>
                <label class="secondForm__label">Upload profile picture</label>
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
          <v-spacer></v-spacer>
          <v-btn v-on:click="handleNext('secondForm')">NEXT</v-btn>
        </v-card-actions>
      </v-form>
    </div>
    <!-- === third form === -->
  </v-card>
</template>

<script>
export default {
  name: "RegisterModal",
  data() {
    return {
      formValues: {
        email: "",
        password: "",
        fullName: "",
        username: "",
        address: "",
        imageFile: "",
        imageName: "",
        imageUrl: ""
      },
      valid: {
        firstForm: false,
        secondForm: false,
        thirdForm: false
      },
      formPage: 0,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Password must be more than 10 characters"
      ],
      // TODO: provide more rules here
      fullNameRules: [v => !!v || "Full name is required"],
      usernameRules: [v => !!v || "Username is required"],
      addressRules: [v => !!v || "Address is required"]
    };
  },
  methods: {
    handleNext(formNum) {
      if (!this.valid[formNum]) {
        this.$refs[formNum].validate();
        return;
      }
      this.formPage++;
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.formValues.imageName = files[0].name;
        if (this.formValues.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.formValues.imageUrl = fr.result;
          this.formValues.imageFile = files[0];
        });
      } else {
        this.formValues.imageName = "";
        this.formValues.imageFile = "";
        this.formValues.imageUrl = "";
      }
    }
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
</style>
