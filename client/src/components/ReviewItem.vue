<template>
  <v-card class="review-item">
    <v-card-title>
      <v-icon class="review-item__icon" small :color="color">{{ icon }}</v-icon>
      <a class="review-item__username">{{ review.username }}</a>
    </v-card-title>
    <v-card-text>
      <p>{{ review.text }}</p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "ReviewItem",
  props: ["review"],
  computed: {
    icon() {
      const { up } = this.review.rating;
      if (up) {
        return "mdi-thumb-up-outline";
      } else {
        return "mdi-thumb-down-outline";
      }
    },
    color() {
      const { up } = this.review.rating;
      if (up) {
        return "#37a175";
      } else {
        return "#cc4c49";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.review-item {
  &__username {
    font-size: 0.8rem;
  }
  &__icon {
    margin-right: 1rem;
  }
}
</style>
