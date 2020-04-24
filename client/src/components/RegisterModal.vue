<template>
  <div>
    <v-row dense no-gutters>
      <v-card-title>{{ modalTitle }}</v-card-title>
    </v-row>
    <v-row v-if="modalSubtitle" dense no-gutters>
      <v-card-subtitle>{{ modalSubtitle }}</v-card-subtitle>
    </v-row>
    <v-divider></v-divider>
    <!-- === first form === -->
    <v-card-text class="card-text" v-if="formPage === 0">
      <v-form v-model="valid.form0" ref="form0">
        <v-row no-gutters>
          <v-col>
            <v-text-field
              v-model="formValues.email"
              label="email"
              outlined
              :error-messages="warnings.emailWarning"
              :rules="emailRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              v-model="formValues.password"
              label="password"
              outlined
              :rules="passwordRules"
              required
              counter
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <!-- === second form === -->
    <v-card-text class="card-text" v-if="formPage === 1">
      <v-form v-model="valid.form1" ref="form1">
        <v-container>
          <v-row no-gutter>
            <v-col cols="8">
              <v-row no-gutters>
                <v-col>
                  <v-text-field
                    v-model="formValues.fullName"
                    label="Full name"
                    outlined
                    :rules="fullNameRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-text-field
                    v-model="formValues.username"
                    label="Username"
                    outlined
                    :error-messages="warnings.usernameWarning"
                    :rules="usernameRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4" class="secondForm__iconCol" align-self="center">
              <v-row justify="center" no-gutters>
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
                >upload profile picture</label>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <!-- === third form === -->
    <v-card-text v-if="formPage === 2" class="card-text">
      <!-- <v-container class="map-box"> -->
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field v-model="map.addressInput" label="Search by address" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row style="height: 15rem;" no-gutters>
        <v-col cols="12">
          <LeafletMap
            :coords="this.map.geoCoords"
            :zoomProp="this.map.zoom"
            v-on:new-center="updateLocation"
            v-on:new-zoom="updateZoom"
            marker="static"
          />
        </v-col>
      </v-row>
      <!-- </v-container> -->
    </v-card-text>

    <!-- === fourth form === -->
    <v-card-text v-if="formPage === 3" class="card-text">
      <p>
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
      </p>
      <v-form v-model="valid.form3" ref="form3">
        <v-checkbox
          v-model="agreeToTerms"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>
      </v-form>
    </v-card-text>

    <!-- === form actions === -->
    <v-card-actions class="card-actions">
      <v-row no-gutters>
        <v-btn v-if="formPage !== 0" v-on:click="handleBack">BACK</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="formPage === 3" v-on:click="handleSubmit">SUBMIT</v-btn>
        <v-btn v-else v-on:click="handleNext">NEXT</v-btn>
      </v-row>
    </v-card-actions>
  </div>
</template>

<script>
import debounce from "../utils/debounce";
import firstAndLastName from "../utils/firstAndLastName";
import { isEmail } from "validator";
import LeafletMap from "../components/LeafletMap";

export default {
  name: "RegisterModal",
  components: {
    LeafletMap
  },
  props: ["closeOnComplete"],
  data() {
    return {
      formValues: {
        email: "",
        password: "",
        fullName: "",
        username: "",
        primaryLocation: {
          lat: 0,
          lng: 0
        }
      },
      avatar: {
        imageFile: "",
        imageName: "",
        imageUrl: ""
      },
      valid: {
        form0: false,
        form1: false,
        form2: true,
        form3: false
      },
      warnings: {
        imageWarning: false,
        emailWarning: [],
        usernameWarning: []
      },
      map: {
        addressInput: "",
        geoCoords: "",
        zoom: 0
      },
      formPage: 0,
      agreeToTerms: false,
      showPassword: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => isEmail(v) || "E-mail must be valid",
        v => v.length <= 100 || "Email cannot be longer than 100 characters"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Password must be more than 8 characters",
        v => v.length <= 100 || "Password cannot be longer than 100 characters"
      ],
      fullNameRules: [
        v => !!v || "Full name is required",
        v => v.length <= 100 || "Name cannot be longer than 100 characters"
      ],
      usernameRules: [
        v => !!v || "Username is required",
        v => v.length <= 100 || "Username cannot be longer than 100 characters"
      ]
    };
  },
  computed: {
    modalTitle() {
      switch (this.formPage) {
        case 1:
          return "Name";
        case 2:
          return "Location";
        case 3:
          return "Terms and Condition";
        default:
          return "Register";
      }
    },
    modalSubtitle() {
      switch (this.formPage) {
        case 2:
          return "Place the map marker at the location where you'll be lending from.";
        default:
          return "";
      }
    }
  },
  watch: {
    "map.addressInput": async function(input) {
      const coords = await this.debouncedDispatch("getLatLng", input);
      if (coords) {
        this.map.geoCoords = coords;
        this.map.zoom = 16;
      }
    },
    "avatar.imageUrl": function(url, prevUrl) {
      if (!prevUrl && this.warnings.imageWarning) {
        this.warnings.imageWarning = false;
      }
    },
    "formValues.email": async function(email) {
      const unique = await this.debouncedDispatch("verifyUniqueEmail", email);

      unique
        ? (this.warnings.emailWarning = [])
        : (this.warnings.emailWarning = ["That email is already in use"]);
    },
    "formValues.primaryLocation": async function() {},
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
    updateZoom(newZoom) {
      this.map.zoom = newZoom;
    },
    // STOPPED HERE: everything seems fine, but primaryLocation is [object, object]... is this a problem??  Why is it happening??
    updateLocation(newLocation) {
      this.formValues.primaryLocation = newLocation;
    },
    handleNext() {
      const formNum = `form${this.formPage}`;

      if (!this.valid[formNum]) {
        this.$refs[formNum].validate();
        return;
      }
      if (formNum === "form1" && !this.avatar.imageFile) {
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
      this.createForm();
      if (this.valid.form3) {
        this.$store.dispatch("registerUser", this.createForm());
        if (this.closeOnComplete) {
          this.$emit("close-dialog");
        }
      }
      this.$refs.form3.validate();
    },
    createForm() {
      const userData = { ...this.formValues, avatar: this.avatar.imageFile };

      const fd = new FormData();

      for (const key in userData) {
        if (key === "fullName") {
          const { firstName, lastName } = firstAndLastName(userData[key]);

          fd.append("firstName", firstName);
          fd.append("lastName", lastName);
        } else if (key === "primaryLocation") {
          fd.append(
            key,
            JSON.stringify({ lat: userData[key].lat, lng: userData[key].lng })
          );
        } else {
          fd.append(key, userData[key]);
        }
      }

      return fd;
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
          this.avatar.imageFile = files[0];
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
.map-box {
  height: "100%" !important;
  width: "100%" !important;
}
.firstForm {
  &__text {
    padding-left: 0;
    padding-right: 0;
  }
}
.secondForm {
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
.imageWarning {
  color: red;
}
</style>
