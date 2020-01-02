<template>
  <div class="item">
    <v-card>
      <v-img :src="url"></v-img>
    </v-card>
    <h3>{{ item.name }}</h3>
    <p>{{ description }}</p>
  </div>
</template>
<script>
import { SERVER_URL } from "../apis/users";
export default {
  name: "Item",
  props: ["item"],
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
  }
};
</script>
<style lang="scss" scoped>
.item {
  width: 100%;
}
</style>
