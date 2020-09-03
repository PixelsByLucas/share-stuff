<template>
  <v-sheet
    class="item"
    @mousedown="goToItemDetail(item._id)"
    @mouseover="isMouseOver = true"
    @mouseleave="isMouseOver = false"
  >
    <v-card>
      <v-img :src="url" :class="!item.available ? 'image-unavailable' : null"></v-img>
    </v-card>
    <h3>{{ item.name }}</h3>
    <p class="no-margin">{{ description }}</p>
  </v-sheet>
</template>
<script>
import { SERVER_URL } from "../apis/users";
export default {
  name: "Item",
  props: ["item"],
  data() {
    return {
      isMouseOver: false
    };
  },
  computed: {
    url() {
      const itemId = this.item._id;
      const imageId = this.item.media[0]._id;
      return `${SERVER_URL}/items/${itemId}/media/${imageId}`;
    },
    description() {
      const { description } = this.item;
      const maxLength = 40;

      if (description.length <= maxLength) {
        return description;
      } else {
        let trimmedString = description.substr(0, maxLength);

        trimmedString = trimmedString.substr(
          0,
          Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
        );

        return `${trimmedString}...`;
      }
    }
  },
  methods: {
    goToItemDetail(id) {
      this.$router.push(`/itemdetail/${id}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.image-unavailable {
  opacity: 0.8;
}
.item {
  width: 100%;
  &:hover {
    cursor: pointer;
  }
}
</style>
