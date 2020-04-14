<template>
  <v-carousel
    :show-arrows="media.length > 1 ? true : false"
    :hide-delimiters="true"
    hide-delimiter-background
  >
    <v-carousel-item v-for="(image, i) in media" :key="`carousel${i}`" :src="url(image._id, i)"></v-carousel-item>
  </v-carousel>
</template>
<script>
import { SERVER_URL } from "../apis/users";

export default {
  name: "Carousel",
  props: ["media", "itemId"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    url(imageId) {
      return `${SERVER_URL}/items/${this.itemId}/media/${imageId}`;
    }
  }
};
</script>
<style lang="sass" scoped>

</style>