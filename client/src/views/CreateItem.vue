<template>
  <div v-if="postingItem">
    <v-progress-circular class="loading" indeterminate></v-progress-circular>
  </div>
  <div v-else class="create-item">
    <div>
      <h1 class="create-item__title">Create Item</h1>
      <v-divider class="create-item__divider" />
    </div>
    <v-card class="create-item__card">
      <v-form class="create-item__form" v-model="formValid" ref="form">
        <v-row>
          <v-col>
            <v-text-field
              outlined
              v-model="formValues.name"
              label="Item Name"
              :rules="nameRules"
              required
              counter
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-select
              outlined
              v-model="formValues.category"
              :items="ITEM_CATEGORIES"
              label="Item Category"
              required
            ></v-select>
          </v-col>
          <v-col col="6">
            <v-text-field
              outlined
              v-model="formValues.price"
              label="Item Price"
              :rules="priceRules"
              required
              :prepend-inner-icon="'$vuetify.icons.karmaDark'"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              outlined
              label="Item Description"
              v-model="formValues.description"
              :rules="descriptionRules"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row class="create-item__image-row">
            <v-col v-for="n in 3" :key="n" class="square" @click="pickFile(n - 1)">
              <v-card class="create-item__img-pick" outlined>
                <v-img v-if="imageUrl[n - 1]" :src="imageUrl[n - 1]" class="create-item__image"></v-img>
                <v-card-title v-else class="create-item__img-pick__title">{{ `Image ${n}` }}</v-card-title>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="create-item__label-row">
            <label v-if="imageWarning" class="create-item__label">You must upload at least one image</label>
          </v-row>
          <input
            type="file"
            name="input"
            style="display: none"
            ref="image"
            accept="image/*"
            multiple
            @change="onFilePicked"
          />
        </v-container>
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-btn v-on:click="handleSubmit">SUBMIT</v-btn>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import { ITEM_CATEGORIES } from "../utils/constants";
import { mapState } from "vuex";
export default {
  name: "CreateItem",
  data() {
    return {
      ITEM_CATEGORIES,
      formValues: {
        name: "",
        category: "All",
        price: 0,
        description: "",
        media: []
      },
      imageUrl: {
        0: "",
        1: "",
        2: ""
      },
      imgNum: 0,
      formValid: false,
      imageWarning: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length < 25 || "Name must less than 25 characters"
      ],
      priceRules: [
        v => v !== "" || "Price is required",
        v => /^[0-9]+$/.test(v.toString()) || "Price must only contain numbers",
        v => Number(v) >= 0 || "Price must be a whole number larger than 0"
      ],
      descriptionRules: [
        v => !!v || "Description is required",
        v => v.length < 500 || "Description must be less than 500 character"
      ]
    };
  },
  computed: mapState({
    username: state => state.users.me.username,
    postingItem: state => state.items.postingItem
  }),
  methods: {
    handleSubmit() {
      if (!this.formValues.media.length) {
        this.$refs.form.validate();
        this.imageWarning = true;
        return;
      } else {
        this.imageWarning = false;
      }

      if (this.formValid) {
        this.$store.dispatch("newItem", this.createForm());
        // this.$router.push(`/profile/${this.username}`);
      } else {
        this.$refs.form.validate();
      }
    },
    createForm() {
      const { media, name, description, category, price } = this.formValues;
      const files = media.filter(file => !!file);
      const fd = new FormData();

      fd.append("name", name);
      fd.append("description", description);
      fd.append("category", category);
      fd.append("price", Number(price));

      for (let i = 0; i < files.length; i++) {
        fd.append("media", files[i]);
      }

      return fd;
    },
    pickFile(n) {
      this.imgNum = n;
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const num = this.imgNum;
      const files = e.target.files;

      if (files[0] === undefined) {
        return;
      }
      if (files[0].name.lastIndexOf(".") <= 0) {
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener("load", () => {
        this.imageUrl[num] = fr.result;
        this.formValues.media[this.imgNum] = files[0];
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.create-item {
  &__title {
    margin: 0 3rem;
  }
  &__image {
    width: 100%;
    height: 100%;
  }
  &__image-row {
    margin-bottom: 8px;
  }
  &__label {
    color: #ff5252;
    font-size: 12px;
    padding-left: 12px;
    font-family: "Roboto", sans-serif;
  }
  &__label-row {
    min-height: 18px;
  }
  &__divider {
    margin: 0 1rem;
  }
  &__card {
    max-width: 875px;
    margin: 16px auto;
  }
  &__form {
    padding: 3rem 4rem 3rem 4rem;
  }
  &__img-pick {
    position: relative;
    width: 100%;
    height: 100%;
    position: absolute;
    transform: translate(50%, -50%);
    right: 50%;
    top: 50%;
    cursor: pointer;
    &__title {
      position: absolute;
      transform: translate(50%, -50%);
      right: 50%;
      top: 50%;
    }
  }
}
.loading {
  margin: 0 auto;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.square {
  position: relative;
  // border: 1px solid hotpink;
  // cursor: pointer;
}

.square:nth-of-type(2) {
  margin: 0 10px 0 10px;
}
.square:before {
  content: "";
  display: block;
  padding-top: 100%;
}
</style>
